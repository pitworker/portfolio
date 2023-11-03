import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { visit } from "unist-util-visit";
import Markdown from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
// import rehypeExternalLinks from "rehype-external-links";

import ContentContainer from "../components/ContentContainer";

import content from "../content/content.json";

import "../style/WorkContent.css";

const LOAD_FAILURE_TIMEOUT_MS = 10;

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
    const contentURL =
      `${window.location.origin}/content/${contentId}/${contentId}-text.md`;
    console.debug(`Attempting to fetch content at ${contentURL}`);
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
  const [ workContent, setWorkContent ] = useState({
    title: "0x00 loading",
    body: formatLoading(contentId)
  });
  const contentDidLoad = useRef(false);

  useEffect(() => {
    for (let contentIndex in content.work) {
      const contentItem = content.work[contentIndex];
      if (contentItem.id === contentId) {
        loadMarkdown(contentId).then((response) => {
          if (!contentDidLoad.current) {
            const itemHex = (Number(contentIndex) + 1)
              .toString(16)
              .padStart(2, "0")
              .toUpperCase();
            const itemTitle = `0x${itemHex} ${contentItem.id}`;
            setWorkContent({
              title: itemTitle,
              body: response
            });
            contentDidLoad.current = true;
          } else {
            console.warn("Content already loaded???");
          }
        }).catch((error) => {
          if (!contentDidLoad.current) {
            setWorkContent({
              title: "0x00 error",
              body: formatFailure(contentId)
            });
            contentDidLoad.current = true;
          } else {
            console.warn("Content already loaded???");
          }
        });
        break;
      }
    }
    setTimeout(() => {
      if (!contentDidLoad.current) {
        setWorkContent({
          title: "0x00 error",
          body: formatFailure(contentId)
        });
      }
    }, LOAD_FAILURE_TIMEOUT_MS);
  }, [contentId]);

  const innerContent = (
    <div className="work-content">
      <Markdown remarkPlugins={ [ remarkGfm, remarkDirective, vimeoEmbed ] }>
        { workContent.body }
      </Markdown>
    </div>
  );

  return ContentContainer(workContent.title, innerContent);
};

export default WorkContent;
