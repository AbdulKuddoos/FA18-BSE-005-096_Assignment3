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
  let faculty = new Faculty();

  faculty.name = req.body.name;
  faculty.gender = req.body.gender;
  faculty.email = req.body.email;
  faculty.address.street_address = req.body.street_address;
  faculty.address.city = req.body.city;
  faculty.address.country = req.body.country;
  faculty.courseCode = req.body.courseCode;
  faculty.phoneNo.push(req.body.phoneNo1);
  faculty.phoneNo.push(req.body.phoneNo2);
  faculty.phoneNo.push(req.body.phoneNo3);

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
  let faculty = await Faculty.findById(req.params.id);

  faculty.name = req.body.name;
  faculty.gender = req.body.gender;
  faculty.email = req.body.email;
  faculty.address.street_address = req.body.street_address;
  faculty.address.city = req.body.city;
  faculty.address.country = req.body.country;
  faculty.courseCode = req.body.courseCode;
  faculty.phoneNo[0] = req.body.phoneNo1;
  faculty.phoneNo[1] = req.body.phoneNo2;
  faculty.phoneNo[2] = req.body.phoneNo3;
  console.log(faculty);
  await faculty.save();
  res.redirect("/api/faculty");
});

module.exports = router;
