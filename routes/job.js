const express = require('express');
const { createJob, listJobs, applyJob } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/', auth, listJobs);
router.post('/', auth, role(['admin']), createJob);
router.post('/:jobId/apply', auth, role(['user']), applyJob);

module.exports = router;
