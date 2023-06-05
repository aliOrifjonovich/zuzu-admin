import React from "react";
import { Link } from "react-router-dom";
import cls from "./navbar.module.scss";
import LogoImg from "../../Imgs/Logo.png";
import "boxicons";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div className={cls.navbar}>
      <div className={cls.logo_text}>
        <Link to="/">
          <img src={LogoImg} alt="img" />
        </Link>
        <Link to="/">
          <h1> Zuzu admin</h1>
        </Link>
      </div>
      <span className={cls.line}></span>
      <div className={cls.pages}>
        <Link to="/">
          <p>
            <box-icon name="dashboard" type="solid" size="30px"></box-icon>
            Dashboard
          </p>
        </Link>
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
      <FormControl display="flex" alignItems="center" sx={{
        display: 'flex',
        flexDirection:"row",
        alignItems: 'center',
        gap:"3rem",

        position:"absolute",
        bottom:"2rem",
        maxWidth: "220px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}>
        <FormLabel
          htmlFor="email-alerts"
          mb="0"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
            padding: "10px 6px",
            fontSize:"1.2rem",
            fontWeight:"500",
            letterSpacing: "2px"
          }}
        >
          <box-icon name="moon" size="30px"></box-icon>
          DARK
        </FormLabel>
        <Switch colorScheme="teal" id="email-alerts" size="md" />
      </FormControl>
    </div>
  );
};

export default Navbar;
