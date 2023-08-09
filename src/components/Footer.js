import React, { useState, useEffect } from "react";
import '../App.css';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <footer>
    <div className="items">
      <p>@HUA</p>
      <h3 className="clock">{formatTime(currentTime)}</h3>
      <p>Contact</p>
      <p>About</p>
    </div>

    </footer>
  );
};

export default Footer;