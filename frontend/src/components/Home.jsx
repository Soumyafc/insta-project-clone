import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(!token){
            navigate("./signup");
        }
    },[]);
    return (
        <>
        </>
    );
}

export default Home;