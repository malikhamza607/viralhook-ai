export default function handler(req, res) {
  try {
    const { idea } = req.body || {};

    if (!idea) {
      return res.status(200).json({ result: "Idea missing ❌" });
    }

    const i = idea.trim();

    // 🔢 numbers
    const numbers = [3, 5, 7, 10];
    const num = numbers[Math.floor(Math.random() * numbers.length)];

    // 🧠 hooks
    const hooks = [
      `You’re Doing ${i} WRONG 😳`,
      `Stop Doing ${i} Like This ❌`,
      `${num} ${i} Secrets Nobody Tells You 🤯`,
      `${num} Ways to Improve Your ${i} Instantly 🔥`,
      `This ${i} Trick Will Blow Your Mind 🤯`,
      `I Wish I Knew This ${i} Hack Earlier 😭`,
      `Don’t Try ${i} Without This Trick 😳`,
      `Why Your ${i} is Not Working 😳`,
      `This ${i} Hack is Going Viral 🚀`,
      `This Changed My ${i} Forever 🔥`
    ];

    const title = hooks[Math.floor(Math.random() * hooks.length)];

    // 🧠 niche detection
    const text = i.toLowerCase();
    let nicheTags = [];

    if (text.includes("food") || text.includes("recipe") || text.includes("cook")) {
      nicheTags = ["foodtok","easyrecipes","cookinghack","tastyfood","recipeoftheday","quickmeals","homecooking"];
    }
    else if (text.includes("gym") || text.includes("fitness")) {
      nicheTags = ["gymtok","fitnessmotivation","workouttips","fitlife","bodygoals","trainhard","fitnessviral"];
    }
    else if (text.includes("money") || text.includes("earn")) {
      nicheTags = ["makemoneyonline","sidehustle","passiveincome","wealth","financialfreedom","moneytips"];
    }
    else if (text.includes("tech") || text.includes("ai")) {
      nicheTags = ["techtok","aitools","techhacks","innovation","digitalgrowth","futuretech"];
    }

    // 🔥 broad + trending pool
    const broadTags = ["fyp","viral","trending","explorepage","contentcreator","tiktokgrowth"];
    const extraTags = ["viralvideo","growthtips","trendalert","reelsviral","audiencegrowth","contentideas"];

    // 🎲 random mix (10 hashtags)
    const allTags = [...nicheTags, ...broadTags, ...extraTags]
      .sort(() => 0.5 - Math.random());

    const hashtags = allTags.slice(0, 10).map(t => "#" + t);

    const result = `${title}\n\n${hashtags.join(" ")}`;

    return res.status(200).json({ result });

  } catch (err) {
    return res.status(200).json({ result: "Error aa gaya ❌" });
  }
}