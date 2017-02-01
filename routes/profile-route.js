'use strict';

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const debug = require('debug')('goaltastic:milestone_router');
const User = require('../model/user');
const Profile = require('../model/profile');
const bearerAuth = require('../lib/bear-auth');
const profileRouter = module.exports = new Router();
const upload = multer({dest: `${__dirname}/../assets/images`});
const s3 = new AWS.S3();

function s3Upload(params) {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
}
profileRouter.post('/api/profile', bearerAuth, upload.single('file'), function(req, res, next) {
  debug('POST /api/profile');
  let tempProfile;
  User.findOne({userID: req.user_id})
  .then((profile) => {
    tempProfile = profile;
    return s3Upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path),
    });
  });
  new Profile({
    userID: req.user._id.toString(),
    awsKey: s3Data.Key,
    photoURI: s3Data.Location,
  }).save()
  .then(profile => res.json(profile))
  .catch(next);
});
