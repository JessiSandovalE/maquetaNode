const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const JobSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  path: {
    type: String,
    require: true
  },
  cron: {
    type: String,
    require: true
  },
  active: {
    type: Boolean,
    require: true
  },
  created_at: {
    type: Date,
    default: moment().format('YYYY-MM-DD')
  }
});

const Cronjob = mongoose.model('cronjob', JobSchema);

module.exports = Cronjob;