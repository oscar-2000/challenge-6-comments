import React from "react";
import { useContext } from "react";
import CommentContext from "@context/CommentContext";

export default function CardRespond({idComment, idCommentParent, username, type}) {
    const {currentUser, newReply, comments, showReplyComment} = useContext(CommentContext);
    return(
        <div key={idComment} className="bg-white rounded-lg p-5 flex flex-row flex-wrap gap-4 justify-center items-center">
            <img src={currentUser.image.png} alt={currentUser.username} className="h-12 order-2 md:order-1 w-auto" />
            <textarea 
                placeholder={`@${username}`} 
                name={`respond_comment_${idComment}`} 
                id={`respond_comment_${idComment}`} 
                className="border-[1px] borde-morado p-4 rounded-lg order-1 w-full md:order-2 md:flex-10/14 resize-none"
            >
            </textarea>
            <div className="flex flex-row md:flex-col gap-3 justify-end w-auto order-2 md:order-3">
                <button onClick={() => showReplyComment(false)} className="bg-red-600 text-white py-3 px-4 uppercase text-md rounded-lg font-semibold cursor-pointer">Cancel</button>
                <button onClick={() => newReply(idComment, idCommentParent, document.getElementById(`respond_comment_${idComment}`).value, type)} className="bg-morado py-3 px-4 text-white uppercase text-md rounded-lg font-semibold cursor-pointer">Update</button>
            </div>
        </div>
    )
}