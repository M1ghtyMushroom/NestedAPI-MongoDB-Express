const Group = require('../models/Group');
const successObj = require('../responses/successObj');

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    successObj(res, 200, groups);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const createdGroup = await Group.create({ name });
    successObj(res, 201, createdGroup);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Group not found, Invalid ID',
      });
    }

    successObj(res, 200, group);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 'fail',
        message: '#! Name is required for updating the group',
      });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Group not found, Invalid ID',
      });
    }
    successObj(res, 200, updatedGroup);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({
        status: 'fail',
        message: '#! Group not found, Invalid ID',
      });
    }

    successObj(res, 200, deletedGroup);
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
