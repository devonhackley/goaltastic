'use strict';

const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const User = require('../model/user');
const del = require('del');
const s3 = new AWS();

const profileSchema = mongoose.Schema({
  photoURI: {type: String, required: true},
  awsKey: {type: String, required: true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

profileSchema.pre('save', function(next) {
  User.findById(this.UserID)
    .then(User => {
      User.profile.push(this._id.toString());
      return User.save();
    })
    .then(() => next())
    .catch(next);
});
profileSchema.post('save', function(doc, next) {
  del([`${__dirname}/../assets/images/*`]);
  next();
});
profileSchema.pre('remove', function(next) {
  User.findById(this.UserID)
    .then(User => {
      User.profile = User.profile.filter(photoID => {
        return photoID != this._id.toString();
      });
      return User.save();
    })
    .then(() => {
      return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: this.awsKey,
      }).promise();
    })
    .then(() => next())
    .catch(next);
});
module.exports = mongoose.model('profile', profileSchema);
