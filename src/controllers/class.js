const Class = require('../models/Class');
const Group = require('../models/Group');
const successObj = require('../responses/successObj');

exports.getAllClasses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const classes = await Class.find({ group: groupId }, 'name time');
    successObj(res, 200, classes);
    /*
    res.status(200).json({
      status: 'success',
      results: classes.length,
      data: {
        classes,
      },
    });
    */
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createClass = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, time } = req.body;

    if (!name || !time) {
      return res.status(400).json({
        status: 'fail',
        message: '#! Name and time are required for creating a class',
      });
    }

    const createdClass = await Class.create({
      group: groupId,
      name: name,
      time: time,
    });

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { classes: createdClass._id } },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Group not found, Invalid ID',
      });
    }
    successObj(res, 201, { createdClass, updatedGroup });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getClass = async (req, res) => {
  try {
    const { groupId, classId } = req.params;

    const foundClass = await Class.findOne({
      _id: classId,
      group: groupId,
    });

    if (!foundClass) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Class not found, Invalid ID',
      });
    }

    successObj(res, 200, foundClass);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const { groupId, classId } = req.params;
    const { name, time } = req.body;

    const updatedClass = await Class.findOneAndUpdate(
      { _id: classId, group: groupId },
      { name, time },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Class not found, Invalid ID',
      });
    }

    successObj(res, 200, updatedClass);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { groupId, classId } = req.params;

    const deletedClass = await Class.findOneAndDelete(
      {
        _id: classId,
        group: groupId,
      },
      { new: true }
    );

    if (!deletedClass) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Class not found, Invalid ID',
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { classes: classId } },
      { new: true }
    );

    successObj(res, 200, deletedClass);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
