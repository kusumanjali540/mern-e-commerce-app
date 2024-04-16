const ContentModel = require('../models/Content');

const contentResolver = {
  getContent: async ({ id }) => {
    return await ContentModel.findById(id);
  },
  createContent: async ({ title, body, media }) => {
    const content = new ContentModel({ title, body, media });
    return await content.save();
  },
};

module.exports = contentResolver;
