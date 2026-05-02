export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Title ki formatting
    const cleanTopic = title.trim();
    const formatTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
    const tagTopic = cleanTopic.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); // Spaces aur special characters khatam
  
    // 💥 LAMBE AUR TRENDING VIRAL TITLES (Long Hooks)
    const titleTemplates = [
        "Stop scrolling! If you want to know the ultimate truth about {topic}, this video is exactly for you 🤯",
        "I can't believe I am finally sharing my biggest secret regarding {topic} with you guys... 🤫",
        "This is the only {topic} tutorial you will ever need to watch in 2024. Save this for later! 📌",
        "Everyone is talking about this viral {topic} trend, so I decided to test it out myself! 🫣",
        "Are you making these huge mistakes with {topic}? Watch this before it's too late! ❌",
        "The crazy {topic} hack that professionals don't want you to know about 🕵️‍♂️",
        "POV: You finally figured out how to master {topic} and it literally changed your life ✨",
        "I tried the most viral {topic} method on TikTok and the results will actually shock you 😱",
        "Do not even think about trying {topic} until you have watched this entire video 🛑",
        "Top 3 things nobody ever tells you about {topic}. Number 2 is mind-blowing! 🤯",
        "Why is nobody talking about this insane {topic} trick? I had to share this with you all 🔥",
        "If you are struggling with {topic}, here is the ultimate cheat code you have been looking for 🎯",
        "Exposing the reality behind the famous {topic} trend. Is it really worth the hype? 🤔",
        "Here is a step-by-step guide on how to get the perfect {topic} every single time 📈",
        "People are gatekeeping this {topic} secret, but I am going to reveal it right now 🔓",
        "This {topic} hack feels illegal to know. Use it before it gets taken down! 🚨",
        "Watch me transform my {topic} routine from basic to absolute perfection 💯",
        "The algorithm brought you here for a reason. Here is the {topic} advice you needed today 🌟",
        "I spent hours researching {topic} so you don't have to. Here is the summary 📚",
        "If this video about {topic} is on your FYP, take it as a sign to start today! 🚀",
        "The biggest lie you have been told about {topic}... Let me explain 🗣️",
        "My highly requested {topic} routine is finally here! Don't forget to save it 🎬",
        "I ranked every single {topic} method and the winner is definitely not what you expect 🏆",
        "What happens when you mix {topic} with consistency? Pure magic. Watch this! ✨",
        "This is your daily reminder to focus on {topic} if you want to see massive growth 🌱"
    ];

    // 💥 MASSIVE VIRAL HASHTAGS DATABASE
    const viralTagsPool = [
        "fyp", "foryou", "viral", "trending", "tiktok", "explore", "foryoupage", 
        "viralvideo", "trend", "tiktokpakistan", "learning", "hack", "tips", 
        "tricks", "daily", "vlog", "aesthetic", "wow", "omg", "mustwatch", 
        "mindblown", "lifehack", "tutorial", "review", "amazing", "secret",
        "tiktokhacks", "trendingnow", "fypシ", "viralpost", "grow", "success",
        "goviral", "tiktoktrend", "unfreezemyacount", "100k", "views", "magic",
        "storytime", "relatable", "funny", "entertainment", "knowledge", 
        "hacks", "lifehacks", "tipsandtricks", "xyzbca", "parati", "pourtoi",
        "viralhacks", "newtrend", "tiktokfamous", "learnontiktok", "edutok"
    ];
  
    // 1. Ek lamba viral title select karna
    const randomTemplate = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
    const finalTitle = randomTemplate.replace(/\{topic\}/gi, formatTopic);

    // 2. HASHTAGS LOGIC (2 Topic Related + 3 Viral)
    
    // --- Topic wale 2 tags banana ---
    let topicTagsSet = new Set();
    const topicSuffixes = ["", "viral", "trend", "hacks", "tips", "video", "tricks"];
    
    // Pehla tag sirf topic ka naam hoga (e.g., #cheesebiryani)
    topicTagsSet.add("#" + tagTopic);
    
    // Doosra tag topic ke sath koi suffix mila kar (e.g., #cheesebiryaniviral)
    while(topicTagsSet.size < 2) {
        let randSuffix = topicSuffixes[Math.floor(Math.random() * topicSuffixes.length)];
        let newTopicTag = "#" + tagTopic + randSuffix;
        topicTagsSet.add(newTopicTag);
    }

    // --- Viral 3 tags banana ---
    let viralTagsSet = new Set();
    while(viralTagsSet.size < 3) {
        let randViral = viralTagsPool[Math.floor(Math.random() * viralTagsPool.length)];
        // Ensure karte hain ke topic wala tag mix na ho jaye
        if (!topicTagsSet.has("#" + randViral)) {
            viralTagsSet.add("#" + randViral);
        }
    }

    // Dono tags ko mila kar 5 tags ka text banana
    const finalHashtags = Array.from(topicTagsSet).join(" ") + " " + Array.from(viralTagsSet).join(" ");
  
    // Browser ko result bhejna
    res.status(200).json({ 
        title: finalTitle, 
        hashtags: finalHashtags 
    });
}
