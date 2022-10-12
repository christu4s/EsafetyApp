import { Spin } from 'antd';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMenu } from './config';
const SiteMenuContext = createContext();

export default SiteMenuContext;

export function useSiteMenuContext() {
  return useContext(SiteMenuContext);
}

export function SiteMenuProvider({ children }) {
  const [menu, setMenu] = useState();
  useEffect(()=>{
    getMenu().then(setMenu);
  }, []);

  function nestedDeleteByApi(menuList, api){
    var newMenu = [];
    for(var page of menuList){
      if(page.api==api) continue;
      if(page.children) page.children =  nestedDeleteByApi(page.children, api);
      newMenu.push(page);
    }
    return newMenu;
  }

  function deleteMenu(api){
    setMenu(nestedDeleteByApi(menu, api));
  }

  if(!menu) return <div style={{height:'100vh',display: 'flex', alignItems:'center', justifyContent: 'center'}}>
    <Spin />
  </div>;
  
  return <SiteMenuContext.Provider value={{menu, deleteMenu }}>
    {children}
  </SiteMenuContext.Provider>
}
