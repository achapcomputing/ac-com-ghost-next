import Link from 'next/link'
import { format } from 'path';
import ArticleList from '../components/ArticleList'
import formatDate from '../utils/formatDate'

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
    // posts.published_at = formatDate({posts.published_at});
    return posts;
}

export const getStaticProps = async ({ params }) => {
    const articles = await getPosts();
    articles.map((post) => {
        post.published_at = formatDate(post.published_at);
    });
    return {
        revalidate: 600,
        props: { articles }
    }
}

const Writing:React.FC<{ articles: Article[] }> = (props) => {
    const { articles } = props;
    console.log(articles)

    return (
        <div>
            <h1>My writing</h1>
            <ArticleList articles={articles} />
        </div>
    )
}

export default Writing