export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Aam title ko set karna
    const cleanTopic = title.trim();
    // First letter capital karna
    const formatTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
    // Hashtag ke liye spaces khatam karna
    const tagTopic = cleanTopic.replace(/\s+/g, '').toLowerCase();
  
    // 💥 DATABASE: 50+ Viral Titles Templates
    const titleTemplates = [
        "POV: You just discovered {topic} 🤯",
        "The ultimate truth about {topic} 🤫",
        "Never do this with {topic} ❌",
        "This {topic} hack will change your life 💡",
        "Wait for it... {topic} 🔥",
        "Why everyone is obsessed with {topic} 🤩",
        "My secret {topic} trick you need to know 🤫",
        "If you love {topic}, watch this till the end 🛑",
        "Did you know this about {topic}? 🤔",
        "Rating {topic} out of 10 💯",
        "Top 3 mistakes you make with {topic} ⚠️",
        "The most aesthetic {topic} ✨",
        "How to get the best {topic} 🏆",
        "I tried the viral {topic} trend 🫣",
        "What they don't tell you about {topic} 🤫",
        "Is {topic} really worth the hype? 🤷‍♂️",
        "Nobody talks about this {topic} trick 🤫",
        "This is why your {topic} isn't working 📉",
        "The best way to handle {topic} in 2024 🚀",
        "Stop scrolling! You need this {topic} tip ✋",
        "Unlocking the mystery of {topic} 🔓",
        "Level up your {topic} game today 🎮",
        "Things I wish I knew about {topic} earlier 🕰️",
        "Watch this before trying {topic} ⚠️",
        "The {topic} hack experts are hiding from you 🕵️‍♂️",
        "Say goodbye to bad {topic} forever 👋",
        "A beginner's guide to perfect {topic} 📘",
        "This {topic} result will shock you 😱",
        "Exposing the reality of {topic} 🎥",
        "How {topic} changed my daily routine 🌅",
        "The {topic} formula everyone is copying 📋",
        "Don't ignore this {topic} warning 🚨",
        "Mastering {topic} in under 60 seconds ⏳",
        "The ultimate {topic} compilation you needed 🎬",
        "Is this the best {topic} ever made? 👑"
    ];

    // 💥 DATABASE: 100+ Trending Hashtags
    const baseTags = [
        "fyp", "foryou", "viral", "trending", "tiktok", "explore", "foryoupage", 
        "viralvideo", "trend", "tiktokpakistan", "learning", "hack", "tips", 
        "tricks", "daily", "vlog", "aesthetic", "wow", "omg", "mustwatch", 
        "mindblown", "lifehack", "tutorial", "review", "amazing", "secret",
        "tiktokhacks", "trendingnow", "fypシ", "viralpost", "grow", "success"
    ];
  
    // 1 Title Generate karna
    const randomTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
    const finalTitle = randomTemplate.replace(/\{topic\}/gi, formatTopic);

    // 5 Hashtags Generate karna (Topic wale tags + Random tags)
    let selectedTags = new Set();
    
    // Topic se related 2 tags lazmi dalna taake algorithm pick kare
    selectedTags.add("#" + tagTopic);
    selectedTags.add("#" + tagTopic + "viral");

    // Baqi 3 random trending tags database se dalna
    while(selectedTags.size < 5) {
        let randomBase = baseTags[Math.floor(Math.random() * baseTags.length)];
        selectedTags.add("#" + randomBase);
    }

    const finalHashtags = Array.from(selectedTags).join(" ");
  
    // Direct browser ko result bhej dena (Bina kisi API ke)
    res.status(200).json({ 
        title: finalTitle, 
        hashtags: finalHashtags 
    });
}
