const { Thought, User } = require('../models');

module.exports = {
  // Get all thought
  getThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({_id: -1})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if(!dbThoughtData) {
          return res.status(404).json({message: "NO ID with this thought!"});
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });  
    },

  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then(({_id}) => {
      return User.findOneAndUpdate(
        {_id: body.userId},
        {$push: {thoughts: _id}},
        {new: true}
      );
    })
    .then((dbUserData) => {
      if(!dbUserData){
        return res
          .status(404)
          .json({message: "NO ID with this user, Thought created!"})
      }
      res.json({message: "Successfully created Thought!!"});
    })
    .catch((err) => res.json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.ThoughtId })
      .then((dbThoughtData) => {
        if(!dbThoughtData){
          return res.status(404).json({message: "No match!"});
        };
        return User.findOneAndUpdate(
          {thoughts: req.id},
          {$pull: {thoughts: req.id}},
          {new: true}
        );
      })
      .then((dbUserData)=> {
        if(!dbUserData){
          return res
            .status(400)
            .json({message: "NO ID with this user but thought created!"})
        }
        res.json({message: "Successfully deleted thought!"})
      })
      .catch((err) => res.json(err));
    },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if(!dbThoughtData){
          res.status(404).json({message: "No match"});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  createReaction(req,res){
    Thought.findOneAndUpdate(
      {_id: req.ThoughtId},
      {$push: {reactions: body}},
      {new: true, runValidators: true}
    )
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        res.status(404).json({message: "NO ID with this thought!"});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
  },

deleteReaction(req,res){
  Thought.findOneAndUpdate(
    {_id: req.thoughtId},
    {$pull: {reactions: {reactionId: req.reactionId}}},
    {new: true}
  )
    .then((dbThoughtData) => {
      if(!dbThoughtData){
        res.status(404).json({message: "You got nothing!"});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
}
};

module.exports = ThoughtController
