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

// The absolute path to our data JS file
const dataFilePath = path.join(__dirname, 'js', 'data.js');

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
