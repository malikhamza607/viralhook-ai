export default function handler(req, res) {
  const { idea, tone } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "No idea provided" });
  }

  const hooks = {
    viral: [
      `You’re Doing ${idea} WRONG 😳`,
      `This ${idea} Trick Will Blow Your Mind 🤯`,
      `Nobody Told You This About ${idea} 🔥`
    ],
    funny: [
      `${idea} but it went wrong 😂`,
      `This ${idea} is illegal 😭`,
      `I tried ${idea} and regret it 💀`
    ],
    luxury: [
      `Upgrade Your ${idea} Like a Pro ✨`,
      `This ${idea} Feels Expensive 💎`,
      `Premium ${idea} You Must Try 🔥`
    ]
  };

  const selected = hooks[tone] || hooks["viral"];
  const title = selected[Math.floor(Math.random() * selected.length)];

  const hashtags = [
    "#foodtok",
    "#easyrecipes",
    "#cookinghack",
    "#quickmeals",
    "#foodviral"
  ];

  const result = `${title}\n\n${hashtags.join(" ")}`;

  res.status(200).json({ result });
}