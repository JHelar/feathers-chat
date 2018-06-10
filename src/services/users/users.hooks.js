const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const setTimestamp = require('../../hooks/setTimestamp')

const gravatar = require('../../hooks/gravatar');

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [hashPassword(), setTimestamp({ name: 'createdAt' }), gravatar()],
    update: [ 
      hashPassword(),  
      authenticate('jwt'),
      setTimestamp({ name: 'updatedAt' })
    ],
    patch: [ 
      hashPassword(),  
      authenticate('jwt'),
      setTimestamp({ name: 'updatedAt' })
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
