import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Post = {
  title: string
  slug: string
}

async function getPosts() {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug`
    ).then((res) => res.json());
    const posts = res.posts;

    return posts;
}

export const getStaticProps = async ({ params }) => {
    const posts = await getPosts();
    return {
        revalidate: 600,
        props: { posts }
    }
}

const Home:React.FC<{ posts: Post[] }> = (props) => {
    const { posts } = props;
    console.log(posts);
    return (
        <div className={styles.container}>
            <Head>
            <title>Ashlyn Chapman</title>
            <meta name='keywords' content='computer science, student, undergrad, programming, religious studies, science fiction' />
            </Head>

            <h1>Hello</h1>
            <ul>
                {posts.map((post, index) => {
                    return (
                        <li key={post.slug}>
                            <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                                <a>
                                    <h4>{post.title}</h4>
                                </a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Home
