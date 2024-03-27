import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import SolanaButton from './SolanaButton'
import Wrapper from './Wrapper'
import { config, customColor } from '@/constants'
import MenuIcon from '@mui/icons-material/Menu';
import useLayoutContext from '@/hooks/useLayoutContext'

export default function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = useLayoutContext();
    const toggleSidebar =() =>{
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <Box
            zIndex={1000}
            position="sticky"
            display="flex"
            top={0}
            mr={1.8}
            justifyContent={{xs:"space-between", sm:"end"}}
            alignItems="center"
            bgcolor={{ xs: customColor.second, sm: "transparent" }}
        >

            <Box width={config.sidebar.width}
                display={{xs:"flex",sm:"none"}}
                p={1}
                // justifyContent="space-between"
                alignItems="center"
            >
                <IconButton
                 onClick={toggleSidebar}>
                    <MenuIcon sx={{ fontSize: "40px" }} />
                </IconButton>
            </Box>
            <Box>
                <SolanaButton />
            </Box>
        </Box>
    )
}
