import React, { createContext, useState } from 'react'

const initialValue = {
    isSidebarOpen:false,
    setIsSidebarOpen:() =>{}
};
export const LayoutContext = createContext(initialValue);

export default function LayoutContextProvider({children}) {
    const [isSidebarOpen,setIsSidebarOpen] = useState(false);
    
    
  return (
    <LayoutContext.Provider value={{
        isSidebarOpen,
        setIsSidebarOpen,
        }}>
        {children}
    </LayoutContext.Provider>
  )
}
