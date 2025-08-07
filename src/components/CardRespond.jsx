import React from "react";
import { useContext } from "react";
import CommentContext from "@context/CommentContext";

export default function CardRespond({idComment, username}) {
    const {currentUser, newReply, comments} = useContext(CommentContext);
    return(
        <div key={idComment} className="bg-white rounded-lg p-5">
            <div className="flex flex-row gap-5">
                <div className="w-full">
                    <div className="flex flex-row gap-4 items-center">
                        <img src={currentUser.image.png} alt={currentUser.username} className="h-12 w-auto" />
                        <textarea 
                            placeholder={`@${username}`} 
                            name={`respond_comment_${idComment}`} 
                            id={`respond_comment_${idComment}`} 
                            className="border-[1px] borde-morado p-4 rounded-lg w-full mt-3 resize-none"
                        >
                        </textarea>
                        <button onClick={() => newReply(idComment, document.getElementById(`respond_comment_${idComment}`).value)} className="bg-morado py-3 px-4 text-white uppercase text-lg rounded-lg font-semibold cursor-pointer">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}