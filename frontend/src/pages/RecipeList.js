import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('/api/recipes')
            .then(response => {
                setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.recipe_id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;