const Group = require("../models/Group");
const resObj = require("../responses/resObj");

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return resObj.success(res, 200, groups);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const createdGroup = await Group.create({ name });
    return resObj.success(res, 201, createdGroup);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.getGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);

    if (!group) {
      return resObj.fail(res, 404, "#! Group not found, Invalid ID");
    }

    return resObj.success(res, 200, group);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name } = req.body;

    if (!name) {
      return resObj.fail(
        res,
        400,
        "#! Name is required for updating the group"
      );
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return resObj.fail(res, 404, "#! Group not found, Invalid ID");
    }
    return resObj.success(res, 200, updatedGroup);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return resObj.fail(res, 404, "#! Group not found, Invalid ID");
    }

    return resObj.success(res, 200, deletedGroup);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};
