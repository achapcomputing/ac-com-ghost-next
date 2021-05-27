import Header from '../components/Header'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Article = {
  title: string
  slug: string
  custom_excerpt: string
  published_at: string
}

async function getPosts() {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt,published_at`
    ).then((res) => res.json());
    const posts = res.posts;

    return posts;
}

export const getStaticProps = async () => {
    const articles = await getPosts();
    return {
        revalidate: 600,
        props: { articles }
    }
}

const Home:React.FC<{ articles: Article[] }> = (props) => {
    const { articles } = props;
    return (
        <div>
            <Header />
        </div>
    )
}

export default Home
