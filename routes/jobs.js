var express = require("express");
var router = express.Router();
let cron = require('node-cron');

let jobsController = require('../controllers/jobsController');
let cronE = require('../controllers/cron');

const {
  check,
  validationResult
} = require("express-validator");


let responses = require('../helpers/responses');

router

  .get('/cronjobs', async (req, res, next) => {
    try {
      let data = await jobsController.allJobs();
      res.json(await responses.ok(data));
    } catch (error) {
      next(error);
    }
  })

  .get('/cronjob/:id', async (req, res, next) => {
    try {
      let data = await jobsController.findIdJob(req.params.id);
      if (!data) res.status(200).json({
        message: "cronjobs not found"
      });
      res.json(await responses.ok(data));
    } catch (error) {
      next(error);
    }
  })

  .post('/cronjob/store', async (req, res, next) => {
    try {
      let data = await jobsController.createJob(req.body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.status(201).json(await responses.okCreate(data));
    } catch (error) {
      next(error);
    }
  })

  .put('/cronjob/edit/:id', async (req, res, next) => {
    try {
      let data = await jobsController.editJob(req.params.id, req.body);
      if (!data) res.status(200).json({
        message: "data not found"
      });
      res.json(await responses.ok(data));
    } catch (error) {
      next(error);
    }
  })

  .delete('/cronjob/delete/:id', async (req, res, next) => {
    try {
      let data = await jobsController.deleteJob(req.params.id);
      if (!data) res.status(200).json({
        message: "cronjobs not found"
      });
      res.json(await responses.ok(data));
    } catch (error) {
      next(error);
    }
  })

module.exports = router;