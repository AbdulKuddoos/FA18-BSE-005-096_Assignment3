var express = require("express");
var router = express.Router();
var Faculty = require("../../models/faculty");

router.get("/", async (req, res) => {
  let faculty = await Faculty.find();
  res.render("./faculty/index", { title: "Faculty", faculty });
});

router.get("/add", async (req, res) => {
  res.render("./faculty/add");
});

router.post("/add", async (req, res) => {
  console.log(req.body);
  let faculty = new Faculty(req.body);
  await faculty.save();
  res.redirect("/api/faculty");
});

router.get("/delete/:id", async function (req, res) {
  let product = await Faculty.findByIdAndDelete(req.params.id);
  res.redirect("/api/faculty");
});

router.get("/edit/:id", async function (req, res) {
  let member = await Faculty.findById(req.params.id);
  res.render("./faculty/edit", { member });
});

router.post("/edit/:id", async (req, res) => {
  let member = await Faculty.findById(req.params.id);
  member.name = req.body.name;
  member.gender = req.body.gender;
  member.email = req.body.email;
  member.address = req.body.address;
  member.courseCode = req.body.courseCode;
  member.phoneNo = req.body.phoneNo;
  await member.save();
  res.redirect("/api/faculty");
});

module.exports = router;
