import React from 'react';
import './profile.css';


function Profile() {
    return ( 
        <div className="profile">

            <div className="profile-frame">
                <div className="profile-pic">
                    <img src="frontend\src\img\profile.jpg" alt="" />
                </div>
                <div className="profile-data">
                    <h1>Soumya</h1>
                    <div className="profile-info">
                        <p>40 posts</p>
                        <p>40 follwers</p>
                        <p>40 following</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;