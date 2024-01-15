const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '#! Name is required'],
    minlength: 1,
  },
  contact: {
    phone: {
      type: String,
      trim: true,
    },
    parent_phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
