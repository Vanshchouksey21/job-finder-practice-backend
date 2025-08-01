const express = require('express');
const { getMyApplications, getJobApplications } = require('../controllers/applicationController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/my', auth, role(['user']), getMyApplications);
router.get('/job/:jobId', auth, role(['admin']), getJobApplications);

module.exports = router;
