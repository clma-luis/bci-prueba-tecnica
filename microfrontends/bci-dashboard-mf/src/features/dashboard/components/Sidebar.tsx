import React from "react";
import Logo from "../../../shared/components/LogoComponent";

const Sidebar: React.FC = () => {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-header">
        <Logo />
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          Home
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;