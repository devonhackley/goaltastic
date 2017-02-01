'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');

const User = require('../model/user');
const Profile = require('../model/profile');
const mockUser = require('./lib/user-mocks');
const mockPhoto = require('./lib/photo-mocks');
const mockProfile = require('./lib/profile-mocks');
const controlServ = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing photo_router', function() {
  before(controlServ.startServer);
  after(controlServ.killServer);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
      // Photo.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/photos', function(){
    before(mockUser.bind(this));
    before(mockProfile.bind(this));

    it('should return an photo model', (done) => {
      superagent.post(`${baseURL}/api/photos`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .field('title', 'Bernie_wwf')
      .field('profileID', this.tempProfile._id.toString())
      .attach('file', `${__dirname}/../test/assets/images/Bernie_inaug_steel-chair.jpg`)
      .then(res => {
        console.log('**************************');
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Bernie_wwf');
        expect(res.body.profileID).to.equal(this.tempProfile._id.toString());
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        expect(Boolean(res.body.photoURI)).to.equal(true);

        done();
      })
      .catch(done);
    });

    it('should respond with a 404 with bad url', (done) => {
      let url = `${baseURL}/api/fakephoto`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('testing DELETE /api/photos', function(){
    before(mockUser.bind(this));
    before(mockProfile.bind(this));
    before(mockPhoto.bind(this));

    it('should delete a photo', (done) => {
      console.log(this.tempPhoto._id);
      superagent.delete(`${baseURL}/api/photos/${this.tempPhoto._id.toString()}`)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
  });

});
