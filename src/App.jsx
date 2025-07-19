import { useState } from "react";


export default function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const analyzeText = () => {
    const lower = text.toLowerCase();

    // Basic tone detection
    if (lower.includes("hate") || lower.includes("angry")) {
      setTone("Negative");
    } else if (lower.includes("love") || lower.includes("happy")) {
      setTone("Positive");
    } else {
      setTone("Neutral");
    }

    // Suggestions logic
    const newSuggestions = [];
    if (text.length < 20) {
      newSuggestions.push("Try expanding your thoughts.");
    }
    if (!text.includes("because") && text.length > 20) {
      newSuggestions.push("Add reasoning using 'because' or 'since'.");
    }
    if (text.split(" ").length > 50) {
      newSuggestions.push("Consider breaking into smaller paragraphs.");
    }

    setSuggestions(newSuggestions);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">📝 AI Writing Assistant</h1>

      <textarea
        className="w-full max-w-xl p-4 border rounded shadow bg-white dark:bg-gray-800 dark:text-white"
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
      />

      <button
        onClick={analyzeText}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Analyze
      </button>

      {tone && (
        <div className="mt-4">
          <p className="text-lg">
            <strong>Detected Tone:</strong>{" "}
            <span className="text-brandBlue">{tone}</span>
          </p>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-2">Suggestions:</h2>
          <ul className="list-disc ml-6 space-y-1">
            {suggestions.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
