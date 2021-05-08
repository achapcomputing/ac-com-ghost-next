import titleStyles from '../styles/Title.module.scss'

const Title = ({ title }) => {
    return (
        <div className={titleStyles.title}>
            <h3>
                {title}
            </h3>
        </div>
    )
}

export default Title
