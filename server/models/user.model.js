const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema({
    name: { // public key
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: String,
      default: null,
    },
  }, {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
