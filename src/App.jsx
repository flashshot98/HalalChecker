import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [textQuery, setTextQuery] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setResult("Checking file... (simulated AI check)");
    setTimeout(() => {
      setResult("File check complete. (Result placeholder)");
    }, 2000);
  };

  const handleTextQuery = () => {
    if (textQuery.trim() === '') return;
    setResult(`Searching for "${textQuery}"...`);
    setTimeout(() => {
      setResult(`Here is the result for "${textQuery}".`);
    }, 2000);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial' }}>
      <h1>Halal Checker</h1>
      
      <input 
        type="text" 
        placeholder="Ask about food..." 
        value={textQuery} 
        onChange={(e) => setTextQuery(e.target.value)} 
      />
      <button onClick={handleTextQuery}>Ask</button>

      <br /><br />

      <input type="file" onChange={handleFileChange} />
      <p>{file ? `Selected file: ${file.name}` : 'No file selected'}</p>

      <br /><br />

      <button onClick={() => setResult("Using Web to Find Ingredients...")}>Use Web</button>
      <button onClick={() => setResult("Using AI to Find Ingredients...")}>Use AI</button>

      <br /><br />

      <h2>Result:</h2>
      <p>{result}</p>

      <br /><br />
      <p style={{ fontSize: "12px", color: "gray" }}>Disclaimer: This website may be wrong.</p>
    </div>
  );
}

export default App;
