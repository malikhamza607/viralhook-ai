export default function handler(req, res) {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "No idea provided" });
  }

  const titles = [
    `You’re Making ${idea} WRONG 😳`,
    `This ${idea} Trick Will Shock You 🤯`,
    `Perfect ${idea} in 30 Seconds 🔥`
  ];

  const hashtags = [
    "#viral",
    "#tiktoktips",
    "#fyp",
    "#trending",
    "#contentcreator"
  ];

  res.status(200).json({
    result: [...titles, ...hashtags].join("\n")
  });
}