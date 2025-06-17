import { useState, useEffect } from 'react';
import GridLegacy from '@mui/material/GridLegacy';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Paper,
  TextField,
  Avatar,
  Container,
  InputLabel,
  FormControl,
} from '@mui/material';
import QuickWhatsApp from '../components/QuickWhatsApp';

interface Listing {
  _id: string;
  title: string;
  type: string;
  price: number;
  area: number;
  city: string;
  district: string;
  address: string;
  description: string;
  features: {
    floor?: number;
    heatingType?: string;
    kitchenType?: string;
    hasParking?: boolean;
    isFurnished?: boolean;
    isInComplex?: boolean;
    blockNo?: string;
    parcelNo?: string;
    sheetNo?: string;
  };
  images: string[];
  createdAt: string;
}

export default function Ilanlarimiz() {
  const [activeTab, setActiveTab] = useState(0);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');

  // Tüm ilanlardan dinamik olarak tipleri çıkar
  const uniqueTypes = Array.from(new Set(allListings.map(l => l.type)));
  const tabTypes = ['Tümü', ...uniqueTypes];

  // Fiyat ve metrekare aralıklarını dinamik oluştur
  const prices = allListings.map(l => l.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceStep = Math.ceil((maxPrice - minPrice) / 4) || 1000000;
  const priceRanges = [
    { label: 'Tümü', value: '' },
    { label: `${minPrice.toLocaleString('tr-TR')} ₺ - ${(minPrice + priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice}-${minPrice + priceStep}` },
    { label: `${(minPrice + priceStep + 1).toLocaleString('tr-TR')} ₺ - ${(minPrice + 2 * priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice + priceStep + 1}-${minPrice + 2 * priceStep}` },
    { label: `${(minPrice + 2 * priceStep + 1).toLocaleString('tr-TR')} ₺ - ${(minPrice + 3 * priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice + 2 * priceStep + 1}-${minPrice + 3 * priceStep}` },
    { label: `${(minPrice + 3 * priceStep + 1).toLocaleString('tr-TR')} ₺ ve üzeri`, value: `${minPrice + 3 * priceStep + 1}+` },
  ];

  const areas = allListings.map(l => l.area);
  const minArea = Math.min(...areas);
  const maxArea = Math.max(...areas);
  const areaStep = Math.ceil((maxArea - minArea) / 4) || 50;
  const areaRanges = [
    { label: 'Tümü', value: '' },
    { label: `${minArea} - ${minArea + areaStep} m²`, value: `${minArea}-${minArea + areaStep}` },
    { label: `${minArea + areaStep + 1} - ${minArea + 2 * areaStep} m²`, value: `${minArea + areaStep + 1}-${minArea + 2 * areaStep}` },
    { label: `${minArea + 2 * areaStep + 1} - ${minArea + 3 * areaStep} m²`, value: `${minArea + 2 * areaStep + 1}-${minArea + 3 * areaStep}` },
    { label: `${minArea + 3 * areaStep + 1} m² ve üzeri`, value: `${minArea + 3 * areaStep + 1}+` },
  ];

  // Sayfa ilk açıldığında tüm ilanları çek
  useEffect(() => {
    const fetchAllListings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5001/api/listings');
        if (response.ok) {
          const data = await response.json();
          setAllListings(data);
        }
      } catch {}
      setIsLoading(false);
    };
    fetchAllListings();
  }, []);

  // Filtreleme fonksiyonu
  useEffect(() => {
    let filtered = allListings;
    // Tab filtresi
    if (tabTypes[activeTab] !== 'Tümü') {
      filtered = filtered.filter(l => l.type === tabTypes[activeTab]);
    }
    // Fiyat filtresi
    if (priceFilter) {
      if (priceFilter.endsWith('+')) {
        const min = parseInt(priceFilter.split('+')[0]);
        filtered = filtered.filter(l => l.price >= min);
      } else {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.price >= min && l.price <= max);
      }
    }
    // Metrekare filtresi
    if (areaFilter) {
      if (areaFilter.endsWith('+')) {
        const min = parseInt(areaFilter.split('+')[0]);
        filtered = filtered.filter(l => l.area >= min);
      } else {
        const [min, max] = areaFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.area >= min && l.area <= max);
      }
    }
    setListings(filtered);
    setIsLoading(false);
  }, [activeTab, allListings, priceFilter, areaFilter]);

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      fontFamily: 'Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif',
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
            İlanlarımız
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
            Trakya'nın En Güncel Gayrimenkul Portföyü
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
          {/* Filtreleme Barı */}
          <Box sx={{ mb: 2 }}>
            <GridLegacy container spacing={3} alignItems="center" justifyContent="center">
              <GridLegacy item xs={12} md={5}>
                <Tabs
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  textColor="inherit"
                  indicatorColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    '& .MuiTab-root': {
                      color: '#a0aec0',
                      fontWeight: 600,
                      transition: 'all 0.3s',
                      borderRadius: 2,
                      minHeight: 48,
                      textTransform: 'none',
                      fontSize: '0.95rem'
                    },
                    '& .Mui-selected': {
                      color: '#e41e25 !important',
                      backgroundColor: 'rgba(228,30,37,0.15)',
                    },
                    '& .MuiTabs-indicator': { 
                      bgcolor: '#e41e25',
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    },
                    '& .MuiTab-root:hover': {
                      color: '#e41e25',
                      backgroundColor: 'rgba(228,30,37,0.08)',
                    },
                  }}
                >
                  {tabTypes.map((label, i) => (
                    <Tab key={label} label={label} />
                  ))}
                </Tabs>
              </GridLegacy>
              <GridLegacy item xs={12} md={2.5}>
                <FormControl fullWidth size="medium" sx={{ position: 'relative', zIndex: 1 }}>
                  <InputLabel sx={{ color: '#a0aec0', fontWeight: 500 }}>Metrekare</InputLabel>
                  <Select
                    value={areaFilter}
                    label="Metrekare"
                    onChange={e => setAreaFilter(e.target.value)}
                    sx={{
                      color: '#f7fafc',
                      bgcolor: 'rgba(45,55,72,0.8)',
                      borderRadius: 3,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 500,
                      backdropFilter: 'blur(10px)',
                      '& .MuiOutlinedInput-notchedOutline': { 
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderWidth: 2
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': { 
                        borderColor: 'rgba(228,30,37,0.6)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                        borderColor: '#e41e25',
                        borderWidth: 2
                      },
                      '.MuiSvgIcon-root': { color: '#a0aec0' },
                    }}
                  >
                    {areaRanges.map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridLegacy>
              <GridLegacy item xs={12} md={2.5}>
                <FormControl fullWidth size="medium" sx={{ position: 'relative', zIndex: 1 }}>
                  <InputLabel sx={{ color: '#a0aec0', fontWeight: 500 }}>Fiyat Aralığı</InputLabel>
                  <Select
                    value={priceFilter}
                    label="Fiyat Aralığı"
                    onChange={e => setPriceFilter(e.target.value)}
                    sx={{
                      color: '#f7fafc',
                      bgcolor: 'rgba(45,55,72,0.8)',
                      borderRadius: 3,
                      height: 48,
                      fontSize: 16,
                      fontWeight: 500,
                      backdropFilter: 'blur(10px)',
                      '& .MuiOutlinedInput-notchedOutline': { 
                        borderColor: 'rgba(255,255,255,0.2)',
                        borderWidth: 2
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': { 
                        borderColor: 'rgba(228,30,37,0.6)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { 
                        borderColor: '#e41e25',
                        borderWidth: 2
                      },
                      '.MuiSvgIcon-root': { color: '#a0aec0' },
                    }}
                  >
                    {priceRanges.map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridLegacy>
              <GridLegacy item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    minWidth: 120,
                    height: 48,
                    background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
                    color: '#fff',
                    borderRadius: 3,
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 20px rgba(228,30,37,0.4)',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #c41820 0%, #b71c1c 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(228,30,37,0.6)',
                    },
                  }}
                  onClick={() => {
                    setPriceFilter('');
                    setAreaFilter('');
                  }}
                >
                  Sıfırla
                </Button>
              </GridLegacy>
            </GridLegacy>
          </Box>
          {/* İlan Grid */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" sx={{ color: '#a0aec0' }}>Yükleniyor...</Typography>
            </Box>
          ) : (
            <GridLegacy container spacing={3}>
              {listings.map((listing) => {
                const imageUrl = listing.images && listing.images[0]
                  ? listing.images[0].startsWith('http')
                    ? listing.images[0]
                    : `http://localhost:5001${listing.images[0]}`
                  : '/placeholder.jpg';
                return (
                  <GridLegacy item xs={12} sm={6} md={4} lg={3} key={listing._id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(145deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: 4,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e41e25' fill-opacity='0.03'%3E%3Cpath d='M20 20c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px',
                        pointerEvents: 'none',
                        zIndex: 0
                      },
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        borderColor: 'rgba(228,30,37,0.4)',
                        '& .listing-image': {
                          transform: 'scale(1.05)'
                        },
                        '& .listing-button': {
                          background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(228,30,37,0.5)'
                        }
                      }
                    }}>
                      <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                        <CardMedia
                          className="listing-image"
                          component="img"
                          height="200"
                          image={imageUrl}
                          alt={listing.title}
                          sx={{
                            transition: 'transform 0.3s ease',
                            objectFit: 'cover'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            bgcolor: 'rgba(228,30,37,0.9)',
                            color: '#fff',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          {listing.type}
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, p: 3, position: 'relative', zIndex: 1 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight={700} 
                          gutterBottom 
                          sx={{ 
                            color: '#f7fafc',
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            mb: 2
                          }}
                        >
                          {listing.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ color: '#a0aec0', fontSize: '0.9rem' }}>
                            📍 {listing.district}, {listing.city}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" sx={{ color: '#a0aec0', fontSize: '0.9rem' }}>
                            📐 {listing.area} m²
                          </Typography>
                        </Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: '#e41e25', 
                            fontWeight: 800,
                            fontSize: '1.3rem',
                            mb: 2
                          }}
                        >
                          {listing.price.toLocaleString('tr-TR')} ₺
                        </Typography>
                        <Button
                          className="listing-button"
                          variant="contained"
                          size="medium"
                          href={`/ilan/${listing._id}`}
                          sx={{ 
                            width: '100%',
                            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                            color: '#f7fafc',
                            borderRadius: 3,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textTransform: 'none',
                            py: 1.2,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                            position: 'relative',
                            zIndex: 2,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 6px 20px rgba(228,30,37,0.5)'
                            }
                          }}
                        >
                          Detayları Gör
                        </Button>
                      </CardContent>
                    </Card>
                  </GridLegacy>
                );
              })}
            </GridLegacy>
          )}
        </Box>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 