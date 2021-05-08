import Link from 'next/link'
import { useRouter } from 'next/router'
import formatDate from '../../utils/formatDate'
import Meta from '../../components/Meta'
import Title from '../../components/Title'
import slugStyles from '../../styles/slug.module.scss'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

async function getArticle(slug: string) {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,published_at`
    ).then((res) => res.json());

    const articles = res.posts;

    return articles[0];
}

export const getStaticProps = async ({ params }) => {
    const article = await getArticle(params.slug);
    article.published_at = formatDate(article.published_at);
    return {
        revalidate: 600,
        props: { article }
    }
}

export const getStaticPaths = () => {
    // paths -> slugs which are allowed
    // fallback -> fire getStaticProps, if bad show 404
    return {
        paths: [],
        fallback: true
    }
}

type Article = {
    title: string
    html: string
    slug: string
    published_at: string
}

const Article: React.FC<{article: Article}> = (props) => {
    const { article } = props;

    const router = useRouter();
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <Meta title={article.title} />
        <div className={slugStyles.container}>
            <p className={slugStyles.goback}>
                <Link href="/writing">
                    <a>Go back</a>
                </Link>
            </p>
            <Title title={article.title} />
            <p>Published: {article.published_at}</p>
            {/* okay to dangerously set because all urls come from ghost */}
            <div dangerouslySetInnerHTML={{__html: article.html}}></div> 
        </div>
        </>
    );
}

export default Article