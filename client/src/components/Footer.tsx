import { Box, Container, Typography, Link as MuiLink, Divider, IconButton } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const navLinks = [
  { label: 'Anasayfa', path: '/' },
  { label: 'Hakkımızda', path: '/hakkimizda' },
  { label: 'İlanlarımız', path: '/ilanlarimiz' },
  { label: 'Blog', path: '/blog' },
  { label: 'Ekibimiz', path: '/ekibimiz' },
  { label: 'Kariyer', path: '/kariyer' },
  { label: 'İletişim', path: '/iletisim' },
];

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#f7f7f7', borderTop: '1px solid #e0e0e0', mt: 8, pt: 6, pb: 2 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <GridLegacy container spacing={{ xs: 3, md: 4 }}>
          {/* Hızlı Bağlantılar */}
          <GridLegacy item xs={12} md={2.4} sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" fontWeight={700} mb={2} color="#232323" fontSize={{ xs: 18, md: 22 }}>Hızlı Bağlantılar</Typography>
            {navLinks.map((item) => (
              <MuiLink
                key={item.label}
                href={item.path}
                color="#232323"
                underline="hover"
                display="block"
                mb={1.2}
                fontSize={{ xs: 15, md: 17 }}
                fontWeight={500}
                sx={{ letterSpacing: 0.2, py: 0.5 }}
              >
                {item.label}
              </MuiLink>
            ))}
          </GridLegacy>
          {/* Google Maps */}
          <GridLegacy item xs={12} md={6} sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography variant="h6" fontWeight={700} mb={2} color="#232323" fontSize={{ xs: 18, md: 22 }}>Konumumuz</Typography>
            <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}>
              <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.6908555149653!2d27.360517299999998!3d41.4025196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4a502f464a57f%3A0x151fccb9c308e455!2sArk%20Gayrimenkul%20ve%20Yat%C4%B1r%C4%B1m!5e0!3m2!1str!2suk!4v1748984324544!5m2!1str!2suk"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </GridLegacy>
          {/* İletişim Bilgileri ve Sosyal Medya */}
          <GridLegacy item xs={12} md={3.6}>
            <Typography variant="h6" fontWeight={700} mb={2} color="#232323" fontSize={{ xs: 18, md: 22 }}>İletişim</Typography>
            <Typography variant="body1" color="#232323" mb={1} fontWeight={500} fontSize={{ xs: 15, md: 17 }}>
              Adres: Örnek Mahallesi, Örnek Sokak No:1, Lüleburgaz / Kırklareli
            </Typography>
            <Typography variant="body1" color="#232323" mb={1} fontWeight={500} fontSize={{ xs: 15, md: 17 }}>
              Telefon: <MuiLink href="tel:+905555555555" color="#232323" underline="hover">+90 555 555 55 55</MuiLink>
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontWeight={500} fontSize={{ xs: 15, md: 17 }}>
              E-posta: <MuiLink href="mailto:info@example.com" color="#232323" underline="hover">info@example.com</MuiLink>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
              <IconButton
                component="a"
                href="https://instagram.com/"
                target="_blank"
                rel="noopener"
                sx={{ color: '#E1306C', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, '&:hover': { bgcolor: '#fce4ec' }, p: { xs: 1.2, md: 1.5 } }}
                aria-label="Instagram"
              >
                <InstagramIcon fontSize="large" />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/905555555555"
                target="_blank"
                rel="noopener"
                sx={{ color: '#25D366', bgcolor: '#fff', borderRadius: 2, boxShadow: 1, '&:hover': { bgcolor: '#e8f5e9' }, p: { xs: 1.2, md: 1.5 } }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon fontSize="large" />
              </IconButton>
            </Box>
          </GridLegacy>
        </GridLegacy>
        <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />
        <Typography variant="caption" color="#232323" align="center" display="block" fontWeight={600}>
          © {new Date().getFullYear()} Bu site 21collective tarafından hazırlanmıştır.
        </Typography>
      </Container>
    </Box>
  );
} 