import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Anasayfa', path: '/' },
  { text: 'Hakkımızda', path: '/hakkimizda' },
  { text: 'İlanlarımız', path: '/ilanlarimiz' },
  { text: 'Blog', path: '/blog' },
  { text: 'Ekibimiz', path: '/ekibimiz' },
  { text: 'Kariyer', path: '/kariyer' },
  { text: 'İletişim', path: '/iletisim' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Transparanlık sadece anasayfada aktif
  const isHome = location.pathname === '/';

  return (
    <AppBar
      position="absolute"
      elevation={isHome ? 0 : 2}
      color="transparent"
      sx={{
        zIndex: 1201,
        bgcolor: isHome ? 'transparent !important' : 'rgba(0,0,0,0.7) !important',
        backgroundColor: isHome ? 'transparent !important' : 'rgba(0,0,0,0.7) !important',
        background: isHome ? 'none !important' : 'rgba(0,0,0,0.7) !important',
        boxShadow: isHome ? '0 4px 24px 0 rgba(0,0,0,0.10)' : '0 2px 12px 0 rgba(0,0,0,0.18)',
        borderBottom: isHome ? '1.5px solid rgba(255,255,255,0.08)' : 'none',
        fontFamily: 'Montserrat, sans-serif',
        backdropFilter: isHome ? 'blur(12px)' : 'blur(8px)',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
      style={{
        backgroundColor: isHome ? 'transparent' : 'rgba(0,0,0,0.7)',
        background: isHome ? 'none' : 'rgba(0,0,0,0.7)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 56 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/">
              <img
                src="/beyaz.png"
                alt="Logo"
                style={{
                  height: 80,
                  width: 'auto',
                  maxWidth: 260,
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: 12,
                  //boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
                  padding: 4,
                }}
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 700,
                  color: '#fefefe',
                  bgcolor: 'transparent',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.05rem',
                  borderRadius: 2,
                  px: 2.5,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: '#ffffff',
                    bgcolor: 'rgba(255,255,255,0.04)',
                  },
                  '&::after': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    bottom: 6,
                    height: 2,
                    borderRadius: 2,
                    background: '#e41e25',
                    transform: 'scaleX(0)',
                    transition: 'transform 0.25s',
                  },
                  '&:hover::after': {
                    transform: 'scaleX(1)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#fefefe' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ 
          sx: { 
            bgcolor: 'rgba(35,35,35,0.95)', 
            color: '#fefefe', 
            fontFamily: 'Montserrat, sans-serif',
            zIndex: 1300
          } 
        }}
        sx={{ zIndex: 1300 }}>
        <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} component={Link} to={item.path}
                sx={{
                  color: '#fefefe',
                  fontWeight: 700,
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '1.05rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: '#ffffff', bgcolor: 'rgba(255,255,255,0.04)' },
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
} 