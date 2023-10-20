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

        /*
          <div style="padding:56.25% 0 0 0;position:relative;">
            <iframe
              src="https://player.vimeo.com/video/423457555?h=65c72d93be&color=ffffff&title=0&byline=0&portrait=0"
               style="position:absolute;top:0;left:0;width:100%;height:100%;"
               frameborder="0"
               allow="autoplay; fullscreen; picture-in-picture"
               allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js">
          </script>
         */

        data.hName = "iframe";
        data.hProperties = {
          src: `https://player.vimeo.com/video/${
                  id
                }?h-65c72d93be&color=ffffff&title=0&byline=0&portrait=0`,
          style: "position:absolute; top:0; left:0; width:100%; height:100%;",
          frameborder: 0,
          allow: "autoplay; fullscreen; picture-in-picture",
          allowfullscreen: true
        };
      }
    });
  };
};

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
      <Markdown remarkPlugins={[remarkDirective, vimeoEmbed]}>{
        workContent
      }</Markdown>
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
