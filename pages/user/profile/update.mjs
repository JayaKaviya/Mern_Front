import {useState,useContext,useEffect} from "react"; 
import axios from 'axios'; 
import {toast} from "react-toastify"; 

import {Modal,Avatar} from "antd";

import { UserContext } from "../../../context/index.mjs";
import AuthForm from "../../../components/forms/AuthForm.mjs"
import { useRouter } from "next/router"; 
import { LoadingOutlined,CameraOutlined } from "@ant-design/icons";




const ProfileUpdate=()=> {  
    const [username,setUsername]=useState(""); 
    const [about,setAbout]=useState(""); 
    
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [secret,setSecret]=useState("");  
    const [ok,setOk]=useState(false); 
    const [loading,setLoading]=useState(false);

    const [image,setImage]=useState(); 
    const [uploading,setUploading]=useState(false);
    
    const [state,setState]=useContext(UserContext);  
    const router=useRouter();  

    useEffect(()=>{ 
      
      if(state && state.user){ 
         console.log('user from state =>',state.user); 

         setUsername(state.user.username);
         setAbout(state.user.about);
         setName(state.user.name);
         setEmail(state.user.email); 
         setImage(state.user.image);
      }
    },[state && state.user]);

     const handleSubmit= async(e)=> { 
        e.preventDefault();  
        try{ 

          setLoading(true);
          

            const {data}=await axios.put(`https://mern-back-hxv3.onrender.com/api/profile-update`,{  
            username, 
            about,
            name,   
            email, 
            password,
            secret,
            image,
    
           });  
          
          if (data.error){ 
            toast.error(data.error); 
            setLoading(false);
          }
          else{ 
          
        
           let auth=JSON.parse(localStorage.getItem("auth")); 
           auth.user=data;
           localStorage.setItem('auth',JSON.stringify(auth));
           
           
           setState({...state,user:data});  

           setOk(data,ok); 
           setLoading(false);  

          }
        } 
      catch(err) {
        
             toast.error(err.response.data); 
             setLoading(false);
      }
        
     };
    
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

    return( 
        <div className="container-fluid">  
       
           <div className="row py-5 text-light bg-profile-image"> 
             <div className="col text-center"> 
                 <h1 style={{color : 'white'}}>Profile</h1>
              </div>
            </div>  
         
         
               

            <div className="row py-5"> 
               <div className="col-md-6 offset-md-3">
                 
                  
                  <label  className="d-flex justify-content-center h5">  
                   { 
                   image && image.url ? ( 
                    <Avatar size={40} src={image.url} className="mt-1"/>

                   ) : uploading ? 
                   ( <LoadingOutlined className="mt-2"/>) :
                   (<CameraOutlined className="mt-2"/>) 
                   }

                  
                  <input onChange={handleImage} type="file" accept="images/*" hidden/> 
                </label>


                <AuthForm  

                profileUpdate={true}
                username={username} 
                setUsername={setUsername}
                about={about} 
                setAbout={setAbout}

                handleSubmit={handleSubmit} 
                name={name} 
                setName={setName} 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
                secret={secret} 
                setSecret={setSecret} 
                loading={loading}
                />


                </div>
                </div> 

                 <div className="row">  
                  <div className="col">
                   <Modal 
                     title="Congratulations!"
                     visible={ok} 
                     onCancel={()=> setOk(false)} 
                     footer={null}
                     > 
                    <p>You have successfully updated your profile.</p>

                   </Modal>
                  </div> 
                  </div>
                  
                

                 </div>
        
    );
};
export default ProfileUpdate;