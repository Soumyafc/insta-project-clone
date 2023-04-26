import profileimg from "../img/profile2.jpg";
import "./Createpost.css";
import defaultimage from "../img/dphoto.png";

function Createpost() {

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
                <button id = "post-btn">Share</button>
            </div>
            <div className="main-div">
                <img id="output"src={defaultimage}/>
                <input type="file" accept="image/*"
                    onChange={(event) => {
                        loadfile(event);
                    }}
                />
            </div>
            <div className="details">
                <div className="card-header2">
                    <div className="card-pic">
                        <img src={profileimg} alt="" />
                    </div>
                    <h3>Andrew</h3>
                </div>
                <textarea type="text" placeholder="write a caption..." ></textarea>
            </div>
        </div>
    );
}

export default Createpost;