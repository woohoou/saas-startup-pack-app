import { useColorModeValue } from 'native-base';
import React, { useContext } from 'react';
import { ProSidebar } from 'react-pro-sidebar';
import { SideMenuContext } from '../context/SidemenuContext';
import { Sidebar } from '../Sidebar';
import './styles/react-pro-sidebar.css';

export const SlideMenu: React.FC = () => {
  const { isSideMenuCollapsed, isSideMenuVisible, toggleSideMenu } = useContext(SideMenuContext);
  const theme = useColorModeValue('light-theme', 'dark-theme');

  return (
    <div className={theme}>
      <ProSidebar
        collapsed={isSideMenuCollapsed}
        toggled={isSideMenuVisible}
        breakPoint="md"
        onToggle={toggleSideMenu}>
        <Sidebar />
      </ProSidebar>
    </div>
  );
};
