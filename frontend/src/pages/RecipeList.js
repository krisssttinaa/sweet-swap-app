import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import './RecipeList.css';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');      // State for selected tab
  const [isLoggedIn, setIsLoggedIn] = useState(false);        // State to track if the user is logged in
  const [currentCategory, setCurrentCategory] = useState('all'); // State for current category

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchRecipes = useCallback(async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      let response;
      if (selectedTab === 'saved') {
        response = await axios.get('http://88.200.63.148:8288/api/saved/saved', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (selectedTab === 'my') {
        if (!userId) {
          console.error('No user ID found. Cannot fetch user-specific recipes.');
          return;
        }
        response = await axios.get('http://88.200.63.148:8288/api/recipes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        response = {
          data: response.data.filter(recipe => recipe.user_id === parseInt(userId))
        };
      } else if (currentCategory === 'all') {
        response = await axios.get('http://88.200.63.148:8288/api/recipes');
      } else {
        response = await axios.get(`http://88.200.63.148:8288/api/recipes/category/${currentCategory}`);
      }

      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [selectedTab, currentCategory]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    if (category === 'all') {
      navigate('/recipes');
    } else {
      navigate(`/recipes/category/${category}`);
    }
  };

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <div className="recipe-list">
      <div className="tabs">
        <button className={selectedTab === 'saved' ? 'active' : ''} onClick={() => setSelectedTab('saved')}>Saved Recipes</button>
        <button className={selectedTab === 'all' ? 'active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</button>
        <button className={selectedTab === 'my' ? 'active' : ''} onClick={() => setSelectedTab('my')}>My Recipes</button>
      </div>
      <div className="recipe-header">
        <div className="recipe-actions">
          <select className="category-select" onChange={(e) => handleCategorySelect(e.target.value)}>
            <option value="all">All</option>
            <option value="Salads">Salads</option>
            <option value="Vegetarian Dishes">Vegetarian Dishes</option>
            <option value="Low-Sugar Snacks">Low-Sugar Snacks</option>
            <option value="Sugar-Free Desserts">Sugar-Free Desserts</option>
            <option value="Healthy Beverages">Healthy Beverages</option>
            <option value="Low-Sugar Desserts">Low-Sugar Desserts</option>
            <option value="Sugar-Free Snacks">Sugar-Free Snacks</option>
            <option value="Non-Vegetarian Food">Non-Vegetarian Food</option>
          </select>
          {isLoggedIn && (
            <button className="add-recipe-button" onClick={handleAddRecipe}>+ Add Recipe</button>
          )}
        </div>
      </div>

      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} fetchRecipes={fetchRecipes} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;