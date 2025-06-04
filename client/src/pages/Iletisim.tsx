import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import QuickWhatsApp from '../components/QuickWhatsApp';

export default function Iletisim() {
  return (
    <Box sx={{ bgcolor: '#f7f7f7', minHeight: '100vh', px: { xs: 0, md: '200px' }, py: { xs: 4, md: 6 }, display: 'flex', alignItems: 'stretch' }}>
      <GridLegacy container spacing={4} sx={{ height: '100vh' }}>
        {/* Google Maps */}
        <GridLegacy item xs={12} md={8.4} sx={{ height: { xs: 300, md: '80vh' } }}>
          <Paper elevation={4} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden' }}>
            <iframe
              title="Ark Gayrimenkul Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.6908555149653!2d27.360517299999998!3d41.4025196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4a502f464a57f%3A0x151fccb9c308e455!2sArk%20Gayrimenkul%20ve%20Yat%C4%B1r%C4%B1m!5e0!3m2!1str!2suk!4v1748994240272!5m2!1str!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </GridLegacy>
        {/* İletişim Bilgileri */}
        <GridLegacy item xs={12} md={3.6} sx={{ display: 'flex', alignItems: 'center', height: { xs: 'auto', md: '100vh' } }}>
          <Paper elevation={4} sx={{ width: '100%', p: { xs: 3, md: 5 }, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" fontWeight={700} color="#232323" mb={2}>
              İletişim Bilgileri
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><LocationOnIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Adres" secondary="Yıldırım Mah. İstanbul Cad. No:123 Lüleburgaz / Kırklareli" />
              </ListItem>
              <ListItem>
                <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Telefon" secondary="+90 552 639 00 39" />
              </ListItem>
              <ListItem>
                <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                <ListItemText primary="E-posta" secondary="info@arkgayrimenkul.com" />
              </ListItem>
            </List>
            <Box sx={{ mt: 2 }}>
              <QuickWhatsApp />
            </Box>
          </Paper>
        </GridLegacy>
      </GridLegacy>
    </Box>
  );
} 