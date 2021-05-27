import { init } from 'ityped'
import { useEffect, useRef } from 'react';
import headerStyles from '../styles/Header.module.scss'

const Header = () => {

    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
            showCursor: true,
            cursorChar: "_", // "\u2588" for block cursor
            backDelay: 1250,
            strings: ['Undergraduate Student', 'Banjo Player', 'Software Engineer', 'Novice Rower', 'Creator']
        })
    }, [])

    return (
        <div>
            <h1 className={headerStyles.title}>
                Ashlyn <span>Chapman</span>
            </h1>
            {/* <p className={headerStyles.description}>Type fast and make things.</p> */}
            {/* <p className={headerStyles.description}>Keep up to date with my latest thoughts and writings.</p> */}
            {/* <div className={headerStyles.intro} id={headerStyles.intro}> */}
                <div className={headerStyles.wrapper}>
                    <h3>$ <span ref={textRef}></span></h3>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Header
