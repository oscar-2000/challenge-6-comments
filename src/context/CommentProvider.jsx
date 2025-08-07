import React from "react";
import { useState } from "react";
import CommentsData from "@lib/data.json";
import CommentContext from "@context/CommentContext";

export default function CurrentUserProvider({children}) {
    const [comments, setComments] = useState(CommentsData.comments);
    const [currentUser, setUser] = useState(CommentsData.currentUser);
    const [isReply, setReply] = useState(false);
    
    const showReplyComment = (id) => {
        setReply(prev => isReply === id ? false : id);
    }

    const upScore = (id) => {
        setComments(prev => 
            comments.map(item => {
                if(item.id === id) {
                    return {...item, score : item.score + 1};
                }
            return item;
        }))
    }

    const downScore = (id) => {
        setComments(prev => 
            comments.map(item => {
                if(item.id === id) {
                    const newScore = item.score > 0 ? item.score - 1 : 0;
                    return {...item, score: newScore};
                }
            return item;
        })
    )}

    const deleteComment = (id) => {
        setComments(prev => prev.filter(item => item.id != id))
    }

    const upScoreReply = (id) => {
        setComments(prev => 
            comments.map(item => {
                let idParent = item.id;
                item.replies = item.replies.map(replie => {
                    if(replie.id === id) {
                        const newScore = replie.score + 1;
                        return {...replie, score: newScore}
                    }
                    return replie
                })
            return item;
        })
    )}

    const downScoreReply = (id) => {
        setComments(prev => 
            comments.map(item => {
                item.replies = item.replies.map(replie => {
                    if(replie.id === id) {
                        const newScore = replie.score > 0 ? replie.score - 1: 0;
                        return {...replie, score : newScore}
                    }
                    return replie
                })
                return item;
            })
        )
    }

    const deleteCommentReply = (id) => {
        setComments(prev =>
            prev.map(comment => {
                return {
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== id)
                };
            })
        );
    };

    const updateCommentReply = (id, value) => {
        setComments(prev => 
            comments.map(item => {
                item.replies = item.replies.map(replie => {
                    if(replie.id === id) {
                        const newValue = value;
                        return {...replie, content : newValue}
                    }
                    return replie;
                })
                return item;
            })
        )
    }

    const newComment = (value) => {
        const newId = comments[comments.length - 1].id + 1;
        let newObj = {
            id: newId,
            content: value,
            createdAt: "Right now",
            score: 0,
            user: {
                image: { 
                    png: currentUser.image.png,
                    webp: currentUser.image.webp
                },
                username: currentUser.username
            },
            replies: []
        }
        setComments(prev => [...prev, newObj]);
    }

    const updateComment = (id, value) => {
        setComments(prev => 
            comments.map(item => {
                if(item.id === id) {
                    const newValue = value;
                    return {...item, content : newValue}
                }
                return item
            })
        )
    }

    const newReply = (idCommentParent, value) => {
        const parentComment = comments.find(item => item.id === idCommentParent);
        const newValue = parentComment ? parentComment.replies.length + 1 : 1;
        let newObj = {
            id: newValue,
            content: value,
            createdAt: "Right now",
            score: 0,
            user: {
                image: { 
                    png: currentUser.image.png,
                    webp: currentUser.image.webp
                },
                username: currentUser.username
            },
            replies: []
        }
        setComments(prev => 
            comments.map(item => {
                if(item.id === idCommentParent) {
                    return {...item, replies: [...item.replies, newObj]}
                }
                return item
            })
        )
        setReply(prev => "");
    }

    return (
        <CommentContext.Provider value={{isReply, currentUser, comments, upScore, downScore, deleteComment, updateComment, upScoreReply, downScoreReply, deleteCommentReply, updateCommentReply, newComment, newReply, showReplyComment}}>
            {children}
        </CommentContext.Provider>
    )
}