'use strict';

const Donation = require('../models/donation');
const boom = require('@hapi/boom');
const Candidate = require('../models/candidate')

const Donations = {
  findAll: {
    auth: false,
    handler: async function (request, h) {
      const donations = await Donation.find();
      return donations;
    }
  },

  findByCandidate: {
    auth: false,
    handler: async function (request, h) {
      const donations = await Donation.find({ candidate: request.params.id});
      return donations;
    }
  },

  makeDonation: {
    auth: false,
    handler: async function (request, h) {
      let donation = new Donation(request.payload);
      const candidate = await Candidate.findOne({_id: request.params.id});
      if (!candidate) {
        return Boom.notFound('No Candidate with this id');
      }
      donation.candidate = candidate._id;
      donation = await donation.save();
      return donation;
      }
    },

  deleteDonation: {
    auth:false,
    handler: async function (request, h) {
      const response = await Donation.deleteOne({_id: request.params.id});
      if (response.deletedCount == 1) {
        return  {success: true};
      }
      return Boom.notFound('id not found')
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      await Donation.deleteMany({});
      return {success: true};
    }
  }
};

module.exports = Donations;
