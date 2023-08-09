import React, { useState, useEffect } from "react";
import "../App.css";
import UserService from "../services/UserService";

const Home = () => {
  const [content, setContent] = useState("false");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <div className="text">
          <h3>{content}</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
