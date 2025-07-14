const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const auth = require('../middleware/auth');
const Analysis = require('../models/Analysis');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure Multer to temporarily store uploads in an 'uploads/' directory
const upload = multer({ dest: 'uploads/' });

// Helper function to call the Python AI Service (no changes needed here)
async function runAllAiModels(filePath, originalFilename, fileMimetype) {
  console.log(`➡️ Sending '${originalFilename}' to Flask...`);

  const form = new FormData();
  form.append('media', fs.createReadStream(filePath), {
    filename: originalFilename,
    contentType: fileMimetype,
  });

  try {
    const response = await axios.post(process.env.AI_SERVICE_URL, form, {
      headers: form.getHeaders(),
    });
    console.log("✅ Flask AI responded.");
    return response.data;
  } catch (error) {
    console.error("❌ Error calling Flask:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    throw new Error('AI analysis failed. The service may be down or an error occurred.');
  }
}


// --- GET /history Route (no changes needed here) ---
const mongoose = require('mongoose'); // ✅ ADD THIS AT THE TOP OF YOUR FILE

// --- FIXED: GET /history Route ---
router.get('/history', auth, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ Convert string to ObjectId
        const userHistory = await Analysis.find({ user: userId }).sort({ createdAt: -1 });
        res.json(userHistory);
    } catch (err) {
        console.error("Error fetching analysis history:", err.message);
        res.status(500).send('Server Error');
    }
});



// --- POST /analysis Route with Corrected Logic ---
router.post('/', [auth, upload.single('media')], async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'Please upload a media file.' });
    }

    const tempPath = req.file.path;
    let permanentPath; // Declare here to be accessible in catch block

    try {
        // --- STEP 1: Run analysis on the TEMPORARY file first ---
        const mediaType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
        const aiResults = await runAllAiModels(tempPath, req.file.originalname, req.file.mimetype);

        if (aiResults.error) {
            throw new Error(aiResults.error);
        }

        // --- STEP 2: If analysis succeeds, create a permanent path and move the file ---
        const fileExtension = path.extname(req.file.originalname);
        const uniqueFilename = `${uuidv4()}${fileExtension}`;
        permanentPath = path.join(__dirname, '..', 'public', 'media', uniqueFilename);
        
        fs.renameSync(tempPath, permanentPath);
        console.log(`File moved to permanent location: ${permanentPath}`);

        // --- STEP 3: Create the public URL and save everything to the database ---
        const fileUrl = `http://localhost:5000/media/${uniqueFilename}`;

        console.log("🔍 req.user in /analysis POST route:", req.user);

        const newAnalysis = new Analysis({
            user: req.user.id,
            mediaUrl: fileUrl,
            mediaPublicId: uniqueFilename,
            mediaType: mediaType,
            quickCaption: aiResults.quickCaption,
            fullStory: aiResults.fullStory,
            sceneKeywords: aiResults.sceneKeywords,
            foundObjects: aiResults.foundObjects,
        });

        await newAnalysis.save();
        console.log("Saved new analysis to DB:", newAnalysis._id);
        
        res.status(201).json(newAnalysis);

    } catch (err) {
        console.error("Error during analysis route:", err.message);
        // If an error happened, but we managed to move the file, delete it.
        if (permanentPath && fs.existsSync(permanentPath)) {
            fs.unlinkSync(permanentPath);
        }
        // If the temporary file still exists (because the error happened before the move), delete it.
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        
        if (err.code === 'ECONNREFUSED') {
            return res.status(500).json({ msg: 'Analysis failed: The AI service is not responding.' });
        }
        return res.status(500).json({ msg: err.message || 'An unknown error occurred.' });
    }
    // No 'finally' block needed, as the catch block now handles all cleanup.
});

module.exports = router;