import { Schema, model } from 'mongoose';

const validateEmailFormat = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const characterSchema = new Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  level: { type: Number, default: 0 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: validateEmailFormat,
      message: props => `${props.value} is not a valid email`
    }
  },
  createdAt: { type: Date, default: Date.now },
});

const Character = model('Character', characterSchema);

export default Character;