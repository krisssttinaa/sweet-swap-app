import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [username, setUsername] = useState('');
    const [userProfilePicture, setUserProfilePicture] = useState('default.png'); // Added state for author's profile picture
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

    const fetchComments = useCallback(async () => {
        try {
            const commentsResponse = await axios.get(`http://88.200.63.148:8288/api/comments/recipe/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (commentsResponse.data && Array.isArray(commentsResponse.data)) {
                const commentsWithPictures = await Promise.all(
                    commentsResponse.data.map(async (comment) => {
                        const userResponse = await axios.get(`http://88.200.63.148:8288/api/users/${comment.user_id}`);
                        return {
                            ...comment,
                            profile_picture: userResponse.data.profile_picture || 'default.png',
                        };
                    })
                );
                setComments(commentsWithPictures);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [id, token]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
                setRecipe(response.data);

                if (response.data.user_id) {
                    const userResponse = await axios.get(`http://88.200.63.148:8288/api/users/${response.data.user_id}`);
                    setUsername(userResponse.data.username);
                    setUserProfilePicture(userResponse.data.profile_picture || 'default.png'); // Set author's profile picture
                }

                if (token) {
                    const savedResponse = await axios.get(`http://88.200.63.148:8288/api/saved/saved`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const savedRecipes = savedResponse.data;
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
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '') {
            return;
        }

        try {
            await axios.post(`http://88.200.63.148:8288/api/comments`, {
                recipe_id: id,
                user_id: userId,
                content: newComment
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchComments();  // Refetch comments after submission
            setNewComment('');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    const handleEditComment = (comment_id, content) => {
        setEditingCommentId(comment_id);
        setEditContent(content);
    };

    const handleUpdateComment = async () => {
        if (editContent.trim() === '') {
            return;
        }

        try {
            await axios.put(`http://88.200.63.148:8288/api/comments/${editingCommentId}`, 
            { content: editContent }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            fetchComments();  // Refetch comments after update
            setEditingCommentId(null);
            setEditContent('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    const handleDeleteComment = async (comment_id) => {
        try {
            await axios.delete(`http://88.200.63.148:8288/api/comments/${comment_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchComments();  // Refetch comments after delete
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    const handleEdit = () => {
        navigate(`/edit-recipe/${recipe.recipe_id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://88.200.63.148:8288/api/recipes/${recipe.recipe_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            navigate('/recipes');
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post('http://88.200.63.148:8288/api/saved/save', { recipeId: recipe.recipe_id }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setIsSaved(true);
        } catch (error) {
            console.error('Error saving recipe:', error);
        }
    };

    const handleUnsave = async () => {
        try {
            await axios.delete('http://88.200.63.148:8288/api/saved/unsave', {
                data: { recipeId: recipe.recipe_id },
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setIsSaved(false);
        } catch (error) {
            console.error('Error unsaving recipe:', error);
        }
    };

    const handleReport = () => {
        console.log('Reporting recipe or comment.');
    };

    const handleUsernameClick = (commentUserId) => {
        const profilePath = userId === commentUserId.toString() ? '/profile' : `/user/${commentUserId}`;
        navigate(profilePath);
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-details">
            <img className='recipe-img' src={`http://88.200.63.148:8288/uploads/${recipe.image_filename}`} alt={recipe.title} />
            <div className="recipe-info">
                <h2>{recipe.title}</h2>
                <p className="author">
                    <img src={`http://88.200.63.148:8288/uploads/${userProfilePicture}`} alt="Profile" className="profile-picture" />
                    <span onClick={() => handleUsernameClick(recipe.user_id)} className="username">{username}</span>
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
                              <img src={`http://88.200.63.148:8288/uploads/${comment.profile_picture}`} alt={comment.username} className="profile-picture" />
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
                                      <p>
                                          <span 
                                              onClick={() => handleUsernameClick(comment.user_id)} 
                                              className="username clickable-username"
                                          >
                                              {comment.username}
                                          </span>: {comment.content}
                                      </p>
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
