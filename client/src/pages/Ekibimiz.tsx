import { Box, Container, Typography, CardMedia, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuickWhatsApp from '../components/QuickWhatsApp';

export default function Ekibimiz() {
  return (
    <Box sx={{ bgcolor: '#f7f7f7', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        {/* Hasan Çakır */}
        <GridLegacy container spacing={6} alignItems="center" mb={8}>
          <GridLegacy item xs={12} md={3.6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 280, aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
              <CardMedia
                component="img"
                image="/images/team/hasan.jpg"
                alt="Hasan Çakır"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </GridLegacy>
          <GridLegacy item xs={12} md={8.4}>
            <Typography variant="h5" fontWeight={700} color="#232323" gutterBottom>
              Hasan Çakır – Kurucu & Gayrimenkul Satış ve Yatırım Uzmanı
            </Typography>
            <Typography variant="body1" color="#232323" fontSize={17} mb={2}>
              Ark Gayrimenkul'ün kurucusu olan Hasan Çakır, gayrimenkul sektöründe 10 yılı aşkın tecrübesi ile Lüleburgaz ve Trakya bölgesinde yatırım danışmanlığı alanında güçlü bir itibar kazanmıştır.
              <br /><br />
              Girişimci ruhu ve çözüm odaklı yaklaşımı sayesinde, Hasan Çakır yalnızca gayrimenkul satışlarında değil; aynı zamanda fabrika, tarla, çiftlik ve arsa yatırımları konusunda da bölgeye yön veren isimlerden biri haline gelmiştir.
              <br /><br />
              Her müşteriye özel strateji geliştirerek, hızlı ve güvenilir sonuçlara ulaşmayı hedefleyen Hasan Çakır, Ark Gayrimenkul'ü "şeffaflık, güven ve hız" ilkeleriyle büyütmüştür.
              <br /><br />
              Bugün hem yerli hem de yabancı yatırımcılara profesyonel danışmanlık sunan Hasan Çakır, gayrimenkulü sadece bir mülk değil, doğru yönetildiğinde geleceğe yönelik bir kazanç olarak görmektedir.
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} color="#e41e25" mb={1}>
              Uzmanlık Alanları:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Arsa ve fabrika yatırımları" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Portföy yönetimi" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Bölgesel piyasa analizi" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Yatırım fırsatlarının değerlendirilmesi" />
              </ListItem>
            </List>
          </GridLegacy>
        </GridLegacy>
        {/* Beste Cafen */}
        <GridLegacy container spacing={6} alignItems="center">
          <GridLegacy item xs={12} md={3.6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 280, aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
              <CardMedia
                component="img"
                image="/images/team/beste.jpg"
                alt="Beste Cafen"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </GridLegacy>
          <GridLegacy item xs={12} md={8.4}>
            <Typography variant="h5" fontWeight={700} color="#232323" gutterBottom>
              Beste Cafen – Gayrimenkul Danışmanı
            </Typography>
            <Typography variant="body1" color="#232323" fontSize={17} mb={2}>
              Beste Cafen, Ark Gayrimenkul bünyesinde görev yapan, Lüleburgaz ve Trakya bölgesine hakim bir gayrimenkul danışmanıdır. Müşteri ihtiyaçlarını doğru analiz etme yeteneği ve çözüm odaklı yaklaşımıyla, sektörde güvenilir ve tercih edilen danışmanlar arasında yer almaktadır.
              <br /><br />
              Konut, arsa, tarla ve ticari gayrimenkul alanlarında uzmanlaşan Beste Cafen, müşterilerine sadece portföy sunmakla kalmaz; aynı zamanda doğru yatırım kararları için yol gösterici bir iş ortağı olarak sürecin her aşamasında aktif rol alır.
              <br /><br />
              Şeffaf iletişim, detaylara gösterdiği özen ve hızlı sonuç üretme yeteneği, kendisini rakiplerinden ayıran başlıca özelliklerdendir.
              <br /><br />
              Beste Cafen'in en önemli hedefi, her müşterisinin "iyi ki" diyeceği bir gayrimenkul deneyimi yaşamalarını sağlamaktır.
            </Typography>
            <Typography variant="subtitle1" fontWeight={700} color="#e41e25" mb={1}>
              Uzmanlık Alanları:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Konut ve arsa alım-satımı" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Müşteri portföy yönetimi" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Yatırım analizleri" />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                <ListItemText secondary="Satış öncesi-sonrası destek" />
              </ListItem>
            </List>
          </GridLegacy>
        </GridLegacy>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 