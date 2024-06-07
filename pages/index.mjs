import { useContext } from "react";
import { UserContext } from "../context";
import ParallaxBG from "../components/cards/ParallaxBG.mjs";
import PostPublic from "../components/cards/PostPublic.mjs";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";

const Home = ({ posts }) => {
  const [state] = useContext(UserContext);

  const head = () => (
    <Head>
      <title>LETSCONNECT - A social network by Jaya Kaviya</title>
      <meta
        name="description"
        content="A social network by Developer JayaKaviya"
      />

    
      <meta
        property="og:description"
        content="A social network by Developer JayaKaviya"
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LETSCONNECT" />
      <meta property="og:url" content="https://mern-front-rprc.onrender.com" />
      <meta
        property="og:image:secure_url"
        content="https://mern-front-rprc.onrender.com/images/social_network.jpg"
      />
    </Head>
  );

  return (
    <>
      {head()}
      <ParallaxBG url="/images/social_network.jpg" /> 
      <div className="container">
        {state && state.user ? ( 
          <div className="row pt-5 pb-5">
            {posts.map((post) => (
              <div key={post._id} className="col-md-4  mb-3">
                <Link href={`/post/view/${post._id}`} passHref legacyBehavior>
                  <a style={{ textDecoration: "none" }}> 

                    <PostPublic key={post._id} post={post} /> 

                  </a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
         <div className="row pt-5 pb-5">
         <div className="col-md-8 offset-md-2 text-center">
           <h2 className="mb-4">Welcome !!!</h2>
           <p className="font-weight-bold">
             LETSCONNECT is your social network for connecting with friends, sharing
             stories, and discovering new trends. Whether you're here to stay updated
             on the latest news, connect with like-minded individuals, or share your
             passions, LETSCONNECT has something for everyone.
           </p>
           <p className="font-italic">
             Please <Link href="/login">Login</Link> or{" "}
             <Link href="/register">Register</Link> to see posts.
           </p>
         </div>
       </div>
       

        )}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // const backendUrl = "http://localhost:8000";
  // const { data } = await axios.get(`${backendUrl}/api/posts`);
  const { data } = await axios.get(`https://mern-back-hxv3.onrender.com/api/posts`);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;


































