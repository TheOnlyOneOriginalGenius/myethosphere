const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

// ✅ Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

// ✅ Upload Endpoint
app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    console.log(`File uploaded: ${req.file.filename}`);
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

// ✅ Start Server
app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
