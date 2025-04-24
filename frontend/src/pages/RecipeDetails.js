import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get(`/api/recipes/${id}`)
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('Error fetching recipe:', error);
            });

        axios.get(`/api/recipes/${id}/comments`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    }, [id]);

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.instructions}</p>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.comment_id}>
                        <p>{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetails;