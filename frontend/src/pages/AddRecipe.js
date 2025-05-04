import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState(''); // Update category state
  const [image, setImage] = useState(null);
  const navigate = useNavigate();  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id'); 
  
    // Format the date without milliseconds and timezone
    const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('category', category); // Append category to the formData
    formData.append('date_created', formattedDate); // Set current date as date_created
    if (image) formData.append('image', image);
    formData.append('user_id', userId); 
  
    try {
      await axios.post('http://88.200.63.148:8288/api/recipes/create', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      navigate('/recipes');  
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  }; 
  

  return (
    <div className="add-recipe-container">
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <h2>Add a New Recipe</h2>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        
        {/* Replace category input with a select dropdown */}
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select a category</option>
          <option value="Salads">Salads</option>
          <option value="Vegetarian Dishes">Vegetarian Dishes</option>
          <option value="Low-Sugar Snacks">Low-Sugar Snacks</option>
          <option value="Sugar-Free Desserts">Sugar-Free Desserts</option>
          <option value="Healthy Beverages">Healthy Beverages</option>
          <option value="Low-Sugar Desserts">Low-Sugar Desserts</option>
          <option value="Sugar-Free Snacks">Sugar-Free Snacks</option>
          <option value="Non-Vegetarian Food">Non-Vegetarian Food</option>
        </select>
        
        <label>Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="add-recipe-button">Add Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;