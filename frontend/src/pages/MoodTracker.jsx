import { useEffect, useState } from 'react';
import api from '../services/api';
import MoodChart from '../components/MoodChart';

export default function MoodTracker() {
  const [score, setScore] = useState(5);
  const [note, setNote] = useState('');
  const [moods, setMoods] = useState([]);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await api.get('/api/moods');
      setMoods(data.moods || []);
    } catch (e) {
      setError('Failed to load moods');
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/api/moods', { score: Number(score), note });
      setNote('');
      await load();
    } catch (e) {
      setError('Failed to save mood');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Mood Tracker</h1>
      <form onSubmit={submit} className="flex items-center gap-3">
        <label>Score</label>
        <input type="number" min="1" max="10" value={score} onChange={(e)=>setScore(e.target.value)} className="w-20 border p-2 rounded" />
        <input placeholder="Notes (optional)" value={note} onChange={(e)=>setNote(e.target.value)} className="flex-1 border p-2 rounded" />
        <button className="bg-primary text-white px-4 py-2 rounded">Save</button>
      </form>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <MoodChart data={moods} />
      <ul className="divide-y bg-white rounded">
        {moods.map((m) => (
          <li key={m._id} className="p-3 flex items-center justify-between">
            <span>{new Date(m.createdAt).toLocaleString()} — Score {m.score} {m.note && `— ${m.note}`}</span>
            <button onClick={async ()=>{ await api.delete(`/api/moods/${m._id}`); load(); }} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
