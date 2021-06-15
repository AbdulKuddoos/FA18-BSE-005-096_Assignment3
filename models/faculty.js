var mongoose = require("mongoose");

var facultySchema = new mongoose.Schema(
  {
    name: String,
    gender: String,
    email: String,
    address: {
      street_address: String,
      city: String,
      country: String,
    },
    courseCode: String,
    phoneNo: [String],
  },
  { collection: "Faculty" }
);

var Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;
