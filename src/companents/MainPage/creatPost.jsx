import React, { Component } from 'react';
import "./MainPage.css";
import uploadImage from "../../images/upload.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import LinearProgress from '@mui/material/LinearProgress';
import PostUser from "../Post/PostUser"
// import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemText } from '@material-ui/core';
import { Grid } from "@mui/material";
const userAuth=JSON.parse(localStorage.getItem('users')).uid

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
            open: false, 
            locationPath: "",
            text: "",
            imageProgressBar: 0,
            otherProgressBar: 0,
        
         }
    }

    componentDidMount(){
        this.getPost();
    
    }

    getPost=()=>{ 
        const thisContext=this;
        fetch(`http://localhost:8080/post/${userAuth}`)
            .then(response => response.json())
            .then(data => {
                thisContext.setState({postArray: data}); 
       
                console.log(data);
        });

       
    }

    handleOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    handleLocationPathChange = (event) => {
        this.setState({ locationPath: event.target.value });
    }

    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    }
    // upload=(event)=>{
    //     let image=event.target.files[0];
    //     const thisContext=this;
    //     if(image == null || image == undefined)
    //         return;

    //     const storage = getStorage();
    //     const storageRef = ref(storage, image.name);
    //     const uploadTask = uploadBytesResumable(storageRef, image);
    // //    const uploadTask = storage.ref("images").child(image.name).put(image);
    //     uploadTask.on(
    //       "state_changed",
    //       function (snapshot) {
    //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         thisContext.setState({progressBar: progress});
    //       },
    //       function (error) {
    //       },
    //       function () {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log('File available at', downloadURL);
              
    //             let payload = {
    //                 "postId": Math.floor(Math.random()*100000).toString(),
    //                 "userId": JSON.parse(localStorage.getItem('users')).uid,
    //                 "postPath": downloadURL,
    //                 "timeStamp": new Date().getTime(),
    //                 "likeCount": 0
    //             }
    
    //             const requestOptions ={
    //                 method: "POST",
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body : JSON.stringify(payload),
    //             }
    
    //             fetch("http://localhost:8080/post",requestOptions)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 thisContext.getPost();
    //             })
    //             .catch(error =>{
    
    //             })
                
    //         })
    //         }
    //     );
    // }

    uploadImage = (imageFile) => {
        const storage = getStorage();
        const imageStorageRef = ref(storage, imageFile.name);
        const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile);
    
        return new Promise((resolve, reject) => {
          imageUploadTask.on(
            "state_changed",
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.setState({ imageProgressBar: progress });
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(imageUploadTask.snapshot.ref);
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      };
    
    uploadOtherFile = (otherFile) => {
        const storage = getStorage();
        const otherStorageRef = ref(storage, otherFile.name);
        const otherUploadTask = uploadBytesResumable(otherStorageRef, otherFile);
    
        return new Promise((resolve, reject) => {
          otherUploadTask.on(
            "state_changed",
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.setState({ otherProgressBar: progress });
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(otherUploadTask.snapshot.ref);
                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            }
          );
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const imageFile = event.target.elements.imageFile.files[0];
        const otherFile = event.target.elements.otherFile.files[0];
        const text = event.target.elements.text.value;
        const location = event.target.elements.locationPath;
    
        if (!imageFile || !otherFile || !text.trim()) {
          console.log("Please select all files and enter the text.");
          return;
        }
    
        try {
          const imagePath = await this.uploadImage(imageFile);
          const otherFilePath = await this.uploadOtherFile(otherFile);
    
          const db = getFirestore();
          const postsRef = collection(db, "posts");
          const now = new Date()
          const payload = {
            postId: Math.floor(Math.random() * 100000).toString(),
            userId: JSON.parse(localStorage.getItem("users")).uid,
            postPath: imagePath,
            file: otherFilePath,
            information: text,
            location:location,
            localDate:now,
            likeCount: 0,

          };
    
          const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          };
    
          const response = await fetch("http://localhost:8080/post", requestOptions);
          const data = await response.json();
          console.log("Post added successfully!", data);
    
        //   await addDoc(postsRef, payload);
        //   console.log("Post added successfully!");
    
          // Clear the input fields and progress bars
          event.target.reset();
          this.setState({ imageProgressBar: 0, otherProgressBar: 0 });
        } catch (error) {
          console.error("Error occurred while uploading files:", error);
        }
      };
  
      
   

    render() { 
        console.log();
        return ( 
            <div>
                {/* <div className="mainpage__container">  
                    <div className="mainpage__divider"></div>
                    <div className="fileupload">
                        <label for="file-upload" >
                            <img className="mainpage__uploadicon" src={uploadImage} />
                        </label>
                         <input onChange={this.upload} id="file-upload" type="file"/>
                     </div>
                    <div className="mainpage__divider"></div>   
                </div> */}
                <LinearProgress variant="buffer" value={this.state.progressBar} valueBuffer={this.state.progressBar} />
                <div className="upload_text">{this.state.progressBar}</div>
                <div> This is now data :  {this.state.timeStamp}</div>

                <Button onClick={this.handleOpen} variant="contained" endIcon={<AddBoxIcon />} sx={{borderRadius:"15px",width:" 115px", height: "40px"}}>Creat</Button>
  


                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="xs" fullWidth>
                   <DialogTitle>Followings</DialogTitle>
                   <DialogContent>
          <DialogContentText>
            Here is a list of your followings:
          </DialogContentText>

          <form onSubmit={this.handleSubmit}>
        <div>
          <input type="file" name="imageFile" />
          <progress value={this.state.imageProgressBar} max="100" />
        </div>
        <div>
          <input type="file" name="otherFile" />
          <progress value={this.state.otherProgressBar} max="100" />
        </div>
        <div>
          <input type="text" name="text" placeholder="Enter text..." />
        </div>

       <div>
          
            <input type="text" name="location"  placeholder="Enter text..." />
       </div>

        <div>
          <button type="submit">Upload</button>
        </div>

 
      </form>

              
    

                
                   </DialogContent>
                   <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
                   </DialogActions>
                </Dialog>



                {
    
                    this.state.postArray.map((item,index)=>(
                        <PostUser id1={item.id} id={item.postId} userName={item.userName} postImage={item.postPath} likes={item.likeCount} time={item.timeStamp} />
                        
                        ))
                }
                     
               
            </div>
         );
    }
}
 
export default MainPage;