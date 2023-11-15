import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import "../style/ContentContainer.css";

const SMALL_WINDOW_THRESHOLD = 850;
const MOBILE = "mobile";
const DESKTOP = "desktop";
const NONE = "";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(isMobile ? MOBILE : NONE);

  // Small desktop windows get rendered as "mobile"
  useEffect(() => {
    if (!isMobile) {
      const identifyDeviceType = () => {
        return (window.innerWidth <= SMALL_WINDOW_THRESHOLD) ? MOBILE : DESKTOP;
      };

      const handleScreenResize = () => {
        console.debug(`NEW WINDOW WIDTH: ${window.innerWidth}`);

        const currentDeviceType = identifyDeviceType();
        if (currentDeviceType !== deviceType) {
          setDeviceType(currentDeviceType);
          console.debug(`Re-rendering screen for ${currentDeviceType}`);
        } else {
          console.debug(`Screen already rendered for ${currentDeviceType}`);
        }
      };

      handleScreenResize();

      window.addEventListener("resize", handleScreenResize);
      return () => window.removeEventListener("resize", handleScreenResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return deviceType;
};

const ContentContainer = (title, color, innerContent) => {
  useEffect(() => {
    const LOCK_SCROLL_CLASS = "lock-scroll";
    const html = document.getElementsByTagName("html")[0];

    if (!html.classList.contains(LOCK_SCROLL_CLASS)) {
      html.classList.add(LOCK_SCROLL_CLASS);
    }

      return () => {
        if (html.classList.contains(LOCK_SCROLL_CLASS)) {
          html.classList.remove(LOCK_SCROLL_CLASS);
        }
      };
  }, []);

  return (
    <div>
      <div className="content-overlay" />
      <div className={`content-container ${color} ${useDeviceType()}`}>
        <div className="inner-content">
          { innerContent }
        </div>
        <div className="container-bar">
          <div className="container-title"> { title } </div>
          <Link to="/" className="close-btn"> { "\u00d7" } </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentContainer;
