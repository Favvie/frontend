import React, { useState } from "react";
import styles from "./MainLayout.module.scss";
import { Topbar, Header, Navbar, Footer, PageTitle, Menu } from "@/shared";

const MainLayout = ({ children, title }: any) => {
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const [userNav, setUserNav] = useState<boolean>(false);

  return (
    <div>
      <Topbar withLogo={false} />
      <Header
        setShowNavBar={setShowNavBar}
        setUserNav={setUserNav}
        userNav={userNav}
      />
      {/* <Navbar showNavBar={showNavBar} setShowNavBar={setShowNavBar} /> */}
      <Menu
        setShowNavBar={setShowNavBar}
        user={undefined}
        logout={undefined}
        setUserNav={undefined}
        userNav={undefined}
      />
      {title && <PageTitle title={title} />}
      <main className={styles.main_container}>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
