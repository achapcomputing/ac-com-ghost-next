import headerStyles from '../styles/Header.module.scss'

const Header = () => {
    return (
        <div>
            <h1 className={headerStyles.title}>
                Ashlyn <span>Chapman</span>
            </h1>
            <p className={headerStyles.description}>Type fast and make things.</p>
            {/* <p className={headerStyles.description}>Keep up to date with my latest thoughts and writings.</p> */}
        </div>
    )
}

export default Header
