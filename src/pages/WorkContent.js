import { useParams } from 'react-router-dom';

export default function WorkContent () {
  let { contentId } = useParams();

  return (
    <div className="work-content">
      <h1> Work!! </h1>
      <h3> {`Here's some work for ${contentId}!`} </h3>
    </div>
  )
};
