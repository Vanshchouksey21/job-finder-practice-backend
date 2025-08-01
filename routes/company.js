const express = require('express');
const { createCompany, listCompanies } = require('../controllers/companyController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const router = express.Router();

router.post('/', auth, role(['admin']), createCompany);
router.get('/',auth, listCompanies);

module.exports = router;
