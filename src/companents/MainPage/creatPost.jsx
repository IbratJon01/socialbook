import TextField from '@mui/material/TextField';
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import Input from '@mui/material/Input';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
const userAuth=JSON.parse(localStorage.getItem('users')).uid
const ariaLabel = { 'aria-label': 'description' };
const iconStyle = {  display: 'flex', alignItems: 'center', justifyContent: 'center'  };
const iconSize ={ fontSize: 50}
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[],
            progressBar: "",
            open: false, 
            location: "",
            text: "",
            imageProgressBar: 0,
            otherProgressBar: 0,
            uploading: false,
            uploadedImage: null,
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
 
    handleTextChange = (event) => {
        this.setState({ text: event.target.value });
    }
    handleImageChange = (event) => {
      const imageFile = event.target.files[0];
      if (!imageFile) return;
      const reader = new FileReader();
  
      reader.onloadend = () => {
        this.setState({ uploadedImage: reader.result });
      };
  
      reader.readAsDataURL(imageFile);
    };

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
        const location = event.target.elements.location.value;
    
        if (!imageFile || !otherFile || !text.trim() ) {
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
    
       

                <Button onClick={this.handleOpen} variant="contained" endIcon={<AddBoxIcon />} sx={{borderRadius:"15px",width:" 115px", height: "40px"}}>Creat</Button>
  


                <Dialog open={this.state.open} onClose={this.handleClose} maxWidth="xs" fullWidth>
                   <DialogTitle>Followings</DialogTitle>
                   <DialogContent>
        
          

          <form onSubmit={this.handleSubmit}>
            <Card sx={{ marginTop: 5 }}>
           <CardHeader
             avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subheader={ <div>
          <Input name="location"  placeholder="Enter location..." inputProps={ariaLabel} />
        </div> }
           />
             <div>
          {this.state.uploadedImage ? (
            <CardMedia
              component="img"
              height="20%"
              src={this.state.uploadedImage}
              alt="Uploaded Image"
            />
          ) : (
            <>
               <div>
          {this.state.uploading ? (
            <LinearProgress variant="determinate" value={this.state.imageProgressBar} />
          ) : (
            <>
              <input type="file" onChange={this.handleImageChange} name="imageFile" style={{ display: 'none' }} id="imageFileInput" />
              <label style={iconStyle} htmlFor="imageFileInput">
                <IconButton   component="span" color="primary" aria-label="upload file" title="Upload Other File">
                  <CloudUploadIcon style={iconSize}/>
                </IconButton>
              </label>
            </>
          )}
        </div>
              {/* <input type="file" name="imageFile" onChange={this.handleImageChange} />
              <progress value={this.state.imageProgressBar} max="100" /> */}
            </>
          )}
        </div>
            <CardContent>
        <Typography variant="body2" color="text.secondary">
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
          variant="standard"
          style={ {width: '350px'} }
 
        />
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <div>
          {this.state.uploading ? (
            <LinearProgress variant="determinate" value={this.state.otherProgressBar} />
          ) : (
            <>
              <input type="file" name="otherFile" style={{ display: 'none' }} id="otherFileInput" />
              <label htmlFor="otherFileInput">
                <IconButton component="span" color="primary" aria-label="upload file" title="Upload Other File">
                  <AttachFileIcon />
                </IconButton>
              </label>
            </>
          )}
        </div>
        <div className="uploadButton">
          <Button type="submit" variant="contained" endIcon={<DownloadForOfflineIcon />}>Upload</Button>
        </div>
            </CardActions>
             </Card>
       
        {/* <div>
    
          <input type="file" name="imageFile" />
          <progress value={this.state.imageProgressBar} max="100" />
        </div>
        <div>
          {this.state.uploading ? (
            <LinearProgress variant="determinate" value={this.state.otherProgressBar} />
          ) : (
            <>
              <input type="file" name="otherFile" style={{ display: 'none' }} id="otherFileInput" />
              <label htmlFor="otherFileInput">
                <IconButton component="span" color="primary" aria-label="upload file" title="Upload Other File">
                  <AttachFileIcon />
                </IconButton>
              </label>
            </>
          )}
        </div>
        <div>
          <input type="text" name="text" placeholder="Enter text..." />
        </div>

       <div>
          
            <input type="text" name="location"  placeholder="Enter text..." />
       </div> */}

      

 
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