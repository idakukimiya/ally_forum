const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


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
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
