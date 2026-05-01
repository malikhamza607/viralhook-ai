export default async function handler(req, res) {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({ error: "No idea provided" });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key missing" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Generate 3 viral TikTok titles and 5 hashtags for: ${idea}`
      })
    });

    const data = await response.json();

    console.log(data); // debug

    if (!data.output || !data.output[0]) {
      return res.status(500).json({ error: "Bad response", data });
    }

    const text = data.output[0].content[0].text;

    res.status(200).json({ result: text });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}