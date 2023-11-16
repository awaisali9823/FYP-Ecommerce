import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    {
      link: "/",
      title: "Home",
    },

    {
      link: "product",
      title: "Product",
    },
    {
      link: "shop",
      title: "Shop",
    },
  ];
  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(setUser(null));
  };
  return (
    <Wrapper bgColor="slate-400">
      <nav className="w-full bg-slate-400 flex py-6 justify-between items-center navbar">
        <h1 className="text-3xl text-white">
          <Link to="/"></Link>
        </h1>

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={index}
              className={`font-poppins font-normal cursor-pointer text-[16px] text-white
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <Link to={nav.link}>{nav.title}</Link>
            </li>
          ))}
          {user ? (
            <li
              className="font-poppins font-normal cursor-pointer text-[16px] text-white ml-10
              "
            >
              <span onClick={logOut}>Logout</span>
            </li>
          ) : (
            <li
              className="font-poppins font-normal cursor-pointer text-[16px] text-white ml-10
              "
            >
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <Link to={user?.isAdmin ? "/admin-dashboard" : "user-profile"}>
              <li className="flex text-white items-center justify-center ml-5 gap-2">
                <FiUser size={24} /> {user?.userName}
              </li>
            </Link>
          )}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            //   src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          {/* Sidebar */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link href={`#${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
