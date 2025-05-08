import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [username, setUsername] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const menuRef = useRef(null);

    console.log('Recipe ID:', id);
    console.log('User ID:', userId);
    console.log('Token:', token);

    const fetchComments = useCallback(async () => {
        console.log('Attempting to fetch comments for recipe ID:', id);
        try {
            const commentsResponse = await axios.get(`http://88.200.63.148:8288/api/comments/recipe/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('API response for comments:', commentsResponse);  // Check the full response object
            console.log('Comments fetched from API:', commentsResponse.data);
            if (commentsResponse.data && Array.isArray(commentsResponse.data)) {
                setComments(commentsResponse.data);
            } else {
                console.warn('No comments returned from API or unexpected data format.');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [id, token]);

    useEffect(() => {
        const fetchRecipe = async () => {
            console.log('Fetching recipe details for recipe ID:', id);
            try {
                const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
                console.log('Recipe details fetched:', response.data);
                setRecipe(response.data);

                if (response.data.user_id) {
                    console.log('Fetching username for user ID:', response.data.user_id);
                    const userResponse = await axios.get(`http://88.200.63.148:8288/api/users/${response.data.user_id}`);
                    console.log('Username fetched:', userResponse.data.username);
                    setUsername(userResponse.data.username);
                }

                if (token) {
                    console.log('Fetching saved recipes for user ID:', userId);
                    const savedResponse = await axios.get(`http://88.200.63.148:8288/api/saved/saved`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const savedRecipes = savedResponse.data;
                    console.log('Saved recipes fetched:', savedRecipes);
                    setIsSaved(savedRecipes.some(savedRecipe => savedRecipe.recipe_id === response.data.recipe_id));
                }

                fetchComments(); // Fetch comments when component loads
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [id, token, fetchComments, userId]);

    const handleNewCommentChange = (e) => {
        console.log('New comment being typed:', e.target.value);
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            console.log('Comment is empty, not submitting.');
            return;
        }

        try {
            console.log("Submitting comment:", {
                recipe_id: id,
                user_id: userId,
                content: newComment
            });

            await axios.post(`http://88.200.63.148:8288/api/comments`, {
                recipe_id: id,
                user_id: userId,
                content: newComment
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Comment submitted successfully.');
            fetchComments();  // Refetch comments after submission
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleEditComment = (comment_id, content) => {
        console.log('Editing comment ID:', comment_id);
        setEditingCommentId(comment_id);
        setEditContent(content);
    };

    const handleUpdateComment = async () => {
        if (editContent.trim() === '') {
            console.log('Edit content is empty, not updating.');
            return;
        }

        try {
            console.log("Updating comment ID:", editingCommentId);
            await axios.put(`http://88.200.63.148:8288/api/comments/${editingCommentId}`, 
            { content: editContent }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Comment updated successfully.');
            fetchComments();  // Refetch comments after update
            setEditingCommentId(null);
            setEditContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (comment_id) => {
        try {
            console.log('Deleting comment ID:', comment_id);
            await axios.delete(`http://88.200.63.148:8288/api/comments/${comment_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Comment deleted successfully.');
            fetchComments();  // Refetch comments after delete
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const toggleMenu = () => {
        console.log('Toggling menu.');
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            console.log('Clicked outside the menu, closing it.');
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            console.log('Menu opened, adding event listener for outside clicks.');
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            console.log('Menu closed, removing event listener for outside clicks.');
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            console.log('Cleaning up event listeners.');
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const handleEdit = () => {
        console.log('Navigating to edit recipe page.');
        navigate(`/edit-recipe/${recipe.recipe_id}`);
    };

    const handleDelete = async () => {
        console.log('Attempting to delete recipe with ID:', recipe.recipe_id);
        try {
            await axios.delete(`http://88.200.63.148:8288/api/recipes/${recipe.recipe_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Recipe deleted successfully.');
            navigate('/recipes');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleSave = async () => {
        console.log('Attempting to save recipe with ID:', recipe.recipe_id);
        try {
            await axios.post('http://88.200.63.148:8288/api/saved/save', { recipeId: recipe.recipe_id }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Recipe saved successfully.');
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handleUnsave = async () => {
        console.log('Attempting to unsave recipe with ID:', recipe.recipe_id);
        try {
            await axios.delete('http://88.200.63.148:8288/api/saved/unsave', {
                data: { recipeId: recipe.recipe_id },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Recipe unsaved successfully.');
            setIsSaved(false);
        } catch (error) {
            console.error('Error unsaving recipe:', error);
        }
    };

    const handleReport = () => {
        console.log('Reporting recipe or comment.');
    };

    const handleUsernameClick = (commentUserId) => {
        console.log('Navigating to profile of user with ID:', commentUserId);
        const profilePath = userId === commentUserId.toString() ? '/profile' : `/user/${commentUserId}`;
        navigate(profilePath);
    };

    if (!recipe) {
        console.log('Recipe data not yet loaded, displaying loading indicator.');
        return <div>Loading...</div>;
    }

    console.log('Rendering recipe details page.');
    return (
        <div className="recipe-details">
            <img src={`http://88.200.63.148:8288/uploads/${recipe.image_filename}`} alt={recipe.title} />
            <div className="recipe-info">
                <h2>{recipe.title}</h2>
                <p className="author">
                    Created by: <span onClick={() => handleUsernameClick(recipe.user_id)} className="username">{username}</span>
                </p>
                {recipe.products && recipe.products.length > 0 && (
                  <>
                        <h3>Products</h3>
                        <ul className="products-txt">
                            {recipe.products.map((product) => (
                                <li key={product.product_id}>
                                    <strong>{product.name}</strong>
                                    <br />
                                    <em>{product.description}</em>
                                    <br />
                                    Price: {product.price}, Brand: {product.brand}, Shop: {product.shop}
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <h3>Instructions</h3>
                <p className="instructions-txt">{recipe.instructions}</p>

                <h3>Comments</h3>
                <div className="comments-section">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={comment.comment_id || index} className="comment">
                                {editingCommentId === comment.comment_id ? (
                                    <div>
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        />
                                        <button onClick={handleUpdateComment}>Update</button>
                                        <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <p>{comment.username}: {comment.content}</p>
                                        <div className='comments-details'>
                                        <small>
                                            Commented on: {comment.date_commented ? new Date(comment.date_commented).toLocaleString() : 'Date not available'}
                                        </small>
                                        {comment.user_id === parseInt(userId) && (
                                            <div className='comments-buttons-change'>
                                                <button onClick={() => handleEditComment(comment.comment_id, comment.content)}>Edit</button>
                                                <button onClick={() => handleDeleteComment(comment.comment_id)}>Delete</button>
                                            </div>
                                        )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={handleNewCommentChange}
                            placeholder="Add a comment..."
                            rows="3"
                        />
                        <button onClick={handleCommentSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            {userId && token && (
                <div className="menu" onClick={toggleMenu} ref={menuRef}>
                    <div className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {menuOpen && (
                        <div className="menu-options">
                            {userId === recipe.user_id.toString() && <div onClick={handleEdit}>Edit</div>}
                            {userId === recipe.user_id.toString() && <div onClick={handleDelete}>Delete</div>}
                            {isSaved
                                ? <div onClick={handleUnsave}>Unsave</div>
                                : <div onClick={handleSave}>Save</div>
                            }
                            <div onClick={handleReport}>Report</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipeDetails;