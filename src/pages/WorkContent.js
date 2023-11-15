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

const YOUTUBE_URL = "https://www.youtube.com/embed/";
const YOUTUBE_SUFFIX = "?si=vNlABpz0Wukyuy64";

const VIMEO_URL = "https://player.vimeo.com/video/";
const VIMEO_SUFFIX = "?h-65c72d93be&color=ffffff&title=0&byline=0&portrait=0";

const videoEmbed = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        if (node.name !== "vimeo" && node.name !== "youtube") return;

        const data = node.data || (node.data = {});
        const attributes = node.attributes || {};
        const id = attributes.id;

        if (node.type === "textDirective") {
          file.fail(
            `Unexpected \`:${node.name}\` text directive`,
            node
          );
        }

        if (!id) {
          file.fail(
            `Unexpected missing \`id\` on \`${node.name}\` directive`,
            node
          );
        }

        const srcStart = node.name === "vimeo" ? VIMEO_URL : YOUTUBE_URL;
        const srcEnd = node.name === "vimeo" ? VIMEO_SUFFIX : YOUTUBE_SUFFIX;

        data.hName = "iframe";
        data.hProperties = {
          src: `${srcStart}${id}${srcEnd}`,
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
    color: "black",
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
              color: contentItem.color,
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
              color: "black",
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
          color: "black",
          body: formatFailure(contentId)
        });
      }
    }, LOAD_FAILURE_TIMEOUT_MS);
  }, [contentId]);

  const innerContent = (
    <div className="work-content">
      <Markdown remarkPlugins={ [ remarkGfm, remarkDirective, videoEmbed ] }>
        { workContent.body }
      </Markdown>
    </div>
  );

  return ContentContainer(workContent.title, workContent.color, innerContent);
};

export default WorkContent;
