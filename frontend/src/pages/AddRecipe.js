import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const recipeData = {
            title,
            instructions,
            // Add other necessary fields
        };

        axios.post('/api/recipes', recipeData)
            .then(response => {
                console.log('Recipe added:', response.data);
            })
            .catch(error => {
                console.error('Error adding recipe:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Instructions</label>
                <textarea value={instructions} onChange={e => setInstructions(e.target.value)} required />
            </div>
            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default AddRecipe;