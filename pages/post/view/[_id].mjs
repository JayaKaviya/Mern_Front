

import ParallaxBG from "../../../components/cards/ParallaxBG.mjs";
import axios from "axios"; 
import PostPublic from "../../../components/cards/PostPublic.mjs"  

import Head from "next/head"; 


const SinglePost=({post})=>{ 
   
    const head=()=>(
        <Head> 
        <title>LETSCONNECT - A social network by Jaya Kaviya</title> 
        <meta 
              name="description"  
              content={post.content}
        />  

        
        <meta  
        property="og:description" 
        content="A social network by Developer JayaKaviya" 
        /> 

        <meta property="og:type" content="website" /> 
        <meta property="og:site_name" content="LETSCONNECT" />  
        <meta property="og:url" content={`https://mern-front-rprc.onrender.com/post/view/${post._id}`}/> 
        <meta 
           property="og:image:secure_url" 
           content={imageSource(post)}  
        /> 

      </Head>

    ); 


     const imageSource=(post)=>{ 
        if(post.image){ 
            return post.image.url; 
        }
        else{ 
         return '/images/logo.png';  
        }
    }; 

    return( 
     <>   
       
       {head()}
     
     <ParallaxBG url="/images/post_page.jpg" children ="POST" />   


  


    <div className="container"> 
    <div className="row pt-5">  

     
      <div className="col-md-8 offset-md-2">
       
      <PostPublic key={post._id} post={post} inSinglePost />

          
        </div>
  

    </div>
    </div> 
    <div style={{ marginBottom: "100px" }}> " " </div>


     </>
    );
}; 
 

export async  function getServerSideProps(ctx){  
   
    const {data}=await axios.get(`https://mern-back-hxv3.onrender.com/api/post/${ctx.params._id}`); 
    
    return{ 
       props: { 
        post: data,
       },
    };
}
export default SinglePost;