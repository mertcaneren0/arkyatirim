import { Box, Paper, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function QuickWhatsApp() {
  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: { xs: 'none', md: 'block' } }}>
      <Paper elevation={4} sx={{ p: 2, minWidth: 220, textAlign: 'center', bgcolor: '#fff', borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, boxShadow: 4 }}>
        <Box
          component="a"
          href="https://wa.me/905526390039"
          target="_blank"
          rel="noopener"
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#232323', gap: 1, width: '100%', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#232323', fontSize: 16 }}>
            Hızlı erişim için
          </Typography>
          <WhatsAppIcon sx={{ color: '#25D366', fontSize: 32, ml: 1 }} />
        </Box>
      </Paper>
    </Box>
  );
} 