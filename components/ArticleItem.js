import Link from 'next/link'
import articleStyles from '../styles/Article.module.scss'

const ArticleItem = ({ article }) => {
    return (
        // <h1>{article.title}</h1>
        <>
        <Link href="/article/[slug]" as={`/article/${article.slug}`}>
            <a className={articleStyles.card}>
                <h3>{article.title}</h3>
                <div>
                    <p>{article.published_at}</p>
                    <p>{article.custom_excerpt}</p>    
                </div>
            </a>
        </Link>
        </>
    );
}

export default ArticleItem
