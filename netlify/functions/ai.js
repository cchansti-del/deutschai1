// Прокси к Groq. Ключ лежит в переменной Netlify GROQ_API_KEY, а не в коде страницы.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  const key = process.env.GROQ_API_KEY;
  if (!key) return { statusCode: 500, body: JSON.stringify({ error: 'GROQ_API_KEY не задан в Netlify' }) };

  let messages;
  try {
    const b = JSON.parse(event.body || '{}');
    messages = Array.isArray(b.messages) ? b.messages : [{ role: 'user', content: String(b.prompt || '') }];
  } catch (e) { return { statusCode: 400, body: 'Bad JSON' }; }
  if (JSON.stringify(messages).length > 20000) return { statusCode: 413, body: 'Too long' };

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'openai/gpt-oss-120b', messages })
  });
  const text = await res.text();
  return { statusCode: res.status, headers: { 'Content-Type': 'application/json' }, body: text };
};