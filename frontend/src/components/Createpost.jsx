import React, { useState } from 'react';

import profileimg from "../img/profile2.jpg";
import "./Createpost.css";
import defaultimage from "../img/dphoto.png";

function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  //const [url, setUrl] = useState("");

  const postDetails = () => {

    
    const data = new FormData();
    data.append("file", image)
     data.append("upload_preset", "srp-insta-clone")
     data.append("cloud_name", "srpcloud")
    fetch("https://api.cloudinary.com/v1_1/srpcloud/image/upload", {
      method: "post",
       body: data
     }).then(res => res.json())
      .then(data => console.log(data.url))
      .catch(err => console.log(err))
   

  }

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="createPost">
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create new post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      <div className="main-div">
        <img id="output" src={defaultimage} alt="default" />
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0]);
          }}
        />
      </div>
      <div className="details">
        <div className="card-header2">
          <div className="card-pic">
            <img src={profileimg} alt="pofile pic" />
          </div>
          <h3>Andrew</h3>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          type="text"
          placeholder="write a caption..."
        ></textarea>
      </div>
    </div>
  );
}

export default Createpost;
