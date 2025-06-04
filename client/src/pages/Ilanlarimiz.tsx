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
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', borderRadius: 0, boxShadow: 'none', px: 0, py: 0, fontFamily: 'Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif', transition: 'background 0.3s' }}>
      <Box sx={{ height: { xs: 100, md: 10 } }} />
      <Container maxWidth="lg" sx={{ my: { xs: 3, md: 6 }, p: 0 }}>
        <Box sx={{ bgcolor: 'rgba(34,34,34,0.96)', color: '#fff', borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)', border: '1.5px solid rgba(255,255,255,0.06)', px: { xs: 1, md: 4 }, py: { xs: 2, md: 3 } }}>
          {/* Filtreleme Barı */}
          <Box sx={{ mb: 2 }}>
            <GridLegacy container spacing={2} alignItems="center" justifyContent="center">
              <GridLegacy item xs={12} md={4}>
                <Tabs
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  textColor="inherit"
                  indicatorColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTab-root': {
                      color: '#f5f5f5',
                      fontWeight: 600,
                      transition: 'color 0.2s',
                    },
                    '& .Mui-selected': {
                      color: '#e41e25 !important',
                    },
                    '& .MuiTabs-indicator': { bgcolor: '#e41e25' },
                    '& .MuiTab-root:hover': {
                      color: '#ff2a36',
                    },
                  }}
                >
                  {tabTypes.map((label, i) => (
                    <Tab key={label} label={label} />
                  ))}
                </Tabs>
              </GridLegacy>
              <GridLegacy item xs={12} md={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ color: '#fff' }}>Metrekare</InputLabel>
                  <Select
                    value={areaFilter}
                    label="Metrekare"
                    onChange={e => setAreaFilter(e.target.value)}
                    sx={{
                      color: '#fff',
                      bgcolor: '#292929',
                      borderRadius: 2,
                      height: 48,
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 2,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '.MuiSvgIcon-root': { color: '#fff' },
                    }}
                  >
                    {areaRanges.map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridLegacy>
              <GridLegacy item xs={12} md={3}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ color: '#fff' }}>Fiyat Aralığı</InputLabel>
                  <Select
                    value={priceFilter}
                    label="Fiyat Aralığı"
                    onChange={e => setPriceFilter(e.target.value)}
                    sx={{
                      color: '#fff',
                      bgcolor: '#292929',
                      borderRadius: 2,
                      height: 48,
                      fontSize: 16,
                      display: 'flex',
                      alignItems: 'center',
                      pl: 2,
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#e41e25' },
                      '.MuiSvgIcon-root': { color: '#fff' },
                    }}
                  >
                    {priceRanges.map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridLegacy>
              <GridLegacy item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{
                    minWidth: 100,
                    height: 48,
                    color: '#fff',
                    borderColor: '#e41e25',
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 2,
                    background: 'transparent',
                    '&:hover': {
                      bgcolor: '#e41e25',
                      color: '#fff',
                      borderColor: '#e41e25',
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
              <Typography variant="h6" sx={{ color: '#fefefe' }}>Yükleniyor...</Typography>
            </Box>
          ) : (
            <GridLegacy container spacing={4}>
              {listings.map((listing) => {
                const imageUrl = listing.images && listing.images[0]
                  ? listing.images[0].startsWith('http')
                    ? listing.images[0]
                    : `http://localhost:5001${listing.images[0]}`
                  : '/placeholder.jpg';
                return (
                  <GridLegacy item xs={12} sm={6} md={4} key={listing._id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: '#292929',
                      color: '#fff',
                      borderRadius: 3,
                      boxShadow: 4,
                    }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={imageUrl}
                        alt={listing.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: '#e41e25' }} fontWeight={700}>
                          {listing.type}
                        </Typography>
                        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#fefefe' }}>
                          {listing.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fefefe' }}>
                          {listing.district}, {listing.city}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#fefefe' }}>
                          {listing.area} m²
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#e41e25', mt: 1 }} fontWeight={700}>
                          {listing.price.toLocaleString('tr-TR')} ₺
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          href={`/ilan/${listing._id}`}
                          sx={{ mt: 2, bgcolor: '#e41e25', color: '#fefefe', '&:hover': { bgcolor: '#b71c1c' } }}
                          fullWidth
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