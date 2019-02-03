import fetch from "isomorphic-fetch";
import Error from "next/error";
import StoryList from "../components/StoryList";
const URL = "https://node-hnapi.herokuapp.com/news?page=1";

export default class Index extends React.Component {
  static async getInitialProps() {
    let stories;
    try {
      const responce = await fetch(URL);
      stories = await responce.json();
    } catch (err) {
      console.error(err);
      stories = [];
    }
    return { stories };
  }
  render() {
    const { stories } = this.props;
    if (!stories.length) return <Error statusCode="503" />;
    return (
      <div>
        <h1>Hacker Next</h1>
        <StoryList stories={stories} />
      </div>
    );
  }
}
