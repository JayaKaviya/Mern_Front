import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/index.mjs";
import AdminRoute from "../../components/routes/AdminRoute.mjs"
import { useRouter } from "next/router";
import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import renderHTML from 'react-render-html';

const Admin = () => { 
    const [state, setState] = useContext(UserContext); 
    const [posts, setPosts] = useState([]); 
    const router = useRouter();  

    useEffect(() => { 
       if(state && state.token) { 
           newsFeed();  
       }
    }, [state && state.token]);

    const newsFeed = async () => { 
        try { 
            const { data } = await axios.get(`https://mern-back-hxv3.onrender.com/api/posts`);
            setPosts(data);
        } catch(err) { 
            console.log(err);
        }
    }

    const handleDelete = async (post) => { 
        try { 
            const answer = window.confirm('Are you sure you want to delete this post?');
            if (!answer) return; 

            await axios.delete(`https://mern-back-hxv3.onrender.com/api/admin/delete-post/${post._id}`);
            toast.error('Post deleted');
            newsFeed();
        } catch(err) { 
           console.log(err);
        }
    }

    return(  
        <AdminRoute>
            <div className="container-fluid">  
                <div className="row py-5 text-light bg-default-image"> 
                    <div className="col text-center"> 
                        <h1>ADMIN</h1>
                    </div>
                </div>  

                <div className="row py-4"> 
                    <div className="col-md-8 offset-md-2"> 
                        {posts && posts.map(post => (  
                            <div key={post._id} className="card my-3"> 
                                <div className="card-body">
                                    <div className="card-text">{renderHTML(post.content)}</div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <div><b>{post.postedBy.name}</b></div>
                                        <div 
                                            className="text-danger cursor-pointer" 
                                            onClick={() => handleDelete(post)}
                                        >
                                            Delete
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
};

export default Admin;
