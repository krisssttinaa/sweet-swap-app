const conn = require('../config/db');
const Report = {};

Report.getAllReports = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Report', (err, res) => {
            if (err) {
                console.error('Error fetching all reports:', err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Report.getReportById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM Report WHERE report_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error fetching report with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

Report.createReport = (reportData) => {
    const { user_id, reported_post_id, reason, date_reported } = reportData;
    return new Promise((resolve, reject) => {
        conn.query(
            'INSERT INTO Report (user_id, reported_post_id, reason, date_reported) VALUES (?, ?, ?, ?)',
            [user_id, reported_post_id, reason, date_reported],
            (err, res) => {
                if (err) {
                    console.error('Error creating report:', err);
                    return reject(err);
                }
                return resolve(res);
            }
        );
    });
};

Report.deleteReport = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM Report WHERE report_id = ?', [id], (err, res) => {
            if (err) {
                console.error(`Error deleting report with ID ${id}:`, err);
                return reject(err);
            }
            return resolve(res);
        });
    });
};

module.exports = Report;