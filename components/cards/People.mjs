import {useContext} from 'react';
import { Avatar } from "antd"; 
import { List } from 'antd';


import {useRouter} from 'next/router'; 
import {UserContext} from '../../context/index.mjs';  
import { imageSource } from '../../functions/index.mjs';
import Link from 'next/link';



const People =({people,handleFollow,handleUnfollow})=>{  
    
    const [state]=useContext(UserContext); 

    const router=useRouter(); 

   

    return ( 
        <>  


          <List itemLayout="horizontal" dataSource={people} 
         renderItem={(user)=>(
            <List.Item>
                <List.Item.Meta  
                    avatar={<Avatar src={imageSource(user)}/>}
                    title={
                            <div className='d-flex justify-content-between'> 
                                  
                               <Link href={`/user/${user.username}`} legacyBehavior> 
                                  <a> {user.username}  </a>
                               
                               </Link>

                                
                                 {" "}  
                             

                                {state && state.user && user.followers && user.followers.includes(state.user._id)  ?  
                                ( 
                                  <span onClick={()=>handleUnfollow(user)}
                                className='text-primary pointer'> 
                                Unfollow 
                                </span>) : 
                                ( 
                                    <span onClick={()=>handleFollow(user)}
                                    className='text-primary pointer'>
                                        Follow
                                    </span>
                                )
                            }
                            </div>}
                />
            </List.Item>
         )}
         />
         
         </>
    )
} 

export default People;