import Link from 'next/link'
import { useRouter } from 'next/router'
import formatDate from '../../utils/formatDate'
import Meta from '../../components/Meta'
import Title from '../../components/Title'
import slugStyles from '../../styles/slug.module.scss'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Project = {
    title: string
    html: string
    slug: string
    updated_at: string
}

async function getProject(slug: string) {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/pages/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,updated_at`
    ).then((res) => res.json());
    const projects = res.pages;
    return projects[0];
}

export const getStaticProps = async ({ params }) => {
    const project = await getProject(params.slug);
    project.updated_at = formatDate(project.updated_at);
    return {
        revalidate: 600,
        props: { project }
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

const Project: React.FC<{project: Project}> = (props) => {
    const { project } = props;

    const router = useRouter();
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <Meta title={project.title} />
        <div className={slugStyles.container}>
            <p className={slugStyles.goback}>
                <Link href="/coding">
                    <a>Go back</a>
                </Link>
            </p>
            <Title title={project.title} />
            {/* okay to dangerously set because all urls come from ghost */}
            <div dangerouslySetInnerHTML={{__html: project.html}}></div>
            <p>Page Last Updated: {project.updated_at}</p> 
        </div>
        </>
    );
}

export default Project