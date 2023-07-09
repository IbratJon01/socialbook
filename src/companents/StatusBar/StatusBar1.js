import React, { Component } from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import { getStatusList } from '../Account/statusa.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusList: [],
    }
  }

  componentDidMount() {
    this.fetchStatusList();
  }

  fetchStatusList = async () => {
    const {  statusId, path, timeStamp } = this.props;
    try {
      const response = await getStatusList( statusId, path, timeStamp);
      const statusList = Array.isArray(response) ? response : [];
      this.setState({ statusList });
      console.log(statusList);
    } catch (error) {
      console.error('Error fetching status list:', error);
    }
  };

  getData=()=>{


    fetch('http://localhost:8080/status')
        .then(response => response.json())
        .then(data => {
            this.setState({statusList: data});
    });
}   



uploadStatus =(event)=>{
    let image=event.target.files[0];
    const thisContext=this;
    if(image == null || image == undefined)
        return;
        const storage = getStorage();
        const storageRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);


    // var uploadTask = storage.ref("status").child(image.name).put(image);
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
                "statusId": Math.floor(Math.random()*100000).toString(),
                "userId": JSON.parse(localStorage.getItem("users")).uid,
                "path": downloadURL,
                "timeStamp": new Date().getTime()
                  
                  
              }
  
              const requestOptions ={
                  method: "POST",
                  headers: { 'Content-Type': 'application/json' },
                  body : JSON.stringify(payload),
              }
  
              fetch("http://localhost:8080/status",requestOptions)
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
    const { statusList } = this.state;

    return (
      <div>
        <h2>Status List:</h2>
        {statusList.length > 0 ? (
         <div className="statusbar__container">
            {statusList.map((status,item,index) => (  
               <div className="status">
                <Avatar className="statusbar__status" src={status.path} />
                            <div className="statusbar__text">{item.userName}</div>            
                        </div>
              
     
            ))}
    </div>
        ) : (
          <p>No status data available.</p>
        )}
      </div>
    );
  }
}

export default StatusBar;
