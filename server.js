const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname)); // Serve static files from the root

const dataFilePath = path.join(__dirname, 'js', 'data.js');

// API Route: Force download a file (used for resumes)
app.get('/api/download-resume', (req, res) => {
    const fileUrl = req.query.url;
    if (!fileUrl) return res.status(400).send('No file URL provided');

    // Safety check: only allow files from assets folder
    if (!fileUrl.startsWith('assets/')) {
        return res.status(403).send('Access denied');
    }

    const filePath = path.join(__dirname, fileUrl);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

// Custom middleware to disable caching for data.js
app.use('/js/data.js', (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'assets');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Keep original filename or sanitize it
        cb(null, file.originalname.replace(/\s+/g, '-'));
    }
});
const upload = multer({ storage: storage });

// API Route: Upload a file
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Return the relative path
    res.json({ success: true, filePath: `assets/${req.file.filename}` });
});

// API Route: List all files in assets directory
app.get('/api/files', (req, res) => {
    const uploadDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(uploadDir)) {
        return res.json([]);
    }
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to list files' });
        }
        res.json(files.map(f => ({ name: f, path: `assets/${f}` })));
    });
});

// API Route: Delete a file
app.delete('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'assets', filename);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true, message: 'File deleted' });
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// API Route: Get the current portfolio data
app.get('/api/data', (req, res) => {
    try {
        const fileContent = fs.readFileSync(dataFilePath, 'utf-8');

        // Strip the variable declaration 'const portfolioData = ' to grab the raw object matching {}
        const startIndex = fileContent.indexOf('{');
        const endIndex = fileContent.lastIndexOf('}');

        if (startIndex === -1 || endIndex === -1) {
            return res.status(500).json({ error: 'Could not parse data.js format.' });
        }

        const jsonString = fileContent.substring(startIndex, endIndex + 1);

        // Try parsing json directly, or if there's trailing non-strict json quotes, optionally evaluate it
        try {
            const parsed = eval("(" + jsonString + ")");
            res.json(parsed);
        } catch (e) {
            throw e;
        }

    } catch (err) {
        console.error('Error reading data file:', err);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// API Route: Save changes back to data.js
app.post('/api/saveData', (req, res) => {
    try {
        const newData = req.body;

        // Reconstruct the JS file content
        const jsFileContent = `// data.js - The Pseudo-CMS for Portfolio Data\n\nconst portfolioData = ${JSON.stringify(newData, null, 4)};\n`;

        // Write it over the existing file
        fs.writeFileSync(dataFilePath, jsFileContent, 'utf-8');

        res.json({ success: true, message: 'Data successfully saved!' });
    } catch (err) {
        console.error('Error writing data file:', err);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Serve the CMS admin dashboard
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'cms.html'));
});

// Optional error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`CMS Server running at http://localhost:${PORT}`);
    console.log(`Admin Dashboard available at http://localhost:${PORT}/admin`);
});
