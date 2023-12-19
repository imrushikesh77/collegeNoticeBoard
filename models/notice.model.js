const mongoose = require("mongoose");

function getIndianDate() {
  let date = new Date();
  date = date - date.getTimezoneOffset() * 60000;
  return date;
}

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: "Title",
  },
  description: {
    type: String,
    trim: true,
    default: "Description",

  },
  noticeDate: {
    type: Date,
    default: getIndianDate(),
  },
  forProgram: {
    type: [String],
  },
  forDepartment: {
    type: [String],
  },
  forRole:{
    type: [String],
  },
  forYear: {
    type: [String],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notice_id: {
    type: String,
  },
  download: {
    type: String,
    trim: true,
    default: "/",
  },
  noticeDeleteLink: {
    type: String,
    default: "/",
  },
},{timestamps: true});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
