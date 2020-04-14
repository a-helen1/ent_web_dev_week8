'use strict';

const assert = require('chai').assert;
const DonationService = require('./donation-service');
const fixtures = require('./fixtures.json');
const _= require('lodash');

suite('Candidate API tests', function () {

  let candidates = fixtures.candidates;
  let newCandidate = fixtures.newCandidate;

  const donationService = new DonationService('http://localhost:3000');

  test('create a candidate', async function () {
    const returnedCandidate = await donationService.createCandidate(newCandidate);
    assert.equal(returnedCandidate.firstName, newCandidate.firstName);
    assert(_.some([returnedCandidate], newCandidate), 'returnedCandidate must be a superset of newCandidate');
    assert.isDefined(returnedCandidate._id);
  });

  test('delete a candidate', async function () {
    let c = await donationService.createCandidate(newCandidate);
    assert(c._id != null);
    await donationService.deleteOneCandidate(c._id);
    c = await donationService.getCandidate(c._id);
    assert(c == null);
  });
});