import { Typography } from '@mui/material'
import React from 'react'

export default function Title({title}:{title:string}) {
  return (
    <Typography mb={1} textAlign={{xs:"center",md:"start"}} variant='h4' color="primary">{title}</Typography>
  )
}
