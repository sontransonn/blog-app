import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Link,
    useNavigate
} from "react-router-dom";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import HeaderNavItem from "./HeaderNavItem";

import { resetUserInfo } from "../../redux/slices/userSlice";

import { images } from "../../constants"

const navItemsInfo = [
    { name: "Trang chủ", type: "link", href: "/" },
    { name: "Blog", type: "link", href: "/blog" },
    { name: "Chuyên mục", type: "link", href: "/blog" },
    { name: "Giới thiệu", type: "link", href: "/blog" },
    { name: "Tài nguyên", type: "link", href: "/blog" },
    { name: "Liên hệ", type: "link", href: "/blog" },
    { name: "Sự kiện", type: "link", href: "/blog" },
];

const Header = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [profileDrowpdown, setProfileDrowpdown] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userState = useSelector((state) => state.user);

    const handleNavVisible = () => {
        setIsNavVisible(prev => !prev);
    };

    const logoutHandler = () => {
        dispatch(resetUserInfo());
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
                            <HeaderNavItem key={item.name} item={item} />
                        ))}
                    </ul>

                    {userState.userInfo ? (
                        <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
                            <div className="relative group">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="flex gap-x-1 items-center mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                        onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                                    >
                                        <span>Tài khoản</span>
                                        <MdKeyboardArrowDown />
                                    </button>

                                    <div
                                        className={`${profileDrowpdown ? "block" : "hidden"} 
                                        lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
                                    >
                                        <ul className="bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                                            {userState?.userInfo?.admin && (
                                                <button
                                                    onClick={() => navigate("/admin")}
                                                    type="button"
                                                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                                >
                                                    Admin Dashboard
                                                </button>
                                            )}

                                            <button
                                                onClick={() => navigate("/profile")}
                                                type="button"
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Thông tin cá nhân
                                            </button>

                                            <button
                                                onClick={logoutHandler}
                                                type="button"
                                                className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                                            >
                                                Đăng xuất
                                            </button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/auth")}
                            className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>
            </header>
        </section>
    )
}

export default Header