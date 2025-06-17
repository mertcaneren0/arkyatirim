import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Grid from '@mui/material/Grid';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MapIcon from '@mui/icons-material/Map';
import ArticleIcon from '@mui/icons-material/Article';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
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

  // Optimized static price ranges - avoid expensive calculations on every render
  const priceRanges = useMemo(() => [
    { label: 'Tümü', value: '' },
    { label: '0 ₺ - 500.000 ₺', value: '0-500000' },
    { label: '500.001 ₺ - 1.000.000 ₺', value: '500001-1000000' },
    { label: '1.000.001 ₺ - 2.000.000 ₺', value: '1000001-2000000' },
    { label: '2.000.001 ₺ ve üzeri', value: '2000001+' },
  ], []);

  // Optimized static area ranges - avoid expensive calculations on every render
  const areaRanges = useMemo(() => [
    { label: 'Tümü', value: '' },
    { label: '0 - 100 m²', value: '0-100' },
    { label: '101 - 200 m²', value: '101-200' },
    { label: '201 - 500 m²', value: '201-500' },
    { label: '501 m² ve üzeri', value: '501+' },
  ], []);

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

  // Optimized filter function with early returns and better performance
  const filteredListings = useMemo(() => {
    if (!allListings.length) return [];
    
    let filtered = allListings;
    
    // Category filter
    if (activeTab > 0 && tabTypes[activeTab] !== 'Tümü') {
      filtered = filtered.filter(l => l.type === tabTypes[activeTab]);
    }
    
    // Price filter - optimized parsing
    if (priceFilter) {
      if (priceFilter.endsWith('+')) {
        const min = parseInt(priceFilter);
        filtered = filtered.filter(l => l.price >= min);
      } else if (priceFilter.includes('-')) {
        const [min, max] = priceFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.price >= min && l.price <= max);
      }
    }
    
    // Area filter - optimized parsing  
    if (areaFilter) {
      if (areaFilter.endsWith('+')) {
        const min = parseInt(areaFilter);
        filtered = filtered.filter(l => l.area >= min);
      } else if (areaFilter.includes('-')) {
        const [min, max] = areaFilter.split('-').map(Number);
        filtered = filtered.filter(l => l.area >= min && l.area <= max);
      }
    }
    
    return filtered;
  }, [allListings, activeTab, priceFilter, areaFilter, tabTypes]);

  // Direct usage of filteredListings, no need for extra state
  const displayListings = useMemo(() => filteredListings.slice(0, 6), [filteredListings]);
  
  // Memoize listing card component to prevent unnecessary re-renders
  const ListingCard = useMemo(() => {
    return ({ listing }: { listing: Listing }) => {
      const imageUrl = listing.images && listing.images[0]
        ? listing.images[0].startsWith('http')
          ? listing.images[0]
          : `http://localhost:5001${listing.images[0]}`
        : '/placeholder.jpg';
      
      return (
        <Card sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            borderColor: 'rgba(228,30,37,0.3)',
            '& .listing-image': {
              transform: 'scale(1.05)'
            },
            '& .listing-button': {
              background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(228,30,37,0.4)'
            }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="220"
              image={imageUrl}
              alt={listing.title}
              className="listing-image"
              loading="lazy"
              sx={{
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                objectFit: 'cover'
              }}
            />
            <Box sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: 'rgba(228,30,37,0.9)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              {listing.type}
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
              pointerEvents: 'none'
            }} />
          </Box>
          
          <CardContent sx={{ 
            flexGrow: 1, 
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
          }}>
            <Box>
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ 
                color: '#1a202c',
                fontSize: '1.125rem',
                lineHeight: 1.3,
                mb: 1
              }}>
                {listing.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ fontSize: 16, color: '#718096', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#718096', fontWeight: 500 }}>
                  {listing.district}, {listing.city}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: 2,
              mb: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SquareFootIcon sx={{ fontSize: 18, color: '#4CAF50', mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: '#4a5568', fontWeight: 600 }}>
                  {listing.area} m²
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ 
                color: '#e41e25', 
                fontWeight: 800,
                fontSize: '1.25rem'
              }}>
                {listing.price.toLocaleString('tr-TR')} ₺
              </Typography>
            </Box>
            
            <Button
              variant="contained"
              size="medium"
              href={`/ilan/${listing._id}`}
              className="listing-button"
              sx={{ 
                mt: 'auto',
                py: 1.5,
                borderRadius: 2,
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: 0.5,
                '&:hover': {
                  background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)'
                }
              }}
              fullWidth
            >
              Detayları İncele
            </Button>
          </CardContent>
        </Card>
      );
    };
  }, []);

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
      minHeight: '100vh',
      borderRadius: 0,
      boxShadow: 'none',
      px: 0,
      py: 0,
      fontFamily: 'Montserrat, system-ui, Avenir, Helvetica, Arial, sans-serif',
      position: 'relative',
      // Modern light geometric background
      background: `
        linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #f8f9fa 50%, #e9ecef 75%, #f8f9fa 100%),
        radial-gradient(circle at 20% 80%, rgba(228,30,37,0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(76,175,80,0.06) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255,152,0,0.04) 0%, transparent 50%)
      `,
      backgroundSize: '400px 400px, 800px 800px, 600px 600px, 1000px 1000px',
      backgroundPosition: '0 0, 100% 0%, 50% 100%, 0% 50%',
      backgroundAttachment: 'fixed',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 11h78v78H11V11zm2 2v74h74V13H13z' fill='%23000000' fill-opacity='0.015'/%3E%3C/svg%3E")
        `,
        backgroundSize: '60px 60px, 100px 100px',
        pointerEvents: 'none',
        zIndex: 0
      },
      '&::after': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, transparent 30%, rgba(228,30,37,0.01) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      },

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
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            backgroundImage: `linear-gradient(rgba(15,15,15,0.8), rgba(25,25,25,0.7)), url('/images/bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            py: 0,
            zIndex: 1,
            // Hero'ya da subtle pattern ekleyelim
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
              pointerEvents: 'none',
              zIndex: 0
            }
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

      {/* Modern Filtre ve İlanlar Sistemi */}
      <Container maxWidth="xl" sx={{ my: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}>
        {/* Modern Filtreleme Header */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            fontWeight={800} 
            sx={{ 
              color: '#2d3748', 
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.5rem' }
            }}
          >
            <SearchIcon sx={{ mr: 2, verticalAlign: 'middle', fontSize: 'inherit' }} />
            İlanları Keşfedin
          </Typography>
          <Typography variant="h6" sx={{ 
            color: '#718096', 
            maxWidth: 700, 
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.125rem' },
            fontWeight: 400
          }}>
            Trakya'nın en güncel gayrimenkul portföyünden size uygun olanı bulun
          </Typography>
        </Box>

        <Box sx={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          color: '#2d3748',
          borderRadius: 6,
          boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 8px 32px rgba(228,30,37,0.08)',
          border: '1px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          mx: { xs: 0, md: -2 },
          mb: 4
        }}>
          {/* Dekoratif gradient overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #e41e25 0%, #ff4757 50%, #e41e25 100%)'
            }}
          />
          
          {/* Modern Filtreleme Barı */}
          <Box sx={{ p: { xs: 3, md: 5 } }}>
            {/* Kategori Filtreleri */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TuneIcon sx={{ mr: 1, color: '#e41e25' }} />
                <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748' }}>
                  Kategori
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                flexWrap: 'wrap',
                '& .MuiButton-root': {
                  borderRadius: 8,
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }
              }}>
                {tabTypes.map((label, i) => (
                  <Button
                    key={label}
                    variant={activeTab === i ? "contained" : "outlined"}
                    onClick={() => setActiveTab(i)}
                    startIcon={activeTab === i ? <LocationOnIcon /> : null}
                    sx={{
                      ...(activeTab === i ? {
                        bgcolor: '#e41e25',
                        color: '#fff',
                        borderColor: '#e41e25',
                        boxShadow: '0 4px 20px rgba(228,30,37,0.3)',
                        transform: 'translateY(-2px)',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                          pointerEvents: 'none'
                        }
                      } : {
                        color: '#718096',
                        borderColor: 'rgba(0,0,0,0.2)',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        '&:hover': {
                          bgcolor: 'rgba(228,30,37,0.1)',
                          borderColor: '#e41e25',
                          color: '#e41e25',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 10px rgba(228,30,37,0.2)'
                        }
                      })
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Gelişmiş Filtreler */}
            <Grid container spacing={3} alignItems="end">
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#718096', display: 'flex', alignItems: 'center' }}>
                    <SquareFootIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Metrekare
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={areaFilter}
                    onChange={handleAreaFilterChange}
                    displayEmpty
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.03)',
                      borderRadius: 3,
                      height: 52,
                      color: '#2d3748',
                      border: '1px solid rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      '& .MuiOutlinedInput-notchedOutline': { 
                        border: 'none'
                      },
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.06)',
                        borderColor: 'rgba(228,30,37,0.5)',
                        boxShadow: '0 4px 20px rgba(228,30,37,0.15)'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'rgba(0,0,0,0.08)',
                        borderColor: '#e41e25',
                        boxShadow: '0 0 0 3px rgba(228,30,37,0.1)'
                      },
                      '& .MuiSelect-icon': { 
                        color: '#e41e25' 
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ color: '#666' }}>Tüm Boyutlar</MenuItem>
                    {areaRanges.slice(1).map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#718096', display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon sx={{ fontSize: 16, mr: 0.5 }} />
                    Fiyat Aralığı
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={priceFilter}
                    onChange={handlePriceFilterChange}
                    displayEmpty
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.03)',
                      borderRadius: 3,
                      height: 52,
                      color: '#2d3748',
                      border: '1px solid rgba(0,0,0,0.12)',
                      transition: 'all 0.3s ease',
                      '& .MuiOutlinedInput-notchedOutline': { 
                        border: 'none'
                      },
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.06)',
                        borderColor: 'rgba(228,30,37,0.5)',
                        boxShadow: '0 4px 20px rgba(228,30,37,0.15)'
                      },
                      '&.Mui-focused': {
                        bgcolor: 'rgba(0,0,0,0.08)',
                        borderColor: '#e41e25',
                        boxShadow: '0 0 0 3px rgba(228,30,37,0.1)'
                      },
                      '& .MuiSelect-icon': { 
                        color: '#e41e25' 
                      }
                    }}
                  >
                    <MenuItem value="" sx={{ color: '#666' }}>Tüm Fiyatlar</MenuItem>
                    {priceRanges.slice(1).map(r => (
                      <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, height: 52 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleResetFilters}
                    sx={{
                      flex: 1,
                      borderColor: 'rgba(0,0,0,0.3)',
                      color: '#718096',
                      borderRadius: 3,
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: '#e41e25',
                        bgcolor: 'rgba(228,30,37,0.1)',
                        color: '#e41e25',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 15px rgba(228,30,37,0.2)'
                      }
                    }}
                  >
                    Temizle
                  </Button>
                  <Box
                    sx={{
                      bgcolor: 'rgba(228,30,37,0.1)',
                      border: '1px solid rgba(228,30,37,0.3)',
                      borderRadius: 3,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      minWidth: 80,
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#e41e25', fontWeight: 600 }}>
                      {filteredListings.length} ilan
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>


          
          {/* İlan Grid */}
          <Box sx={{ mt: 6 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                <Typography variant="h6" sx={{ color: '#2d3748' }}>Yükleniyor...</Typography>
              </Box>
            ) : (
              <Grid container spacing={{ xs: 3, md: 4 }}>
                {displayListings.map((listing: Listing) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={listing._id}>
                    <ListingCard listing={listing} />
                  </Grid>
                ))}
              </Grid>
            )}
            
            {/* Daha Fazla İlan Butonu */}
            {!isLoading && displayListings.length > 0 && (
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  variant="outlined"
                  size="large"
                  href="/ilanlarimiz"
                  sx={{
                    px: 6,
                    py: 2,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#2d3748',
                    borderColor: '#e41e25',
                    borderWidth: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#e41e25',
                      color: '#fff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 30px rgba(228,30,37,0.3)',
                      borderWidth: 2
                    }
                  }}
                >
                  Tüm İlanları Görüntüle ({allListings.length} İlan)
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Modern Neden Ark Gayrimenkul Bölümü */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, position: 'relative', zIndex: 1 }}>
        <Box 
          sx={{ 
            p: 6, 
            background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
            borderRadius: 6, 
            boxShadow: '0 8px 32px rgba(228, 30, 37, 0.3)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Dekoratif arka plan elementleri */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              fontWeight={800} 
              mb={3} 
              textAlign="center"
              sx={{ 
                fontSize: { xs: 24, md: 32 },
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Neden Ark Gayrimenkul?
            </Typography>
            
            <GridLegacy container spacing={4} justifyContent="center">
              <GridLegacy item xs={12} md={4} textAlign="center">
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    p: 3,
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h2" fontWeight={700} mb={1} sx={{ fontSize: 48 }}>
                    15+
                  </Typography>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    Yıllık Deneyim
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Sektörde uzun yıllar kazanılmış tecrübe
                  </Typography>
                </Box>
              </GridLegacy>
              
              <GridLegacy item xs={12} md={4} textAlign="center">
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    p: 3,
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h2" fontWeight={700} mb={1} sx={{ fontSize: 48 }}>
                    100+
                  </Typography>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    Referans
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Her zaman yanınızda, güvenilir hizmet
                  </Typography>
                </Box>
              </GridLegacy>
              
              <GridLegacy item xs={12} md={4} textAlign="center">
                <Box
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    borderRadius: 4,
                    p: 3,
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h2" fontWeight={700} mb={1} sx={{ fontSize: 48 }}>
                    100%
                  </Typography>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    Güven & Şeffaflık
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Şeffaf süreçler, güvenilir işlemler
                  </Typography>
                </Box>
              </GridLegacy>
            </GridLegacy>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography 
              
                variant="h6" 
                sx={{ 
                  fontStyle: 'italic', 
                  opacity: 0.95,
                  fontSize: { xs: 16, md: 18 }
                }}
              >
                
                
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* İstatistikler & Başarılar Bölümü */}
      <Container maxWidth="lg" sx={{ my: 8, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 2 }}>
            Rakamlarla Ark Gayrimenkul
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', maxWidth: 600, mx: 'auto' }}>
            Yılların deneyimi ve binlerce memnun müşterinin güveniyle sektörde lider konumdayız
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {[
            { icon: <HomeWorkIcon sx={{ fontSize: 48 }} />, number: '1200+', label: 'Satılan İlan', color: '#e41e25' },
            { icon: <GroupIcon sx={{ fontSize: 48 }} />, number: '1800+', label: 'Memnun Müşteri', color: '#4CAF50' },
            { icon: <TrendingUpIcon sx={{ fontSize: 48 }} />, number: '₺450M+', label: 'İşlem Hacmi', color: '#FF9800' },
            { icon: <CheckCircleIcon sx={{ fontSize: 48 }} />, number: '150+', label: 'Aktif İlan', color: '#2196F3' },
          ].map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: `1px solid ${stat.color}30`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${stat.color}20`,
                    borderColor: `${stat.color}60`
                  }
                }}
              >
                <Box sx={{ color: stat.color, mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: '#718096' }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Müşteri Testimonials */}
      <Container maxWidth="lg" sx={{ my: 8, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 2 }}>
            Müşterilerimiz Ne Diyor?
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', maxWidth: 600, mx: 'auto' }}>
            Müşterimizin deneyimlerinden bazıları
          </Typography>
        </Box>

        <Box sx={{ 
          position: 'relative',
          '& .testimonials-container': {
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            gap: 3,
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0,0,0,0.1)',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#e41e25',
              borderRadius: 4,
              '&:hover': {
                background: '#c41820',
              }
            }
          }
        }}>
          <Box className="testimonials-container">
            {[
              {
                name: 'Ahmet Y**',
                location: 'Lüleburgaz, Kırklareli',
                text: 'Ark Gayrimenkul sayesinde hayalimizin evini bulduk. Profesyonel yaklaşımları ve güvenilir hizmetleri için teşekkür ederiz.',
                rating: 5,
                avatar: 'AY'
              },
              {
                name: 'Zeynep D**',
                location: 'Çorlu, Tekirdağ',
                text: 'Yatırım danışmanlığı konusunda aldığım destek mükemmeldi. Doğru zamanda doğru yatırım yapabilme fırsatı yakaladım.',
                rating: 5,
                avatar: 'ZD'
              },
              {
                name: 'Mehmet K**',
                location: 'Çerkezköy, Tekirdağ',
                text: 'Satış sürecinde gösterdikleri titizlik ve profesyonellik gerçekten takdire şayan. Kesinlikle tavsiye ederim.',
                rating: 5,
                avatar: 'MK'
              },
              {
                name: 'Fatma A**',
                location: 'Edirne, Edirne',
                text: 'Ev satış işlemimizi baştan sona kadar takip ettiler. Her aşamada bilgilendirildik ve memnun kaldık.',
                rating: 5,
                avatar: 'FA'
              },
              {
                name: 'Mustafa Ö**',
                location: 'Keşan, Edirne',
                text: 'Arsa alımında bize rehberlik ettiler. Hukuki süreçlerde de yanımızda oldular. Gerçekten güvenilir bir firma.',
                rating: 5,
                avatar: 'MÖ'
              },
              {
                name: 'Ayşe T**',
                location: 'Babaeski, Kırklareli',
                text: 'İlk ev alım deneyimimdi ve çok endişeliydim. Ekip sayesinde her şey sorunsuz geçti. Teşekkürler!',
                rating: 5,
                avatar: 'AT'
              },
              {
                name: 'Hasan G**',
                location: 'Uzunköprü, Edirne',
                text: 'Yatırım amaçlı aldığım daireyi çok uygun fiyata satın alabildim. Piyasa analizi konusunda çok başarılılar.',
                rating: 5,
                avatar: 'HG'
              },
              {
                name: 'Elif S**',
                location: 'Vize, Kırklareli',
                text: 'Köy evimizi şehirde satıp, merkezi bir yere taşınmak istiyorduk. Her iki işlem de sorunsuz tamamlandı.',
                rating: 5,
                avatar: 'ES'
              },
              {
                name: 'İbrahim M**',
                location: 'Marmaraereğlisi, Tekirdağ',
                text: 'Deniz kenarında tatil evi almak istiyorduk. Hayal ettiğimizden daha güzel bir yer buldular.',
                rating: 5,
                avatar: 'İM'
              },
              {
                name: 'Gülseren B**',
                location: 'Pınarhisar, Kırklareli',
                text: 'Emekli olduktan sonra küçük bir eve geçmek istiyorduk. Bütçemize uygun mükemmel bir seçenek sundular.',
                rating: 5,
                avatar: 'GB'
              },
              {
                name: 'Osman C**',
                location: 'Havsa, Edirne',
                text: 'Tarım arazisi satışı konusunda destek aldık. Fiyat belirleme ve alıcı bulma konusunda çok yardımcı oldular.',
                rating: 5,
                avatar: 'OC'
              },
              {
                name: 'Sevgi R**',
                location: 'Demirköy, Kırklareli',
                text: 'Şehir merkezinde iş yeri açmak için uygun yer arıyorduk. Lokasyon analizi yaparak en iyi seçeneği buldular.',
                rating: 5,
                avatar: 'SR'
              }
            ].map((testimonial, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: { xs: 280, sm: 350, md: 380 },
                  p: 4,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  height: 'fit-content',
                  transition: 'all 0.3s ease',
                  cursor: 'grab',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    borderColor: 'rgba(228,30,37,0.3)'
                  },
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#e41e25',
                      width: 48,
                      height: 48,
                      mr: 2,
                      fontWeight: 700,
                      fontSize: '0.9rem'
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748', fontSize: '1rem' }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096', fontSize: '0.875rem' }}>
                      {testimonial.location}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: '#FFD700', fontSize: 18 }} />
                  ))}
                </Box>
                
                <Typography variant="body1" sx={{ 
                  color: '#4a5568', 
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  fontSize: '0.95rem'
                }}>
                  "{testimonial.text}"
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Scroll İndikatörü */}
          <Box sx={{ 
            textAlign: 'center', 
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              Kaydırarak daha fazla yorumu görebilirsiniz
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 0.5,
              animation: 'pulse 2s infinite'
            }}>
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#e41e25' }} />
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#e41e25' }} />
              <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#e41e25' }} />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Hizmetler Showcase */}
      <Container maxWidth="lg" sx={{ mt: 12, mb: 12, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 2 }}>
            Profesyonel Hizmetlerimiz
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', maxWidth: 600, mx: 'auto' }}>
            Gayrimenkul yatırımınızın her aşamasında yanınızdayız
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <BusinessIcon sx={{ fontSize: 48 }} />,
              title: 'Alım-Satım Danışmanlığı',
              description: 'Profesyonel ekibimizle mülk alım-satım süreçlerinizi güvenle yönetiyoruz.',
              features: ['Piyasa Analizi', 'Fiyat Değerlendirmesi', 'Hukuki Destek']
            },
            {
              icon: <AssessmentIcon sx={{ fontSize: 48 }} />,
              title: 'Emlak Değerleme',
              description: 'Uzman değerleme ekibimizle mülkünüzün gerçek piyasa değerini belirliyoruz.',
              features: ['Detaylı Rapor', 'Piyasa Karşılaştırması', 'Yatırım Analizi']
            },
            {
              icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
              title: 'Yatırım Danışmanlığı',
              description: 'Gayrimenkul yatırımlarınızda en karlı fırsatları birlikte keşfediyoruz.',
              features: ['Portföy Yönetimi', 'Risk Analizi', 'Getiri Optimizasyonu']
            },
            {
              icon: <SupportAgentIcon sx={{ fontSize: 48 }} />,
              title: 'Emlak Yönetimi',
              description: 'Mülklerinizin profesyonel yönetimi ve bakımı için komple hizmet.',
              features: ['Kiracı Yönetimi', 'Bakım-Onarım',]
            }
          ].map((service, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(228,30,37,0.5)',
                    boxShadow: '0 16px 48px rgba(228,30,37,0.15)'
                  }
                }}
              >
                <Box sx={{ color: '#e41e25', mb: 3 }}>
                  {service.icon}
                </Box>
                
                <Typography variant="h5" fontWeight={700} sx={{ color: '#2d3748', mb: 2 }}>
                  {service.title}
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#718096', mb: 3 }}>
                  {service.description}
                </Typography>
                
                <Box>
                  {service.features.map((feature, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 18, mr: 1 }} />
                      <Typography variant="body2" sx={{ color: '#4a5568' }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bölge/Lokasyon Bilgileri */}
      <Container maxWidth="lg" sx={{ mt: 12, mb: 8, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 2 }}>
            <MapIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Hizmet Verdiğimiz Bölgeler
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', maxWidth: 600, mx: 'auto' }}>
            Trakya genelinde güçlü ağımızla her bölgede profesyonel hizmet sunuyoruz
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            // Kırklareli İli
            { city: 'Lüleburgaz', province: 'Kırklareli', trend: '+12%', color: '#e41e25', icon: '🏘️' },
            { city: 'Babaeski', province: 'Kırklareli', trend: '+9%', color: '#4CAF50', icon: '🌾' },
            { city: 'Demirköy', province: 'Kırklareli', trend: '+7%', color: '#FF9800', icon: '🌲' },
            { city: 'Pınarhisar', province: 'Kırklareli', trend: '+6%', color: '#2196F3', icon: '💎' },
            { city: 'Kofçaz', province: 'Kırklareli', trend: '+8%', color: '#9C27B0', icon: '⛰️' },
            { city: 'Vize', province: 'Kırklareli', trend: '+11%', color: '#607D8B', icon: '🏛️' },
            
            // Edirne İli  
            { city: 'Keşan', province: 'Edirne', trend: '+10%', color: '#795548', icon: '🌊' },
            { city: 'Uzunköprü', province: 'Edirne', trend: '+13%', color: '#FF5722', icon: '🌉' },
            { city: 'Havsa', province: 'Edirne', trend: '+5%', color: '#3F51B5', icon: '🌿' },
            { city: 'İpsala', province: 'Edirne', trend: '+14%', color: '#009688', icon: '🏞️' },
            { city: 'Lalapaşa', province: 'Edirne', trend: '+7%', color: '#8BC34A', icon: '🏡' },
            { city: 'Meriç', province: 'Edirne', trend: '+9%', color: '#CDDC39', icon: '🌻' },
            
            // Tekirdağ İli
            { city: 'Süleymanpaşa', province: 'Tekirdağ', trend: '+16%', color: '#FFC107', icon: '🏖️' },
            { city: 'Çerkezköy', province: 'Tekirdağ', trend: '+15%', color: '#FF9800', icon: '🏭' },
            
            { city: 'Marmaraereğlisi', province: 'Tekirdağ', trend: '+11%', color: '#E91E63', icon: '⚓' },
            
            // Diğer Bölgeler
            { city: 'Edirne', province: 'Edirne', trend: '+18%', color: '#e41e25', icon: '👑' },
            { city: 'Kırklareli', province: 'Kırklareli', trend: '+14%', color: '#4CAF50', icon: '🌟' },
            { city: 'İğneada', province: 'Kırklareli', trend: '+6%', color: '#00BCD4', icon: '🏖️' },
            { city: 'Erikli', province: 'Kırklareli', trend: '+4%', color: '#FF6F00', icon: '🌺' },
            { city: 'Enez', province: 'Edirne', trend: '+12%', color: '#6A1B9A', icon: '🏺' }
          ].map((location, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.95) 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  border: `2px solid ${location.color}20`,
                  textAlign: 'center',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    borderColor: `${location.color}80`,
                    boxShadow: `0 20px 60px ${location.color}25`,
                    '& .location-icon': {
                      transform: 'scale(1.3) rotate(10deg)'
                    },
                    '& .trend-badge': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 4px 20px ${location.color}40`
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${location.color} 0%, ${location.color}80 100%)`,
                    opacity: 0.8
                  }
                }}
              >
                <Box
                  className="location-icon"
                  sx={{
                    fontSize: '2rem',
                    mb: 2,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'inline-block'
                  }}
                >
                  {location.icon}
                </Box>
                
                <Typography variant="h6" fontWeight={700} sx={{ 
                  color: '#1a202c', 
                  mb: 0.5,
                  fontSize: '1.1rem'
                }}>
                  {location.city}
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: '#718096', 
                  mb: 2,
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {location.province}
                </Typography>
                
                <Box
                  className="trend-badge"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: `${location.color}15`,
                    color: location.color,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    border: `1px solid ${location.color}30`
                  }}
                >
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  {location.trend} Artış
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Bölge İstatistikleri */}
        <Box sx={{ 
          mt: 8, 
          p: 4, 
          background: 'linear-gradient(135deg, rgba(228,30,37,0.05) 0%, rgba(76,175,80,0.05) 100%)',
          borderRadius: 4,
          border: '1px solid rgba(228,30,37,0.1)'
        }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: '#e41e25', mb: 1 }}>
                  21+
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                  Aktif Bölge
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: '#4CAF50', mb: 1 }}>
                  %10.2
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                  Ortalama Artış
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: '#FF9800', mb: 1 }}>
                  3+
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                  İl Merkezi
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={800} sx={{ color: '#2196F3', mb: 1 }}>
                  %100
                </Typography>
                <Typography variant="body1" sx={{ color: '#2d3748', fontWeight: 600 }}>
                  Hizmet Kapsamı
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      

      {/* Blog/Haberler Bölümü */}
      <Container maxWidth="lg" sx={{ my: 8, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: '#2d3748', mb: 2 }}>
            <ArticleIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
            Güncel Haberler & Analizler
          </Typography>
          <Typography variant="body1" sx={{ color: '#718096', maxWidth: 600, mx: 'auto' }}>
            Emlak sektöründeki son gelişmeler ve uzman görüşleri
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              title: '2024 Yılında Gayrimenkul Yatırımı',
              excerpt: 'Uzmanlarımızdan 2024 yılında gayrimenkul yatırımının geleceği hakkında değerlendirmeler...',
              date: '15 Aralık 2024',
              readTime: '5 dk',
              category: 'Yatırım'
            },
            {
              title: 'Trakya Bölgesi Piyasa Raporu',
              excerpt: 'Bölgemizde son 6 ayda yaşanan fiyat hareketleri ve gelecek projeksiyonlar...',
              date: '12 Aralık 2024',
              readTime: '7 dk',
              category: 'Analiz'
            },
            {
              title: 'Konut Kredisi Faiz Oranları',
              excerpt: 'Güncel faiz oranları ve kredi çekme süreçleri hakkında bilmeniz gerekenler...',
              date: '10 Aralık 2024',
              readTime: '4 dk',
              category: 'Finans'
            }
          ].map((article, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  p: 4,
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)',
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(228,30,37,0.3)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.4)'
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#e41e25',
                      borderColor: '#e41e25',
                      fontSize: '0.75rem',
                      mb: 2
                    }}
                  >
                    {article.category}
                  </Button>
                </Box>
                
                <Typography variant="h6" fontWeight={600} sx={{ color: '#2d3748', mb: 2 }}>
                  {article.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#718096', mb: 3 }}>
                  {article.excerpt}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#a0aec0' }}>
                    {article.date}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e41e25' }}>
                    {article.readTime} okuma
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        
      </Container>

      {/* İlanım Var Formu */}
      <Box id="contact" sx={{ 
        background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
        py: 8, 
        borderTop: '3px solid #e41e25', 
        mt: 8,
        position: 'relative',
        zIndex: 1,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          zIndex: 0
        }
      }}>
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Paper elevation={8} sx={{ 
            p: 4, 
            bgcolor: 'rgba(255,255,255,0.98)',
            borderRadius: 3,
            border: '1px solid rgba(228,30,37,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(228,30,37,0.1)'
          }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" fontWeight={800} gutterBottom sx={{ 
                color: '#1a202c',
                background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                İlanım Var
              </Typography>
              <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }} paragraph>
                Gayrimenkulünüzü değerlendirmek için formu doldurun, uzman ekibimiz size ulaşsın.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Ad Soyad"
                {...register('fullName', { required: true })}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f7fafc',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                      borderWidth: 2
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e41e25',
                  }
                }}
              />
              <TextField
                label="Telefon"
                {...register('phone', { required: true })}
                required
                fullWidth
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f7fafc',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                      borderWidth: 2
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#e41e25',
                  }
                }}
              />
              <FormControl fullWidth required>
                <InputLabel sx={{ 
                  '&.Mui-focused': { color: '#e41e25' }
                }}>İlan Türü</InputLabel>
                <Select
                  {...register('listingType', { required: true })}
                  defaultValue=""
                  label="İlan Türü"
                  sx={{ 
                    borderRadius: 2,
                    backgroundColor: '#f7fafc',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e41e25',
                      borderWidth: 2
                    }
                  }}
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
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f7fafc',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e41e25',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e41e25',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#e41e25',
                      }
                    }}
                  />
                  <TextField
                    label="Parsel No"
                    {...register('parcelNo', { required: true })}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f7fafc',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e41e25',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e41e25',
                          borderWidth: 2
                        }
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#e41e25',
                      }
                    }}
                  />
                </>
              )}
              {watch('listingType') === 'daire' && (
                <TextField
                  label="Adres"
                  {...register('address', { required: true })}
                  required
                  fullWidth
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f7fafc',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e41e25',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e41e25',
                        borderWidth: 2
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#e41e25',
                    }
                  }}
                />
              )}
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                sx={{ 
                  mt: 3, 
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #e41e25 0%, #c41820 100%)',
                  boxShadow: '0 4px 20px rgba(228,30,37,0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 30px rgba(228,30,37,0.4)',
                    background: 'linear-gradient(135deg, #c41820 0%, #b71c1c 100%)'
                  }
                }}
              >
                Gönder
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
} 