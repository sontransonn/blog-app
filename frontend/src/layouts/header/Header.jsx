import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Link,
    useNavigate
} from "react-router-dom";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

import NavItem from "./navItem/NavItem";

import { images } from "../../constants"

const navItemsInfo = [
    { name: "Trang chủ", type: "link", href: "/" },
    { name: "Blog", type: "link", href: "/blog" },
    {
        name: "Pages",
        type: "dropdown",
        items: [
            { title: "About us", href: "/about" },
            { title: "Contact us", href: "/contact" },
        ],
    },
    { name: "Pricing", type: "link", href: "/pricing" },
    { name: "Faq", type: "link", href: "/faq" },
];

const Header = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [profileDrowpdown, setProfileDrowpdown] = useState(false);

    const navigate = useNavigate();

    const handleNavVisible = () => {
        setIsNavVisible(prev => !prev);
    };

    return (
        <section className="sticky top-0 left-0 right-0 z-50 bg-white">
            <header className="container mx-auto px-5 flex justify-between py-4 items-center">
                <Link to="/">
                    <img className="w-16" src={images.Logo} alt="logo" />
                </Link>

                <div className="lg:hidden z-50">
                    {isNavVisible ? (
                        <AiOutlineClose
                            className="w-6 h-6"
                            onClick={handleNavVisible}
                        />
                    ) : (
                        <AiOutlineMenu className="w-6 h-6" onClick={handleNavVisible} />
                    )}
                </div>

                <div
                    className={
                        `${isNavVisible ? "right-0" : "-right-full"} 
                        transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`
                    }
                >
                    <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                        {navItemsInfo.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </ul>
                </div>
            </header>
        </section>
    )
}

export default Header