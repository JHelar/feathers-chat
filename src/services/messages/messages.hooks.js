const { authenticate } = require('@feathersjs/authentication').hooks;

const setTimestamp = require('../../hooks/setTimestamp')
const validateMessage = require('../../hooks/validate-message')

const populateUser = require('../../hooks/populate-user');

module.exports = {
  before: {
    all: [
      authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      validateMessage(),
      setTimestamp({ name: 'createdAt' })
    ],
    update: [
      validateMessage(),
      setTimestamp({ name: 'updatedAt' })
    ],
    patch: [
      validateMessage(),
      setTimestamp({ name: 'updatedAt' })
    ],
    remove: []
  },

  after: {
    all: [populateUser()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
