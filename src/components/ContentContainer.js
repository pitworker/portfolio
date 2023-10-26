import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../style/ContentContainer.css";

const SMALL_WINDOW_THRESHOLD = 850;

const checkIfScreenIsSmall = () => {
  return window.innerWidth <= SMALL_WINDOW_THRESHOLD;
};

/*
const useScreenIsSmall = () => {
  const [screenIsSmall, setScreenIsSmall] = useState(checkIfScreenIsSmall);

  useEffect(() => {
    const handleScreenResize = () => {
      if (checkIfScreenIsSmall !== screenIsSmall) {
        setScreenIsSmall(checkIfScreenIsSmall);
      }
    };

    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return screenIsSmall;
};
*/

const ContentContainer = (title, innerContent) => {
  return (
    <div className={
    "content-container desktop"
    //`content-container ${useScreenIsSmall ? "mobile" : "desktop"}`
    }>
      <div className="container-bar">
        <div className="container-title"> { title } </div>
        <Link to="/" className="close-btn"> { "\u00d7" } </Link>
      </div>
      <div className="inner-content">
        { innerContent }
      </div>
    </div>
  );
};

export default ContentContainer;
