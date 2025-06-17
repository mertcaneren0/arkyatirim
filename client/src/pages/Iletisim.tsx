import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Container, Card, CardContent, Divider } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ContactMail from '@mui/icons-material/ContactMail';
import AccessTime from '@mui/icons-material/AccessTime';
import Language from '@mui/icons-material/Language';
import QuickWhatsApp from '../components/QuickWhatsApp';

export default function Iletisim() {
  return (
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0-20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
          zIndex: 0,
        }
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 16 },
          pb: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, rgba(228,30,37,0.95) 0%, rgba(196,24,32,0.9) 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <ContactMail sx={{ fontSize: 48, mr: 2, color: '#fff' }} />
            <Typography 
              component="h1" 
              variant="h1" 
              fontWeight={800} 
              fontSize={{ xs: 32, md: 48 }} 
              color="#fff" 
              textAlign="center"
              sx={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.2
              }}
            >
              İletişim
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            fontWeight={400} 
            fontSize={{ xs: 18, md: 24 }} 
            color="#fff" 
            textAlign="center"
            sx={{
              opacity: 0.95,
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Size Nasıl Yardımcı Olabiliriz?
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 6, md: 10 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <GridLegacy container spacing={4}>
          {/* Google Maps */}
          <GridLegacy item xs={12} lg={8}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: { xs: 400, md: 600 },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15-15c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  zIndex: 0,
                }
              }}
            >
              <CardContent sx={{ p: 3, position: 'relative', zIndex: 1, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <LocationOnIcon sx={{ fontSize: 32, mr: 2, color: '#e41e25' }} />
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700, 
                      color: '#ffffff',
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    Ofis Konumumuz
                  </Typography>
                </Box>
                
                <Box 
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    height: 'calc(100% - 80px)',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
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
                </Box>
              </CardContent>
            </Card>
          </GridLegacy>

          {/* İletişim Bilgileri */}
          <GridLegacy item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
              {/* Ana İletişim Kartı */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  flex: 1,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15-15c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    zIndex: 0,
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700, 
                      color: '#ffffff',
                      mb: 3,
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    İletişim Bilgileri
                  </Typography>

                  {/* Adres */}
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <LocationOnIcon sx={{ color: '#e41e25', mr: 2, mt: 0.5, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                          Adres
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                          Yıldırım Mah. İstanbul Cad. No:123<br />
                          Lüleburgaz / Kırklareli
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Telefon */}
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ color: '#e41e25', mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                          Telefon
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1.1rem',
                            fontWeight: 500
                          }}
                        >
                          +90 552 639 00 39
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* E-posta */}
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ color: '#e41e25', mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                          E-posta
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1rem',
                            fontWeight: 500
                          }}
                        >
                          info@arkgayrimenkul.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                  {/* Çalışma Saatleri */}
                  <Box sx={{ mb: 3, p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <AccessTime sx={{ color: '#e41e25', mr: 2, mt: 0.5, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                          Çalışma Saatleri
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                          Pazartesi - Cumartesi: 09:00 - 19:00<br />
                          Pazar: 10:00 - 17:00
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Website */}
                  <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Language sx={{ color: '#e41e25', mr: 2, fontSize: 24 }} />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                          Website
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: '1rem',
                            fontWeight: 500
                          }}
                        >
                          www.arkgayrimenkul.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* WhatsApp Kartı */}
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1) 0%, rgba(37, 211, 102, 0.05) 100%)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(37, 211, 102, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight: 700, 
                      color: '#25d366',
                      mb: 2,
                      fontSize: { xs: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    💬 Hızlı İletişim
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      mb: 3,
                      lineHeight: 1.6
                    }}
                  >
                    WhatsApp üzerinden anında bize ulaşabilirsiniz
                  </Typography>
                  <QuickWhatsApp />
                </CardContent>
              </Card>
            </Box>
          </GridLegacy>
        </GridLegacy>
      </Container>
    </Box>
  );
} 