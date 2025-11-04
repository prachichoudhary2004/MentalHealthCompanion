export const chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.json({ reply: "I'm here to help. Set GROQ_API_KEY on the server to enable AI responses." });
    }

    // Ensure fetch is available in Node
    // eslint-disable-next-line no-undef
    const _fetch = (typeof fetch !== 'undefined') ? fetch : (await import('node-fetch')).default;

    const response = await _fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Use a current Groq model; previous one was decommissioned
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You are SoulZen, a kind and supportive mental health companion. Be empathetic, concise, and provide practical tips. Avoid medical diagnosis. Suggest breathing exercises, journaling, and professional help when needed.' },
          { role: 'user', content: String(message || '') }
        ],
        temperature: 0.6,
        max_tokens: 300
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Groq API error');
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "I'm here to listen. Tell me more about how you feel.";
    res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err?.message || err);
    res.json({ reply: "I couldn't reach the AI right now, but I'm here to listen. Try again in a moment." });
  }
};
