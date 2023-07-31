import React, { Component } from 'react';
import "../MainPage/MainPage.css";
import uploadImage from "../../images/upload.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import LinearProgress from '@mui/material/LinearProgress';
import PostUser from "../Post/PostUser"

const userAuth=JSON.parse(localStorage.getItem('users')).uid

class MainPageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
         
         }
    }

    componentDidMount(){
        this.getPost();
    
    }
 


    getPost=()=>{ 

        const thisContext=this;
       console.log(this.props.userId);
        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
               
                const filteredPosts = data.filter(post => post.userId == this.props.userId);
             
                thisContext.setState({postArray: filteredPosts});
                console.log(filteredPosts);
     
                
        });
    }

    upload=(event)=>{
        let image=event.target.files[0];
        const thisContext=this;
        if(image == null || image == undefined)
            return;

        const storage = getStorage();
        const storageRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);
    //    const uploadTask = storage.ref("images").child(image.name).put(image);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            thisContext.setState({progressBar: progress});
          },
          function (error) {
          },
          function () {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
              
                let payload = {
                    "postId": Math.floor(Math.random()*100000).toString(),
                    "userId": JSON.parse(localStorage.getItem('users')).uid,
                    "postPath": downloadURL,
                    "timeStamp": new Date().getTime(),
                    "likeCount": 0
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("http://localhost:8080/post",requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    thisContext.getPost();
                })
                .catch(error =>{
    
                })
                
            })
            }
        );
    }

    render() { 
        console.log();
        return ( 
            <div>
                {
                    this.state.postArray.map((item,index)=>(
                        <PostUser id1={item.id} id={item.postId} userName={item.userName} postImage={item.postPath} likes={item.likeCount} time={item.timeStamp} postData={item} />
                        ))
                }
                     
               
            </div>
         );
    }
}
 
export default MainPageUsers;