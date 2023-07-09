import React, { Component } from 'react';
import "./Post.css";
import { Avatar } from '@material-ui/core';
import postimage from "../../images/post.jpg"; 
import love from "../../images/love.svg"; 
import comment from "../../images/comment.svg"; 
import share from "../../images/share.svg"; 
import Grid  from '@material-ui/core/Grid';
import Edit from '../Account/edit'
import { getPost } from '../MainPage/MainPage';
import LongMenu from '../Account/LongMenu';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      commentList: [],  
      filteredPosts: [],
      error: null
    }
  }

  componentDidMount(){
    this.getComments();
    getPost()
      .then(filteredPosts => {
        // Handle the filtered posts
        // You can pass the filteredPosts to another function or use them as needed
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

  getComments=() => {
    fetch('http://localhost:8080/comments/'+this.props.id)
      .then(response => response.json())
      .then(data => {
        this.setState({commentList: data});
      });
  }
  
  submitComments =(event) => {
    if(event.key === "Enter") {
      let comment = event.currentTarget.value;
      console.log("Comment:", comment);
      if(comment !== null && comment !== undefined) {
        let payload = {
          "commentId": Math.floor(Math.random()*1000000).toString(),
          "userId": localStorage.getItem("users"),
          "postId": this.props.id,
          "timeStamp": new Date().getTime(),
          "comment": comment
        }
  
        const requestOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
  
        fetch("http://localhost:8080/comments", requestOptions)
          .then(response => response.json())
          .then(data => {
            this.getComments();
            console.log(data);
          })
          .catch(error => {
  
          });
      }
    }
  }

  deletePost = () => {
    const requestOptions = {
      method: 'DELETE',
    };
console.log(this.props.id1);
    fetch(`http://localhost:8080/post/delete/${this.props.id1}`, requestOptions)
      .then(response =>response.text())
      .then(data => {
        
        // Handle the successful deletion
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  };

  
  render() { 
    const { filteredPosts, error } = this.state;
   
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    return ( 
      <div className="post__container">
            
        {/* Header */}
        <div className="post__header">
          <Grid container>
            <Grid item xs={1.5}> 
              <Avatar className="post__image" src="" />
            </Grid>
            <Grid item xs={2}> 
              <div className="post__username">{this.props.userName}{this.props.userId}</div> 
            </Grid>
          </Grid>
          <Grid item xs={1} className='edit'>
            {/* {
              this.state.commentList.map((item,index)=>(
                <Edit />
              ))
            } */}
          
            <LongMenu deletePost={this.deletePost} />
          </Grid>
        </div>


        {/* Image */}
        <div>
          <img src={this.props.postImage} width="615px" /> 
        </div>

        {/* Analytics */}
        <div>
          <div style={{"marginLeft":"10px"}}>
            <img src={love} className="post_reactimage"/>
            <img src={comment} className="post_reactimage"/>
            <img src={share} className="post_reactimage"/>
          </div>
          <div style={{ "fontWeight":"bold","marginLeft":"20px  "}}>
            {this.props.likes} likes     
          </div>
        </div>

        {/* Comment Section */}
        <div>
          {this.state.commentList.map((item,index)=>(
            index < 4 ?
              <div className="post_comment">{item.userName}: {item.comment}</div> :<span></span>
          ))}
          <input type="text" onKeyPress={this.submitComments} className="post__commentbox" placeholder="Add a comment..." />
        </div>
        
          
      </div> 
    );
  }
}
 
export default Post;
