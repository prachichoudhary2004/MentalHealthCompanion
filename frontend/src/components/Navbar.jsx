import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">SoulZen</Link>
        <div className="space-x-4">
          <Link to="/chat" className="hover:text-accent">Chat</Link>
          <Link to="/mood" className="hover:text-accent">Mood</Link>
          <Link to="/login" className="hover:text-accent">Login</Link>
        </div>
      </div>
    </nav>
  );
}
