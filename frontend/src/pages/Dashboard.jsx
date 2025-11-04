import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/auth/me').then(({ data }) => setUser(data.user)).catch(()=>{});
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome {user?.name}</p>
    </div>
  );
}
