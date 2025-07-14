// scenesolver-backend/models/Analysis.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnalysisSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    // Using new, generic field names
    mediaUrl: {
        type: String,
        required: true,
    },
    mediaPublicId: {
        type: String,
        required: true,
    },
    // The critical field that was missing
    mediaType: {
        type: String,
        required: true,
        enum: ['image', 'video'], // Only allows 'image' or 'video'
    },
    quickCaption: {
        type: String,
        default: 'No caption available.',
    },
    fullStory: {
        type: String,
        default: 'A detailed story could not be generated for this scene.',
    },
    sceneKeywords: [{
        keyword: String,
        match: Number,
    }],
    foundObjects: [{
        object: String,
        match: Number,
        box: [Number],
    }],
}, { timestamps: true });

module.exports = mongoose.model('Analysis', AnalysisSchema);