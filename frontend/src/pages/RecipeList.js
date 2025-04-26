import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8288/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-list">
      <h2>All Recipes</h2>
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.recipe_id}>
              <img src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.instructions.substring(0, 100)}...</p>
              <a href={`/recipe/${recipe.recipe_id}`}>View Recipe</a>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;