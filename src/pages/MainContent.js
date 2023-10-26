import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

import content from "../content/content.json";

import "../style/MainContent.css";

const MainContent = () => {
  return (
    <>
      <div id="content" className="all-content">
        <div className="main-content">
          <h1>Swan FUCK YEAH!</h1>
          <p>
            Swan is a software developer, artist, and amateur entomolgist based
            in Pittsburgh PA.
          </p>
          <p>
            In their professional life, Swan develops softare for interactive
            experiences. Their work includes:
          </p>
          <ul> {
            content.work.map((workItem) =>
              <li key={workItem.id}>
                <Link to={ `/work/${workItem.id}` }> {
                  workItem.description
                } </Link>
              </li>
            )
          } </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
