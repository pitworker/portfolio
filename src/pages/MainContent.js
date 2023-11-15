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

const ListWorkItems = (workCategory) => {
  return content.work.map((workItem, index) => {
    let newWorkItem = workItem;
    newWorkItem.hexIndex =
      (Number(index) + 1).toString(16).padStart(2, "0" ).toUpperCase();
    return newWorkItem;
  }).filter((workItem) =>
    workItem.category === workCategory
  ).map((workItem) =>
    <li key={ workItem.id }>
      <Link
        to={ `/work/${workItem.id}` }
        className={ `work-link` }
      >
        <span className="main-link-text">{
          workItem.description
        }</span>
        <span className={ `super-link link-${workItem.color}` }>{
          `[0x${workItem.hexIndex}]\u219d`
        }</span>
      </Link>
    </li>
  );
};

const MainContent = () => {
  return (
    <>
      <div id="content" className="all-content">
        <div className="main-content">
          <h1> Hello! My name is Swan (they/them) </h1>
          <p>
            I'm a software developer, artist, and amateur entomologist based
            in Pittsburgh, Pennsylvania.
          </p>
          <p>
            I hold a bachelor's degree in computer science and environments
            design from Carnegie Mellon University.
          </p>
          <h2> I write software for a living </h2>
          <p>
            I've worked on a range of interactive products, web experiences, and
            installations for an all-star cast of clients.
            Here are some highlights:
          </p>
          <ul> { ListWorkItems("professional") } </ul>
          <h2> And I make tech-centered art, too </h2>
          <p>
            Through my personal practice, I've explored a plethora of distinct
            subjects and media. These are some of my best pieces:
          </p>
          <ul> { ListWorkItems("personal") } </ul>
          <h2> I'm always learning from the work others are creating </h2>
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
                  <a
                    href={ socialItem.url }
                    className={ `link-${socialItem.color}` }
                  >
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
        <div className="bottom-stamp">
          <div>
            this site was written by Swan in 2023 using React and Markdown
          </div>
          <div>
            {"the source code can be found "}
            <a href="https://github.com/pitworker/portfolio">here</a>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainContent;
