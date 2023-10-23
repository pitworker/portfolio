import { Outlet, Link } from "react-router-dom";

import content from "../content/content.json";

export default function MainContent () {
  return (
    <>
      <div id="content">
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
            <li>
              <Link to={ `/work/${workItem.id}` }> {
                workItem.description
              } </Link>
            </li>
          )
        } </ul>
      </div>

      <Outlet />
    </>
  );
};
