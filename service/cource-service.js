const { Course } = require("../models/course");

exports.getCources = async (depName) => {
  try {
    // generic validation check

    return await Course.find({
      departmentName: depName,
    }).select({
      courseName: 1,
      _id: 0,
    });
  } catch (error) {
    return error;
  }
};

exports.findById = async (data) => {
  try {
    // generic validation check

    return await Course.findOne({
      _id: data.id,
    });
  } catch (error) {
    return error;
  }
};

exports.createCourse = async (data) => {
  try {
    // generic validation check

    const course = new Course({
      departmentName: data.departmentName,
      courseName: data.courseName,
      courseDuration: data.courseDuration,
      startDate: startDate,
      endDate: endDate,
      courseFee: data.courseFee,
      intake: data.intake,
    });
    return await course.save();
  } catch (error) {
    return error;
  }
};

exports.update = async (data) => {
  try {
    // generic validation check
    return await Course.update(
      {
        _id: data.id,
      },
      {
        $set: {
          departmentName: data.departmentName,
          courseName: data.courseName,
          courseDuration: data.courseDuration,
          startDate: startDate,
          endDate: endDate,
          courseFee: data.courseFee,
          intake: data.intake,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

exports.delete = async (id) => {
  try {
    // generic validation check

    return await Course.remove({ _id: id });
  } catch (error) {
    return error;
  }
};
