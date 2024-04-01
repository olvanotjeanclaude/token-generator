import { Box, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import SolanaButton from './SolanaButton'
import Wrapper from './Wrapper'
import { config, customColor } from '@/constants'
import MenuIcon from '@mui/icons-material/Menu';
import useLayoutContext from '@/hooks/useLayoutContext'
import ToggleRpcMode from './ToggleRpcMode'

export default function Header() {
    const { isSidebarOpen, setIsSidebarOpen } = useLayoutContext();
    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <Box
            zIndex={1000}
            position="sticky"
            display="flex"
            top={0}
            right={0}
            alignItems="center"

            bgcolor={{ xs: customColor.second, sm: "transparent" }}
        >

            <Box
                display={{ xs: "flex", sm: "none" }}
                p={1}
                // justifyContent="space-between"
                alignItems="center"
            >
                <IconButton
                    onClick={toggleSidebar}>
                    <MenuIcon sx={{ fontSize: "40px" }} />
                </IconButton>
            </Box>
            <Box
                display="flex"
                justifyContent="end"
                mr={2}
                flexGrow={1}
                gap={1}
                mt={.7}
                alignItems="center">
                <ToggleRpcMode />
                <SolanaButton />
            </Box>
        </Box>
    )
}
