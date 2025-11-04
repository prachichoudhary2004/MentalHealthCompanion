import { useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';

export default function Chat() {
  const [messages, setMessages] = useState([{ role: 'bot', content: 'Hi! I\'m here to chat.' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async () => {
    if (!input.trim()) return;
    const myMsg = { role: 'user', content: input };
    setMessages((m) => [...m, myMsg]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/api/chatbot', { message: myMsg.content });
      setMessages((m) => [...m, { role: 'bot', content: data.reply }]);
    } catch (e) {
      setError('Failed to get reply');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>
      <div className="border rounded p-3 h-96 overflow-y-auto bg-white">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>{m.content}</span>
          </div>
        ))}
        {loading && <Loader />}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="flex-1 border p-2 rounded" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message..." onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} />
        <button onClick={send} className="bg-accent text-black px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}
