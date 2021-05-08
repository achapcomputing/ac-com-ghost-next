import React from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/Meta'
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
        // revalidate: 10,
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

    console.log(page);

    const router = useRouter();
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Meta title='About Ashlyn' />
            <div className={aboutStyles.container}>
                <h1>{page.title}</h1>
                <div dangerouslySetInnerHTML={{__html: page.html}}></div> 
            </div>
            
        </>
    )
}

export default About
