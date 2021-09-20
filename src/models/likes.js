const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    likeable: {
      type: String,
      required: true,
      // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
      // will look at the `onModel` property to find the right model.
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      required: true,
      enums: ['Tweet', 'Comment'],
    },
  },
  { timestamps: true }
);

/* https://mongoosejs.com/docs/populate.html#dynamic-ref */
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
