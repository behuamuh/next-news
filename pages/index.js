import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import Layout from "../components/Layout";
import StoryList from "../components/StoryList";

export default class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const responce = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await responce.json();
    } catch (err) {
      console.error(err);
      stories = [];
    }
    return { stories, page };
  }

  componentDidMount() {
    if ("serviceWorker" in window.navigator) {
      window.navigator.serviceWorker
        .register("/service-woeker.js")
        .then(registration =>
          console.warn("service worker registration success", registration)
        )
        .catch(err =>
          console.warn("service worker registration fail", err.message)
        );
    }
  }

  render() {
    const { stories, page } = this.props;
    if (!stories.length) return <Error statusCode="503" />;
    return (
      <Layout
        title="Hacker Next"
        description="A hacker news clone with Next.js"
      >
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
          footer a:hover {
            text-decoration: underline;
          }
        `}</style>
      </Layout>
    );
  }
}
