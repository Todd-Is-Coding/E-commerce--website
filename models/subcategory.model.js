const mongoose = require('mongoose');

const subcategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, 'subcategory must be unique'],
      minlength: [2, 'too short subcategory name'],
      maxlength: [32, 'too long subcategory name']
    },
    slug: {
      type: String,
      lowercase: true
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Subcategory must be belonged to a parent category']
    }
  },
  { timestamps: true }
);

const subcategoryModel = mongoose.model('Subcategory', subcategorySchema);

module.exports = subcategoryModel;
