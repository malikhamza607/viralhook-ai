export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method allow nahi hai' });
    }
  
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title likhna zaroori hai' });
    }
  
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API Key missing hai backend mein' });
    }
  
    // Yahan hum ne 'v1beta' ko hata kar official 'v1' laga diya hai aur model 'gemini-1.5-flash' kar diya hai
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
    const prompt = `Tum ek viral TikTok expert ho. Mera aam sa video title yeh hai: "${title}". Tumne mujhe sirf 1 highly engaging viral TikTok title aur exactly 5 trending hashtags dene hain. Uske ilawa koi extra baat ya introduction nahi likhna. Jawab exact is format mein do:\nTitle: [Viral Title]\nHashtags: [5 Hashtags]`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
  
      const data = await response.json();
      
      if (data.error) {
          return res.status(500).json({ error: data.error.message });
      }

      if (!data.candidates || data.candidates.length === 0) {
          return res.status(500).json({ error: "Gemini ne koi jawab nahi diya."});
      }

      const text = data.candidates[0].content.parts[0].text;
      res.status(200).json({ result: text });

    } catch (error) {
      res.status(500).json({ error: 'Gemini server se connect nahi ho saka. ' + error.message });
    }
  }
