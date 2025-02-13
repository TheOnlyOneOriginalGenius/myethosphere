import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/api/dictionary/:word', async (req, res) => {
  const word = req.params.word;
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    res.status(500).json({ error: 'Failed to fetch dictionary data' });
  }
});

app.post('/api/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and target language are required' });
  }

  try {
    const translate = require('@google-cloud/translate').v2;
    const [translation] = await translate.translate(text, targetLanguage);
    res.json({ translatedText: translation });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.get('/api/dictionary/:word', async (req, res) => {  const word = req.params.word;
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICTIONARY_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching dictionary data:', error);
    res.status(500).json({ error: 'Failed to fetch dictionary data' });
  }
});
app.get('/api/thesaurus/:word', async (req, res) => {
  const word = req.params.word;
  try {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${process.env.THESAURUS_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching thesaurus data:', error);
    res.status(500).json({ error: 'Failed to fetch thesaurus data' });
  }
});
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
app.post('/api/ocr', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const tesseract = require('node-tesseract-ocr');
    const { data: { text } } = await tesseract.recognize(filePath, 'eng', { logger: (m) => console.log(m) });
    res.json({ text });
  } catch (error) {
    console.error('Error processing OCR:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
fetch('http://localhost:5000/api/dictionary/example')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
  // eslint-disable-next-line no-undef
  console.log('Response:', response.data);
const DICTIONARY_API_URL = 'https://myethosphere-backend.onrender.com/api/dictionary/'
export { DICTIONARY_API_URL }
navigator.share({ title: 'Agreement', url: '/agreement.pdf' });
function speakText(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language
    utterance.pitch = 1;      // Adjust pitch (0 to 2)
    utterance.rate = 1;       // Adjust rate (0.1 to 10)
    speechSynthesis.speak(utterance);
  } else {
    alert('Your browser does not support speech synthesis.');
  }
}

// Example Usage
document.getElementById('speak-button').addEventListener('click', () => {
  const text = document.getElementById('contract-text').innerText;
  speakText(text);
});
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your-service-account-file.json"
const voices = speechSynthesis.getVoices();
console.log(voices);
