import React, { Component } from 'react';
import "./StatusBar.css";
import { Avatar } from '@material-ui/core';
import statusimg from "../../images/pp1.png";
import uploadimage from "../../images/statusadd.png";
import { storage, auth } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Statusa from "../Account/statusa";
const userAuth=localStorage.getItem("users")

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusList: [],
            postArray: []
        };
    }

    componentDidMount() {
        this.getData();
        this.getPost();
    }

    getData = () => {
        fetch('http://localhost:8080/status')
            .then(response => response.json())
            .then(data => {
                const filteredPosts = data.filter(post => post.userId === userAuth);
                this.setState({ statusList: filteredPosts });
            });
    }

    getPost = () => {
        // Implement your logic to get post data
        // and update the state with the received data
    }

    uploadStatus = (event) => {
        let image = event.target.files[0];
        const thisContext = this;
        if (image == null || image == undefined)
            return;
        const storage = getStorage();
        const storageRef = ref(storage, image.name);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                thisContext.setState({ progressBar: progress });
            },
            function (error) {},
            function () {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    let payload = {
                        "statusId": Math.floor(Math.random() * 100000).toString(),
                        "userId": userAuth,
                        "path": downloadURL,
                        "timeStamp": new Date().getTime()
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }

                    fetch("http://localhost:8080/status", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            thisContext.getPost();
                        })
                        .catch(error => {

                        })

                });
            }
        );
    }

    render() {
        return (
            <div>
                <div className="statusbar__container">
                    <div className="fileupload">
                        <label htmlFor="file-upload-status">
                            <img className="statusbar__upload" src={uploadimage} width="55px" height="55px" />
                        </label>
                        <input id="file-upload-status" onChange={this.uploadStatus} type="file" />
                    </div>
                    {
                        this.state.statusList.map((item, index) => (
                            <div className="status" key={index}>
                                <Avatar className="statusbar__status" src={item.path} />
                                <div className="statusbar__text">{item.userName}</div>
                            </div>
                        ))
                    }
                    {
                        this.state.postArray.map((item, index) => (
                            <Statusa idStatus={item.userId} key={index} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default StatusBar;
