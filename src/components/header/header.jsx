import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { convertToEm, delayInMs, scrollTo } from '../shared/utils/utils'
import './header.css'


export default function Header() {

    const { state } = useLocation();
    let { targetId } = state || {};
    const header = useRef(null);
    const navigate = useNavigate();
    const [offsetTop, setOffsetTop] = useState(0);
    const [t] = useTranslation();

    const sectionHeaderById = new Map();
    sectionHeaderById.set('homeItem', "section-started");
    sectionHeaderById.set('aboutItem', "section-about");
    sectionHeaderById.set('contactItem', "section-contacts");
    sectionHeaderById.set('blogItem', "section-blog");

    useEffect(() => {

        let element = document.getElementById(targetId);

        if (element) {
            delayInMs(1700).then(() => {
                element = document.getElementById(targetId);
                scrollTo(element.offsetTop, "smooth");
            });
        }

    }, [targetId]);

    const scrollToSection = (event) => {

        setCurrentItem(event);

        const sectionElement = document.getElementById(sectionHeaderById.get(event.currentTarget.id));

        if (sectionElement != null) {

            setOffsetTop(sectionElement.offsetTop);
            scrollTo(sectionElement.offsetTop, "smooth");
        }
        else if (event.currentTarget.baseURI.includes('blog') && event.currentTarget.id !== "blogItem") {
            navigate("/", { state: { targetId: sectionHeaderById.get(event.currentTarget.id) } });
        }

        if (header.current.classList.contains("active"))
            header.current.classList.remove("active");
    };

    function setCurrentItem(event) {

        const homeItem = document.getElementById('homeItem');
        const aboutItem = document.getElementById('aboutItem');
        const contactItem = document.getElementById('contactItem');
        const blogItem = document.getElementById('blogItem');

        homeItem.classList.remove("current-menu-item");
        aboutItem.classList.remove("current-menu-item");
        contactItem.classList.remove("current-menu-item");
        blogItem.classList.remove("current-menu-item");

        event.currentTarget.classList.add("current-menu-item");
    }

    function openCloseHeader(event) {

        if (header.current.classList.contains("active"))
            header.current.classList.remove("active");
        else
            header.current.classList.add("active");

        scrollTo(offsetTop, "smooth");
    }

    return (
        <>
            <header className="header fixed" ref={header}>
                <div className="logo">
                    <span className="logo-lnk"> Leonardo<br /> Faggiani </span>
                </div>

                <button onClick={(event) => openCloseHeader(event)} id='menuToggle' className="menu-btn">
                    <span></span>
                </button>

                <a href="https://leofstorage.blob.core.windows.net/my-personal-storage/LeonardoFaggianiCV-EN.pdf" className="btn download-cv-btn" rel="noreferrer" target="_blank" download="">
                    <span className="animated-button"><span>{convertToEm(t("header.download"))}</span></span>
                    <i className="icon fas fa-download"></i>
                </a>

                <div className="top-menu">
                    <div className="top-menu-nav">
                        <div className="menu-topmenu-container">
                            <ul id="menu-main-menu">
                                <li onClick={(event) => scrollToSection(event)} id="homeItem" className="current-menu-item">
                                    <a className="pointerCursor">
                                        <span className="animated-button"><span>{convertToEm(t("header.home"))}</span></span>
                                    </a>
                                </li>

                                <li onClick={(event) => scrollToSection(event)} id="aboutItem">
                                    <a className="pointerCursor">
                                        <span className="animated-button">
                                            <span>{convertToEm(t("header.about"))}</span></span>
                                    </a>
                                </li>

                                <li onClick={(event) => scrollToSection(event)} id="contactItem">
                                    <a className="pointerCursor">
                                        <span className="animated-button"> <span>{convertToEm(t("header.contacts"))}</span></span>
                                    </a>
                                </li>

                                <li onClick={(event) => scrollToSection(event)} id="blogItem">
                                    <Link to="/blog"><span className="animated-button"><span>{convertToEm(t("header.blog"))}</span></span></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}