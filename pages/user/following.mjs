import {useContext,useState,useEffect} from 'react';
import { Avatar } from "antd"; 
import { List } from 'antd';
import axios from 'axios'; 

import {useRouter} from 'next/router'; 
import {UserContext} from '../../context/index.mjs';  
import { RollbackOutlined } from '@ant-design/icons';
import Link from 'next/link';


const Following =()=>{  
    
    const [state,setState]=useContext(UserContext);  

    //state 
    const [people,setPeople]=useState([]); 

    useEffect(()=>{ 
        if(state && state.token) fetchFollowing();

    },[state && state.token]); 


    const fetchFollowing=async()=>{ 
        try{ 
            const {data}=await axios.get("https://mern-back-hxv3.onrender.com/api/user-following"); 
            console.log('following =>',data); 
            setPeople(data);
        }catch(err){ 
           console.log(err);
        }
    }

    const router=useRouter(); 

    const imageSource=(user)=>{ 
        if(user.image){ 
            return user.image.url; 
        }
        else{ 
         return '/images/logo.jpg';  
        }
    }; 

    const handleUnfollow=async(user)=>{ 
       
        try{ 
             const {data}=await axios.put('https://mern-back-hxv3.onrender.com/api/user-unfollow',{_id :user._id}); 

               //update local storage,user & keep token 
               let auth=JSON.parse(localStorage.getItem("auth")); 
               auth.user=data; 
               localStorage.setItem("auth",JSON.stringify(auth));
 
             //update context 
               setState({...state,user:data})
             
             //update people state                (followed user will not be there)
               let filtered=people.filter((p)=> p._id !== user._id); 
               setPeople(filtered); 
 
               toast.error(`Unfolllowed ${user.name}`); 

        }catch(err){ 
            console.log(err);
        }
    }

    return ( 
        <div className="row col-md-6 offset-md-3">

       {/* <pre>{JSON.stringify(people,null,4)}</pre>      */}
        
          <List itemLayout="horizontal" dataSource={people} 
         renderItem={(user)=>(
            <List.Item>
                <List.Item.Meta  
                    avatar={<Avatar src={imageSource(user)}/>}
                    title={
                            <div className='d-flex justify-content-between'>
                                {user.username} 
                                <span onClick={()=>handleUnfollow(user)}
                                className='text-primary pointer'>Unfollow</span>
                            </div>}
                />
            </List.Item>
         )}
         />
         <Link href="/user/dashboard"legacyBehavior>
            <a className='d-flex justify-content-center pt-5'>
               <RollbackOutlined /> 
                </a>
        </Link>
         </div>
    )
} 

export default Following;