import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faInstagram,
  faGithubAlt,
  faTumblr,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

import content from "../content/content.json";

import "../style/MainContent.css";

const ICONS = {
  email: faEnvelope,
  instagram: faInstagram,
  github: faGithubAlt,
  tumblr: faTumblr,
  linkedin: faLinkedinIn
};

const MainContent = () => {
  return (
    <>
      <div id="content" className="all-content">
        <div className="main-content">
          <h1> My name is Swan (they/them)! </h1>
          <p>
            I'm a software developer, artist, and amateur entomologist based
            in Pittsburgh PA.
          </p>
          <h2> I write software for a living </h2>
          <p>
            I've worked on many interactive installations for an all-star cast
            of clients. Here are some highlights:
          </p>
          <ul> {
            content.work.filter((workItem) =>
              workItem.category === "professional"
            ).map((workItem) =>
              <li key={workItem.id}>
                <Link to={ `/work/${workItem.id}` }> {
                  workItem.description
                } </Link>
              </li>
            )
          } </ul>
          <h2> And I make all sorts of other stuff, too </h2>
          <p>
            Through my personal practice, I've explored a plethora niche
            subjects. This is some of the coolest stuff I've made:
          </p>
          <ul> {
            content.work.filter((workItem) =>
              workItem.category === "personal"
            ).map((workItem) =>
              <li key={workItem.id}>
                <Link to={ `/work/${workItem.id}` }> {
                  workItem.description
                } </Link>
              </li>
            )
          } </ul>
          <h2> I'm always enjoying all sorts of art </h2>
          <p>
            At the moment, I'm reading
            <i> { content.reference.book.title } </i>
            { `by ${content.reference.book.author},` }
          </p>
          <p>
            I'm listening to
            <i> { content.reference.music.title } </i>
            { `by ${content.reference.music.author},` }
          </p>
          <p>
            and I'm really inspired by
            <i> { content.reference.art.title } </i>
            { `by ${content.reference.art.author}` }
          </p>
          <h2> Let's get in touch! </h2>
          <p> You can find me in all these places: </p>
          <div className="social"> {
            content.social.map((socialItem) =>
              <div
                key={ socialItem.id }
                id={ socialItem.id }
                className="social-item"
              >
                <p>
                  <a href={ socialItem.url } target="_blank">
                    <FontAwesomeIcon
                      icon={ ICONS[socialItem.id] }
                      className="icon"
                    />
                    { socialItem.display }
                  </a>
                </p>
              </div>
            )
          } </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
