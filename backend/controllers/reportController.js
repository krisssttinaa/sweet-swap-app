const Report = require('../models/report');

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.getAllReports();
        res.json(reports);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getReportById = async (req, res) => {
    try {
        const report = await Report.getReportById(req.params.id);
        if (!report.length) {
            return res.status(404).json({ msg: 'Report not found' });
        }
        res.json(report[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createReport = async (req, res) => {
    const { user_id, reported_post_id, reason } = req.body;
    try {
        const newReport = await Report.createReport({
            user_id,
            reported_post_id,
            reason,
            date_reported: new Date()
        });
        res.json(newReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteReport = async (req, res) => {
    try {
        await Report.deleteReport(req.params.id);
        res.json({ msg: 'Report deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};