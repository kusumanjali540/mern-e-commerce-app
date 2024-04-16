const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: String,
  body: String,
  media: [String],
});

const ContentModel = mongoose.model('Content', contentSchema);

module.exports = ContentModel;
