const { Schema, model, Types } = require('mongoose');


// Schema to create Student model
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 300
    },
    username: {
      type: String,
      required: true
    }

},

  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
  }
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
