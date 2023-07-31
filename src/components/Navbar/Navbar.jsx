import React from "react";
import { Link } from "react-router-dom";
import cls from "./navbar.module.scss";
import LogoImg from "../../Imgs/Logo.png";
import "boxicons";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

const Navbar = ({ setIsDark }) => {
  return (
    <div className={cls.navbar}>
      <div className={cls.logo_text}>
        <Link to="/branches">
          <img src={LogoImg} alt="img" />
        </Link>
        <Link to="/branches">
          <h1> Zuzu admin</h1>
        </Link>
      </div>
      <span className={cls.line}></span>
      <div className={cls.pages}>
        <Link to="/branches">
          <p>
            <box-icon type="solid" name="home" size="30px"></box-icon>
            Branches
          </p>
        </Link>
        <Link to="/products">
          <p>
            <box-icon name="package" size="30px"></box-icon>
            Products
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
