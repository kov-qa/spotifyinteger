export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  const KEY = ''
  const MODEL = 'gemini-3.1-flash-lite-preview'
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`

  try {
    const r = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
    const data = await r.json()
    if (!r.ok) console.error('Gemini error:', r.status, JSON.stringify(data))
    res.status(r.status).json(data)
  } catch (e) {
    console.error('Fetch error:', e.message)
    res.status(500).json({ error: { message: e.message } })
  }
}
