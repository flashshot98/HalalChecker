import { useState } from "react";
import { motion } from "framer-motion";

export default function HalalChecker() {
  const [file, setFile] = useState(null);
  const [textQuestion, setTextQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [useWeb, setUseWeb] = useState(null);

  const haramKeywords = ["alcohol", "pork", "gambling", "riba", "interest", "blood"];
  const meatKeywords = ["chicken", "beef", "lamb", "mutton", "veal", "duck", "goat", "turkey", "meat"];
  const halalIndicator = "halal";

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const checkHalal = async () => {
    if (!file) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result.toLowerCase();
      const containsHaram = haramKeywords.some((word) => text.includes(word));
      const containsMeat = meatKeywords.some((word) => text.includes(word));
      const containsHalalSign = text.includes(halalIndicator);

      if (containsHaram) {
        setResult("The content may not be halal.");
      } else if (containsMeat && containsHalalSign) {
        setResult("The content contains meat and appears to be halal.");
      } else if (containsMeat) {
        setResult("The content contains meat and may be halal. Please verify.");
      } else {
        setResult("The content appears to be halal.");
      }
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const searchIngredients = () => {
    if (!ingredientSearch) return;
    if (useWeb) {
      window.open(`https://www.google.com/search?q=is+${ingredientSearch}+halal`);
    } else {
      setResult(`AI is analyzing whether '${ingredientSearch}' is halal...`);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="text-3xl font-bold mb-6 text-blue-600" whileHover={{ scale: 1.1 }}>
        Halal Checker
      </motion.h1>
      
      <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" whileHover={{ scale: 1.02 }}>
        <input type="file" onChange={handleFileUpload} className="mb-4 w-full border p-2 rounded" />
        <button 
          onClick={checkHalal} 
          disabled={!file || loading} 
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Checking..." : "Check File"}
        </button>
      </motion.div>

      <motion.input 
        type="text" 
        placeholder="Ask a halal question..." 
        value={textQuestion} 
        onChange={(e) => setTextQuestion(e.target.value)} 
        className="mt-4 p-2 border w-full max-w-md rounded" 
        whileFocus={{ scale: 1.05 }}
      />
      <motion.button 
        className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition" 
        onClick={() => setResult(`AI is analyzing your question: '${textQuestion}'`)}
        whileHover={{ scale: 1.05 }}
      >
        Ask AI
      </motion.button>

      <motion.input 
        type="text" 
        placeholder="Enter ingredient name" 
        value={ingredientSearch} 
        onChange={(e) => setIngredientSearch(e.target.value)} 
        className="mt-4 p-2 border w-full max-w-md rounded" 
        whileFocus={{ scale: 1.05 }}
      />
      <motion.div className="flex gap-4 mt-2">
        <label className="flex items-center gap-2">
          <input type="radio" name="search" onChange={() => setUseWeb(true)} /> Use Web
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="search" onChange={() => setUseWeb(false)} /> Use AI
        </label>
      </motion.div>
      <motion.button 
        className="mt-2 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition" 
        onClick={searchIngredients}
        whileHover={{ scale: 1.05 }}
      >
        Use Web or AI to Find Out Ingredients?
      </motion.button>

      {result && <motion.p className="mt-4 text-lg" animate={{ opacity: 1, y: [10, 0] }}>{result}</motion.p>}
      <p className="mt-4 text-sm text-gray-500">*This website may not always be accurate. Please verify information independently.</p>
    </motion.div>
  );
}
