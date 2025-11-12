import React from 'react';
import { HomeIcon, ProfileIcon, MessageIcon } from '../constants';
import type { Screen } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  const baseClasses = 'flex items-center p-3 space-x-3 rounded-md cursor-pointer transition-colors duration-200';
  const activeClasses = 'bg-[#3b82f6] text-white';
  const inactiveClasses = 'text-gray-300 hover:bg-[#374151] hover:text-white';
  
  return (
    <li onClick={onClick} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </li>
  );
};

const navItems = [
    { id: 'home', label: '홈', icon: <HomeIcon className="w-6 h-6" /> },
    { id: 'profile', label: '마이페이지', icon: <ProfileIcon className="w-6 h-6" /> },
    { id: 'translate', label: '통역', icon: <MessageIcon className="w-6 h-6" /> },
];

interface SidebarProps {
    activeScreen: Screen;
    onNavigate: (screen: Screen) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onNavigate }) => {
  return (
    <aside className="w-60 bg-[#192a4d] text-white p-4 space-y-8 hidden md:flex md:flex-col">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.id} 
              icon={item.icon} 
              label={item.label} 
              active={activeScreen === item.id}
              onClick={() => onNavigate(item.id as Screen)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
