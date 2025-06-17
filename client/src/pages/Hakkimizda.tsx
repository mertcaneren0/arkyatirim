import { Box, Container, Typography, Button } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import InstagramIcon from '@mui/icons-material/Instagram';
import QuickWhatsApp from '../components/QuickWhatsApp';

export default function Hakkimizda() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e41e25' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
        pointerEvents: 'none'
      }
    }}>
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
          <Typography 
            component="h1" 
            variant="h1" 
            fontWeight={800} 
            fontSize={{ xs: 32, md: 48 }} 
            color="#fff" 
            mb={2} 
            textAlign="center"
            sx={{
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.2
            }}
          >
            Ark Gayrimenkul
          </Typography>
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
            Trakya'da Arsa, Konut ve Yatırım Danışmanlığı
          </Typography>
        </Container>
      </Box>

      {/* İçerik Bölümü */}
      <Container maxWidth={false} sx={{ maxWidth: { xs: '100%', md: 'calc(1200px + 400px)' }, px: { xs: 1, md: 4 }, py: { xs: 4, md: 8 }, position: 'relative', zIndex: 1 }}>
        <GridLegacy container spacing={6} alignItems="center" justifyContent="center">
          <GridLegacy item xs={12} md={4.8}>
            <Typography variant="h3" fontWeight={700} color="#e41e25" mb={2} fontSize={{ xs: 22, md: 28 }}>
              Hakkımızda
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              Ark Gayrimenkul, 13 Eylül 2021 tarihinde <b>Hasan Çakır</b> tarafından kurulmuş, Trakya bölgesinde faaliyet gösteren dinamik bir gayrimenkul firmasıdır. Kuruluşundan bu yana güven, şeffaflık ve hız ilkeleriyle hareket eden firmamız, müşterilerine sadece gayrimenkul değil; doğru yatırım, güçlü danışmanlık ve sonuç odaklı çözümler sunmayı hedeflemektedir.
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              <b>Misyonumuz</b>, sektördeki deneyimimizi kullanarak; müşterilerimize ihtiyaçlarına en uygun gayrimenkul çözümlerini zamanında, güvenilir biçimde ve tam memnuniyetle sunmaktır.
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              <b>Vizyonumuz</b> ise, Trakya'nın en güvenilir ve en çok tercih edilen gayrimenkul markası olarak sektörde fark yaratan projelere imza atmaktır.
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              Gayrimenkul alanındaki uzmanlığımız; konut, fabrika, arsa, tarla ve çiftlik gibi geniş bir yelpazeyi kapsamaktadır. Trakya bölgesinin tamamında, özellikle Lüleburgaz ve çevresinde, 09:00 – 20:00 saatleri arasında aktif olarak hizmet veriyoruz.
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              Sektörde 10 yılı aşkın bir tecrübeye sahip olan Ark Gayrimenkul, yalnızca alım-satım süreçlerinde değil; yatırım danışmanlığı, proje geliştirme ve portföy yönetiminde de hızlı ve etkili sonuçlar sunarak fark yaratmaktadır.
            </Typography>
            <Typography variant="body1" color="#232323" mb={2} fontSize={{ xs: 15, md: 17 }}>
              Bizimle çalışmak demek; güvenle yatırım yapmak, zaman kaybetmeden doğru adımlarla ilerlemek ve "gayrimenkul danışmanlığı"nı gerçekten hissetmek demektir.
            </Typography>
          </GridLegacy>
          <GridLegacy item xs={12} md={7.2}>
            <Box sx={{ width: '100%', height: { xs: 260, md: 500 }, borderRadius: 4, overflow: 'hidden', boxShadow: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff' }}>
              <img
                src="/images/dukkan2.jpeg"
                alt="Ark Gayrimenkul Dükkan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </GridLegacy>
        </GridLegacy>

        {/* Instagram Bölümü */}
        <Box 
          sx={{ 
            mt: 8, 
            mb: 4, 
            p: 4, 
            bgcolor: '#fff', 
            borderRadius: 4, 
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}
        >
          <InstagramIcon sx={{ fontSize: 48, color: '#e41e25', mb: 2 }} />
          <Typography variant="h5" fontWeight={700} color="#232323" mb={2}>
            Bizi Instagram'da Takip Edin
          </Typography>
          <Typography variant="body1" color="#666" mb={3} sx={{ maxWidth: 600, mx: 'auto' }}>
            Güncel ilanlarımız, projelerimiz ve gayrimenkul dünyasından haberler için Instagram sayfamızı takip edebilirsiniz.
          </Typography>
          <Button
            variant="contained"
            href="https://www.instagram.com/arkgayrimenkul39"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: '#e41e25',
              color: '#fff',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#c41820',
              },
            }}
          >
            @arkgayrimenkul
          </Button>
        </Box>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 