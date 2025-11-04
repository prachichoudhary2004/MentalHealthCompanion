import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MoodChart({ data }) {
  const formatted = data
    .slice()
    .reverse()
    .map((m) => ({
      date: new Date(m.createdAt).toLocaleDateString(),
      score: m.score,
    }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <Line type="monotone" dataKey="score" stroke="#f7cac9" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 10]} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
