import {useEffect, useState} from "react"; 
import axios from 'axios'; 

import {useRouter} from "next/router";  
import PostForm from "../../../components/forms/PostForm";
import UserRoute from "../../../components/routes/UserRoute";
import { toast } from "react-toastify"; 
import Link from "next/link";
import { RollbackOutlined } from '@ant-design/icons';

const EditPost=()=>{ 
    
    const [post,setPost]=useState({});
    const router=useRouter();
   
    const _id=router.query._id; 

    const [content, setContent] = useState("");  
    const [image,setImage]=useState({}); 
    const [uploading,setUploading]=useState(false); 

    useEffect(()=>{ 
        if (_id) fetchPost();
    },[_id])
      
    const fetchPost=async()=>{ 
         
        try{ 
           
            const {data}=await axios.get(`https://mern-back-hxv3.onrender.com/api/user-post/${_id}`); 
            setPost(data);
            setContent(data.content); 
            setImage(data.image);

        }catch(err){ 
            console.log(err);
        }
    };
    
    const postSubmit=async(e)=>{ 

      e.preventDefault(); 
   

     try{ 

        const {data}=await axios.put(`https://mern-back-hxv3.onrender.com/api/update-post/${_id}`,{content,image}); 

        if(data.error){
            toast.error(data.error);
        }else{ 
            toast.success('Post updated'); 
            router.push("/user/dashboard");
        }  

           setPost(data);
            setContent(data.content); 
            setImage(data.image);

       

     }catch(err){ 
        console.log(err);
     }
    }

    const handleImage = async (e) =>{ 

        const file=e.target.files[0]; 
        let formData=new FormData(); 
        formData.append('image',file);  
        setUploading(true);

        try {
            const {data}= await axios.post("https://mern-back-hxv3.onrender.com/api/upload-image", formData);
          
           
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


    
    return (
      

        <UserRoute>
        <div className="container-fluid">  
            <div className="row py-5 text-light bg-default-image"> 
                <div className="col text-center"> 
                    <h1>UPDATE POST</h1>
                </div>
            </div>  
            
            <div className="row py-3"> 
                <div className="col-md-8 offset-md-2"> 
                    <PostForm 
                        content={content}  
                        setContent={setContent} 
                        postSubmit={postSubmit} 
                        handleImage={handleImage} 
                         uploading={uploading}  
                         image={image}
                    />  
                </div>
                            
                <Link href="/user/dashboard"legacyBehavior>
            <a className='d-flex justify-content-center pt-5'>
               <RollbackOutlined /> 
                </a>
        </Link>
            </div>
        </div>
    </UserRoute>
    )
}; 
export default EditPost;