import React, { createContext, useState } from 'react'

type Tsidebar = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const initialValue: Tsidebar = {
    isSidebarOpen:false,
    setIsSidebarOpen:() =>{}
};
export const LayoutContext = createContext(initialValue);

export default function LayoutContextProvider({children}:{children: React.ReactNode}) {
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
