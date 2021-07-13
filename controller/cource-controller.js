const moment = require("moment");
const { Department } = require("../models/department");
const { validateCourse } = require("../models/course");
const CourseService = require("../service/cource-service");

exports.getCources = async (req, res) => {
  // Routing flow validations
  // ...
  const course = await CourseService.getCources(req.query.deptName);

  if (course) res.json(course);
  else res.status(400).json(error.details[0].message);
};

exports.renderDepartments = async (req, res) => {
  // Routing flow validations
  // ...
  const perPage = 8;
  const page = req.query.page || 1;
  const skip = perPage * page - perPage;

  const dept = await Department.find();
  const course = await Course.find().skip(skip).limit(perPage);

  if (dept && course) {
    const pages = await Course.find().countDocuments();

    res.render("courses/index", {
      title: "Courses",
      breadcrumbs: true,
      search_bar: true,
      dept: dept,
      course: course,
      current: parseInt(page),
      pages: Math.ceil(pages / perPage),
    });
  } else if (dept) {
    res.render("courses/index", {
      title: "Courses",
      breadcrumbs: true,
      search_bar: true,
      dept: dept,
    });
  } else {
    req.flash("error_msg", "No department found");
    res.redirect("/");
  }
};

exports.renderAddCoursePage = async (req, res) => {
  const dept = await Department.find();

  if (dept) {
    res.render("courses/add", {
      title: "Add New Course",
      breadcrumbs: true,
      dept: dept,
    });
  } else {
    req.flash("error_msg", "No courses found");
    res.redirect("/");
  }
};

exports.addCourse = async (req, res) => {
  // Routing flow validations
  // ...
  let errors = [];
  const dept = await Department.find();

  const { error } = validateCourse(req.body);

  if (error) {
    errors.push({
      text: error.details[0].message,
    });
    res.render("courses/add", {
      title: "Add New Course",
      breadcrumbs: true,
      errors: errors,
      body: req.body,
      dept: dept,
    });
  } else {
    let startDate = moment(req.body.startDate).format("MMMM Do YYYY, h:mm:ss a");
    let endDate = moment(req.body.endDate).format("MMMM Do YYYY, h:mm:ss a");

    try {
      const result = await CourseService.create({
        ...req.body,
        endDate: endDate,
        startDate: startDate,
      });

      if (result) {
        req.flash("success_msg", "Course saved successfully.");
        res.redirect("/courses");
      }
    } catch (ex) {
      for (field in ex.errors) {
        errors.push({
          text: ex.errors[field].message,
        });
      }
      res.render("courses/add", {
        title: "Add New Course",
        breadcrumbs: true,
        errors: errors,
        body: req.body,
        dept: dept,
      });
    }
  }
};

exports.editCourse = async (req, res) => {
  // Routing flow validations
  // ...
  const course = await CourseService.findById(req.params);
  const dept = await Department.find();

  if (course) {
    res.render("courses/edit", {
      title: "Edit Course",
      breadcrumbs: true,
      dept: dept,
      course: course,
    });
  } else {
    req.flash("error_msg", "Error updating documents.");
    res.redirect("/courses", course);
  }
};

exports.updateById = async (req, res) => {
  // Routing flow validations
  // ...
  let startDate = moment(req.body.startDate).format("LL");
  let endDate = moment(req.body.endDate).format("LL");

  const course = await CourseService.update({
    id: req.params.id,
    endDate: endDate,
    startDate: startDate,
  });

  if (course) {
    req.flash("success_msg", "Course Updated Successfully.");
    res.redirect("/courses");
  } else {
    req.flash("error_msg", "Error updating documents.");
    res.redirect("/courses", course);
  }
};

exports.deleteById = async (req, res) => {
  // Routing flow validations
  // ...
  const result = await CourseService.delete(req.params.id);

  if (result) {
    req.flash("success_msg", "Record deleted successfully.");
    res.send("/courses");
  } else {
    res.status(400).send(result);
  }
};

exports.renderCources = (req, res) => {
  // Routing flow validations
  // ...
  res.render("courses/getCourses", {
    title: "Get Courses By Dept",
    breadcrumbs: true,
  });
};
