const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '#! Name is required'],
    minlength: 1,
  },
  time: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;
