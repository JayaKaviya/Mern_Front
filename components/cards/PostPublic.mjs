import { useContext } from "react";
import renderHTML from 'react-render-html';
import moment from 'moment';
import { Avatar } from "antd";
import PostImage from "../images/PostImage.mjs";
import { HeartOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import { UserContext } from "../../context/index.mjs";
import { imageSource } from '../../functions/index.mjs';


const PostPublic = ({ post, handleDelete, handleLike, handleUnlike, handleComment, commentsCount = 2, removeComment, inSinglePost }) => {
    const [state] = useContext(UserContext);

    return (
        <div className={`row row-cols-1 row-cols-md-3 g-4 ${inSinglePost ? 'single-post-style' : ''}`}>
            {post && post.postedBy && (
                <div key={post._id} className="col">
                    <div className="card border border-light shadow" style={{ width: inSinglePost ? '900px' : '400px', height: inSinglePost ? '700px' : '500px' }}>
                        <div className="card-header">
                            <Avatar size={40} src={imageSource(post.postedBy)} />
                            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>{post.postedBy.name}</span>
                            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>{moment(post.createdAt).fromNow()}</span>
                        </div> 

                        <div className="card-body" style={{ height: inSinglePost ? '350px' : '250px', overflowY: 'auto' }}>
                            {renderHTML(post.content)}
                            {post.image && <PostImage url={post.image.url} />}
                        </div> 

                        <div className="card-footer bg-transparent" style={{ height: inSinglePost ? '150px' : '100px', overflowY: 'auto' }}>
                            <div className="d-flex align-items-center">
                                {state && state.user && post.likes && post.likes.includes(state.user._id) ? (
                                    <HeartFilled className="text-danger me-2" />
                                ) : (
                                    <HeartOutlined className="text-danger me-2" />
                                )}
                                <span className="text-muted pt-2 pl-3" style={{ marginRight: "1rem" }}>{post.likes.length} likes</span>
                                <CommentOutlined className="text-primary me-2" />
                                <span className="text-muted pt-2 pl-3">{post.comments.length} comments</span>
                            </div>
                        
                        {post.comments && post.comments.length > 0 && (
                            <div className="comments-list">
                                <ul className="list-group list-group-flush" style={{ maxHeight: '80px'}}>
                                    {post.comments.slice(0, commentsCount).map((comment) => (
                                        <li key={comment._id} className="list-group-item border-top border-light" >
                                            <div className="d-flex align-items-center" >
                                                <Avatar size={30} src={imageSource(comment.postedBy)} />
                                                <div className="ms-2">
                                                    <span className="fw-bold">{comment.postedBy.name}</span>
                                                    <p className="mb-0">{comment.text}</p>
                                                    <small className="text-muted" style={{ marginRight: "2rem" }}>{moment(comment.created).fromNow()}</small>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )} 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostPublic;
