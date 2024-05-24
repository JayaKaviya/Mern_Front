// Home.js
import { useContext, useState,useEffect} from "react";
import { UserContext } from "../../context/index.mjs";
import UserRoute from "../../components/routes/UserRoute.mjs"; 
import { useRouter } from "next/router";
import PostForm from "../../components/forms/PostForm.mjs";
import axios from 'axios'; 
import {toast} from 'react-toastify'; 

import PostList from '../../components/cards/PostList.mjs';
import People from "../../components/cards/People.mjs"; 

import Link from 'next/link';  

import CommentForm from "../../components/forms/Commentform"; 

import {Modal,Pagination} from "antd"; 

import SearchUser from "../../components/SearchUser.mjs"; 

import io from "socket.io-client"
 
const socket=io(process.env.NEXT_PUBLIC_SOCKETIO,{ 
   reconnection : true, //to reconnect automaticaly
}) 






const Home = () => { 
    const [state, setState] = useContext(UserContext); 
    //state
    const [content, setContent] = useState("");  
    const [image,setImage]=useState({}); 
    const [uploading,setUploading]=useState(false); 

    //posts 
    const [posts,setPosts]=useState([]); 

    //people 
    const [people,setPeople]=useState([]);  

    //comment 
    const [comment,setComment]=useState('');
    const [visible,setVisible]=useState(false); //modal visiblity
    const [currentPost,setCurrentPost]=useState({}); //current post to comment
   
    
    //pagination 
    const [totalPosts,setTotalPosts]=useState(0);
    const [page,setPage]=useState(1);



    const router = useRouter();  

    useEffect(()=>{ 
       if(state && state.token)
       { newsFeed();  
        findPeople();
       }
    },[state && state.token,page]);
         
  
    useEffect(()=>{  
          try{                    //we can also use then instead of async await 
            axios.get('https://mern-back-hxv3.onrender.com/total-posts').then(({data}) => setTotalPosts(data) );
          } 
          catch(err){ 
            console.log(err)
          }
},[])


    const newsFeed=async()=>{ 
        try{ 
            const {data}=await axios.get(`https://mern-back-hxv3.onrender.com/news-feed/${page}`) 
            // console.log('user posts', data) 
            //user posts

    
            setPosts(data);
        }catch(err){ 
            console.log(err)
        }
    }
    
    const findPeople=async()=>{ 
        try{ 
            const {data}=await axios.get('https://mern-back-hxv3.onrender.com/find-people'); 
            setPeople(data);
        }
        catch(err){ 
            console.log(err);
        }
    }





    const postSubmit = async(e) => { 
        e.preventDefault(); 
        // console.log('post =>', content); 

        try{ 
             const {data}= await axios.post('https://mern-back-hxv3.onrender.com/create-post',{content,image}); 
            //  console.log("create data response =>",data) 

             if(data.error){ 
                toast.error(data.error)
             }
             else{  

                setPage(1); //go to page 1 if user submited a post
                newsFeed();
                toast.success('Post created') 
                setContent(""); 
                setImage({}); 

                //socket 
                socket.emit("new-post",data);
             }
        }catch(err){ 
              console.log(err);
        }
    }; 
    
    const handleImage = async (e) =>{ 

        const file=e.target.files[0]; //single image from arr 
        let formData=new FormData(); 
        formData.append('image',file); //key,actual file  
        // formData.append('content',content); 

        // console.log([...formData]); 
        
        setUploading(true); 
      
        //     const { url, public_id } = response.data; // Accessing 'url' and 'public_id' directly
        //     console.log("uploaded image =>", url, public_id);

        try {
            const {data}= await axios.post("https://mern-back-hxv3.onrender.com/upload-image", formData);
          
            // console.log("uploaded image =>", data); 
            setImage({ 
                url : data.url, 
                public_id : data.public_id,
            })
            setUploading(false); 

        } catch (err) {
            console.error("Error uploading image:", err); 
            setUploading(false);
        }
        
    }  

     
    
    
    


    const handleDelete=async(post)=>{ 
        try{ 
            const answer=window.confirm('Are you sure you want to delete this post?') 
            if(!answer) return; 

            const {data}=await axios.delete(`https://mern-back-hxv3.onrender.com/delete-post/${post._id}`); 
            toast.error('Post deleted') 
            newsFeed();

        }catch(err){ 
           console.log(err);
        }
    }
 
      const handleFollow =async(user)=>{ 
        // console.log('add this user to following list',user); 
        try{ 
           const {data}=await axios.put('https://mern-back-hxv3.onrender.com/user-follow',{_id:user._id}); 
           //    console.log('Handle follow response =>',data); 

            //update local storage,user & keep token 
              let auth=JSON.parse(localStorage.getItem("auth")); 
              auth.user=data; 
              localStorage.setItem("auth",JSON.stringify(auth));

            //update context 
              setState({...state,user:data})
            
            //update people state                (followed user will not be there)
              let filtered=people.filter((p)=> p._id !== user._id); 
              setPeople(filtered); 

            // re-render posts in newsfeed 
             newsFeed();
             toast.success(`Following ${user.name}`);
        }catch(err){ 
           console.log(err);
        }
      } 

    
      const handleLike =async(_id)=>{ 
         
        // console.log('like this post =>',_id); 
        try{ 
          
          const {data}=await axios.put('https://mern-back-hxv3.onrender.com/like-post',{_id}); 
        //   console.log('liked', data); 
          newsFeed();

        }
        catch(err){ 
            console.log(err)
        }
      } 

      const handleUnlike =async(_id)=>{ 
         
        // console.log('unlike this post =>',_id); 
        try{ 
          
            const {data}=await axios.put('https://mern-back-hxv3.onrender.com/unlike-post',{_id}); 
            // console.log('unliked', data); 
            newsFeed();
  
          }
          catch(err){ 
              console.log(err)
          }
      }
     

      const handleComment=(post)=>{ 
         setCurrentPost(post);
         setVisible(true);
      }

      const addComment=async(e)=>{ 
          e.preventDefault(); 
        //   console.log('add comment to post id',currentPost._id) 
        //   console.log('save comment to db',comment) 

        try{ 
             const {data}=await axios.put('https://mern-back-hxv3.onrender.com/add-comment',{ 
                postId: currentPost._id, 
                comment,
             }); 
             console.log('add comment',data) 
             setComment('');
             setVisible(false); 
             newsFeed();
        }catch(err){ 
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
              newsFeed();
        } catch(err){ 
            console.log(err);
        }
    };




    return(  
        <UserRoute>
            <div className="container-fluid">  
                <div className="row py-5 text-light bg-default-image"> 
                    <div className="col text-center"> 
                        <h1>Newsfeed</h1>
                    </div>
                </div>  
                
                <div className="row py-3"> 
                    <div className="col-md-8"> 
                        <PostForm 
                            content={content}  
                            setContent={setContent} 
                            postSubmit={postSubmit} 
                             handleImage={handleImage} 
                             uploading={uploading}  
                             image={image} 
                             
                        />  
                        <br/> 

                        <PostList 
                           posts={posts} 
                           handleDelete={handleDelete} 
                           handleLike={handleLike} 
                           handleUnlike={handleUnlike} 
                           handleComment={handleComment} 
                           removeComment={removeComment}
                        />  
{/* 
{posts.map((post) => (
    <Post 
        key={post._id} 
        post={post} 
        handleDelete={handleDelete} 
        handleLike={handleLike} 
        handleUnlike={handleUnlike} 
        handleComment={handleComment} 
        removeComment={removeComment} // Pass removeComment as a prop
    />
))} */}


                        {/* {totalPosts} */}
{/* 
                        <Pagination current={page} 
                          total={(totalPosts/3)*10} 
                          onChange={(value)=>setPage(value)} 
                        /> */} 

                      <Pagination 
                        current={page} 
                        total={totalPosts} // Display the total number of posts
                        pageSize={3} // Number of posts per page
                        onChange={(value) => setPage(value) 
                       }  className="pb-5"
                      />


                    </div>
                                                {/* readable json format */}
                     {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}

                    

                    <div className="col-md-4"> 
                      <SearchUser /> 
                      <br/>
                        {state && state.user && state.user.following &&
                         (
                         <Link href={`/user/following`} legacyBehavior> 
                         <a className="h6"> {state.user.following.length} Following</a>
                         </Link>
                         )}
                        {/* <pre>{JSON.stringify(people,null,4)}</pre>   */} 
                        <People people={people} handleFollow={handleFollow} />
                    </div>
                </div> 

                <Modal 
                visible={visible} 
                onCancel={()=>setVisible(false)} 
                title="Comment" 
                footer={null} //okay cancel will not be shown
                > 
                
                {/* Show Comment Form */} 

             <CommentForm comment={comment} 
             addComment={addComment} 
             setComment={setComment}
              />
                </Modal>

            </div>
        </UserRoute>
    );
};

export default Home;
