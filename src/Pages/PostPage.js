import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";

import formatISO9075 from "date-fns/formatISO9075";
import { UserContext } from "../UserContext";
import { enqueueSnackbar } from "notistack";
import ClipLoader from "react-spinners/ClipLoader";
import { RiDeleteBin5Line } from "react-icons/ri";



const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo}=useContext(UserContext)

  const { id } = useParams();

  useEffect(() => {
    const fetchPostInfo = async () => {
      try {
        const response = await fetch(`https://blog-syj3.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post information");
        }

        const postData = await response.json();
        setPostInfo(postData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostInfo();
  }, [id]);
  const override = {
     
  minHeight: "100vh",  // Center vertically
  margin: "0 auto",
  borderColor: "red",
  color: '#767676'
  };
  
  const color = '#767676';  // Define color
  const loading = true;  // Define loading
  
  if (!postInfo) {
    return (
      <div className="flex item-center justify-center">
            <ClipLoader className="mt-20"
          color={color}
          loading={loading}
          css={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      
    );
  }

  async function deletePost() {
    try {
      const response = await fetch(`https://blog-syj3.onrender.com/post/${postInfo._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (response.ok) {
        enqueueSnackbar("Post deleted successfully...",{variant:'success'},{ autoHideDuration: 2000 })
        
      } else {
        
        const errorData = await response.json();
        console.error(`Error deleting post: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      
    }
  }

  return (
    <div className={`flex flex-col gap-10 items-center `}>
      <div className="md:w-2/3 w-full">
        <img
          src={`https://blog-syj3.onrender.com/${postInfo.files}`}
          alt={postInfo.title}
          className='rounded-md'
        />
      </div>
      <div className="md:w-full md:my-5 my-0">
        <h1 className="font-bold md:text-4xl md:my-3 mb-6 text-xl text-justify ">{postInfo.title}</h1>
        <div className="flex gap-5 my-3">
            <p className="font-bold">by {postInfo.author.username}</p>
            <time className="text-slate-400">{formatISO9075(new Date(postInfo.createdAt))}
        </time>
        </div>
        <div>
        {
              userInfo &&  userInfo.id===postInfo.author._id &&(
                    <div className="flex gap-5 items-baseline ">
                        <div className="my-5 flex ">
                            <Link to={`/edit/${postInfo._id}`} className=" md:px-4 px-2 md:py-2 py-1 bg-slate-500 rounded-md text-slate-50 text-sm">
                                <div className='flex gap-2 items-baseline'>
                    
                                    <div>Edit this Post</div>
                                    <div><FiEdit3 className="mt-1" /></div>
                                </div>
                            </Link>
                        </div>
                        <div className="my-5 flex">
                        <Link to={'/'} className="border md:px-4 px-2 md:py-2 py-1 bg-slate-500 rounded-md text-slate-50 text-sm" onClick={deletePost}>
                          
                          <div className='flex gap-2 items-baseline'>
                    
                                    <div>Delete this Post</div>
                                    <div><RiDeleteBin5Line className="mt-1" /></div>
                                </div>
                          
                          
                          </Link>
                        </div>
                    </div> 
                )
            }
        </div>
        
          
        <div
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
          className="text-justify leading-relaxed"
        />
      </div>
    </div>
  );
};

export default PostPage;
