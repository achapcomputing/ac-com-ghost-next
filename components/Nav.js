import Link from 'next/link'
import SocialIcon from './SocialIcon'
import navStyles from '../styles/Nav.module.scss'

const Nav = () => {
    return (
        <nav className={navStyles.nav}>
            <div>
                <ul>
                    <li>
                        <Link href='/'><a>Home</a></Link>
                    </li>
                    <li>
                        <Link href='/about'><a>About</a></Link>
                    </li>
                    <li>
                        <Link href='/writing'>Writing</Link>
                    </li>
                    {/* <li>
                        <Link href='coding'>Coding</Link>
                    </li> */}
                </ul>
            </div>
            <div className={navStyles.socials}>
                <SocialIcon service={"LinkedIn"} link={"https://www.linkedin.com/in/apchapman/"} />
                <SocialIcon service={"GitHub"} link={"https://github.com/achapcomputing/ac-com-ghost-next"} />
                <SocialIcon service={"Twitter"} link={"https://twitter.com/achapComputing"} />
            </div>
        </nav>
    )
}

export default Nav
