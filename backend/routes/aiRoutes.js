// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateAIResponse } = require('../services/openaiClient');

// POST /api/ai/generate-ideas or general prompt
router.post('/generate-ideas', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      });
    }

    const aiResponse = await generateAIResponse(prompt, 8192);

    res.json({
      success: true,
      data: aiResponse
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'AI generation failed on server'
    });
  }
});

module.exports = router;
