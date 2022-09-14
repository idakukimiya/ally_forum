const { Thought, User } = require('../models');

const userController = {
  // Get all user
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({_id: -1})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select('-__v')
      .then((dbUserData) => {
        if(!dbUserData) {
          return res.status(404).json({message: "NO ID with this user!"});
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });  
    },    

  // Create user
  createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.json(err));
  },

  // upate User
updateUser(req,res){
  User.findOneAndUpdate({_id: req.id}, body, {new: true, runValidators:true})
    .then((dbUserData) => {
      if(!dbUserData){
        res.status(404).json({message: "NO ID for this user!"});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.UserId })
      .then((dbUserData) => {
        if(!dbUserData){
          return res.status(404).json({message: "No match!"});
        };
        return Thought.deleteMany(
          {thoughts: req.id},
          {_id: {$in: dbUserData.thoughts}});
      })
      .then(() => {
        res.json({message: "Deleted!"})
      })
      .catch((err) => res.json(err));
    },

// add friend
addFriend(req,res) {
  User.findOneAndUpdate(
    {_id: req.userId},
    {$addToSet: {friends: req.friendId}},
    {new: true, runValidators: true}
  )
  .then((dbUserData) => {
    if(!dbUserData){
      res.status(404).json({message: "NO ID with this user!"});
      return;
    }
    res.json(dbUserData);
  })
  .catch((err) => res.json(err));
},

//delete friend
removeFriend(req, res){
  User.findOneAndUpdate(
    {_id:  req.userId},
    {$pull: {friends: req.friendId}},
    {new: true}
  )
  .then((dbUserData) => {
    if(!dbUserData){
      return res.status(404).json({message: "NO ID with this user!"});
    }
    res.json(dbUserData);
  })
  .catch((err) => res.json(err));
},
};

module.exports = userController
