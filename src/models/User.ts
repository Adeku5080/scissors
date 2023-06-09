import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
