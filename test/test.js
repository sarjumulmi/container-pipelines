const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('chai').should();
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = require('../app');

chai.use(chaiHttp);

describe('/GET', () => {
  beforeEach((done) => {
    let dataPath = path.join(__dirname,'..', 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify({hello: 'world'}));
    done();
  });

  it('it should return a status of 200', () => {
    chai.request(app)
    .get('/')
    .set('Accept', 'application/json')
    .then(res => {
      expect(res).to.have.status(200);
    })
    .catch(err => {
      throw err;
    });
  });

  it('it should GET all items in the data file in json format', () => {
    chai.request(app)
    .get('/')
    .set('Accept', 'application/json')
    .then(res => {
      expect(res).to.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('hello').eql('world');
    })
    .catch(err => {
      throw err;
    });
  });

});

describe('/ADD', () => {
  beforeEach((done) => {
    let dataPath = path.join(__dirname,'..', 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify({hello: 'world'}));
    done();
  });

  it('it should ADD new item to cache', () => {
    chai.request(app)
    .post('/add')
    .send({name: 'sarju'})
    .then(res => {
      expect(res).to.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name').eql('sarju');
    })
  })
})
