const Candidates = require('./app/api/candidates');
const Users = require('./app/api/users');
const Donations = require('./app/api/donations.js');

module.exports = [
  {method: 'GET', path: '/api/candidates', config: Candidates.find },
  {method: 'GET', path: '/api/candidates/{id}', config: Candidates.findOne },
  {method: 'POST', path: '/api/candidates', config: Candidates.create },
  {method: 'DELETE', path: '/api/candidates/{id}', config: Candidates.deleteOne },
  {method: 'DELETE', path: '/api/candidates', config: Candidates.deleteAll },
  {method: 'GET', path: '/api/candidates/{id}/donations', config: Donations.findByCandidate },
  {method: 'POST', path: '/api/candidates/{id}/donations', config: Donations.makeDonation },
  {method: 'DELETE', path: '/api/candidate/{id}/donations', config: Donations.deleteDonation },


  {method: 'GET', path: '/api/users', config: Users.find },
  {method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  {method: 'POST', path: '/api/users', config: Users.create },
  {method: 'DELETE', path: '/api/users', config: Users.deleteAll },
  {method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },

  {method: 'GET', path: '/api/donations', config: Donations.findAll },
  {method: 'Delete', path: '/api/donations', config: Donations.deleteAll }

]