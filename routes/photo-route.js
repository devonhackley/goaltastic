'use strict';

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const debug = require('debug')('goaltastic:photo-route');

const Profile = require('../model/profile');
const Photo = require('../model/photo');
const bearerAuth = require('../lib/bear-auth');

const photoRouter = module.exports = new Router();
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

photoRouter.post('/api/photos', bearerAuth, upload.single('file'), function(req, res, next) {
  debug('POST /api/photos');
  let tempProfile;
  Profile.findOne({_id: req.body.profileID, userID: req.user_id})
  .then((profile) => {
    tempProfile = profile;
    return s3Upload({
      ACL: 'public-read',
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fs.createReadStream(req.file.path),
    });
  })
.then((s3Data) => {
  return new Photo({
    title: req.body.title,
    profileID: req.body.profileID,
    userID: req.body.user._id.toString(),
    awsKey: s3Data.Key,
    photoURI: s3Data.Location,
  }).save();
})
.then(photo => res.json(photo))
.catch(next);
});

photoRouter.delete('/api/photos/:id', bearerAuth, function(req, res, next) {
  debug('DELETE /api/photos/:id');
  Photo.findOneAndRemove({
    userID: req.user._id.toString(),
    _id: req.params.id,
  })
  .then(() => next())
  .catch(next);
});
