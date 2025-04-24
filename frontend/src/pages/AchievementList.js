import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AchievementList = () => {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        axios.get('/api/achievements')
            .then(response => {
                setAchievements(response.data);
            })
            .catch(error => {
                console.error('Error fetching achievements:', error);
            });
    }, []);

    return (
        <div>
            <h1>Achievements</h1>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement.achievement_id}>
                        <p>{achievement.title}</p>
                        <p>{achievement.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AchievementList;