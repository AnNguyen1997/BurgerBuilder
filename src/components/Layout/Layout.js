import React from "react";
import Toolbar from "../UI/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

const Layout = (props) => (
  <>
    <Toolbar></Toolbar>
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default Layout;
