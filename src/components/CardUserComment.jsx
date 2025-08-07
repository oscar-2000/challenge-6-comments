import { useContext } from "react"
import CommentContext from "@context/CommentContext"

export default function CardUserComment() {
    const {currentUser, newComment} = useContext(CommentContext);
    return(
        <div className="bg-white rounded-lg p-5">
            <div className="flex flex-row items-start gap-5">
                <img src={currentUser.image.webp} alt={currentUser.username} className="h-12 w-auto" />
                <div className="w-full">
                    <div className="flex flex-row items-start justify-between gap-3 w-full">
                        <textarea name={`new_comment_${currentUser.id}`} id={`new_comment_${currentUser.id}`} placeholder="Add a comment..." className="border-[1px] borde-morado p-4 rounded-lg w-full mt-3 resize-none">
                        </textarea>
                        <button onClick={() => {
                                newComment(document.getElementById(`new_comment_${currentUser.id}`).value),
                                document.getElementById(`new_comment_${currentUser.id}`).value = "";
                            }
                        } className="bg-morado py-3 px-4 text-white uppercase text-lg rounded-lg font-semibold cursor-pointer">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )

}