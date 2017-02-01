'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');

const User = require('../model/user');
// const Photo = require('../model/photo');
const Profile = require('../model/profile');
const mockUser = require('./lib/user-mocks');
// const mockPhoto = require('./lib/photo-mocks');
const mockProfile = require('./lib/profile-mocks');
const controlServ = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe.only('testing photo_router', function() {
  before(controlServ.startServer);
  after(controlServ.killServer);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Profile.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/photo', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockProfile.bind(this));

    it('should return an photo model', (done) => {
      superagent.post(`${baseURL}/api/photo`)
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
  });
});
