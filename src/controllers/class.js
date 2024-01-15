const Class = require("../models/Class");
const Group = require("../models/Group");
const resObj = require("../responses/resObj");

exports.getAllClasses = async (req, res) => {
  try {
    const { groupId } = req.params;

    const classes = await Class.find({ group: groupId }, "name time");
    return resObj.success(res, 200, classes);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.createClass = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, time } = req.body;

    if (!name || !time) {
      return resObj.fail(res, 400, "#! Name & time are required for creating a class");
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
      return resObj.fail(res, 404, "#! Group not found, Invalid ID");
    }
    return resObj.success(res, 201, { createdClass, updatedGroup });
  } catch (err) {
    return resObj.error(res, 500, err);
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
      return resObj.fail(res, 404, "#! Class not found, Invalid ID");
    }

    return resObj.success(res, 200, foundClass);
  } catch (err) {
    return resObj.error(res, 500, err);
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
      return resObj.fail(res, 404, "#! Class not found, Invalid ID");
    }

    return resObj.success(res, 200, updatedClass);
  } catch (err) {
    return resObj.error(res, 500, err);
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
    );

    if (!deletedClass) {
      return resObj.fail(res, 404, "#! Class not found, Invalid ID");
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { classes: classId } },
      { new: true }
    );

    return resObj.success(res, 200, deletedClass);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};
