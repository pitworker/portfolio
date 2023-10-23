import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { visit } from "unist-util-visit";
import ReactDom from "react-dom";
import Markdown from "react-markdown";
import remarkDirective from "remark-directive";

import content from "../content/content.json";

const vimeoEmbed = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "vimeo") return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        const id = attributes.id;

        if (node.type === "textDirective") {
          file.fail(
            "Unexpected `:vimeo` text directive",
            node
          );
        }

        if (!id) {
          file.fail("Unexpected missing `id` on `vimeo` directive", node);
        }

        data.hName = "iframe";
        data.hProperties = {
          src: `https://player.vimeo.com/video/${
                  id
                }?h-65c72d93be&color=ffffff&title=0&byline=0&portrait=0`,
          frameborder: 0,
          allow: "autoplay; fullscreen; picture-in-picture",
          allowfullscreen: true
        };
      }
    });
  };
};

const FormatFailure = (contentId) => {
  return `# Oops! \nUnable to load Markdown for ${contentId}`;
};

const RenderMarkdown = (contentId) => {
  const [ workInnerContent, setWorkInnerContent ] = useState();

  useEffect(() => {
    const contentURL = `${window.location.origin}/content/${contentId}.md`;
    fetch(contentURL).then((response) => {
      return response.text();
    }).then((contentString) => {
      console.log("Received content with body:", contentString);
      setWorkInnerContent(contentString);
    }).catch((error) => {
      console.log(`Error fetching content for ${contentId}:`, error);
      setWorkInnerContent(FormatFailure(contentId));
    });
  }, []);

  return (
    <Markdown remarkPlugins={[remarkDirective, vimeoEmbed]}>{
      workInnerContent
    }</Markdown>
  );
};

const WorkContent = () => {
  const [ workContent, setWorkContent ] = useState();
  let { contentId } = useParams();

  for (let contentItem of content.work) {
    if (contentItem.id === contentId) {
      setWorkContent(RenderMarkdown(contentId));
    }
  }
  setWorkContent(<Markdown>{FormatFailure(contentId)}</Markdown>);

  /*
  useEffect(() => {
    for (let contentItem of content.work) {
      if (contentItem.id === contentId) {
        setWorkContent(RenderMarkdown(contentId));
      }
    }
    setWorkContent(<Markdown>{FormatFailure(contentId)}</Markdown>);
  }, [contentId]);
  */

  return (
    <div className="work-content"> { workContent } </div>
  );
};

export default WorkContent;
