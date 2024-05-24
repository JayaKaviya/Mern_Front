import {useState,useContext} from "react"; 
import axios from 'axios'; 
import {toast} from "react-toastify"; 

import {Modal} from "antd";
import Link from "next/link";
import { UserContext } from "../../context/index.mjs"
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm.mjs";
import { useRouter } from "next/router";
import { set } from "mongoose"; 
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBText } from 'mdb-react-ui-kit';

const ForgotPassword=()=> {  
  
    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [secret,setSecret]=useState("");  
    const [ok,setOk]=useState(false); 

    const[loading,setLoading]=useState(false);
    
    const [state,setState]=useContext(UserContext);  
    const router=useRouter();

     const handleSubmit= async(e)=> { 
        e.preventDefault();  
        try{ 

          setLoading(true);
            const {data}=await axios.post(`/forgot-password`,{ 
            
            email, 
            newPassword,
            secret,
    
           });  
           console.log("forgot password response data =>", data)
           if(data.error){ 
            toast.error(data.error); 
            setLoading(false);
           } 

           if(data.success)
           { 
            setEmail(""); 
            setNewPassword(""); 
            setSecret(""); 
            setOk(true);
            setLoading(false);
           }
        } 
      catch(err) {
            
        console.log(err)
            //  toast.error(err.response.data); 
             setLoading(false);
      }
        
     };
    
     if(state && state.token) router.push("/");

    return( 
      <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow className="justify-content-center">
        <MDBCol xs="12" md="6" className="text-center">
          <img src="/images/fp.png" className="img-fluid" alt="Sample image" />
        </MDBCol> 
        
        
       
        <MDBCol xs="12" md="4" className="text-center"> 
       
          <div className="d-flex flex-column align-items-center justify-content-center">
            
        {/* bg-danger bg-gradient */}
           <div > 
             <div > 
                 <h1>Forgot Password</h1>
              </div>
            </div>  
         <br/>
          {/* {loading ?<h1>Loading</h1>:""} */}
               

    

                <ForgotPasswordForm
                handleSubmit={handleSubmit} 
               
                email={email} 
                setEmail={setEmail} 
                newPassword={ newPassword} 
                setNewPassword={setNewPassword} 
                secret={secret} 
                setSecret={setSecret} 
                loading={loading}
                />


               

                 <div className="row">  
                  <div className="col">
                   <Modal 
                     title="Congratulations!"
                     visible={ok} //ok var which has true value in success
                     onCancel={()=> setOk(false)} 
                     footer={null}
                     > 
                    <p>Congrats! You can now login with your new password</p>

                    <Link href="/login" legacyBehavior>
                       <a className="btn btn-secondary btn-sm">Login</a>  
                    </Link>

                   </Modal>
                  </div> 
                  </div>
                  
              


                 </div> 
                 </MDBCol> 
    
  
    </MDBRow>
  </MDBContainer>
        
    );
};
export default ForgotPassword;