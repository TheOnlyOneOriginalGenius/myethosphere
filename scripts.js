/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
document.getElementById('voice-btn').addEventListener('click', async () => {
    const text = document.getElementById('contract-text').value;
    if (!text) {
      alert('Please enter text!');
      return;
    }
  
    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const { file } = await response.json();
      const audio = new Audio(file);
      audio.play();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate speech.');
    }
  });
  document.getElementById('upload-btn').addEventListener('click', async () => {
    const fileInput = document.getElementById('file-input').files[0];
    if (!fileInput) {
      alert('Please select a file!');
      return;
    }
  
    const formData = new FormData();
    formData.append('http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf', fileInput);
  
    try {
      const response = await fetch('http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed.');
    }
  });
  document.getElementById('translate-btn').addEventListener('click', async () => {
    const text = document.getElementById('translate-text').value;
    const language = document.getElementById('language-select').value;
  
    if (!text) {
      alert('Please enter text to translate!');
      return;
    }
  
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage: language }),
      });
      const { translatedText } = await response.json();
      document.getElementById('translated-output').innerText = translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      alert('Translation failed.');
    }
  });
// Dictionary API Integration
document.getElementById('dictionary-btn').addEventListener('click', async () => {
  const word = document.getElementById('word-input').value;
  if (!word) {
    alert('Please enter a word!');
    return;
  }

  try {
    const response = await fetch(`/api/dictionary/${word}`);
    const data = await response.json();
    const definitions = data[0]?.shortdef || ['No definitions found.'];
    document.getElementById('dictionary-output').innerHTML = `<p><strong>Definitions:</strong> ${definitions.join(', ')}</p>`;
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    alert('Failed to fetch definitions.');
  }
});

// Thesaurus API Integration
document.getElementById('thesaurus-btn').addEventListener('click', async () => {
  const word = document.getElementById('word-input').value;
  if (!word) {
    alert('Please enter a word!');
    return;
  }

  try {
    const response = await fetch(`/api/thesaurus/${word}`);
    const data = await response.json();
    const synonyms = data[0]?.meta?.syns?.flat() || ['No synonyms found.'];
    document.getElementById('thesaurus-output').innerHTML = `<p><strong>Synonyms:</strong> ${synonyms.join(', ')}</p>`;
  } catch (error) {
    console.error('Error fetching thesaurus data:', error);
    alert('Failed to fetch synonyms.');
  }
});

// OCR API Integration
document.getElementById('ocr-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('ocr-file').files[0];
  if (!fileInput) {
    alert('Please select an image!');
    return;
  }

  const formData = new FormData();
  formData.append('image', fileInput);

  try {
    const response = await fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    document.getElementById('ocr-output').innerText = data.text || 'No text found.';
  } catch (error) {
    console.error('Error processing OCR:', error);
    alert('Failed to process image.');
  }
});
const cors = require('cors');
const express = require('express');
const expressApp = express();
app.use(cors());
document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const fileInput = document.getElementById('file-upload');
  if (!fileInput.files.length) {
    alert('Please upload a document.');
    return;
  }

  // Simulate OCR API call
  const extractedText = 'Sample extracted text from OCR API.';
  document.getElementById('extracted-text').innerText = extractedText;

  // Simulate synonym suggestions using Datamuse API
  document.getElementById('extracted-text').addEventListener('click', async (e) => {
    const selectedWord = 'transform'; // Replace with selected word logic
    const response = await fetch(`https://api.datamuse.com/words?ml=${selectedWord}`);
    const synonyms = await response.json();

    const synonymList = document.getElementById('synonym-list');
    synonymList.innerHTML = synonyms.slice(0, 10).map((word) => `<li>${word.word}</li>`).join('');
  });
});// Express is already required earlier in the file
// const express = require('express');
const multer = require('multer');
const tesseract = require('tesseract.js');

const UPLOAD = multer({ dest: 'uploads/' });

expressApp.post('/api/upload', UPLOAD.single('file'), async (req, res) => {
  const text = await tesseract.recognize(req.file.path);
  res.json({ text });
});
app.get('/api/synonyms', async (req, res) => {
  const word = req.query.word;
  const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await response.json();
  res.json(data);
});
const readContractAloud = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; // Set language
  speechSynthesis.speak(speech);
};// Example usage to resolve the eslint warning
document.getElementById('read-button').addEventListener('click', () => {
  const contractText = document.getElementById('contract-text').value;
  readContract(contractText);
});const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: 'yourKey', secretAccessKey: 'yourSecret' });
const s3 = new AWS.S3();

const uploadFileToS3 = (file) => {
  const params = { Bucket: 'your-bucket-name', Key: file.originalname, Body: file.buffer };
  return s3.upload(params).promise();
};

// Example usage to resolve the eslint warning
document.getElementById('upload-button').addEventListener('click', async () => {
  const fileInput = document.getElementById('file-input');
  if (fileInput.files.length > 0) {
    try {
      const result = await uploadFileToS3(fileInput.files[0]);
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
});// tesseract is already declared earlier in the file
// const tesseract = require('tesseract.js');
const processOCR = (filePath) => tesseract.recognize(filePath).then((data) => data.text);
const mongoose = require('mongoose');
const PartnerSchema = new mongoose.Schema({ name: String, industry: String, email: String });
const Partner = mongoose.model('Partner', PartnerSchema);
const changeFontSize = (size) => {
  document.body.style.fontSize = `${size}px`;
};

// Example usage to resolve the eslint warning
document.getElementById('font-size-button').addEventListener('click', () => {
  changeFontSize(16); // Change to desired font size
});
document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  const fileInput = document.getElementById('file-upload');
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');

  if (!fileInput.files[0]) {
    alert('Please choose a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    // Send file to the server
    const response = await fetch('http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');

    let receivedLength = 0;
    let chunks = [];

    // Stream data and update progress bar
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      const progress = Math.round((receivedLength / contentLength) * 100);
      progressBar.value = progress;
      progressPercentage.textContent = `${progress}%`;
    }

    const blob = new Blob(chunks);
    const convertedText = await blob.text();

    // Open the converted contract in a new window
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head><title>Converted Contract</title></head>
        <body>
          <h1>Converted Contract</h1>
          <p>${convertedText}</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during the file upload.');
  }
});
document.getElementById('upload-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form submission from refreshing the page

  const fileInput = document.getElementById('file-upload');
  const progressBar = document.getElementById('progress-bar');
  const progressPercentage = document.getElementById('progress-percentage');

  if (!fileInput.files[0]) {
    alert('Please choose a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    // Fetch request to backend
    const response = await fetch('http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const result = await response.json();

    // Store the converted contract in sessionStorage
    sessionStorage.setItem('convertedContract', result.simplifiedText);

    // Redirect to FinalizeDocument.html
    window.location.href = 'http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf';
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
const fs = require('fs');
const tesseractjs = require('tesseract.js');
const { Configuration, OpenAIApi } = require('openai');

app = express();
const PORT = 3000;
// Multer setup
 upload = multer({ dest: 'uploads/' });

// OpenAI setup
const openai = new OpenAIApi(
  new Configuration({ apiKey: 'YOUR_OPENAI_API_KEY' })
);

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    // OCR for image files
    let extractedText;
    if (req.file.mimetype.startsWith('image/')) {
      const result = await tesseract.recognize(filePath);
      extractedText = result.data.text;
    } else {
      extractedText = fs.readFileSync(filePath, 'utf-8');
    }

    // Simplify contract using OpenAI
    const aiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Simplify this legal contract:\n\n${extractedText}`,
      max_tokens: 1500,
    });

    const simplifiedText = aiResponse.data.choices[0].text.trim();

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    // Return simplified contract
    res.json({ simplifiedText });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 express = require("express");
 multer = require("multer");
// fs is already declared elsewhere in the file
// If you need to use fs, remove this line and use the existing declaration
const path = require("path");

const app = express();
app.use(cors()); // Allow frontend requests
app.use(express.static("uploads")); // Serve uploaded files

// Multer configuration for storing PDFs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Upload Contract File
app.post("http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf", upload.single("http://localhost:3000/uploads/SharkTank-Short-Application-v2.pdf"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "file uploaded" });
    }

    // Return file path to frontend
    res.json({ filePath: req.file.filename });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
const numParticles = 100;
const container = document.body;

for (let i = 0; i < numParticles; i++) {
    let particle = document.createElement("div");
    particle.className = "particle";
    container.appendChild(particle);
}

function animateParticles() {
    document.querySelectorAll(".particle").forEach(particle => {
        const size = Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 2}s`;
    });
}

animateParticles();
setInterval(animateParticles, 5000);
const text = "Revolutionizing Contract Management";
let i = 0;
const speed = 100;
function typeWriter() {
    if (i < text.length) {
        document.getElementById("animated-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
window.onload = typeWriter;
document.addEventListener('DOMContentLoaded', () => {
  // Simulate loading contract details
  document.getElementById('contract-summary').innerText = `
    Contract: Simplified Rental Agreement
    Total Cost: $199.00
  `;

  // Handle Credit Card Payment
  document.getElementById('card-payment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('payment-status').innerText = 'Processing Credit Card Payment...';
    // TODO: Integrate Stripe or other payment API
  });

  // Handle PayPal Payment
  document.getElementById('paypal-button').addEventListener('click', () => {
    document.getElementById('payment-status').innerText = 'Redirecting to PayPal...';
    // TODO: Integrate PayPal SDK
  });

  // Handle Cryptocurrency Payment
  document.getElementById('crypto-button').addEventListener('click', () => {
    document.getElementById('payment-status').innerText = 'Processing Cryptocurrency Payment...';
    // TODO: Integrate Coinbase Commerce or other crypto payment API
  });

  // Handle ACH Payment
  document.getElementById('ach-button').addEventListener('click', () => {
    document.getElementById('payment-status').innerText = 'Processing ACH Transfer...';
    // TODO: Implement ACH payment logic
  });

  // Handle Wire Transfer Payment
  document.getElementById('wire-button').addEventListener('click', () => {
    document.getElementById('payment-status').innerText = 'Processing Wire Transfer...';
    // TODO: Implement Wire Transfer payment logic
  });
});
app.post('/api/preview', async (req, res) => {
  try {
    const { documentId } = req.body;

    // Fetch the original and simplified document (mock example)
    const originalText = 'Original legal text here...';
    const simplifiedText = 'Simplified version of the legal text here...';

    res.json({ originalText, simplifiedText });
  } catch (error) {
    console.error('Error fetching document preview:', error);
    res.status(500).json({ error: 'Failed to fetch document preview' });
  }
});
// Handle Upload Button
document.getElementById('file-upload').addEventListener('change', async (event) => {
  const file = event.target.files[0];

  if (file) {
    // Display upload status
    document.getElementById('upload-status').innerText = `Processing: ${file.name}`;

    try {
      // Simulate API Call for OCR and Legal Simplification
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // Display the converted contract
        document.getElementById('contract-output').innerText = data.simplifiedText;
        document.getElementById('upload-status').innerText = 'Document converted successfully!';
      } else {
        throw new Error('Failed to process document.');
      }
    } catch (error) {
      console.error(error);
      document.getElementById('upload-status').innerText = 'Error: Unable to process document.';
    }
  } else {
    document.getElementById('upload-status').innerText = 'No file selected.';
  }
});
const readContract = (text) => {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US'; // Set language
  speechSynthesis.speak(speech);
};
document.getElementById("upload-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const fileInput = document.getElementById("file-upload").files[0];
  if (!fileInput) {
    alert("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", fileInput);

  try {
    const response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      sessionStorage.setItem("uploadedFile", `/uploads/${result.fileName}`);
      alert("Upload successful!");
      window.location.href = "FinalizeDocument.html"; 
    } else {
      alert("Upload failed: " + result.error);
    }
  } catch (error) {
    alert("Error uploading file: " + error.message);
  }
});

