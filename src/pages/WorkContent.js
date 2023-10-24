import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { visit } from "unist-util-visit";
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

const formatFailure = (contentId) => {
  console.warn("Attempted to load nonexistent page");
  return `# Oops! \nUnable to load content for ${contentId}`;
};

const formatLoading = (contentId) => {
  return `# Please Wait \nContent is loading for ${contentId}`;
};

const loadMarkdown = (contentId) => {
  return new Promise((resolve, reject) => {
    const contentURL = `${window.location.origin}/content/${contentId}.md`;
    fetch(contentURL).then((response) => {
      return response.text();
    }).then((contentString) => {
      console.log("Received content with body:", contentString);
      resolve(contentString);
    }).catch((error) => {
      console.log(`Error fetching content for ${contentId}:`, error);
      reject(error);
    });
  });
};

const WorkContent = () => {
  const { contentId } = useParams();
  const [ workContent, setWorkContent ] = useState(formatFailure(contentId));
  // const contentDidLoad = useRef(false);

  for (let contentItem of content.work) {
    if (contentItem.id === contentId) {
      loadMarkdown(contentId).then((response) => {
        setWorkContent(response);
      }).catch((error) => {
        setWorkContent(formatFailure(contentId));
      });
      // contentDidLoad.current = true;
      break;
    }
  }

  // if (!contentDidLoad.current) setWorkContent(formatFailure(contentId));

  return (
    <div className="work-content">
      <Markdown remarkPlugins={ [ remarkDirective, vimeoEmbed ] }>
        { workContent }
      </Markdown>
    </div>
  );
};

export default WorkContent;
