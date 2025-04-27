import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './RecipeList.css';

const RecipeList = ({ category }) => {
  const [recipes, setRecipes] = useState([]);
  const { category: routeCategory } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://88.200.63.148:8288/api/recipes${category || routeCategory ? `/category/${category || routeCategory}` : ''}`);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [category, routeCategory]);

  return (
    <div className="recipe-list">
      <h2>{category || routeCategory ? `${category || routeCategory} Recipes` : 'All Recipes'}</h2>
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.recipe_id}>
              <img src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.instructions.substring(0, 100)}...</p>
              <Link to={`/recipe/${recipe.recipe_id}`}>View Recipe</Link>
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