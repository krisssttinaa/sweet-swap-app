import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ history }) => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '', // Leave password empty initially
    dietaryGoals: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        history.push('/login');
        return;
      }

      try {
        const response = await axios.get('http://88.200.63.148:8288/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormData({
          name: response.data.name,
          surname: response.data.surname,
          email: response.data.email,
          password: '********', // Placeholder to indicate password exists
          dietaryGoals: response.data.dietary_goals || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        history.push('/login');
      }
    };

    fetchProfile();
  }, [history]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        try {
          const response = await axios.get('http://88.200.63.148:8288/api/recipes');
          setRecipes(response.data.filter((recipe) => recipe.user_id === user.user_id));
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      }
    };

    fetchRecipes();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    const updateData = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      dietaryGoals: formData.dietaryGoals,
    };

    // Only update the password if the field is changed from "********"
    if (formData.password !== '********' && formData.password !== '') {
      updateData.password = formData.password;
    }

    try {
      await axios.put('http://88.200.63.148:8288/api/users/profile', updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({
        ...user,
        ...updateData,
        dietary_goals: updateData.dietaryGoals,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelClick = () => {
    setFormData({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: '********', // Reset to placeholder
      dietaryGoals: user.dietary_goals || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {isEditing ? (
        <div className="edit-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password or leave blank"
          />
          <label>Dietary Goals:</label>
          <textarea
            name="dietaryGoals"
            value={formData.dietaryGoals}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter your dietary goals"
            className="textarea-dietary-goals"
          />
          <div className="button-group">
            <button className="save" onClick={handleSaveClick}>Save</button>
            <button className="cancel" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Dietary Goals:</strong> {user.dietary_goals || 'Not specified'}</p>
          <button className="edit" onClick={handleEditClick}>Edit</button>
        </div>
      )}
      <h3>My Recipes</h3>
      <div className="recipe-list">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.recipe_id} className="recipe-item">
              {recipe.image && (
                <img
                  src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`}
                  alt={recipe.title}
                  className="recipe-image"
                />
              )}
              <div className="recipe-content">
                <h4>{recipe.title}</h4>
                <p>{recipe.instructions.substring(0, 100)}...</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;