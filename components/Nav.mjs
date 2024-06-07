import Link from "next/link"; 
import React, { useState, useContext, useEffect } from 'react';
import { Avatar } from 'antd';  
import { UserContext } from "../context/index.mjs"; 
import { useRouter } from 'next/router';  

const Nav = () => {  
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);   
  const router = useRouter();

  useEffect(() => { 
    setCurrent(router.pathname);
  }, []);

  const logout = () => { 
    window.localStorage.removeItem('auth'); 
    setState(null); 
    router.push("/login");
  } 

  const handleSetActive = (path) => {
    setCurrent(path);
  };

  return( 
    <nav className="nav nav-tabs d-flex justify-content-space-between" style={{ backgroundColor: "#1E88E5", color: "white" }}>
      
      <Link href="/" legacyBehavior>
        <a className={`nav-link logo ${current === "/" && 'active'}`} onClick={() => handleSetActive("/")} style={{  color: "white"}}>
          <Avatar src="/images/logo.png" width="200px"/>{" "}
          LETSCONNECT
        </a> 
      </Link> 

      {state !== null ? (
        <>   
          <Link href="/user/dashboard" legacyBehavior>
            <a className={`nav-link ${current === '/user/dashboard' && 'active'}`} onClick={() => handleSetActive("/user/dashboard")} style={{  color: "white"}}>
              {state && state.user && state.user.name && state.user.name.toUpperCase()} DASHBOARD
            </a> 
          </Link> 

          <Link href="/user/profile/update" legacyBehavior>
            <a className={`nav-link ${current === '/user/profile/update' && 'active'}`} onClick={() => handleSetActive("/user/profile/update")} style={{  color: "white"}}>
              PROFILE
            </a> 
          </Link>  

          {state.user.role==='Admin'&& ( 
            <Link href="/admin" legacyBehavior>
              <a className={`nav-link ${current === '/admin' && 'active'}`} onClick={() => handleSetActive("/admin")} style={{  color: "white"}}>
                ADMIN
              </a> 
            </Link>
          )}

          <a onClick={logout} className="nav-link" style={{  color: "white"}}>LOGOUT</a>
        </> 
      ) : ( 
        <> 
          <Link href="/login" legacyBehavior>
            <a className={`nav-link ${current === '/login' && 'active'}`} onClick={() => handleSetActive("/login")} style={{  color: "white"}}>LOGIN</a> 
          </Link>

          <Link href="/register" legacyBehavior>
            <a className={`nav-link ${current === '/register' && 'active'}` } onClick={() => handleSetActive("/register")} style={{  color: "white"}}>REGISTER</a>
          </Link> 
        </>
      )}

    </nav>
  );
};

export default Nav;
