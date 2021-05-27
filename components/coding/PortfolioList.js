import PortfolioItem from './PortfolioItem'
// import TypeBar from './TypeBar'
import { useState } from 'react'
import portfolioStyles from '../../styles/Portfolio.module.scss'

const Portfolio = ({ projects }) => {

    // const [selectedType, setSelectedType] = useState("featured");
    
    // const projectTypes = [
    //     {
    //       id: "featured",
    //       title: "Featured",
    //     },
    //     {
    //       id: "web",
    //       title: "Web App",
    //     },
    //     {
    //       id: "mobile",
    //       title: "Mobile App",
    //     },
    //     {
    //       id: "design",
    //       title: "Design",
    //     },
    //     {
    //       id: "content",
    //       title: "Content",
    //     },
    //   ];

    return (
        // <div className={portfolioStyles.portfolio}>
        //     <p>What I am building</p>
        //     <ul>
        //         {projectTypes.map(item => (
        //             <TypeBar 
        //                 title={item.title} 
        //                 active={selectedType === item.id} 
        //                 setSelectedType={setSelectedType}
        //                 id={item.id} 
        //             />
        //         ))}
        //     </ul>

        <div className={portfolioStyles.grid}>
            {projects.map((project) => (
                <PortfolioItem project={project} />
            ))}
        </div>
    )
}

export default Portfolio