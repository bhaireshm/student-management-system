const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  isAdmin,
  readAccessControl,
  createAccessControl,
  updateAccessControl,
  deleteAccessControl,
} = require("../helpers/auth");

const CourseController = require("../controller/cource-controller");

const AUTHENTICATION_MIDDLEWARE = [ensureAuthenticated, isAdmin];

router.get("/getCourse/:deptName", CourseController.getCources);

router.get("/", AUTHENTICATION_MIDDLEWARE, readAccessControl, CourseController.renderDepartments);

router.get(
  "/add",
  AUTHENTICATION_MIDDLEWARE,
  createAccessControl,
  CourseController.renderAddCoursePage
);

router.post("/add", AUTHENTICATION_MIDDLEWARE, createAccessControl, CourseController.addCourse);

router.get("/edit", AUTHENTICATION_MIDDLEWARE, updateAccessControl, CourseController.editCourse);

router.put("/:id", AUTHENTICATION_MIDDLEWARE, updateAccessControl, CourseController.updateById);

router.delete("/:id", AUTHENTICATION_MIDDLEWARE, deleteAccessControl, CourseController.deleteById);

// GET Courses AJAX
router.get("/getCourses", CourseController.renderCources);

module.exports = router;
