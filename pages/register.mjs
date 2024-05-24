import {useState,useContext} from "react"; 
import axios from 'axios'; 
import {toast} from "react-toastify"; 

import {Modal} from "antd";
import Link from "next/link";
import { UserContext } from "../context/index.mjs";

import AuthForm from "../components/forms/AuthForm"; 
import { useRouter } from "next/router"; 
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBSelect,MDBText } from 'mdb-react-ui-kit';

const Register=()=> {  
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [secret,setSecret]=useState("");  
    const [ok,setOk]=useState(false); 

    const[loading,setLoading]=useState(false);
    
    const [state,setState]=useContext(UserContext);  
    const router=useRouter();

     const handleSubmit= async(e)=> { 
        e.preventDefault();  
        try{ 

          setLoading(true);
        // console.log(name,email,password,secret); 
        // const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,{ 
            //name:name - when key and value same , no need to write like this . 

            const {data}=await axios.post(`https://mern-back-hxv3.onrender.com/register`,{ 
            name,   
            email, 
            password,
            secret,
    
           });  

           if(data.error){ 
            toast.error(data.error); 
            setLoading(false);
           } 
           else{
           setName("")
           setEmail("")
           setPassword("")
           setSecret("")
           setOk(data.ok); 
           setLoading(false); 
           }
        } 
      catch(err) {
        
             toast.error(err.response.data); 
             setLoading(false);
      }
        
     };
    
     if(state && state.token) router.push("/");

    return( 
         

        <MDBContainer fluid className="p-3 my-5 h-custom">
  <MDBRow className="justify-content-center">
   
    
   
    <MDBCol xs="12" md="4" className="text-center"> 
   
      <div className="d-flex flex-column align-items-center justify-content-center">
         

        {/* bg-danger bg-gradient */}
           <div > 
             <div > 
             {" "}
                 <h1>Register</h1> 
                 {" "}
              </div>
            </div>  
         
          {/* {loading ?<h1>Loading</h1>:""} */}
               

        
               
                 

                <AuthForm 
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


<div className="text-center text-md-start mt-4 pt-2">
          <p className="fw-bold mt-2 pt-1 mb-4">
                  Already registered? {" "}
                   <Link href="/login" legacyBehavior>
                       <a >Login</a>  
                    </Link>
                    </p>
                  </div>

                  </div>


                 <div className="row">  
                  <div className="col">
                   <Modal 
                     title="Congratulations!"
                     visible={ok} //ok var which has true value in success
                     onCancel={()=> setOk(false)} 
                     footer={null}
                     > 
                    <p>You have successfully registered.</p>

                    <Link href="/login" legacyBehavior>
                       <a className="btn btn-secondary btn-sm">Login</a>  
                    </Link>

                   </Modal>
                  </div> 
                  </div>
                  
        


                  </MDBCol>  
                  <MDBCol xs="12" md="6" className="text-center">
      <img src="/images/post.jpg" className="img-fluid" alt="Sample image" />
    </MDBCol> 
    
    
  
    </MDBRow>
  </MDBContainer>
                 
        
    );
};
export default Register;