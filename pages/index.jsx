import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const ShowLink = props => {
    const { show } = props;

    return (
        <li>
            <Link href="p/[id]" as={`/p/${show.id}`}>
                <a>{show.name}</a>
            </Link>
            <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }

            a:hover {
                opacity: 0.6;
            }
            `}</style>
        </li>
    )
}

const Index = props => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {props.shows.map(show => (
                <ShowLink key={show.id} show={show}></ShowLink>
            ))}
        </ul>
        <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }
      `}</style>
    </Layout>
)

Index.getInitialProps = async () => {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await response.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data.map(entry => entry.show)
    }
}

export default Index;