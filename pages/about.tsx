import Meta from '../components/Meta'
import Title from '../components/Title'
import aboutStyles from '../styles/About.module.scss'

const { BLOG_URL, CONTENT_API_KEY } = process.env;

async function getAboutPage() {
    const res = await fetch(
        `${BLOG_URL}/ghost/api/v3/content/pages/slug/about?key=${CONTENT_API_KEY}&fields=title,html`
    ).then((res) => res.json());
    const pages = res.pages;
    return pages[0];
}

export const getStaticProps = async () => {
    const page = await getAboutPage();
    return {
        revalidate: 600,
        props: { page }
    }
}

type Page = {
    slug: string
    title: string
    html: string
}

const About: React.FC<{page: Page}> = (props) => {
    const { page } = props;

    return (
        <>
            <Meta title='About Ashlyn' />
            <div className={aboutStyles.container}>
                <Title title={page.title}/>
                <div dangerouslySetInnerHTML={{__html: page.html}}></div>
            </div>
        </>
    )
}

export default About
