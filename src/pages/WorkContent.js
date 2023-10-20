import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDom from "react-dom";
import Markdown from "react-markdown";

import content from "../content/content.json";

const formatFailure = (contentId) => {
  return `# Oops! \nUnable to load Markdown for ${contentId}`;
};

const RenderMarkdown = (contentId) => {
  const [ workContent, setWorkContent ] = useState();

  useEffect(() => {
    const contentURL = `${window.location.origin}/content/${contentId}.md`;
    fetch(contentURL).then((response) => {
      return response.text();
    }).then((contentString) => {
      console.log("Received content with body:", contentString);
      setWorkContent(contentString);
    }).catch((error) => {
      console.log(`Error fetching content for ${contentId}:`, error);
      setWorkContent(formatFailure(contentId));
    });
  }, []);

  return (
    <div className="work-content">
      <Markdown>{ workContent }</Markdown>
    </div>
  );
};

export default function WorkContent () {
  const { contentId } = useParams();

  for (let contentItem of content.work) {
    if (contentItem.id === contentId) {
      return RenderMarkdown(contentId);
    }
  }

  return (
    <div className="work-content">
      <Markdown>{ formatFailure(contentId) }</Markdown>
    </div>
  );
};
