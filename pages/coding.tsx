import PortfolioList from '../components/coding/PortfolioList'
import Title from '../components/Title'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

type Project = {
    title: string
    slug: string
    custom_excerpt: string
    feature_image: string
}

async function getPortfolio() {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/pages?key=${CONTENT_API_KEY}&filter=tags:portfolio&fields=title,slug,custom_excerpt,feature_image`
    ).then((res) => res.json());
    const pages = res.pages;
    return pages;
}

export const getStaticProps = async() => {
    const projects = await getPortfolio();
    return {
        revalidate: 600,
        props: { projects }
    }
}

const Coding:React.FC<{ projects: Project[]}> = (props) => {
    const { projects } = props;
    console.log(projects);

    return (
        <div>
            <Title title="What I am working on" />
            <PortfolioList projects={projects} />
        </div>
    )
}

export default Coding
