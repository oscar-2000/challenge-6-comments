import { useContext, useState } from "react";
import CommentContext from "@context/CommentContext";
import CardRespond from "@components/CardRespond";
import { Modal } from 'antd';

export default function CardReply({id, score, content, date, image, username, idCommentParent, userNameParent, replyingTo}) {
    const {currentUser, upScoreReply, downScoreReply, deleteCommentReply, updateCommentReply, isReply, showReplyComment} = useContext(CommentContext);
    const isUserCurrent = username == currentUser.username ? true : false;
    const [isEdit, setEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEditComment = (id) => {
        setEdit(prev => id);
    }

    const changeUpdateComment = (id,value) => {
        setEdit(false);
        updateCommentReply(id, value);
    }

    const handleOk = (id) => {
        setIsModalOpen(false);
        deleteCommentReply(id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    return(
        <>
        <div className="bg-white rounded-lg p-5">
            <div className="flex flex-col-reverse md:flex-row gap-x-5 gap-y-3">
                <div className="flex flex-row md:flex-col h-min gap-4 items-center justify-between gap-y-3 py-2 px-3 rounded-lg bg-gris-light lg:gap-y-3 w-min">
                    <button onClick={() => upScoreReply(id)} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15" className="text-[#5358b6]/70 hover:text-[#5358b6] duration-300 h-4 w-auto">
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/>
                        </svg>
                    </button>
                    <p className="texto-morado font-bold text-md">{score}</p>
                    <button onClick={() => downScoreReply(id)} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 8 10" className="text-[#5358b6]/70 hover:text-[#5358b6] duration-300 h-4 w-auto">
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-row flex-wrap items-start">
                    <div className="flex w-full order-1 flex-1/2 flex-row gap-4 items-center flex-wrap">
                        <img src={image} alt={username} className="h-12 w-auto" />
                        <p className="text-black font-semibold text-lg">{username} {isUserCurrent ? <span className="bg-morado py-1 px-3 rounded-sm text-white text-sm ms-2">you</span> : ''}</p>
                        <p className="text-gray-500 font-semibold text-lg">{date}</p>
                    </div>
                    {isUserCurrent ? (
                        <>
                        <div className={`w-full flex flex-row flex-wrap gap-7 items-center order-4 md:order-2 flex-1/6 md:flex-1/4 justify-end mt-5 md:mt-0 ${isEdit == id ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <div onClick={ isEdit == id ? null : () => showModal()} className="flex flex-row gap-2 items-center">
                                <img src="/img/icon-delete.svg" className="h-4 w-auto cursor-pointer " alt="Delete comment"/>
                                <button type="button" className="text-red-500 text-lg font-bold cursor-pointer">Delete</button>
                            </div>
                            <div onClick={ isEdit == id ? null : () => openEditComment(id)} className="flex flex-row gap-2 items-center">
                                <img src="/img/icon-edit.svg" className="h-4 w-auto cursor-pointer " alt="Delete comment"/>
                                <button type="button" className="texto-morado text-lg font-bold cursor-pointer">Edit</button>
                            </div>
                        </div>
                        <Modal
                            title="Delete comment"
                            open={isModalOpen}
                            centered
                            onOk={() => handleOk(id)}
                            onCancel={handleCancel}
                            footer={(_, { OkBtn, CancelBtn }) => (
                            <>
                                <CancelBtn />
                                <OkBtn />
                            </>
                            )}
                        >
                            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
                        </Modal>
                        </>
                    ) : (
                        <button onClick={() => showReplyComment(id)}  className="cursor-pointer group order-4 md:order-2">
                            <div className="flex flex-row gap-1 items-center w-full flex-1/2 justify-end">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 25 25" className="text-[#5358b6]/70 group-hover:text-[#5358b6] duration-300 h-9 w-auto">
                                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor"/>
                                </svg>
                                <p className="text-[#5358b6]/70 group-hover:text-[#5358b6] duration-300 font-bold">Reply</p>
                            </div>
                        </button>
                    )}
                    {isEdit == id ? (
                        <div className="w-full order-3 md:flex-1 flex flex-row gap-2">
                            <textarea 
                                name={`comment_${id}`} 
                                id={`comment_${id}`} 
                                className="border-[1px] borde-morado p-4 rounded-lg w-full mt-3 resize-none"
                                defaultValue={`@${userNameParent} ${content}`}>
                            </textarea>
                            <div className="flex justify-end mt-2">
                                <button onClick={() => changeUpdateComment(id, document.getElementById(`comment_${id}`).value)} className="bg-morado py-3 px-4 text-white uppercase text-lg rounded-lg font-semibold cursor-pointer">Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full order-2">
                            <p className="text-gray-500 text-lg mt-4 font-semibold"><span className="texto-morado font-semibold">@{replyingTo}</span> {content}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {isReply == id ? (
            <CardRespond 
            idComment={id}
            idCommentParent={idCommentParent}
            username={username}
            type={2}
            />
        ) : ('')}
        </>
    )

}