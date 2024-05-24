import { useState, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Card } from 'antd';
import { Modal } from "antd";
import Link from "next/link";

import AuthForm from "../components/forms/AuthForm.mjs";

import { useRouter } from "next/router";
import { UserContext } from "../context/index.mjs";

import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox,MDBText } from 'mdb-react-ui-kit';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const { data } = await axios.post(`https://mern-back-hxv3.onrender.com/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error)
        setLoading(false)
      } else {
        setState({
          user: data.user,
          token: data.token,
        });
        window.localStorage.setItem('auth', JSON.stringify(data));
        router.push("/user/dashboard");
      }
    }
    catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push("/");

  return ( 
<MDBContainer fluid className="p-3 my-5 h-custom">
  <MDBRow className="justify-content-center">
    <MDBCol xs="12" md="6" className="text-center">
      <img src="/images/draw.svg" className="img-fluid" alt="Sample image" />
    </MDBCol> 
    
    
   
    <MDBCol xs="12" md="4" className="text-center"> 
   
      <div className="d-flex flex-column align-items-center justify-content-center">
        
        <div> 
         <div>
          {" "}
          <h1></h1>
          <h1>Login</h1> 
          {" "}
          <br/>
        </div> 
        </div>
        <div>
          <AuthForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            page="login"
          />
        </div>
        <div className="text-center text-md-start mt-4 pt-2">
          <p className="fw-bold mt-2 pt-1 mb-4">
            <Link href="/user/forgot-password" legacyBehavior>
              <a className="text-danger">Forgot password</a>
            </Link>
          </p>
          <p className="fw-bold mt-2 pt-1 mb-4">
            Don't have an account?{" "}
            <Link href="/register" className="link-danger" legacyBehavior>
              <a>Register</a>
            </Link>
          </p>
        </div>
      </div> 
      
 
    </MDBCol> 
    
  
  </MDBRow>
</MDBContainer>




  
  );
};
export default Login;
