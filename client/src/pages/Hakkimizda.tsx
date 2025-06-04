import { Box, Container, Typography, Button } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import InstagramIcon from '@mui/icons-material/Instagram';
import QuickWhatsApp from '../components/QuickWhatsApp';

export default function Hakkimizda() {
  return (
    <Box sx={{ bgcolor: '#f7f7f7', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Container maxWidth={false} sx={{ maxWidth: { xs: '100%', md: 'calc(1200px + 400px)' }, px: { xs: 1, md: 4 } }}>
        <Typography component="h1" variant="h1" fontWeight={800} fontSize={{ xs: 28, md: 36 }} color="#232323" mb={4} textAlign={{ xs: 'center', md: 'left' }}>
          Ark Gayrimenkul | Trakya'da Arsa, Konut ve Yatırım Danışmanlığı
        </Typography>
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