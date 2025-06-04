import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Grid from '@mui/material/Grid';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import QuickWhatsApp from '../components/QuickWhatsApp';

interface ListingFormData {
  fullName: string;
  phone: string;
  blockNo: string;
  parcelNo: string;
  address?: string;
  listingType?: string;
}

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

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const { register, handleSubmit, reset, watch } = useForm<ListingFormData>();

  // Memoize unique types calculation
  const uniqueTypes = useMemo(() => 
    Array.from(new Set(allListings.map(l => l.type))),
    [allListings]
  );
  const tabTypes = useMemo(() => ['Tümü', ...uniqueTypes], [uniqueTypes]);

  // Memoize price ranges calculation
  const priceRanges = useMemo(() => {
    const prices = allListings.map(l => l.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceStep = Math.ceil((maxPrice - minPrice) / 4) || 1000000;
    
    return [
      { label: 'Tümü', value: '' },
      { label: `${minPrice.toLocaleString('tr-TR')} ₺ - ${(minPrice + priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice}-${minPrice + priceStep}` },
      { label: `${(minPrice + priceStep + 1).toLocaleString('tr-TR')} ₺ - ${(minPrice + 2 * priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice + priceStep + 1}-${minPrice + 2 * priceStep}` },
      { label: `${(minPrice + 2 * priceStep + 1).toLocaleString('tr-TR')} ₺ - ${(minPrice + 3 * priceStep).toLocaleString('tr-TR')} ₺`, value: `${minPrice + 2 * priceStep + 1}-${minPrice + 3 * priceStep}` },
      { label: `${(minPrice + 3 * priceStep + 1).toLocaleString('tr-TR')} ₺ ve üzeri`, value: `${minPrice + 3 * priceStep + 1}+` },
    ];
  }, [allListings]);

  // Memoize area ranges calculation
  const areaRanges = useMemo(() => {
    const areas = allListings.map(l => l.area);
    const minArea = Math.min(...areas);
    const maxArea = Math.max(...areas);
    const areaStep = Math.ceil((maxArea - minArea) / 4) || 50;
    
    return [
      { label: 'Tümü', value: '' },
      { label: `${minArea} - ${minArea + areaStep} m²`, value: `${minArea}-${minArea + areaStep}` },
      { label: `${minArea + areaStep + 1} - ${minArea + 2 * areaStep} m²`, value: `${minArea + areaStep + 1}-${minArea + 2 * areaStep}` },
      { label: `${minArea + 2 * areaStep + 1} - ${minArea + 3 * areaStep} m²`, value: `${minArea + 2 * areaStep + 1}-${minArea + 3 * areaStep}` },
      { label: `${minArea + 3 * areaStep + 1} m² ve üzeri`, value: `${minArea + 3 * areaStep + 1}+` },
    ];
  }, [allListings]);

  // Memoize fetch function
  const fetchAllListings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/listings');
      if (response.ok) {
        const data = await response.json();
        setAllListings(data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Memoize filter function
  const filterListings = useCallback(() => {
    let filtered = allListings;
    
    if (tabTypes[activeTab] !== 'Tümü') {
      filtered = filtered.filter(l => l.type === tabTypes[activeTab]);
    }
    
    if (priceFilter) {
      if (priceFilter.endsWith('+')) {
        const min = parseInt(priceFilter.split('+')[0]);
        filtered = filtered.filter(l => l.price >= min);
      } else {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.price >= min && l.price <= max);
      }
    }
    
    if (areaFilter) {
      if (areaFilter.endsWith('+')) {
        const min = parseInt(areaFilter.split('+')[0]);
        filtered = filtered.filter(l => l.area >= min);
      } else {
        const [min, max] = areaFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.area >= min && l.area <= max);
      }
    }
    
    return filtered;
  }, [activeTab, allListings, priceFilter, areaFilter, tabTypes]);

  // Memoize filtered listings
  const filteredListings = useMemo(() => filterListings(), [filterListings]);

  // Update listings when filters change
  useEffect(() => {
    setListings(filteredListings);
  }, [filteredListings]);

  // Initial fetch
  useEffect(() => {
    fetchAllListings();
  }, [fetchAllListings]);

  // Memoize form submission handler
  const onSubmit = useCallback(async (data: ListingFormData) => {
    let payload: any = {
      fullName: data.fullName,
      phone: data.phone,
    };
    
    if (data.listingType === 'arsa') {
      payload.blockNo = data.blockNo;
      payload.parcelNo = data.parcelNo;
    } else if (data.listingType === 'daire') {
      payload.address = data.address;
    }
    
    try {
      const response = await fetch('http://localhost:5001/api/forms/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        toast.success('Form başarıyla gönderildi!');
        reset();
      } else {
        toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }, [reset]);

  // Memoize reset filters handler
  const handleResetFilters = useCallback(() => {
    setPriceFilter('');
    setAreaFilter('');
  }, []);

  // Memoize tab change handler
  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  // Memoize price filter change handler
  const handlePriceFilterChange = useCallback((e: any) => {
    setPriceFilter(e.target.value);
  }, []);

  // Memoize area filter change handler
  const handleAreaFilterChange = useCallback((e: any) => {
    setAreaFilter(e.target.value);
  }, []);

  return (
    <Box sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
      minHeight: '100vh',
      borderRadius: 0,
      boxShadow: 'none',
      px: 0,
      py: 0,
      fontFamily: 'Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif',
      transition: 'background 0.3s',
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '110vh',
          mt: { xs: '-100px', md: '-100px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #e0e0e0',
          background: `linear-gradient(rgba(34,34,34,0.7), rgba(34,34,34,0.7)), url('/images/bg.jpg') center/cover no-repeat`,
          py: 0,
        }}
      >
        <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0 }}>
          <Grid container spacing={0} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: '#fefefe', fontSize: { xs: '3rem', md: '2.25rem' } }}
                >
                  Yatırımda Güvenin Adı
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: '#fefefe', textTransform: 'uppercase', fontSize: { xs: '3rem', md: '3.25rem' }, mt: 0 }}
                >
                  Ark Gayrimenkul
                </Typography>
                <Typography variant="h6" sx={{ color: '#fefefe', fontSize: { xs: '1rem', md: '1.125rem' }, mt: 4 }} paragraph>
                  Ark Gayrimenkul olarak her adımda çözüm üretiyor, yatırımınızı güvenle yönlendiriyoruz. Trakya'nın yükselen değerlerinde fırsatları kaçırmadan sizin için çalışıyoruz.
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/ilanlarimiz"
                    className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeLarge MuiButton-outlinedSizeLarge MuiButton-colorPrimary"
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      fontWeight: 700,
                      borderWidth: 2,
                      borderRadius: 3,
                      backgroundColor: 'transparent',
                      px: 4,
                      minWidth: 204,
                      height: 48,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: '#e41e25',
                        color: '#fff',
                        borderColor: '#e41e25',
                        boxShadow: 4,
                      },
                    }}
                  >
                    İlanlarımız
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/iletisim"
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                      fontWeight: 700,
                      borderWidth: 2,
                      borderRadius: 3,
                      backgroundColor: 'transparent',
                      px: 4,
                      minWidth: 204,
                      height: 48,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: '#e41e25',
                        color: '#fff',
                        borderColor: '#e41e25',
                        boxShadow: 4,
                      },
                    }}
                  >
                    İletişime Geç
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* TEFE-TÜFE Kutusu */}
      <QuickWhatsApp />

      {/* Filtre ve İlanlar: Ortak Container */}
      <Container maxWidth="lg" sx={{ my: { xs: 3, md: 6 }, p: 0 }}>
        <Box sx={{
          bgcolor: 'rgba(34,34,34,0.96)',
          color: '#fff',
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          border: '1.5px solid rgba(255,255,255,0.06)',
          px: { xs: 1, md: 4 },
          py: { xs: 2, md: 3 },
        }}>
          {/* Filtreleme Barı */}
          <Box sx={{ mb: 2 }}>
            <Grid container columns={12} spacing={2} alignItems="center" justifyContent="center">
              <Grid size={{ xs: 12, md: 4 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
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
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ color: '#fff' }}>Metrekare</InputLabel>
                  <Select
                    value={areaFilter}
                    label="Metrekare"
                    onChange={handleAreaFilterChange}
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
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <FormControl fullWidth size="medium">
                  <InputLabel sx={{ color: '#fff' }}>Fiyat Aralığı</InputLabel>
                  <Select
                    value={priceFilter}
                    label="Fiyat Aralığı"
                    onChange={handlePriceFilterChange}
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
              </Grid>
              <Grid size={{ xs: 12, md: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                  onClick={handleResetFilters}
                >
                  Sıfırla
                </Button>
              </Grid>
            </Grid>
          </Box>
          {/* İlan Grid */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
              <Typography variant="h6" sx={{ color: '#fefefe' }}>Yükleniyor...</Typography>
            </Box>
          ) : (
            <Grid container columns={12} spacing={4}>
              {listings.slice(0, 6).map((listing) => {
                const imageUrl = listing.images && listing.images[0]
                  ? listing.images[0].startsWith('http')
                    ? listing.images[0]
                    : `http://localhost:5001${listing.images[0]}`
                  : '/placeholder.jpg';
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={listing._id}>
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
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Container>

      {/* İlanım Var Formu */}
      <Box id="contact" sx={{ bgcolor: '#444', py: 8, borderTop: '1px solid #e0e0e0', mt: 8 }}>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#444' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: '#fefefe' }}>
              İlanım Var
            </Typography>
            <Typography variant="body1" sx={{ color: '#fefefe' }} paragraph>
              İlanınızı eklemek için formu doldurun, size ulaşalım.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Ad Soyad"
                {...register('fullName', { required: true })}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#fefefe' } }}
                InputProps={{ style: { color: '#fefefe' } }}
              />
              <TextField
                label="Telefon"
                {...register('phone', { required: true })}
                required
                fullWidth
                InputLabelProps={{ style: { color: '#fefefe' } }}
                InputProps={{ style: { color: '#fefefe' } }}
              />
              <FormControl fullWidth required>
                <InputLabel sx={{ color: '#fefefe' }}>İlan Türü</InputLabel>
                <Select
                  {...register('listingType', { required: true })}
                  defaultValue=""
                  label="İlan Türü"
                  sx={{ color: '#fefefe', bgcolor: '#444', borderRadius: 2 }}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  <MenuItem value="arsa">Arsa</MenuItem>
                  <MenuItem value="daire">Daire</MenuItem>
                </Select>
              </FormControl>
              {watch('listingType') === 'arsa' && (
                <>
                  <TextField
                    label="Ada No"
                    {...register('blockNo', { required: true })}
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: '#fefefe' } }}
                    InputProps={{ style: { color: '#fefefe' } }}
                  />
                  <TextField
                    label="Parsel No"
                    {...register('parcelNo', { required: true })}
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: '#fefefe' } }}
                    InputProps={{ style: { color: '#fefefe' } }}
                  />
                </>
              )}
              {watch('listingType') === 'daire' && (
                <TextField
                  label="Adres"
                  {...register('address', { required: true })}
                  required
                  fullWidth
                  InputLabelProps={{ style: { color: '#fefefe' } }}
                  InputProps={{ style: { color: '#fefefe' } }}
                />
              )}
              <Button type="submit" variant="contained" size="large" sx={{ mt: 2, bgcolor: '#e41e25', color: '#fefefe', '&:hover': { bgcolor: '#b71c1c' } }}>
                Gönder
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
} 