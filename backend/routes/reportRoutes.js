const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.get('/', auth, reportController.getAllReports);
router.get('/:id', auth, reportController.getReportById);
router.post('/', auth, reportController.createReport);
router.delete('/:id', auth, reportController.deleteReport);

module.exports = router;