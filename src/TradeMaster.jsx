import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    appName: "TradeMaster",
    appTagline: "0 → 200 Trading Mastery",
    home: "Home", learn: "Learn", practice: "Practice", mentor: "AI Mentor", profile: "Profile",
    welcome: "Welcome Back, Trader! 👋",
    continueLearn: "Continue Learning",
    yourLevel: "Your Level",
    xpPoints: "XP Points",
    streak: "Day Streak 🔥",
    todayChallenge: "Today's Challenge",
    roadmap: "Learning Roadmap",
    beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", pro: "Pro",
    modules: "Modules",
    locked: "Locked 🔒",
    completed: "Completed ✅",
    inProgress: "In Progress",
    quiz: "Take Quiz",
    askMentor: "Ask AI Mentor",
    mentorPlaceholder: "Ask anything about trading...",
    send: "Send",
    mentorGreet: "Namaste! I'm your AI Trading Mentor. Ask me anything about stocks, forex, crypto, or trading strategies! 📊",
    simulator: "Trading Simulator",
    balance: "Demo Balance",
    buy: "BUY",
    sell: "SELL",
    disclaimer: "⚠️ Trading involves real financial risk. This app is for educational purposes only.",
    scamWarning: "🚨 Beware of fake trading signals and guaranteed profit schemes.",
    achievements: "Achievements",
    leaderboard: "Leaderboard",
    community: "Community",
    psychology: "Trading Psychology",
    riskMgmt: "Risk Management",
    dailyQuiz: "Daily Quiz",
    startLesson: "Start Lesson",
    next: "Next",
    prev: "Previous",
    score: "Score",
    correct: "Correct! ✅",
    wrong: "Wrong! ❌",
    language: "Language",
  },
  hi: {
    appName: "TradeMaster",
    appTagline: "0 → 200 ट्रेडिंग महारत",
    home: "होम", learn: "सीखें", practice: "अभ्यास", mentor: "AI गुरु", profile: "प्रोफाइल",
    welcome: "वापस आए, ट्रेडर! 👋",
    continueLearn: "सीखना जारी रखें",
    yourLevel: "आपका लेवल",
    xpPoints: "XP पॉइंट्स",
    streak: "दिन की स्ट्रीक 🔥",
    todayChallenge: "आज की चुनौती",
    roadmap: "सीखने का रोडमैप",
    beginner: "शुरुआती", intermediate: "मध्यम", advanced: "उन्नत", pro: "प्रो",
    modules: "मॉड्यूल",
    locked: "बंद 🔒",
    completed: "पूरा ✅",
    inProgress: "जारी है",
    quiz: "क्विज़ दें",
    askMentor: "AI गुरु से पूछें",
    mentorPlaceholder: "ट्रेडिंग के बारे में कुछ भी पूछें...",
    send: "भेजें",
    mentorGreet: "नमस्ते! मैं आपका AI ट्रेडिंग गुरु हूं। स्टॉक, फॉरेक्स, क्रिप्टो या ट्रेडिंग के बारे में कुछ भी पूछें! 📊",
    simulator: "ट्रेडिंग सिमुलेटर",
    balance: "डेमो बैलेंस",
    buy: "खरीदें",
    sell: "बेचें",
    disclaimer: "⚠️ ट्रेडिंग में वास्तविक वित्तीय जोखिम होता है। यह ऐप केवल शिक्षा के लिए है।",
    scamWarning: "🚨 नकली ट्रेडिंग सिग्नल और गारंटीड प्रॉफिट स्कीम से सावधान रहें।",
    achievements: "उपलब्धियां",
    leaderboard: "लीडरबोर्ड",
    community: "समुदाय",
    psychology: "ट्रेडिंग मनोविज्ञान",
    riskMgmt: "जोखिम प्रबंधन",
    dailyQuiz: "दैनिक क्विज़",
    startLesson: "पाठ शुरू करें",
    next: "अगला",
    prev: "पिछला",
    score: "स्कोर",
    correct: "सही! ✅",
    wrong: "गलत! ❌",
    language: "भाषा",
  }
};

const modules = [
  {
    id: 1, level: 1, category: "beginner", color: "#00d4aa",
    icon: "📈", titleEn: "What is Stock Market?", titleHi: "शेयर बाजार क्या है?",
    descEn: "Learn the basics of how markets work", descHi: "बाजार कैसे काम करता है — बुनियादी बातें",
    completed: true, locked: false,
    contentEn: "A stock market is where buyers and sellers trade company shares. When you buy a share, you own a small part of that company. Stock prices go up when more people want to buy, and go down when more want to sell.",
    contentHi: "शेयर बाजार वह जगह है जहाँ लोग कंपनियों के शेयर खरीदते-बेचते हैं। जब आप शेयर खरीदते हैं, तो आप उस कंपनी के एक छोटे मालिक बन जाते हैं।",
  },
  {
    id: 2, level: 2, category: "beginner", color: "#00d4aa",
    icon: "🕯️", titleEn: "Candlestick Basics", titleHi: "कैंडलस्टिक की बुनियादी बातें",
    descEn: "Read candles like a pro", descHi: "कैंडल्स को प्रो की तरह पढ़ें",
    completed: true, locked: false,
    contentEn: "A candlestick shows 4 prices: Open, High, Low, Close. Green/White candle = price went UP (bullish). Red/Black candle = price went DOWN (bearish). The body shows open-close, wicks show high-low.",
    contentHi: "एक कैंडलस्टिक 4 प्राइस दिखाती है: ओपन, हाई, लो, क्लोज। हरी कैंडल = प्राइस बढ़ा (बुलिश)। लाल कैंडल = प्राइस गिरा (बेयरिश)।",
  },
  {
    id: 3, level: 3, category: "beginner", color: "#00d4aa",
    icon: "📊", titleEn: "Support & Resistance", titleHi: "सपोर्ट और रेजिस्टेंस",
    descEn: "Key price levels every trader must know", descHi: "हर ट्रेडर को पता होना चाहिए ये लेवल",
    completed: false, locked: false,
    contentEn: "Support is a price level where buying is strong — price tends to bounce up. Resistance is where selling is strong — price tends to fall. These are the most important levels on any chart.",
    contentHi: "सपोर्ट वह लेवल है जहाँ खरीदारी मजबूत होती है — प्राइस ऊपर उछलता है। रेजिस्टेंस वह जहाँ बिकवाली मजबूत होती है।",
  },
  {
    id: 4, level: 4, category: "intermediate", color: "#f59e0b",
    icon: "📉", titleEn: "RSI Indicator", titleHi: "RSI इंडिकेटर",
    descEn: "Relative Strength Index explained simply", descHi: "RSI को आसान भाषा में समझें",
    completed: false, locked: false,
    contentEn: "RSI measures how fast price is moving. Scale: 0-100. Above 70 = Overbought (price may fall soon). Below 30 = Oversold (price may rise soon). Best used with other indicators.",
    contentHi: "RSI मापता है कि प्राइस कितनी तेज़ी से मूव कर रहा है। 70 से ऊपर = ओवरबॉट। 30 से नीचे = ओवरसोल्ड।",
  },
  {
    id: 5, level: 5, category: "intermediate", color: "#f59e0b",
    icon: "⚡", titleEn: "MACD Strategy", titleHi: "MACD स्ट्रेटेजी",
    descEn: "Moving Average Convergence Divergence", descHi: "MACD से ट्रेड सिग्नल कैसे लें",
    completed: false, locked: true,
    contentEn: "MACD = Fast EMA - Slow EMA. When MACD crosses above signal line = BUY signal. When MACD crosses below signal line = SELL signal. Use on higher timeframes for reliability.",
    contentHi: "MACD = फास्ट EMA - स्लो EMA। जब MACD सिग्नल लाइन के ऊपर क्रॉस करे = खरीदें।",
  },
  {
    id: 6, level: 6, category: "intermediate", color: "#f59e0b",
    icon: "🎯", titleEn: "Risk Management", titleHi: "जोखिम प्रबंधन",
    descEn: "Protect your capital — most important skill", descHi: "अपना पैसा बचाना सबसे जरूरी",
    completed: false, locked: true,
    contentEn: "Never risk more than 1-2% of your capital on one trade. Always use Stop Loss. Risk:Reward should be minimum 1:2. This is what separates professional traders from gamblers.",
    contentHi: "कभी भी एक ट्रेड में 1-2% से ज़्यादा जोखिम न लें। हमेशा स्टॉप लॉस लगाएं।",
  },
  {
    id: 7, level: 7, category: "advanced", color: "#ec4899",
    icon: "🧠", titleEn: "Smart Money Concepts", titleHi: "स्मार्ट मनी कॉन्सेप्ट",
    descEn: "Think like big institutions", descHi: "बड़े संस्थानों की तरह सोचें",
    completed: false, locked: true,
    contentEn: "Smart Money = Big banks, institutions. They manipulate price to trap retail traders. Learn to identify: Order Blocks, Fair Value Gaps, Liquidity Hunts, Break of Structure.",
    contentHi: "स्मार्ट मनी = बड़े बैंक और संस्थान। वे छोटे ट्रेडर्स को फंसाते हैं। ऑर्डर ब्लॉक और लिक्विडिटी हंट पहचानना सीखें।",
  },
  {
    id: 8, level: 8, category: "pro", color: "#8b5cf6",
    icon: "👑", titleEn: "Trading Psychology", titleHi: "ट्रेडिंग मनोविज्ञान",
    descEn: "Master your emotions, master trading", descHi: "भावनाओं पर काबू = ट्रेडिंग में सफलता",
    completed: false, locked: true,
    contentEn: "95% of trading success is psychology. Control: FOMO (Fear of Missing Out), Revenge Trading, Overtrading, Greed. Keep a trading journal. Stick to your plan no matter what.",
    contentHi: "95% सफलता मनोविज्ञान से आती है। FOMO, बदले की भावना से ट्रेडिंग, लालच — इन पर काबू पाएं।",
  },
];

const quizQuestions = [
  {
    qEn: "What does a Green/Bullish candle indicate?",
    qHi: "हरी/बुलिश कैंडल क्या दर्शाती है?",
    options: ["Price went UP", "Price went DOWN", "No change", "Market closed"],
    optHi: ["प्राइस बढ़ा", "प्राइस गिरा", "कोई बदलाव नहीं", "बाजार बंद"],
    answer: 0
  },
  {
    qEn: "RSI above 70 means?",
    qHi: "RSI 70 से ऊपर का मतलब?",
    options: ["Oversold", "Overbought", "Neutral", "Strong trend"],
    optHi: ["ओवरसोल्ड", "ओवरबॉट", "न्यूट्रल", "मजबूत ट्रेंड"],
    answer: 1
  },
  {
    qEn: "What is Stop Loss?",
    qHi: "स्टॉप लॉस क्या है?",
    options: ["A profit target", "A price level to exit losing trade", "A type of indicator", "A candlestick pattern"],
    optHi: ["प्रॉफिट टार्गेट", "घाटे वाली ट्रेड से निकलने का लेवल", "एक इंडिकेटर", "कैंडलस्टिक पैटर्न"],
    answer: 1
  },
  {
    qEn: "What is Support level?",
    qHi: "सपोर्ट लेवल क्या है?",
    options: ["Where price always falls", "Where buying is strong", "Where selling is strong", "Top of the chart"],
    optHi: ["जहाँ प्राइस हमेशा गिरता है", "जहाँ खरीदारी मजबूत है", "जहाँ बिकवाली मजबूत है", "चार्ट का शीर्ष"],
    answer: 1
  },
];

const candlePatterns = [
  { name: "Doji", nameHi: "डोजी", type: "Neutral", color: "#888", bodyH: 2, descEn: "Open ≈ Close. Market indecision. Watch for reversal.", descHi: "ओपन ≈ क्लोज। बाजार अनिश्चित है।" },
  { name: "Hammer", nameHi: "हैमर", type: "Bullish", color: "#00d4aa", bodyH: 15, descEn: "Long lower wick. Buyers took control. Bullish reversal.", descHi: "लंबी नीचे की विक। खरीदारों का नियंत्रण।" },
  { name: "Shooting Star", nameHi: "शूटिंग स्टार", type: "Bearish", color: "#f43f5e", bodyH: 15, descEn: "Long upper wick. Sellers took over. Bearish reversal.", descHi: "लंबी ऊपर की विक। बेचने वालों का कब्जा।" },
  { name: "Engulfing", nameHi: "एंगल्फिंग", type: "Bullish", color: "#00d4aa", bodyH: 40, descEn: "Big green candle covers previous red. Strong buy signal.", descHi: "बड़ी हरी कैंडल। मजबूत खरीदारी संकेत।" },
];

const leaderboardData = [
  { rank: 1, name: "Arjun S.", xp: 4200, level: 42, avatar: "🏆" },
  { rank: 2, name: "Priya M.", xp: 3800, level: 38, avatar: "🥈" },
  { rank: 3, name: "Rahul K.", xp: 3500, level: 35, avatar: "🥉" },
  { rank: 4, name: "You", xp: 1250, level: 13, avatar: "⭐", isUser: true },
  { rank: 5, name: "Sneha R.", xp: 1100, level: 11, avatar: "👤" },
];

const communityPosts = [
  { user: "Arjun", avatar: "🧑", time: "2h ago", timeHi: "2 घंटे पहले", textEn: "Finally understood RSI divergence! This app is amazing 🔥", textHi: "आखिरकार RSI डाइवर्जेंस समझ आया! यह ऐप कमाल है 🔥", likes: 24 },
  { user: "Priya", avatar: "👩", time: "5h ago", timeHi: "5 घंटे पहले", textEn: "Nifty looking bearish on daily chart. Support at 22,000 👀", textHi: "निफ्टी डेली चार्ट पर बेयरिश दिख रहा है। 22,000 पर सपोर्ट 👀", likes: 18 },
  { user: "Vikash", avatar: "🧔", time: "1d ago", timeHi: "1 दिन पहले", textEn: "Just completed Module 3! Support & Resistance is so useful", textHi: "मॉड्यूल 3 पूरा किया! सपोर्ट & रेजिस्टेंस बहुत उपयोगी है", likes: 31 },
];

// Simple candlestick chart component
function CandleChart({ lang }) {
  const candles = [
    { o: 60, h: 75, l: 55, c: 70, bull: true },
    { o: 70, h: 80, l: 65, c: 68, bull: false },
    { o: 68, h: 72, l: 60, c: 71, bull: true },
    { o: 71, h: 85, l: 68, c: 82, bull: true },
    { o: 82, h: 88, l: 74, c: 76, bull: false },
    { o: 76, h: 79, l: 65, c: 67, bull: false },
    { o: 67, h: 73, l: 62, c: 72, bull: true },
  ];
  const maxH = 90, minL = 50, range = maxH - minL;
  const h = 80;
  return (
    <svg width="100%" height={h + 20} viewBox={`0 0 ${candles.length * 30} ${h + 20}`} style={{ display: "block" }}>
      {candles.map((c, i) => {
        const x = i * 30 + 10;
        const top = ((maxH - c.h) / range) * h;
        const bot = ((maxH - c.l) / range) * h;
        const oY = ((maxH - c.o) / range) * h;
        const cY = ((maxH - c.c) / range) * h;
        const bodyTop = Math.min(oY, cY);
        const bodyH = Math.max(Math.abs(oY - cY), 2);
        return (
          <g key={i}>
            <line x1={x} y1={top} x2={x} y2={bot} stroke={c.bull ? "#00d4aa" : "#f43f5e"} strokeWidth={1} />
            <rect x={x - 5} y={bodyTop} width={10} height={bodyH} fill={c.bull ? "#00d4aa" : "#f43f5e"} rx={1} />
          </g>
        );
      })}
    </svg>
  );
}

function AnimatedCandle({ pattern }) {
  const isBull = pattern.type === "Bullish";
  const isNeutral = pattern.type === "Neutral";
  return (
    <svg width="40" height="80" viewBox="0 0 40 80">
      {/* Upper wick */}
      <line x1="20" y1="5" x2="20" y2={pattern.name === "Shooting Star" ? 25 : pattern.name === "Hammer" ? 28 : 20}
        stroke={pattern.color} strokeWidth="2" />
      {/* Body */}
      <rect x="10" y={pattern.name === "Shooting Star" ? 25 : 28}
        width="20" height={pattern.bodyH}
        fill={pattern.color} rx="2" />
      {/* Lower wick */}
      <line x1="20" y1={pattern.name === "Hammer" ? 43 : 43 + pattern.bodyH - 15}
        x2="20" y2={pattern.name === "Hammer" ? 72 : 55}
        stroke={pattern.color} strokeWidth="2" />
    </svg>
  );
}

export default function TradeMaster() {
  const [lang, setLang] = useState("hi");
  const [activeTab, setActiveTab] = useState("home");
  const [userXP, setUserXP] = useState(1250);
  const [userLevel, setUserLevel] = useState(13);
  const [streak, setStreak] = useState(7);
  const [selectedModule, setSelectedModule] = useState(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [mentorMessages, setMentorMessages] = useState([]);
  const [mentorInput, setMentorInput] = useState("");
  const [mentorLoading, setMentorLoading] = useState(false);
  const [demoBalance, setDemoBalance] = useState(100000);
  const [demoPrice, setDemoPrice] = useState(245.60);
  const [demoQty, setDemoQty] = useState(1);
  const [tradeLog, setTradeLog] = useState([]);
  const [communityInput, setCommunityInput] = useState("");
  const [posts, setPosts] = useState(communityPosts);
  const [likedPosts, setLikedPosts] = useState({});
  const chatEndRef = useRef(null);
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoPrice(p => parseFloat((p + (Math.random() - 0.48) * 2).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === "mentor" && mentorMessages.length === 0) {
      setMentorMessages([{ role: "assistant", text: t.mentorGreet }]);
    }
  }, [activeTab, lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mentorMessages]);

  const sendMentor = async () => {
    if (!mentorInput.trim()) return;
    const userMsg = mentorInput.trim();
    setMentorInput("");
    setMentorMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setMentorLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are TradeMaster AI Mentor — a friendly, expert trading educator inside a mobile learning app. The user language preference is: ${lang === "hi" ? "Hindi" : "English"}. 
          - Respond in ${lang === "hi" ? "Hindi (Devanagari script)" : "English"} 
          - Keep responses SHORT (3-5 sentences max), educational, and beginner-friendly
          - Explain trading concepts simply with examples
          - Always mention risk warnings when relevant
          - NEVER give specific buy/sell recommendations for real money
          - Focus on education only
          - Use emojis sparingly for clarity`,
          messages: [{ role: "user", content: userMsg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || (lang === "hi" ? "माफ करें, कुछ गड़बड़ हुई।" : "Sorry, something went wrong.");
      setMentorMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMentorMessages(prev => [...prev, { role: "assistant", text: lang === "hi" ? "नेटवर्क एरर। फिर कोशिश करें।" : "Network error. Please try again." }]);
    }
    setMentorLoading(false);
  };

  const handleTrade = (type) => {
    const cost = demoPrice * demoQty;
    if (type === "buy" && cost > demoBalance) return;
    const pnl = type === "sell" ? (Math.random() - 0.4) * 500 : 0;
    setDemoBalance(b => type === "buy" ? b - cost : b + cost + pnl);
    const newLog = { type, price: demoPrice, qty: demoQty, time: new Date().toLocaleTimeString() };
    setTradeLog(prev => [newLog, ...prev.slice(0, 4)]);
    if (type === "buy") setUserXP(x => x + 10);
  };

  const handleQuizAnswer = (idx) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(idx);
    const correct = idx === quizQuestions[quizIndex].answer;
    if (correct) { setQuizScore(s => s + 1); setUserXP(x => x + 25); }
    setTimeout(() => {
      if (quizIndex + 1 < quizQuestions.length) {
        setQuizIndex(i => i + 1);
        setQuizAnswer(null);
      } else { setQuizDone(true); }
    }, 1000);
  };

  const resetQuiz = () => { setQuizIndex(0); setQuizScore(0); setQuizAnswer(null); setQuizDone(false); };

  const progress = ((userLevel - 1) % 10) * 10;
  const categoryColor = { beginner: "#00d4aa", intermediate: "#f59e0b", advanced: "#ec4899", pro: "#8b5cf6" };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Noto Sans Devanagari', sans-serif",
      maxWidth: 430, margin: "0 auto", position: "relative", overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Orbitron:wght@700;900&display=swap');
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 4px; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { background: #111827; border: 1px solid #1e2d4a; border-radius: 16px; }
        .glow { box-shadow: 0 0 20px rgba(0,212,170,0.15); }
        .btn-primary { background: linear-gradient(135deg, #00d4aa, #0097ff); border: none; color: #000;
          font-weight: 700; border-radius: 12px; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-primary:hover { transform: scale(1.03); }
        .tab-btn { background: none; border: none; color: #64748b; cursor: pointer; font-size: 11px;
          display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 12px; transition: color 0.2s; }
        .tab-btn.active { color: #00d4aa; }
        .pill { border-radius: 999px; padding: 2px 10px; font-size: 11px; font-weight: 600; }
        .module-card { background: #111827; border: 1px solid #1e2d4a; border-radius: 14px; padding: 14px;
          cursor: pointer; transition: all 0.2s; margin-bottom: 10px; }
        .module-card:hover { border-color: #00d4aa44; transform: translateX(3px); }
        .msg-bubble { padding: 10px 14px; border-radius: 16px; font-size: 13px; line-height: 1.5; max-width: 85%; }
        .candle-pattern { background: #0f172a; border: 1px solid #1e2d4a; border-radius: 14px; padding: 14px;
          text-align: center; cursor: pointer; transition: all 0.2s; }
        .candle-pattern:hover { border-color: #00d4aa44; }
        input, textarea { outline: none; }
        .trade-btn { border: none; cursor: pointer; border-radius: 12px; font-weight: 700; font-size: 15px;
          padding: 14px; transition: all 0.2s; }
        .trade-btn:active { transform: scale(0.97); }
        .achievement { background: #0f172a; border: 1px solid #1e2d4a; border-radius: 12px; padding: 12px;
          text-align: center; }
        .stat-box { background: #0f172a; border: 1px solid #1e2d4a; border-radius: 12px; padding: 14px; text-align: center; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        .slide-up { animation: slideUp 0.3s ease; }
        @keyframes pricePop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .price-pop { animation: pricePop 0.3s ease; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,#0d1524 0%,#0a0e1a 100%)", padding: "16px 20px 12px", borderBottom: "1px solid #1e2d4a", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 18, fontWeight: 900, background: "linear-gradient(135deg,#00d4aa,#0097ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.appName}
            </div>
            <div style={{ fontSize: 10, color: "#64748b", letterSpacing: 1 }}>{t.appTagline}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setLang(l => l === "hi" ? "en" : "hi")}
              style={{ background: "#1e2d4a", border: "none", color: "#00d4aa", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {lang === "hi" ? "EN" : "हिं"}
            </button>
            <div style={{ background: "#1e2d4a", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#f59e0b", fontWeight: 700 }}>
              🔥 {streak}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 0 80px", minHeight: "calc(100vh - 120px)", overflowY: "auto" }}>

        {/* HOME TAB */}
        {activeTab === "home" && (
          <div style={{ padding: "16px" }} className="slide-up">
            {/* Welcome */}
            <div style={{ background: "linear-gradient(135deg,#0d2040,#0a1628)", border: "1px solid #1e3a5f", borderRadius: 18, padding: 18, marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", right: -20, top: -20, fontSize: 80, opacity: 0.07 }}>📈</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t.welcome}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>{lang === "hi" ? "आज भी कुछ नया सीखें!" : "Keep learning, keep growing!"}</div>
              {/* Level & XP */}
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {[
                  { label: t.yourLevel, value: userLevel, icon: "⚡" },
                  { label: t.xpPoints, value: userXP.toLocaleString(), icon: "💎" },
                  { label: t.streak, value: streak, icon: "" },
                ].map((s, i) => (
                  <div key={i} style={{ flex: 1, background: "#0a0e1a55", border: "1px solid #1e2d4a", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#00d4aa" }}>{s.icon}{s.value}</div>
                    <div style={{ fontSize: 9, color: "#64748b", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              {/* XP Progress */}
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 5 }}>Level {userLevel} → {userLevel + 1}</div>
              <div style={{ background: "#0a0e1a", borderRadius: 999, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#00d4aa,#0097ff)", borderRadius: 999, transition: "width 0.5s" }} />
              </div>
            </div>

            {/* Continue Learning */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#94a3b8" }}>{t.continueLearn}</div>
              {modules.filter(m => !m.completed && !m.locked).slice(0, 2).map(m => (
                <div key={m.id} className="module-card" onClick={() => { setSelectedModule(m); setActiveTab("learn"); }}
                  style={{ borderLeft: `3px solid ${m.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 28 }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{lang === "hi" ? m.titleHi : m.titleEn}</div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{lang === "hi" ? m.descHi : m.descEn}</div>
                      <div style={{ marginTop: 6 }}>
                        <span className="pill" style={{ background: `${m.color}22`, color: m.color }}>
                          {lang === "hi" ? "जारी है" : "In Progress"}
                        </span>
                      </div>
                    </div>
                    <div style={{ color: "#00d4aa", fontSize: 18 }}>›</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Challenge */}
            <div style={{ background: "linear-gradient(135deg,#1a0a2e,#0f1a2e)", border: "1px solid #3b1d8a44", borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>🎯 {t.todayChallenge}</div>
                <span className="pill" style={{ background: "#f59e0b22", color: "#f59e0b" }}>+50 XP</span>
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>
                {lang === "hi" ? "4 सवालों का जवाब दें और XP कमाएं!" : "Answer 4 questions and earn XP!"}
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "11px" }}
                onClick={() => { setActiveTab("practice"); setQuizActive(true); resetQuiz(); }}>
                {t.dailyQuiz} →
              </button>
            </div>

            {/* Safety Disclaimer */}
            <div style={{ background: "#1a0a0a", border: "1px solid #7f1d1d44", borderRadius: 12, padding: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#fca5a5", lineHeight: 1.6 }}>{t.disclaimer}</div>
              <div style={{ fontSize: 11, color: "#fca5a5", lineHeight: 1.6, marginTop: 6 }}>{t.scamWarning}</div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { icon: "📚", label: lang === "hi" ? "पूरे मॉड्यूल" : "Completed", value: "2/8" },
                { icon: "🧠", label: lang === "hi" ? "क्विज़ स्कोर" : "Quiz Score", value: "87%" },
                { icon: "💰", label: lang === "hi" ? "डेमो P&L" : "Demo P&L", value: "+₹2,400" },
                { icon: "🎖️", label: lang === "hi" ? "बैज" : "Badges", value: "5" },
              ].map((s, i) => (
                <div key={i} className="stat-box">
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#00d4aa" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEARN TAB */}
        {activeTab === "learn" && !selectedModule && (
          <div style={{ padding: "16px" }} className="slide-up">
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📚 {t.roadmap}</div>

            {/* Category filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {["beginner", "intermediate", "advanced", "pro"].map(cat => (
                <button key={cat} style={{
                  background: `${categoryColor[cat]}22`, border: `1px solid ${categoryColor[cat]}44`,
                  color: categoryColor[cat], borderRadius: 999, padding: "5px 14px", fontSize: 11,
                  fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
                }}>
                  {t[cat]}
                </button>
              ))}
            </div>

            {/* Modules list */}
            {modules.map(m => (
              <div key={m.id} className="module-card"
                style={{ borderLeft: `3px solid ${m.locked ? "#374151" : m.color}`, opacity: m.locked ? 0.6 : 1 }}
                onClick={() => !m.locked && setSelectedModule(m)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 26, filter: m.locked ? "grayscale(1)" : "none" }}>{m.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 9, fontFamily: "Orbitron", color: m.locked ? "#374151" : m.color, fontWeight: 700 }}>
                        LVL {m.level}
                      </span>
                      <span className="pill" style={{
                        background: m.completed ? "#00d4aa22" : m.locked ? "#37415122" : "#f59e0b22",
                        color: m.completed ? "#00d4aa" : m.locked ? "#64748b" : "#f59e0b"
                      }}>
                        {m.completed ? t.completed : m.locked ? t.locked : t.inProgress}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: m.locked ? "#64748b" : "#e2e8f0" }}>
                      {lang === "hi" ? m.titleHi : m.titleEn}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                      {lang === "hi" ? m.descHi : m.descEn}
                    </div>
                  </div>
                  {!m.locked && <div style={{ color: "#00d4aa" }}>›</div>}
                </div>
              </div>
            ))}

            {/* Candlestick patterns */}
            <div style={{ fontSize: 14, fontWeight: 700, margin: "20px 0 12px" }}>
              🕯️ {lang === "hi" ? "कैंडलस्टिक पैटर्न" : "Candlestick Patterns"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {candlePatterns.map((cp, i) => (
                <div key={i} className="candle-pattern">
                  <AnimatedCandle pattern={cp} />
                  <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6 }}>{lang === "hi" ? cp.nameHi : cp.name}</div>
                  <div style={{ fontSize: 10, color: cp.color, fontWeight: 600, marginTop: 2 }}>{cp.type}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginTop: 4, lineHeight: 1.4 }}>
                    {lang === "hi" ? cp.descHi : cp.descEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE DETAIL */}
        {activeTab === "learn" && selectedModule && (
          <div style={{ padding: "16px" }} className="slide-up">
            <button onClick={() => setSelectedModule(null)}
              style={{ background: "#1e2d4a", border: "none", color: "#94a3b8", borderRadius: 8, padding: "6px 14px", marginBottom: 16, cursor: "pointer", fontSize: 12 }}>
              ← {lang === "hi" ? "वापस" : "Back"}
            </button>
            <div style={{ background: `${selectedModule.color}11`, border: `1px solid ${selectedModule.color}33`, borderRadius: 18, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>{selectedModule.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
                {lang === "hi" ? selectedModule.titleHi : selectedModule.titleEn}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                {lang === "hi" ? selectedModule.contentHi : selectedModule.contentEn}
              </div>
            </div>
            {/* Chart preview */}
            <div style={{ background: "#0f172a", border: "1px solid #1e2d4a", borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>
                📊 {lang === "hi" ? "चार्ट उदाहरण" : "Chart Example"}
              </div>
              <CandleChart lang={lang} />
            </div>
            <button className="btn-primary" style={{ width: "100%", padding: 14, marginBottom: 10 }}
              onClick={() => { setActiveTab("practice"); setQuizActive(true); resetQuiz(); }}>
              🎯 {t.quiz}
            </button>
            <button onClick={() => { setSelectedModule(null); setUserXP(x => x + 50); }}
              style={{ width: "100%", padding: 14, background: "none", border: "1px solid #1e2d4a", color: "#94a3b8", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
              ✅ {lang === "hi" ? "पूरा किया (+50 XP)" : "Mark Complete (+50 XP)"}
            </button>
          </div>
        )}

        {/* PRACTICE TAB */}
        {activeTab === "practice" && (
          <div style={{ padding: "16px" }} className="slide-up">
            {/* Quiz Section */}
            {quizActive && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>🎯 {t.dailyQuiz}</div>
                  <span className="pill" style={{ background: "#00d4aa22", color: "#00d4aa" }}>
                    {quizIndex + 1}/{quizQuestions.length}
                  </span>
                </div>
                {!quizDone ? (
                  <div className="card" style={{ padding: 18 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, lineHeight: 1.5 }}>
                      {lang === "hi" ? quizQuestions[quizIndex].qHi : quizQuestions[quizIndex].qEn}
                    </div>
                    {(lang === "hi" ? quizQuestions[quizIndex].optHi : quizQuestions[quizIndex].options).map((opt, i) => (
                      <button key={i} onClick={() => handleQuizAnswer(i)}
                        style={{
                          width: "100%", textAlign: "left", padding: "12px 16px", marginBottom: 8,
                          borderRadius: 12, cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                          border: quizAnswer === null ? "1px solid #1e2d4a" :
                            i === quizQuestions[quizIndex].answer ? "1px solid #00d4aa" :
                              quizAnswer === i ? "1px solid #f43f5e" : "1px solid #1e2d4a",
                          background: quizAnswer === null ? "#0f172a" :
                            i === quizQuestions[quizIndex].answer ? "#00d4aa22" :
                              quizAnswer === i ? "#f43f5e22" : "#0f172a",
                          color: quizAnswer === null ? "#e2e8f0" :
                            i === quizQuestions[quizIndex].answer ? "#00d4aa" :
                              quizAnswer === i ? "#f43f5e" : "#64748b",
                        }}>
                        {opt}
                      </button>
                    ))}
                    {quizAnswer !== null && (
                      <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginTop: 8, color: quizAnswer === quizQuestions[quizIndex].answer ? "#00d4aa" : "#f43f5e" }}>
                        {quizAnswer === quizQuestions[quizIndex].answer ? t.correct : t.wrong}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="card" style={{ padding: 24, textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
                      {lang === "hi" ? "क्विज़ पूरी!" : "Quiz Complete!"}
                    </div>
                    <div style={{ fontSize: 28, color: "#00d4aa", fontWeight: 900 }}>{quizScore}/{quizQuestions.length}</div>
                    <div style={{ color: "#64748b", fontSize: 13, marginTop: 6, marginBottom: 16 }}>
                      {lang === "hi" ? `+${quizScore * 25} XP कमाया!` : `+${quizScore * 25} XP Earned!`}
                    </div>
                    <button className="btn-primary" style={{ padding: "11px 24px" }} onClick={resetQuiz}>
                      {lang === "hi" ? "फिर खेलें" : "Play Again"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Trading Simulator */}
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💹 {t.simulator}</div>
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>NIFTY 50</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#00d4aa", fontFamily: "Orbitron" }}>
                    ₹{demoPrice.toFixed(2)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{t.balance}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b" }}>₹{demoBalance.toLocaleString()}</div>
                </div>
              </div>
              <CandleChart lang={lang} />
              <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                <input type="number" value={demoQty} min={1} max={100}
                  onChange={e => setDemoQty(parseInt(e.target.value) || 1)}
                  style={{ width: 60, background: "#0f172a", border: "1px solid #1e2d4a", color: "#e2e8f0", borderRadius: 8, padding: "8px", fontSize: 14, textAlign: "center" }} />
                <button className="trade-btn" onClick={() => handleTrade("buy")}
                  style={{ flex: 1, background: "linear-gradient(135deg,#00d4aa,#059669)", color: "#000" }}>
                  {t.buy} ↑
                </button>
                <button className="trade-btn" onClick={() => handleTrade("sell")}
                  style={{ flex: 1, background: "linear-gradient(135deg,#f43f5e,#dc2626)", color: "#fff" }}>
                  {t.sell} ↓
                </button>
              </div>
            </div>

            {/* Trade Log */}
            {tradeLog.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>
                  📋 {lang === "hi" ? "ट्रेड लॉग" : "Trade Log"}
                </div>
                {tradeLog.map((t2, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#0f172a", borderRadius: 8, marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: t2.type === "buy" ? "#00d4aa" : "#f43f5e", fontWeight: 700 }}>
                      {t2.type === "buy" ? "▲ BUY" : "▼ SELL"}
                    </span>
                    <span>₹{t2.price} × {t2.qty}</span>
                    <span style={{ color: "#64748b" }}>{t2.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI MENTOR TAB */}
        {activeTab === "mentor" && (
          <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }} className="slide-up">
            <div style={{ padding: "12px 16px 8px", borderBottom: "1px solid #1e2d4a" }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>🤖 {t.askMentor}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{lang === "hi" ? "AI द्वारा संचालित • केवल शिक्षा हेतु" : "Powered by AI • Educational Only"}</div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
              {mentorMessages.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                  {msg.role === "assistant" && (
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#0097ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginRight: 8, flexShrink: 0 }}>🤖</div>
                  )}
                  <div className="msg-bubble" style={{
                    background: msg.role === "user" ? "linear-gradient(135deg,#00d4aa,#0097ff)" : "#111827",
                    color: msg.role === "user" ? "#000" : "#e2e8f0",
                    border: msg.role === "assistant" ? "1px solid #1e2d4a" : "none",
                    borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {mentorLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#0097ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                  <span style={{ animation: "pulse 1s infinite" }}>
                    {lang === "hi" ? "सोच रहा हूं..." : "Thinking..."}
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid #1e2d4a", display: "flex", gap: 8 }}>
              <input value={mentorInput} onChange={e => setMentorInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMentor()}
                placeholder={t.mentorPlaceholder}
                style={{ flex: 1, background: "#111827", border: "1px solid #1e2d4a", color: "#e2e8f0", borderRadius: 12, padding: "12px 14px", fontSize: 13 }} />
              <button className="btn-primary" onClick={sendMentor}
                style={{ padding: "12px 16px", flexShrink: 0 }}>
                {t.send}
              </button>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={{ padding: "16px" }} className="slide-up">
            {/* Profile Header */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#0097ff)", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                👤
              </div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{lang === "hi" ? "ट्रेडर" : "Trader"}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>
                {lang === "hi" ? "शुरुआती ट्रेडर • लेवल" : "Beginner Trader • Level"} {userLevel}
              </div>
            </div>

            {/* Achievements */}
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏅 {t.achievements}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { icon: "🔥", label: lang === "hi" ? "7 दिन स्ट्रीक" : "7 Day Streak", earned: true },
                { icon: "📚", label: lang === "hi" ? "पहला पाठ" : "First Lesson", earned: true },
                { icon: "🎯", label: lang === "hi" ? "क्विज़ मास्टर" : "Quiz Master", earned: true },
                { icon: "💰", label: lang === "hi" ? "पहली ट्रेड" : "First Trade", earned: true },
                { icon: "🧠", label: lang === "hi" ? "RSI एक्सपर्ट" : "RSI Expert", earned: false },
                { icon: "👑", label: lang === "hi" ? "प्रो ट्रेडर" : "Pro Trader", earned: false },
              ].map((a, i) => (
                <div key={i} className="achievement" style={{ opacity: a.earned ? 1 : 0.4 }}>
                  <div style={{ fontSize: 24 }}>{a.icon}</div>
                  <div style={{ fontSize: 9, color: "#64748b", marginTop: 4, lineHeight: 1.3 }}>{a.label}</div>
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🏆 {t.leaderboard}</div>
            <div className="card" style={{ padding: 14, marginBottom: 20 }}>
              {leaderboardData.map((u, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: i < leaderboardData.length - 1 ? "1px solid #1e2d4a" : "none",
                  background: u.isUser ? "#00d4aa11" : "none",
                  borderRadius: u.isUser ? 8 : 0, padding: u.isUser ? "10px 8px" : "10px 0",
                }}>
                  <div style={{ fontSize: 20, width: 28, textAlign: "center" }}>{u.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: u.isUser ? 700 : 500, color: u.isUser ? "#00d4aa" : "#e2e8f0" }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>Level {u.level}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>{u.xp.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>XP</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Community */}
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>💬 {t.community}</div>
            {posts.map((p, i) => (
              <div key={i} className="card" style={{ padding: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ fontSize: 24 }}>{p.avatar}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{p.user}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{lang === "hi" ? p.timeHi : p.time}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5, marginBottom: 10 }}>
                  {lang === "hi" ? p.textHi : p.textEn}
                </div>
                <button onClick={() => {
                  if (!likedPosts[i]) {
                    setLikedPosts(l => ({ ...l, [i]: true }));
                    setPosts(ps => ps.map((pp, pi) => pi === i ? { ...pp, likes: pp.likes + 1 } : pp));
                  }
                }}
                  style={{ background: "none", border: "none", color: likedPosts[i] ? "#f43f5e" : "#64748b", cursor: "pointer", fontSize: 12 }}>
                  {likedPosts[i] ? "❤️" : "🤍"} {p.likes}
                </button>
              </div>
            ))}
            {/* Post input */}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={communityInput} onChange={e => setCommunityInput(e.target.value)}
                placeholder={lang === "hi" ? "कुछ शेयर करें..." : "Share something..."}
                style={{ flex: 1, background: "#111827", border: "1px solid #1e2d4a", color: "#e2e8f0", borderRadius: 12, padding: "10px 14px", fontSize: 13 }} />
              <button className="btn-primary" style={{ padding: "10px 16px" }}
                onClick={() => {
                  if (!communityInput.trim()) return;
                  setPosts(ps => [{ user: lang === "hi" ? "आप" : "You", avatar: "🧑", time: "Just now", timeHi: "अभी", textEn: communityInput, textHi: communityInput, likes: 0 }, ...ps]);
                  setCommunityInput("");
                }}>
                {lang === "hi" ? "पोस्ट" : "Post"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "#0d1117",
        borderTop: "1px solid #1e2d4a", display: "flex", justifyContent: "space-around",
        padding: "8px 0 12px", zIndex: 100
      }}>
        {[
          { id: "home", icon: "🏠", label: t.home },
          { id: "learn", icon: "📚", label: t.learn },
          { id: "practice", icon: "🎯", label: t.practice },
          { id: "mentor", icon: "🤖", label: t.mentor },
          { id: "profile", icon: "👤", label: t.profile },
        ].map(tab => (
          <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => { setActiveTab(tab.id); setSelectedModule(null); }}>
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
