import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';

interface SideMenuContextProps {
  isSideMenuCollapsed: boolean;
  setIsSideMenuCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isSideMenuVisible: boolean;
  setIsSideMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSideMenu: () => void;
  isLargeScreen: boolean;
}

export const SideMenuContext = createContext<SideMenuContextProps>({
  isLargeScreen: false,
  toggleSideMenu: () => null,
  isSideMenuVisible: false,
  setIsSideMenuVisible: () => null,
  isSideMenuCollapsed: false,
  setIsSideMenuCollapsed: () => null,
});

export const SideMenuProvider: React.FC = ({ children }) => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = useMemo(() => dimensions.width >= 768, [dimensions]);
  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState<boolean>(!isLargeScreen);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState<boolean>(false);

  const toggleSideMenu = useCallback(() => {
    if (isLargeScreen) {
      setIsSideMenuCollapsed((s) => !s);
    } else {
      if (isSideMenuCollapsed) setIsSideMenuCollapsed(false);
      setIsSideMenuVisible((s) => !s);
    }
  }, [isSideMenuCollapsed, isLargeScreen]);

  return (
    <SideMenuContext.Provider
      value={{
        isLargeScreen,
        isSideMenuCollapsed,
        setIsSideMenuCollapsed,
        isSideMenuVisible,
        setIsSideMenuVisible,
        toggleSideMenu,
      }}>
      {children}
    </SideMenuContext.Provider>
  );
};
