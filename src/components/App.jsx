import { useContext, useState } from 'react'
import '@css/App.css'
import CardComment from '@components/CardComment'
import CommentContext from '@context/CommentContext';
import CardUserComment from "@components/CardUserComment";

function App() {

  const {currentUser,comments} = useContext(CommentContext);

  console.log(comments);

  return (
    <>
      <div className='bg-gris-light'>
        <div className='w-full lg:max-w-[1300px] mx-auto py-10 px-5'>
          <div className='flex flex-col items-center justify-center'>
            <div className="s:w-full lg:w-[1200px]">
              <div className="flex flex-col gap-y-5">
                {comments.map((item) => {
                  return(
                    <CardComment 
                    id={item.id}
                    score={item.score}
                    content={item.content}
                    date={item.createdAt}
                    image={item.user.image.webp}
                    username={item.user.username}
                    replies={item.replies}
                    />
                  )
                })}
                <CardUserComment/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
