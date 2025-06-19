import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import QuickWhatsApp from '../components/QuickWhatsApp';
import { API_BASE_URL } from '../config/api';

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

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/listings/${id}`);
        if (res.ok) {
          setListing(await res.json());
        } else {
          navigate('/');
        }
      } catch {
        navigate('/');
      }
      setLoading(false);
    };
    fetchListing();
  }, [id, navigate]);

  if (loading) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography>Yükleniyor...</Typography></Box>;
  if (!listing) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography>İlan bulunamadı.</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', my: 6, p: { xs: 1, md: 3 } }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, boxShadow: 4, bgcolor: '#232323', color: '#fff' }}>
        <GridLegacy container spacing={4}>
          <GridLegacy item xs={12} md={6}>
            {/* Fotoğraf alanı */}
            {listing.images && listing.images.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ position: 'relative', width: '100%', height: 340, bgcolor: '#222', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img
                    src={listing.images[activeImage].startsWith('http') ? listing.images[activeImage] : `API_BASE_URL.replace('/api', '')${listing.images[activeImage]}`}
                    alt={listing.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 12, display: 'block', margin: '0 auto' }}
                  />
                  {listing.images.length > 1 && (
                    <>
                      <IconButton
                        onClick={() => setActiveImage((prev) => prev === 0 ? listing.images.length - 1 : prev - 1)}
                        sx={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                        size="small"
                        aria-label="Geri"
                      >
                        <ArrowBackIosNewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={() => setActiveImage((prev) => prev === listing.images.length - 1 ? 0 : prev + 1)}
                        sx={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                        size="small"
                        aria-label="İleri"
                      >
                        <ArrowForwardIosIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1, justifyContent: 'center' }}>
                  {listing.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.startsWith('http') ? img : `API_BASE_URL.replace('/api', '')${img}`}
                      alt={listing.title}
                      style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 6, border: i === activeImage ? '2px solid #e41e25' : '1px solid #333', cursor: 'pointer', opacity: i === activeImage ? 1 : 0.7 }}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ width: '100%', height: 240, bgcolor: '#444', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography>Fotoğraf yok</Typography>
              </Box>
            )}
          </GridLegacy>
          <GridLegacy item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} gutterBottom>{listing.title}</Typography>
            <Typography variant="subtitle1" sx={{ color: '#e41e25', mb: 2 }}>{listing.type}</Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>{listing.price.toLocaleString('tr-TR')} ₺</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>{listing.area} m²</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>{listing.city}, {listing.district}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{listing.address}</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{listing.description}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Özellikler</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {listing.features?.floor && <li>Kat: {listing.features.floor}</li>}
                {listing.features?.heatingType && <li>Isıtma: {listing.features.heatingType}</li>}
                {listing.features?.kitchenType && <li>Mutfak: {listing.features.kitchenType}</li>}
                {listing.features?.hasParking && <li>Otopark: Var</li>}
                {listing.features?.isFurnished && <li>Eşyalı</li>}
                {listing.features?.isInComplex && <li>Siteli</li>}
                {listing.features?.blockNo && <li>Ada: {listing.features.blockNo}</li>}
                {listing.features?.parcelNo && <li>Parsel: {listing.features.parcelNo}</li>}
                {listing.features?.sheetNo && <li>Pafta: {listing.features.sheetNo}</li>}
              </ul>
            </Box>
            <Button variant="contained" sx={{ mt: 3, bgcolor: '#e41e25', color: '#fff', '&:hover': { bgcolor: '#b71c1c' } }} onClick={() => navigate(-1)}>
              Geri Dön
            </Button>
          </GridLegacy>
        </GridLegacy>
      </Paper>
      <QuickWhatsApp />
    </Box>
  );
} 