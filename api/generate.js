export default function handler(req, res) {
  const { idea, tone } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "No idea provided" });
  }

  const text = idea.toLowerCase();

  // 🎯 Category detection
  let category = "general";

  if (text.includes("food") || text.includes("recipe") || text.includes("cook") || text.includes("noodle") || text.includes("egg")) {
    category = "food";
  } else if (text.includes("gym") || text.includes("fitness") || text.includes("workout")) {
    category = "fitness";
  } else if (text.includes("money") || text.includes("online") || text.includes("earn")) {
    category = "money";
  } else if (text.includes("tech") || text.includes("ai") || text.includes("mobile")) {
    category = "tech";
  }

  // 🎭 Tone hooks
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

  // 📊 Category-based hashtags
  const hashtagMap = {
    food: ["#foodtok", "#easyrecipes", "#cookinghack", "#quickmeals", "#foodviral"],
    fitness: ["#gymtok", "#fitnessmotivation", "#workouttips", "#fitlife", "#fitnessviral"],
    money: ["#makemoneyonline", "#sidehustle", "#moneytips", "#passiveincome", "#wealth"],
    tech: ["#techtok", "#aitools", "#techhacks", "#digitalgrowth", "#innovation"],
    general: ["#fyp", "#viralvideo", "#trendingnow", "#contentcreator", "#explorepage"]
  };

  const hashtags = hashtagMap[category];

  const result = `${title}\n\n${hashtags.join(" ")}`;

  res.status(200).json({ result });
}