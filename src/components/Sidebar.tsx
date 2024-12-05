import React, { ReactNode, useState } from "react";
// import LogoutButton from "./LogoutButton";
import {
  Home,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  initialCollapsed?: boolean;
  onLogout?: () => void;
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
  initialCollapsed = false,
  onLogout,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`
        bg-gray-800 
        text-white 
        transition-all 
        duration-300 
        ${isCollapsed ? "w-20" : "w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="
            p-2 
            m-4 
            bg-gray-700 
            hover:bg-gray-600 
            rounded 
            self-end
            transition
            duration-200
          "
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {/* Menu Items */}
          <nav className="flex-grow">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="
                flex 
                items-center 
                p-3 
                hover:bg-gray-700 
                transition 
                duration-200
              "
              >
                <item.icon className="mr-3" />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4">
            <button
              onClick={onLogout}
              className="
              w-full 
              flex 
              items-center 
              justify-center 
              p-3 
              bg-red-600 
              hover:bg-red-700 
              rounded 
              transition 
              duration-200
            "
            >
              <LogOut className="mr-3" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-gray-100 p-4 overflow-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
