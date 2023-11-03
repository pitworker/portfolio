import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.classList.remove("lock-scroll");

    return () => {
      html.classList.add("lock-scroll");
    };
  }, []);
  return (
    <div>
      { /* There is no extra content to render for home */ }
    </div>
  );
};

export default Home;
