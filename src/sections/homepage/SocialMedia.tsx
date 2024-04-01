import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import Title from './Title';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { customColor } from '@/constants';

const SocialMediaCard = () => {
  const socialMediaLinks = [
    { title: "Facebook", icon: <FacebookIcon />, url: "https://www.facebook.com/olvanot.rakotonirina" },
    { title: "Telegram", icon: <TelegramIcon />, url: "https://t.me/Olvanot" },
    { title: "GitHub", icon: <GitHubIcon />, url: "https://github.com/olvanotjeanclaude" },
    { title: "Instagram", icon: <InstagramIcon />, url: "https://www.instagram.com/rakotonirinaolvanot/" },
    { title: "Email", icon: <EmailIcon />, url: "olvanotjcs@gmail.com" }
  ];

  return (
    <Stack spacing={2}>
      <Title title='Social Media' />
      <Grid container justifyContent="space-evenly">
        {socialMediaLinks.map((link, index) => (
          <Grid item key={index} padding={1} xs={12} sm={6} md={4}>
            <Card
              style={{ cursor: "pointer" }}
              sx={{ 
                '&:hover': { 
                  backgroundColor: customColor.light,
                } 
              }}
            >
              <CardContent>
                <Link
                  style={{
                    textDecoration:
                      "none",
                    color: "#fff"
                  }}
                  target='_blank' href={link.title === "Email" ? `mailto:${link.url}` : link.url}>
                  <Stack direction="row" gap={2} alignItems="center">
                    <Icon aria-label={link.title}>
                      {link.icon}
                    </Icon>
                    <Typography variant="h5">
                      {link.title}
                    </Typography>
                  </Stack>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SocialMediaCard;
