import ContentContainer from "../components/ContentContainer";

export default function NoPage () {
  return ContentContainer("0x00 error", "black", (
    <div id="nopage">
      <h1> Oops! </h1>
      <p> The page you're looking for does not exist </p>
    </div>
  ));
};
