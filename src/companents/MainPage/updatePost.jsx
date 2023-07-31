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
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
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
            inputValue: '',
            countries: []
         }
    }

 


    handleOpen = () => {
        this.setState({ open: true });
        const name =  this.props.userName.userName
        console.log(name);
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
    // Rasm va boshqa fayllarni yuklash uchun Firebase storage'ni ishlatish funktsiyasi
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
  
  // Boshqa faylni yuklash uchun Firebase storage'ni ishlatish funktsiyasi
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
  
  // Formani yuborish uchun asosiy funktsiya
  handleSubmit = async (event) => {
    event.preventDefault();
    const imageFile = event.target.elements.imageFile.files[0];
    const otherFile = event.target.elements.otherFile.files[0];
    const text = event.target.elements.text.value;
    const location = event.target.elements.location.value;
  
    // Tekshirish: Hujjatlar va matnni to'ldirish
    if (!imageFile || !otherFile || !text.trim()) {
      console.log("Iltimos, hamma fayllarni tanlang va matnni kiriting.");
      return;
    }
  
    try {
      const imagePath = await this.uploadImage(imageFile);
      const otherFilePath = await this.uploadOtherFile(otherFile);
  
      const db = getFirestore();
      const postsRef = collection(db, "posts");
      const now = new Date();
      const payload = {
        postId: Math.floor(Math.random() * 100000).toString(),
        userId: JSON.parse(localStorage.getItem("users")).uid,
        postPath: imagePath,
        file: otherFilePath,
        information: text,
        location: location,
        localDate: now,
      
        likeCount: 0,
      };
  
      // Hujjatni yangilash uchun PUT HTTP so'rovi uchun URL
      const updateUrl = `http://localhost:8080/post/${payload.postId}`;
  
      const requestOptions = {
        method: "PUT", // PUT HTTP so'rovini ishlatish
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
  
      const response = await fetch(updateUrl, requestOptions);
      const data = await response.json();
      console.log("Post muvaffaqiyatli yangilandi!", data);
  
      // Kiritish maydonlarini va progress barlarni tozalash
      event.target.reset();
      this.setState({ imageProgressBar: 0, otherProgressBar: 0 });
    } catch (error) {
      console.error("Xato yuz berdi: Fayllar yuklanishida xato:", error);
    }
  };
  


  
      
      componentDidMount() {
        axios.get('https://restcountries.com/v2/all').then((response) => {
          const countriesWithFlags = response.data.map((country) => ({
            name: country.name,
            flag: country.flags.svg
          }));
    
          this.setState({
            countries: countriesWithFlags
          });
        });
      }
    
      handleInputChange = (event, newValue) => {
        this.setState({
          inputValue: newValue
        });
      };
    

    render() { 
      const { inputValue, countries } = this.state;
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
             <Autocomplete
          freeSolo
          options={countries.map((country) => country.name)}
          onInputChange={this.handleInputChange}
          renderInput={(params) => <TextField {...params}   id="standard-multiline-flexible"
          label="Country"
          multiline
          type="text" name="location" 
          variant="standard" />}
          renderOption={(props, option) => (
            <li {...props}>
              <img src={countries.find((country) => country.name === option).flag} alt={option} width="20" style={{marginRight:5}} />
              {option}
            </li>
          )}
        />
      
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
           <input onClick={this.handleImageChange} type="file" name="imageFile" style={{ display: 'none' }} id="imageFileInput" />
             <LinearProgress variant="determinate" value={this.state.otherProgressBar} />
           <label style={iconStyle} htmlFor="imageFileInput">
          <IconButton component="span" color="primary" aria-label="upload file" title="Upload Other File">
            <CloudUploadIcon style={iconSize} />
          </IconButton>
        </label>

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
          type="text" name="text" 
          maxRows={4}
          variant="standard"
          style={ {width: '350px'} }
 
        />
        {/* <input type="text" name="location"  placeholder="Enter text..." /> */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
        <label htmlFor="otherFileInput">
          <IconButton component="span" color="primary" aria-label="upload file" title="Upload Other File">
            <AttachFileIcon />
          </IconButton>
        </label>
        </IconButton>
        <div className="uploadButton">
          <Button type="submit" variant="contained" endIcon={<DownloadForOfflineIcon />}>Upload</Button>
        </div>
      </CardActions>
    </Card>

    <div>
     
     </div>


             {/* <div>
    
    <input type="file" name="imageFile" />
    <progress value={this.state.imageProgressBar} max="100" />
             </div> */}
      <div>
         <input type="file" name="otherFile" style={{ display: 'none' }} id="otherFileInput" />
         <LinearProgress variant="determinate" value={this.state.otherProgressBar} />
     </div>
   


{/* 
  <div>
    <button type="submit">Upload</button>
  </div> */}

      

          </form>

              
    

                
                   </DialogContent>
                   <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
                   </DialogActions>
                </Dialog>
            </div>
         );
    }
}
 
export default MainPage;