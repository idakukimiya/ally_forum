const router = require('express').Router();
const {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUser).post(createUser);

// /api/users/:Id
router.route('/:Id').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:Id/friend
router.route('/:Id/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
