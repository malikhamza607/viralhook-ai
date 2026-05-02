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
  
    // Sab se fast aur free tier wala model
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
    // Naya Prompt: 100 Titles aur 100 Hashtags ki demand
    const prompt = `Tum ek viral TikTok expert ho. Mera aam sa video title yeh hai: "${title}". Mujhe exactly 100 highly engaging viral TikTok titles aur exactly 100 trending hashtags bana kar do. Kisi kism ka lamba introduction ya extra baat mat likhna. Jawab sirf is format mein hona chahiye:
    
Titles:
1. [Pehla Title]
2. [Doosra Title]
... (100 tak)

Hashtags:
#tag1 #tag2 #tag3 ... (100 tak)`;
  
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
