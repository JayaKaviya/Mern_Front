import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios'; 

import Post from "../../components/cards/Post.mjs";
import { RollbackOutlined } from "@ant-design/icons"; 
import Link from "next/link";


const PostComments =()=>{  

   const [post,setPost] = useState({});
    const router=useRouter();  
    const _id =router.query._id; 

    useEffect(()=>{ 
        if(_id) fetchPost();
    },[_id]); 

    const fetchPost=async ()=>{ 
        try{ 
           const {data}=await axios.get(`https://mern-back-hxv3.onrender.com/user-post/${_id}`); 
           setPost(data);
        } 
        catch(err){ 
            console.log(err)
        }
    } 
     
    const removeComment=async(postId,comment)=>{ 
        //  console.log(postId,comment); 
         
        let answer=window.confirm("Are you sure ?"); 
        if(!answer) return;
        try{ 
              const {data}=await axios.put('https://mern-back-hxv3.onrender.com/remove-comment',{ 
                postId, 
                comment,
              }); 
              console.log('comment deleted',data); 
              fetchPost();
        } catch(err){ 
            console.log(err);
        }
    };




   return (  
   <div className="container-fluid">  
           <div className="row py-5 text-light bg-default-image"> 
          <div className="col text-center"> 
           <h1>COMMENTS</h1>
          </div>
        </div>   

        <div className="container col-md-8 offset-md-2 pt-5">
           <Post post={post} commentsCount={100} removeComment={removeComment}/> 
           </div> 


           <Link href="/user/dashboard" legacyBehavior> 
           <a className="d-flex justify-content-center p-5"> 
            <RollbackOutlined/>
           </a>
           </Link>
   </div>) 
      {/* <pre>{JSON.stringify(post,null,4)}</pre>; */}
} 

export default PostComments;