import React, { createContext, useState, useContext } from 'react';
const MenuContext = createContext();

export default MenuContext;

export function useMenuContext() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState({});
  const [deletedPage, setDeletedPage] = useState(false);


  function setTitle(api, title) {
    setMenu(m => ({ ...m, [api]: title }));
  }
  return <MenuContext.Provider value={[menu, setTitle, setDeletedPage, deletedPage]}>
    {children}
  </MenuContext.Provider>
}
