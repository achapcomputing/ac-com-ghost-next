import Link from 'next/link'
import portfolioStyles from '../../styles/Portfolio.module.scss'


const PortfolioItem = ({ project }) => {
    return (
        <>
        <Link href={`/portfolio/${project.slug}`} >
            <a className={portfolioStyles.card}>
                <h3>{project.title}</h3>
                <p>{project.custom_excerpt}</p>
                {/* <img className={portfolioStyles.logo} src={project.feature_image} /> */}
            </a>
        </Link>
        </>
    );
}

export default PortfolioItem
