const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.profile);
router.put('/profile', auth, userController.updateProfile);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/profile', auth, userController.deleteProfile);

router.put('/profile-picture', auth, async (req, res) => {
    const userId = req.user.id; // Assuming auth middleware sets req.user
    const { profilePicture } = req.body;

    const allowedPictures = [
        'profile0.png', 'profile1.png', 'profile2.png', 'profile3.png', 
        'profile4.png', 'profile5.png', 'profile6.png', 
        'profile7.png', 'profile8.png', 'profile9.png', 'profile10.png', 'profile11.png',  'profile12.png', 'profile13.png', 'profile14.png',  
        'default.png'
    ];

    if (!allowedPictures.includes(profilePicture)) {
        return res.status(400).json({ error: 'Invalid profile picture selected' });
    }

    try {
        await db.query(
            'UPDATE User SET profile_picture = ? WHERE user_id = ?',
            [profilePicture, userId]
        );
        res.status(200).json({ message: 'Profile picture updated successfully' });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;