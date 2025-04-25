import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ history }) => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://88.200.63.148:8288/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        history.push('/login');
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8288/api/recipes');
        setRecipes(response.data.filter(recipe => recipe.user_id === user.user_id));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchProfile();
    fetchRecipes();
  }, [history, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Email: {user.email}</p>

      <h3>My Recipes</h3>
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map(recipe => (
            <div key={recipe.recipe_id} className="recipe-item">
              <h4>{recipe.title}</h4>
              <p>{recipe.instructions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;