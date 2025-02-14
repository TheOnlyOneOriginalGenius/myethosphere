const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file });
});
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
