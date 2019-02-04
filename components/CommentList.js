import Comment from "../components/Comment";

export default ({ comments }) => (
  <React.Fragment>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </React.Fragment>
);
