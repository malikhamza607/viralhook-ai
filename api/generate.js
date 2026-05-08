// 💥 GLOBAL MEMORY: Jo titles use ho jayenge wo yahan save honge taake repeat na hon
let usedTitlesHistory = [];

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const cleanTopic = title.trim();
    const formatTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
    const tagTopic = cleanTopic.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const lowerTopic = cleanTopic.toLowerCase();
  
    // 💥 SMART CATEGORY DETECTION
    let category = "general";
    
    if (/(food|recipe|biryani|cook|kitchen|eat|burger|cake|pizza|meal|tasty|chai|karahi)/.test(lowerTopic)) {
        category = "food";
    } else if (/(app|mod|apk|android|tech|phone|mobile|setting|code|smali|webview|download|vpn)/.test(lowerTopic)) {
        category = "tech";
    } else if (/(ai|edit|video|cinematic|capcut|photo|prompt|upscale|background|logo|youtube)/.test(lowerTopic)) {
        category = "editing";
    } else if (/(dog|cat|animal|pet|puppy|kitten|bird|funny pet)/.test(lowerTopic)) {
        category = "pets";
    }

    // 💥 CATEGORY WISE DATABASE (Titles & Tags)
    const databases = {
        food: {
            titles: [
                "This {topic} recipe will literally make you drool 🤤",
                "Secret restaurant-style {topic} recipe revealed! 🤫🍲",
                "Stop buying {topic}, make it at home easily like this! 👨‍🍳",
                "I tried making the viral {topic} and OMG... 😱",
                "The only {topic} recipe you will ever need in your life 🥘",
                "Rating this homemade {topic} a 100/10 💯",
                "Quick and easy {topic} recipe for lazy days ⏳",
                "POV: You just found the perfect {topic} recipe 👩‍🍳✨",
                "My family asks for this {topic} every single weekend! 👨‍👩‍👧‍👦",
                "If you have 10 minutes, make this viral {topic} ⏱️🔥",
                "Better than takeout! This {topic} is a game changer 🥡",
                "The secret ingredient for the best {topic} ever 🤫✨",
                "Husband approved! This {topic} is his new favorite 💖",
                "Stop scrolling! This {topic} hack is actually genius 🤯",
                "Why is nobody talking about this {topic} trick? 🧐",
                "My most requested {topic} recipe is finally here! 📢",
                "Level up your {topic} game with this one simple step 📈",
                "Cheap vs Expensive {topic}: Homemade version wins! 🏆",
                "I can’t stop eating this {topic}, it’s too good! 🤤🔥",
                "No oven? No problem! Try this {topic} instead 🚫🔥",
                "Everything you know about {topic} is a lie... try this! ❌",
                "The crunch on this {topic} is absolute perfection 🔊👂",
                "Is this the best {topic} in the world? Let’s find out! 🌍",
                "Master the art of {topic} in under 60 seconds 🎨",
                "Your guests will think you ordered this {topic} from a 5-star hotel 🏨",
                "10-minute {topic} for when you're hungry and lazy 🥱",
                "The most satisfying {topic} ASMR you’ll see today 👂✨",
                "Healthy {topic} that actually tastes like a cheat meal! 🥗",
                "I made {topic} for the first time and I'm shocked! 😲",
                "This {topic} is taking over the internet right now! 🌐",
                "Authentic {topic} just like grandma used to make 👵❤️",
                "One-pot {topic} for people who hate doing dishes 🧼",
                "This is your sign to go make some {topic} right now! ✨",
                "If {topic} was a love language, this would be it 💖🥘",
                "Secret street food style {topic} at home! 🛣️🔥",
                "Don't make {topic} until you watch this video! 🛑",
                "Softest and juiciest {topic} you will ever taste ☁️🥩",
                "Wait for the result... this {topic} is insane! 😱✨",
                "Transform your boring {topic} into something gourmet 💎",
                "My kids literally begged for more {topic}! 👶🍲",
                "Forget the old way, this is the new {topic} trend 📉",
                "How to make {topic} like a professional chef 👨‍🍳🔥",
                "The ultimate comfort food: {topic} Edition ☁️",
                "Is this viral {topic} worth the hype? 🤨",
                "Budget friendly {topic} that tastes like a million bucks 💵",
                "I added a secret spice to this {topic} and WOW 🌶️😲",
                "Craving {topic}? This is the easiest way to make it! 🤤",
                "Making {topic} for the person I love ❤️🍲",
                "3 tips to make your {topic} perfectly every time 💡",
                "Finally sharing my secret {topic} sauce recipe! 🍯"
            ],
            tags: ["foodie", "tiktokfood", "recipe", "cooking", "foodtiktok", "easyrecipe", "delicious", "foodlover", "desifood", "kitchen", "asmrcooking", "streetfood", "homecooking", "lunchideas", "dinnerwithme", "foodtok", "quickrecipes", "pakistanifood", "indianfood", "healthyrecipes", "easycooking", "chefmode", "halalfood", "foodhacks", "viralfood"]
        },
        tech: {
            titles: [
                "Secret {topic} trick that feels illegal to know 🕵️‍♂️📱",
                "The ultimate {topic} hack you have been searching for 🚀",
                "Stop paying for apps! Here is the best {topic} method 🤫",
                "How to unlock hidden features in {topic} easily 🔓",
                "Top 3 {topic} tips that will change your mobile experience 🤯",
                "Never do this mistake while using {topic} ❌",
                "The ultimate guide to mastering {topic} on Android 📲"
            ],
            tags: ["techtok", "android", "techhacks", "mobile", "tech", "apk", "tipsandtricks", "androidtips", "secret", "mod"]
        },
        editing: {
            titles: [
                "How to get this cinematic {topic} effect in seconds 🎬",
                "The secret to perfect {topic} that pro editors hide 🤫",
                "Level up your videos with this {topic} trick ✨",
                "I used AI for {topic} and the results are insane 🤯",
                "Stop making this lighting mistake in your {topic} ❌",
                "The ultimate {topic} prompt for insane visuals 🎨",
                "Step-by-step tutorial for the viral {topic} trend 📈"
            ],
            tags: ["videoediting", "capcut", "editing", "ai", "cinematic", "tutorial", "editingskills", "filmmaking", "creator", "aivideo"]
        },
        pets: {
            titles: [
                "Wait for the end to see the cutest {topic} reaction 🥺❤️",
                "POV: You own the most dramatic {topic} ever 😂",
                "Things my {topic} does that actually make zero sense 🤷‍♂️",
                "The ultimate {topic} care routine you need to see 🛁",
                "Is this the smartest {topic} on TikTok? 🧠🐾",
                "My {topic} trying to understand basic instructions 🐾😂",
                "A day in the life of a very spoiled {topic} ✨"
            ],
            tags: ["petsoftiktok", "funnyanimals", "cutepet", "animallover", "pet", "dogsoftiktok", "catsoftiktok", "adorable", "pets", "furryfriend"]
        },
        general: {
            titles: [
                "Stop scrolling! If you want to know the ultimate truth about {topic}, watch this 🤯",
                "I can't believe I am finally sharing my biggest {topic} secret with you guys... 🤫",
                "This is the only {topic} guide you will ever need. Save this for later! 📌",
                "Everyone is talking about this viral {topic} trend! 🫣",
                "Are you making these huge mistakes with {topic}? Watch this! ❌",
                "POV: You finally figured out how to master {topic} ✨",
                "Do not even think about trying {topic} until you watch this 🛑"
            ],
            tags: ["fyp", "foryou", "viral", "trending", "tiktok", "explore", "foryoupage", "tiktokpakistan", "viralvideo", "trend"]
        }
    };

    const selectedDB = databases[category];

    // 💥 ANTI-REPEAT LOGIC
    // Un titles ko filter karein jo abhi tak use nahi hue
    let availableTitles = selectedDB.titles.filter(t => !usedTitlesHistory.includes(t));
    
    // Agar saary titles ek dafa show ho chuke hain, toh history clear kar dein aur dobara shuru karein
    if (availableTitles.length === 0) {
        usedTitlesHistory = [];
        availableTitles = selectedDB.titles;
    }

    // Bachi hui list mein se random title uthayein
    const randomTemplate = availableTitles[Math.floor(Math.random() * availableTitles.length)];
    
    // Is title ko history mein save kar lein taake agli dafa ignore ho
    usedTitlesHistory.push(randomTemplate);

    const finalTitle = randomTemplate.replace(/\{topic\}/gi, formatTopic);

    // 2. HASHTAGS LOGIC (2 Topic Related + 3 Category Viral)
    let topicTagsSet = new Set();
    const topicSuffixes = ["", "viral", "trend", "hacks", "video"];
    
    // Exact topic tag (e.g., #cheesebiryani)
    topicTagsSet.add("#" + tagTopic);
    
    // Topic tag with random suffix (e.g., #cheesebiryanirecipe)
    while(topicTagsSet.size < 2) {
        let randSuffix = category === "food" ? "recipe" : topicSuffixes[Math.floor(Math.random() * topicSuffixes.length)];
        topicTagsSet.add("#" + tagTopic + randSuffix);
    }

    let viralTagsSet = new Set();
    // 3 Category specific tags uthana (e.g., #foodie, #cooking)
    while(viralTagsSet.size < 3) {
        let randViral = selectedDB.tags[Math.floor(Math.random() * selectedDB.tags.length)];
        if (!topicTagsSet.has("#" + randViral)) {
            viralTagsSet.add("#" + randViral);
        }
    }

    const finalHashtags = Array.from(topicTagsSet).join(" ") + " " + Array.from(viralTagsSet).join(" ");
  
    res.status(200).json({ 
        title: finalTitle, 
        hashtags: finalHashtags 
    });
}
