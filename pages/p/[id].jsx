import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';

const Post = props => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </Layout>
)

Post.getInitialProps = async context => {
    const { id } = context.query;
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await response.json();

    console.log(`Fetched show: ${show.name}`);

    return { show };
}

export default Post;