import {useContext} from "react";

 

import {UserContext} from "../../context/index.mjs";  

import { useRouter } from "next/router"; 

 
import Post  from "../cards/Post.mjs"


const PostList=({posts,handleDelete,handleLike,handleUnlike,handleComment,removeComment})=>{  

    const [state]=useContext(UserContext); 
    const router=useRouter();

   return <>
      {/* post list {posts.length} */}
    {
                 // map iterate throught only array not obj
     posts && posts.map((post)=> 
     <Post
       
         key={post._id}
         post={post} 
          handleDelete={handleDelete} 
          handleLike={handleLike} handleUnlike={handleUnlike} 
          handleComment={handleComment} removeComment={removeComment}
     />
         

     )
    
    }</>;
}; 

export default PostList;