import { useState, useContext } from "react";
import CommentContext from "@context/CommentContext";
import CardReply from "@components/CardReply";
import CardRespond from "@components/CardRespond";
import { Modal } from 'antd';

export default function CardComment({id, score, content, date, image, username, replies}) {
    const {currentUser, upScore, downScore, deleteComment, updateComment, isReply, showReplyComment} = useContext(CommentContext);
    const isUserCurrent = username == currentUser.username ? true : false;
    const [isEdit, setEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openEditComment = (id) => {
        setEdit(prev => id);
    }

    const changeUpdateComment = (id,value) => {
        setEdit(false);
        updateComment(id, value);
    }

    const handleOk = (id) => {
        setIsModalOpen(false);
        deleteComment(id);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    return(
        <>
        <div key={id} className="bg-white rounded-lg p-5">
            <div className="flex flex-row flex-wrap">
                <div className="flex flex-row order-4 me-5 md:order-none md:flex-col h-min bg-amber-300 gap-4 items-center justify-between gap-y-3 py-2 px-3 rounded-lg bg-gris-light lg:gap-y-3">
                    <button onClick={() => upScore(id)} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15" className="text-[#5358b6]/70 hover:text-[#5358b6] duration-300 h-5 w-auto">
                            <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="currentColor"/>
                        </svg>
                    </button>
                    <p className="texto-morado font-bold text-md">{score}</p>
                    <button onClick={() => downScore(id)} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 8 10" className="text-[#5358b6]/70 hover:text-[#5358b6] duration-300 h-5 w-auto">
                            <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                        </svg>
                    </button>
                </div>
                <div className="flex w-full order-1 flex-1/2 flex-row gap-4 items-center bg-red-300 flex-wrap">
                    <img src={image} alt={username} className="h-12 w-auto" />
                    <p className="text-black font-semibold text-lg">{username} {isUserCurrent ? <span className="bg-morado py-1 px-3 rounded-sm text-white text-sm ms-2">you</span> : ''}</p>
                    <p className="text-gray-500 font-semibold text-lg">{date}</p>
                </div>
                {isUserCurrent ? (
                    <>
                    <div className={`flex flex-row gap-7 items-center ${isEdit == id ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div onClick={showModal} className="flex flex-row gap-2 items-center">
                            <img src="/img/icon-delete.svg" className="h-4 w-auto cursor-pointer " alt="Delete comment"/>
                            <button type="button" className="text-red-500 text-lg font-bold cursor-pointer">Delete</button>
                        </div>
                        <div onClick={() => openEditComment(id)} className="flex flex-row gap-2 items-center">
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
                    <button onClick={() => showReplyComment(id)} className="cursor-pointer group order-4 md:order-2">
                        <div className="flex flex-row gap-1 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-7 -7 25 25" className="text-[#5358b6]/70 group-hover:text-[#5358b6] duration-300 h-9 w-auto">
                                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor"/>
                            </svg>
                            <p className="text-[#5358b6]/70 group-hover:text-[#5358b6] duration-300 font-bold">Reply</p>
                        </div>
                    </button>
                )}
                    {isEdit == id ? (
                    <div className="w-full order-3 md:flex-1 bg-blue-300 flex flex-row gap-2 md:ms-[60px]">
                        <textarea 
                            name={`comment_${id}`} 
                            id={`comment_${id}`} 
                            className="border-[1px] borde-morado p-4 rounded-lg w-full mt-3 resize-none"
                        >
                        {content}
                        </textarea>
                        <div className="flex justify-end mt-2">
                            <button onClick={() => changeUpdateComment(id, document.getElementById(`comment_${id}`).value)} className="bg-morado py-3 px-4 text-white uppercase text-lg rounded-lg font-semibold cursor-pointer">Update</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full bg-blue-300 order-2 md:ms-[60px]">
                        <p className="text-gray-500 text-lg mt-4 font-semibold">{content}</p>
                    </div>
                )}
            </div>
        </div>
        {isReply == id ? (
            <CardRespond 
            idComment={id}
            username={username}
            type={1}
            />
        ) : ('')}
        {replies.length > 0 ? (
            <div className="flex gap-4 mt-4">
                <div className="w-[3px] bg-gray-300 rounded h-auto mx-0 md:mx-10"></div>
                <div className="flex flex-col gap-y-5 w-full">
                    {replies.map(item => {
                        return (
                            <CardReply
                            id={item.id}
                            score={item.score}
                            content={item.content}
                            date={item.createdAt}
                            image={item.user.image.webp}
                            username={item.user.username}
                            idCommentParent={id}
                            userNameParent={username}
                            replyingTo={item.replyingTo}
                            />
                        )
                    })}
                </div>
            </div>
        ) : ''}
        </>
    )

}