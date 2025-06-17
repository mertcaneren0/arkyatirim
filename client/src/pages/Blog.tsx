import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuickWhatsApp from '../components/QuickWhatsApp';

const blogPosts = [
  {
    title: "Lüleburgaz'da Değer Kazanan Mahalleler – 2025 Güncel Liste",
    content: `2025 yılı itibarıyla Lüleburgaz'da gayrimenkul yatırımı yapmak isteyenler için öne çıkan mahalleler, değer artışı potansiyelleriyle dikkat çekiyor. Özellikle Yıldırım Mahallesi, altyapı yatırımları ve yeni konut projeleriyle yatırımcıların ilgisini çekerken; Barış ve 8 Kasım Mahalleleri, hem oturum hem de kiralama amaçlı yüksek talep görüyor. Kocasinan ve Dere Mahallesi gibi bölgelerde ise arsa ve müstakil ev yatırımları öne çıkıyor.
Bu mahallelerdeki fiyat artışları, arsa alım satımı, konut yatırımı ve kira geliri odaklı alımlar açısından ciddi fırsatlar sunuyor. Ark Gayrimenkul olarak bölgedeki tüm gelişmeleri yakından takip ediyor, yatırımcılarımızı değer kazanan alanlara yönlendiriyoruz.
Trakya bölgesinde doğru mahalle seçimiyle yatırımınıza yön vermek istiyorsanız, bizimle iletişime geçin.`
  },
  {
    title: "Trakya'da Fabrika Yatırımı İçin En Uygun Bölgeler",
    content: `Trakya bölgesi, son yıllarda sanayi yatırımları açısından büyük bir ivme kazandı. Özellikle Lüleburgaz, Çorlu, Çerkezköy ve Vize gibi ilçeler, hem organize sanayi bölgelerine yakınlığı hem de ulaşım altyapısıyla fabrika yatırımı için ideal konumda yer alıyor.
Trakya'nın avantajları sadece konumla sınırlı değil. İstanbul'a yakınlığı, Avrupa'ya açılan sınır kapılarına olan mesafesi ve gelişmiş lojistik altyapısı ile Trakya, imalat ve depolama alanları kurmak isteyen yatırımcılar için cazip hale geliyor. Özellikle arsa maliyetlerinin Marmara bölgesine göre daha uygun olması, yatırım geri dönüş süresini kısaltıyor.
Ark Gayrimenkul, Trakya genelinde endüstriyel yatırım alanlarına dair danışmanlık ve portföy hizmeti sunar. Doğru yer seçimiyle fabrikanızı güvenle inşa edin, geleceğinizi sağlam temeller üzerine kurun.`
  },
  {
    title: 'Tarla ve Arsa Yatırımı: Trakya Bölgesinde Nelere Dikkat Edilmeli?',
    content: `Tarla ve arsa yatırımı, Trakya gibi gelişmekte olan bölgelerde uzun vadeli ve kârlı bir yatırım modeli sunar. Ancak bu süreçte dikkat edilmesi gereken bazı önemli noktalar vardır. İlk olarak, alınacak arsanın imar durumu, yola cephesi ve altyapı erişimi mutlaka sorgulanmalıdır.
Tarla yatırımlarında ise toprak verimliliği, konum ve tarım potansiyeli göz önünde bulundurulmalıdır. Ayrıca tarla vasfının ileride arsa olarak imara açılıp açılmayacağı da yatırımın değerini etkiler. Trakya'daki birçok bölge bu açıdan ciddi fırsatlar sunmaktadır.
Ark Gayrimenkul olarak detaylı arazi analizi, yasal durum kontrolü ve doğru fiyatlandırma gibi hizmetlerle yatırım sürecinizi güvenle yönetiyoruz.
Trakya'da arsa veya tarla yatırımı yapmadan önce bize danışın, kazançlı çıkın.`
  },
  {
    title: 'Arsa Satın Alırken Tapuda Nelere Dikkat Etmelisiniz?',
    content: `Arsa yatırımı, düşük maliyetli başlayıp yüksek kazançla sonuçlanabilen değerli bir adımdır. Ancak tapu işlemleri sırasında yapılan basit hatalar, ileride ciddi sorunlara yol açabilir. Öncelikle, arsa tapusunun hisseli mi yoksa müstakil mi olduğunu mutlaka kontrol etmelisiniz. Hisseli tapularda satış ve kullanım hakları karmaşıklaşabilir.
İkinci olarak, imar durumu belgesi tapu kadar önemlidir. Alacağınız arsanın konut, ticari ya da tarımsal amaçla kullanılabilirliğini netleştirmeden işlem yapmayın. Ayrıca arsanın kadastro sınırları, üzerindeki şerhler, ipotek veya haciz durumları mutlaka kontrol edilmelidir.
Ark Gayrimenkul olarak tapu süreciniz boyunca size uzman desteği sunuyor; tüm yasal kontrolleri sizin adınıza gerçekleştiriyoruz. Güvenli bir yatırım için, ilk adımı sağlam atın.`
  },
  {
    title: 'Konut Kredisi ile Arsa Alınır mı? 2025 Güncel Bilgiler',
    content: `Konut kredileri çoğunlukla yapı ruhsatı olan taşınmazlar için verilir. Bu nedenle arsa alımında doğrudan konut kredisi kullanmak mümkün değildir. Ancak bazı bankalar, belirli şartlarda arsa kredisi adı altında ayrı bir finansman modeli sunar. Bu kredi türü genellikle daha kısa vadeli ve daha yüksek faizli olabilir.
2025 yılı itibarıyla, arsa kredilerinde en çok tercih edilen bölgelerden biri Trakya olup, Lüleburgaz ve çevresindeki imarlı arsalar, bankalar tarafından daha kolay kredilendirilmektedir. Kredili arsa alımlarında arsanın yola cephesi olması, imarlı olması ve belediye sınırları içinde yer alması büyük avantaj sağlar.
Ark Gayrimenkul olarak, krediye uygun arsa portföyü sunar ve sürecin her adımında size danışmanlık sağlarız.
Arsa yatırımı yaparken finansal çözümler için bize danışın.`
  },
  {
    title: 'Emlak Alım-Satım Sürecinde Yapılan En Yaygın Hatalar',
    content: `Gayrimenkul alım-satım süreçleri, özellikle deneyimsiz yatırımcılar için karmaşık ve riskli olabilir. En sık yapılan hatalardan biri, piyasa değerinin üzerinde fiyata alım yapmak ve taşınmazın detaylı ekspertizini yaptırmadan işlem gerçekleştirmektir. Ayrıca, alım sürecinde resmî belgelerin tam incelenmemesi, ilerleyen dönemde hukuki sıkıntılara neden olabilir.
Satış tarafında ise, eksik evrak, tapudaki uyumsuzluklar, ya da pazarlama yetersizliği gibi sebeplerle süreç uzar veya müşteri kaybı yaşanır.
Bir diğer yaygın hata ise güvenilir olmayan aracı kişi veya kurumlarla çalışmaktır.
Ark Gayrimenkul olarak hem alım hem satış süreçlerini profesyonelce yönetir, yatırımınızın her adımında sizi doğru yönlendiririz.
Kazançlı ve sorunsuz bir işlem için tecrübeli bir ekiple ilerleyin.`
  },
  {
    title: "Lüleburgaz'da 2025 İlkbaharında Fiyat Artışları ve Yatırım Fırsatları",
    content: `2025 yılı ilkbaharında Lüleburgaz gayrimenkul piyasasında dikkat çeken bir hareketlilik gözlemleniyor. Özellikle Yıldırım, Barış ve Kocasinan mahallelerinde konut fiyatları, geçen yılın aynı dönemine göre ortalama %18 artış gösterdi. Arsa fiyatlarında ise imar durumu netleşmiş bölgelerde %25'e varan değer kazançları öne çıkıyor.
Bu artışta hem yerel talep hem de Trakya'nın genelindeki yatırım eğilimleri etkili oldu. Yatırım amaçlı arsa ve müstakil konut alımlarında özellikle altyapısı tamamlanan bölgeler revaçta. Ayrıca İstanbul'a olan göç ve çevre illerden gelen yatırımcı ilgisi fiyatları yukarı taşıyor.
Ark Gayrimenkul olarak Lüleburgaz'daki fiyat analizlerini sürekli güncelliyor, portföylerimizi bu verilere göre şekillendiriyoruz.
Yatırımlarınızı bölgesel veriyle desteklemek için bize ulaşın.`
  },
  {
    title: "Lüleburgaz'da Kiralık Ev Piyasası Nereye Gidiyor?",
    content: `2025 yılı itibarıyla Lüleburgaz'da kiralık ev fiyatları, artan talep ve azalan arz nedeniyle yükseliş trendini sürdürüyor. Özellikle üniversite öğrencileri, yeni evlenen çiftler ve çevre ilçelerden gelen çalışanlar, 2+1 ve 3+1 daire tiplerine yoğun ilgi gösteriyor. Bu durum kira fiyatlarının %15 ila %20 arasında artmasına neden oldu.
Yıldırım, 8 Kasım ve Barış Mahallesi gibi bölgeler, hem ulaşım hem de sosyal olanaklar bakımından kiracılar tarafından tercih ediliyor. Yeni konut projelerinin yavaş ilerlemesi, piyasada kiralık daire bulmayı zorlaştırırken, yatırımcılar için kira getirisi potansiyelini artırıyor.
Ark Gayrimenkul, hem kiralık daire arayanlar hem de kiraya vermek isteyen yatırımcılar için hızlı ve güvenilir çözümler sunar.
Lüleburgaz'da kira piyasasını doğru okumak için doğru adrestesiniz.`
  },
  {
    title: 'Ark Gayrimenkul İle Hızlı Satış: 10 Günde Portföyünüz Nasıl Satılır?',
    content: `Gayrimenkul satışında hız, yalnızca doğru alıcıyı bulmakla değil, profesyonel yönetimle mümkündür. Ark Gayrimenkul olarak 10 gün içinde satış garantili portföy yönetimimizle, mülkünüzü hedef kitlesine en etkili şekilde sunuyoruz.
Satış sürecinde öncelikle doğru fiyatlandırma, etkili ilan görselleri ve dijital pazarlama stratejileri uygulanır. Ardından, potansiyel alıcılar ile zaman kaybetmeden iletişime geçilir. Sahip olduğumuz bölgesel veri ve müşteri ağı sayesinde, emlaklar doğru profille eşleştirilir ve güvenilir işlemlerle sonuçlandırılır.
Portföyünüzün satış süresini kısaltmak, değerinde ve güvenli bir satışla yatırımınızı nakde dönüştürmek istiyorsanız, bizimle çalışın.
Ark Gayrimenkul farkı, hızda ve güvende saklıdır.`
  },
  {
    title: 'Güvenilir Emlak Danışmanı Nasıl Anlaşılır?',
    content: `Emlak yatırımı büyük bir karardır ve bu süreçte doğru danışmanı seçmek yatırımın kaderini belirler. Güvenilir bir emlak danışmanının en önemli özelliği, şeffaf ve açık iletişim kurmasıdır. Size yalnızca satmak için değil, doğru yönlendirmek için bilgi sunar.
Danışmanın bölge bilgisi, portföy çeşitliliği, belgeleri zamanında ve eksiksiz sunması da önemli kriterlerdendir. Ayrıca geçmiş müşteri yorumları, süreç takibi ve satış sonrası desteği de güveni pekiştirir.
Ark Gayrimenkul olarak; doğru fiyatlama, eksiksiz bilgilendirme ve yüksek iş bitirme kapasitesiyle hareket ediyoruz. Trakya genelinde, size sadece taşınmaz değil, sağlam bir yatırım öneriyoruz.
Bir danışmana değil, çözüm ortağına ihtiyaç duyuyorsanız, biz buradayız.`
  },
  {
    title: 'Satış Sürecinde Ark Gayrimenkul Farkı – Gerçek Müşteri Hikayeleri',
    content: `Gayrimenkul satışı, sadece ilan vermekle değil; süreci yönetmekle, güven vermekle ve sonuç üretmekle ilgilidir. Ark Gayrimenkul'ün farkı, bu süreci en başından en sona kadar titizlikle planlamasında yatıyor.
Müşterilerimizden biri olan Ayşe Hanım, Lüleburgaz'daki arsasını 3 ay boyunca farklı platformlarda satamamışken, bizimle çalışmaya başladıktan sonra yalnızca 10 gün içinde satışını tamamladı. Çünkü biz sadece ilan açmıyor, doğru hedef kitleye erişim sağlıyor, evrak sürecini yönetiyor ve alıcıyla güven ilişkisini kuruyoruz.
Gerçek müşteri hikayeleriyle kanıtlanmış bir hizmet arıyorsanız, Ark Gayrimenkul deneyimini yaşayın.
Trakya'da güvenle ve hızla satış yapmak istiyorsanız, doğru yerdesiniz.`
  },
];

export default function Blog() {
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
            Blog
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
            Gayrimenkul Sektörü, Yatırım Tüyoları ve Güncel Haberler
          </Typography>
        </Container>
      </Box>

      {/* İçerik Bölümü */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ 
          background: 'linear-gradient(145deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          color: '#f7fafc',
          borderRadius: 4, 
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 8px 32px rgba(228,30,37,0.1)',
          border: '1px solid rgba(255,255,255,0.1)',
          px: { xs: 2, md: 4 }, 
          py: { xs: 3, md: 4 },
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e41e25' fill-opacity='0.05'%3E%3Cpath d='M40 40c11.046 0 20-8.954 20-20s-8.954-20-20-20-20 8.954-20 20 8.954 20 20 20zm0-30c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
            zIndex: 0
          }
        }}>
          {blogPosts.map((post, i) => (
            <Accordion 
              key={i} 
              sx={{ 
                mb: 3, 
                borderRadius: 3, 
                background: 'linear-gradient(145deg, rgba(45,55,72,0.8) 0%, rgba(26,32,44,0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                '&:before:expanded': {
                  margin: 0
                },
                '&.Mui-expanded': {
                  boxShadow: '0 8px 32px rgba(228,30,37,0.15)'
                }
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: '#a0aec0' }} />}
                sx={{
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(228,30,37,0.05)'
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: '16px 0'
                  }
                }}
              >
                <Typography 
                  fontWeight={700} 
                  fontSize={{ xs: 16, md: 18 }} 
                  color="#f7fafc"
                  sx={{
                    lineHeight: 1.3,
                    pr: 2
                  }}
                >
                  {post.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  bgcolor: 'rgba(26,32,44,0.3)',
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  pt: 3
                }}
              >
                <Typography 
                  color="#cbd5e0" 
                  fontSize={{ xs: 14, md: 16 }} 
                  whiteSpace="pre-line"
                  sx={{
                    lineHeight: 1.6,
                    letterSpacing: '0.3px'
                  }}
                >
                  {post.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 