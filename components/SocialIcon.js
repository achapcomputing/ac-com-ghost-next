import Link from 'next/link'
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navStyles from '../styles/Nav.module.scss'

const SocialIcon = ({ service, link }) => {
    let icon;
    let style;

    switch (service) {
        case "LinkedIn":
            icon = faLinkedin;
            style = navStyles.li;
            break;
        case "GitHub":
            icon = faGithub;
            style = navStyles.gh;
            break;
        case "Twitter":
            icon = faTwitter;
            style = navStyles.tw;
            break;
        default:
            return null;
    }

    return (
        <Link href={link} >
            <a target="_blank" className={style}>
                <FontAwesomeIcon icon={icon} />
            </a>
        </Link>
    )
}

export default SocialIcon
