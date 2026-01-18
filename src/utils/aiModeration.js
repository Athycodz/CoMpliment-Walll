// File: src/utils/aiModeration.js
// Copy this ENTIRE file

const GEMINI_API_KEY = "AIzaSyDtmGCfV_dT6NJpL9Ylhpr1CGwximw7jYQ";

export const moderateCompliment = async (message) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a content moderator for a college compliment platform. Analyze this message:

"${message}"

Rules:
1. APPROVE if: Genuine, specific, uplifting (e.g., "Your presentation inspired me")
2. REJECT if:
   - Generic spam ("nice", "cool", "ok", less than 5 words)
   - Vulgar or offensive language
   - Backhanded compliments ("You're smarter than you look")
   - Romantic/flirty content
   - Sarcastic or negative tone
   - Harassment or bullying

Respond ONLY with valid JSON in this exact format:
{"status": "approved", "reason": ""}
OR
{"status": "rejected", "reason": "brief explanation"}

Do not include any markdown formatting, just raw JSON.`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from response
    const jsonMatch = aiResponse.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    const result = JSON.parse(jsonMatch[0]);
    return result;

  } catch (error) {
    console.error('AI Moderation Error:', error);
    // Fallback: Allow but flag for manual review
    return {
      status: 'approved',
      reason: 'AI moderation unavailable, approved with caution'
    };
  }
};

// Quick client-side filter (runs before AI for instant feedback)
export const quickFilter = (message) => {
  const badWords = ['stupid', 'idiot', 'ugly', 'hate', 'fuck', 'shit', 'damn', 'bitch', 'ass', 'bastard'];
  const lowerMsg = message.toLowerCase();
  
  // Check length
  if (message.trim().split(/\s+/).length < 5) {
    return { valid: false, reason: 'Please write at least 5 words for a meaningful compliment!' };
  }
  
  // Check bad words
  if (badWords.some(word => lowerMsg.includes(word))) {
    return { valid: false, reason: 'Please keep your message positive and respectful!' };
  }
  
  // Check if too generic
  const genericPhrases = ['nice', 'cool', 'good', 'ok', 'okay', 'great', 'awesome'];
  const words = message.trim().toLowerCase().split(/\s+/);
  if (words.length <= 2 && genericPhrases.includes(words.join(' '))) {
    return { valid: false, reason: 'Be more specific! What exactly did you appreciate?' };
  }
  
  return { valid: true };
};