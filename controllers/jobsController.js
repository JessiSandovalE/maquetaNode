let Cronjob = require('../models/jobsModel');
let fs = require('fs');
let axios = require('axios');


let jobsController = {};


jobsController.allJobs = () => {
  return new Promise(async (resolve, reject) => {
    try {
      Cronjob.find((err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    } catch (error) {
      reject(error);
    }
  });
}

jobsController.findIdJob = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Cronjob.findById(id);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

jobsController.createJob = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Cronjob.create(body);
      resolve(data);

    } catch (error) {
      reject(error);
    }
  });
}

jobsController.editJob = (id, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await Cronjob.findOneAndUpdate({
        _id: id
      }, body, {
        new: true,
        upsert: true
      });
      let created = await Cronjob.findOne({
        _id: id
      });

      resolve(created)

    } catch (error) {
      reject(error);
    }
  });
}

jobsController.deleteJob = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      Cronjob.findOneAndRemove({
        _id: id
      }).then((data) => {
        if (data) {
          resolve({
            message: `Registro eliminado - id: ${id}`
          });
        } else {
          reject({
            "success": false,
            data: "no such detail exist"
          });
        }
      }).catch((err) => {
        reject(err);
      })
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = jobsController;
