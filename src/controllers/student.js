const Student = require("../models/Student");
const Class = require("../models/Class");
const resObj = require("../responses/resObj");

exports.getAllStudents = async (req, res) => {
  try {
    const { classId } = req.params;

    const students = await Student.find({ class: classId });

    return resObj.success(res, 200, students);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { name, contact } = req.body;
    const { classId } = req.params;

    const createdStudent = await Student.create({
      name,
      contact,
      class: classId,
    });

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { students: createdStudent._id } },
      { new: true }
    );

    return resObj.success(res, 201, createdStudent);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.getStudent = async (req, res) => {
  try {
    const { classId, studentId } = req.params;

    const foundStudent = await Student.findOne({
      _id: studentId,
      class: classId,
    });

    if (!foundStudent) {
      return res.status(404).json({
        status: "fail",
        message: "#! Student not found, Invalid ID",
      });
    }

    return resObj.success(res, 200, foundStudent);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { classId, studentId } = req.params;
    const { name, contact } = req.body;

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: studentId, class: classId },
      { name, contact },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        status: "fail",
        message: "#! Student not found, Invalid ID",
      });
    }

    return resObj.success(res, 200, updatedStudent);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { classId, studentId } = req.params;

    const deletedStudent = await Student.findOneAndDelete({
      _id: studentId,
      class: classId,
    });

    if (!deletedStudent) {
      return resObj.fail(res, 404, "#! Student not found, Invalid ID");
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $pull: { students: studentId } },
      { new: true }
    );

    return resObj.success(res, 200, deletedStudent);
  } catch (err) {
    return resObj.error(res, 500, err);
  }
};
