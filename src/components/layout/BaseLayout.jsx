import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";

const BaseLayout = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className={`dashboard-layout ${role}-layout`}>
      <div className="app-wrapper">
        {/* SIDEBAR */}
         {/* <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          role={role}
        />   */}

        <div
          className={`content-area ${isOpen ? "sidebar-open" : "sidebar-closed"
            }`}
        >
           {/* <Header toggleSidebar={toggleSidebar} role={role} /> */}

          <main className="main-wrap">
            <Outlet />
          </main>

          {/* <Footer />  */}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
