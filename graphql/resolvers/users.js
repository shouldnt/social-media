const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/User.js');
const { SECRET_KEY } = require('../../config.js');
const { UserInputError }  = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators.js');

const generateToken = (user) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
  }, SECRET_KEY, { expiresIn: '1h' });
}
module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
      // todo: validate user data
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);
      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // todo: make sure user doesn't already exist
      const user = await User.findOne({username});
      if(user) {
        throw new UserInputError('username is taken', {
          errors: {
            username: 'This username is taken'
          }
        });
      }
      // todo: hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({email, username, password, createdAt: new Date().toISOString()});
      const res = await newUser.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token
      }
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if(!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ username })
      if(!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if(!match) {
        errors.general = "Wrong credential";
        throw new UserInputError("Wrong credential", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token
      }
    }
  }
}
