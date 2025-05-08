import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
        const recipe = response.data;
        setTitle(recipe.title);
        setInstructions(recipe.instructions);
        setCategory(recipe.category);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('category', category);
    if (image) formData.append('image', image); // Ensure this is correct
  
    try {
      await axios.put(`http://88.200.63.148:8288/api/recipes/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  }; 

  return (
    <div className="edit-recipe-container">
      <form onSubmit={handleSubmit} className="edit-recipe-form">
        <h2>Edit Recipe</h2>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
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
          <button type="submit" className="edit-recipe-button">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;