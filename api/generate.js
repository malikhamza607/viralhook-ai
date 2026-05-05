export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method allow nahi hai' });
    }
  
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title likhna zaroori hai' });
    }
  
    // Vercel Environment se Grok ki API key lenge
    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Grok API Key backend mein missing hai' });
    }
  
    // Grok API ka official endpoint
    const apiUrl = 'https://api.x.ai/v1/chat/completions';
  
    // Grok ke liye strict prompt taake UI kharab na ho
    const promptText = `Tum ek expert TikTok viral strategist ho. Mera aam sa video topic yeh hai: "${title}". Mujhe sirf 1 highly engaging viral TikTok title aur exactly 5 trending hashtags dene hain. Jawab EXACTLY is format mein do, iske ilawa koi aur lafz mat likhna:
    
Title: [Viral Title Yahan]
Hashtags: [#tag1 #tag2 #tag3 #tag4 #tag5]`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'grok-beta', // Grok ka fast model
          messages: [
            { role: 'system', content: 'You are a viral social media expert.' },
            { role: 'user', content: promptText }
          ],
          temperature: 0.7 // Creativity level
        })
      });
  
      const data = await response.json();
      
      // Agar Grok ki API mein koi error aaye
      if (data.error) {
          return res.status(500).json({ error: data.error.message });
      }

      const responseText = data.choices[0].message.content;

      // Grok ke jawab se Title aur Hashtags ko alag alag karna taake UI mein sahi jagah jayein
      const titleMatch = responseText.match(/Title:\s*(.*)/i);
      const tagsMatch = responseText.match(/Hashtags:\s*(.*)/i);

      const finalTitle = titleMatch ? titleMatch[1].trim() : responseText;
      const finalHashtags = tagsMatch ? tagsMatch[1].trim() : "";

      // Frontend ko result bhejna
      res.status(200).json({ 
          title: finalTitle, 
          hashtags: finalHashtags 
      });

    } catch (error) {
      res.status(500).json({ error: 'Grok server se connect nahi ho saka. ' + error.message });
    }
}
