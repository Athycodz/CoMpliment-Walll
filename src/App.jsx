import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./pages/Login";
import Account from "./pages/Account";
import HomeButton from "./components/HomeButton";
import MouseTrail from './components/MouseTrail';
import Inbox from "./pages/Inbox";
import Send from "./pages/Send";
import Members from "./pages/Members";

export default function App() {
  return (
    <>
      <MouseTrail />
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/send" element={<Send />} />
            <Route path="/members" element={<Members />} />

          </Routes>
          <HomeButton />
        </div>
      </Router>
    </>
  );
}