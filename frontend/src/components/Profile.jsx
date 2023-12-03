import React, { useState, useEffect } from "react";
import "./profile.css";
import profileimg from "../img/profile.jpg";
import PostDetail from "./PostDetail";
import { localhosturl } from "../../awsbackendkey";

function Profile() {
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  useEffect(() => {
    fetch(localhosturl+"/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);

        console.log(pic);
      });
  }, []);

  return (
    <div className="profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img src={profileimg} alt="" className="profile-img" />
        </div>
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info">
            {/* <p>40 posts</p>
            <p>40 follwers</p>
            <p>40 following</p> */}
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      <div className="gallery">
        {pic.map((pics) => {
          return (
            <img
              key={pics._id}
              src={pics.photo}
              onClick={() => {
                toggleDetails(pics);
              }}
              className="item"
            ></img>
          );
        })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
    </div>
  );
}

export default Profile;
