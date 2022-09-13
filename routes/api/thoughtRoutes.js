const router = require('express').Router();
const {
  getAllThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getAllThought).post(createThought);

// /api/thoughts/:Id
router.route('/:Id').get(getSingleThought).put(updateThought).delete(deleteThought);

// Post at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
