import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ListingForm from '../../components/admin/ListingForm';
import type { ListingFormData } from '../../components/admin/ListingForm';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

interface Listing extends ListingFormData {
  _id: string;
  createdAt: string;
}

interface ListingForm {
  _id: string;
  fullName: string;
  phone: string;
  blockNo?: string;
  parcelNo?: string;
  address?: string;
  createdAt: string;
}

interface CareerForm {
  _id: string;
  fullName: string;
  age: number;
  phone: string;
  gender: string;
  city: string;
  district: string;
  createdAt: string;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#5b5b5b',
      paper: '#444',
    },
    text: {
      primary: '#fefefe',
    },
    primary: {
      main: '#e41e25',
      contrastText: '#fefefe',
    },
    secondary: {
      main: '#fefefe',
    },
  },
  typography: {
    fontFamily: 'Inter var, sans-serif',
  },
});

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingForms, setListingForms] = useState<ListingForm[]>([]);
  const [careerForms, setCareerForms] = useState<CareerForm[]>([]);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      console.log('Fetching data for tab:', activeTab); // Debug için

      const headers = { 'Authorization': `Bearer ${token}` };
      if (activeTab === 0) {
        const response = await fetch('http://localhost:5001/api/listings', { headers });
        console.log('Listings response status:', response.status); // Debug için
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched listings:', data); // Debug için
          setListings(data);
        } else {
          const error = await response.json();
          throw new Error(error.message || 'İlanlar yüklenemedi');
        }
      } else if (activeTab === 1) {
        const response = await fetch('http://localhost:5001/api/forms/listing', { headers });
        if (response.ok) setListingForms(await response.json());
      } else if (activeTab === 2) {
        const response = await fetch('http://localhost:5001/api/forms/career', { headers });
        if (response.ok) setCareerForms(await response.json());
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error); // Debug için
      toast.error('Veriler yüklenirken bir hata oluştu.');
    }
  };

  useEffect(() => { fetchData(); }, [activeTab, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleCreateListing = async (data: ListingFormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
        navigate('/admin/login');
        return;
      }

      let fetchBody: BodyInit;
      let headers: any = { 'Authorization': `Bearer ${token}` };

      if (data.images && data.images.length > 0) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'images') return;
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as any);
          }
        });
        data.images.forEach((file) => formData.append('images', file));
        fetchBody = formData;
      } else {
        fetchBody = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch('http://localhost:5001/api/listings', {
        method: 'POST',
        headers,
        body: fetchBody,
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsListingModalOpen(false);
        await fetchData();
        toast.success('İlan başarıyla oluşturuldu');
      } else {
        throw new Error(responseData.message || 'İlan oluşturulamadı');
      }
    } catch (error) {
      console.error('Hata detayı:', error);
      toast.error(error instanceof Error ? error.message : 'İlan oluşturulurken bir hata oluştu');
    }
  };

  const handleUpdateListing = async (data: ListingFormData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
        navigate('/admin/login');
        return;
      }

      let fetchBody: BodyInit;
      let headers: any = { 'Authorization': `Bearer ${token}` };

      if (data.images && data.images.length > 0) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === 'images') return;
          if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value as any);
          }
        });
        data.images.forEach((file) => formData.append('images', file));
        fetchBody = formData;
      } else {
        fetchBody = JSON.stringify(data);
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`http://localhost:5001/api/listings/${selectedListing?._id}`, {
        method: 'PUT',
        headers,
        body: fetchBody,
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsListingModalOpen(false);
        setSelectedListing(null);
        await fetchData();
        toast.success('İlan başarıyla güncellendi');
      } else {
        throw new Error(responseData.message || 'İlan güncellenemedi');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'İlan güncellenirken bir hata oluştu');
    }
  };

  const handleDeleteListing = async () => {
    if (!listingToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/listings/${listingToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setListingToDelete(null);
        fetchData();
        toast.success('İlan başarıyla silindi');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'İlan silinemedi');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'İlan silinirken bir hata oluştu');
    }
  };

  const handleDeleteForm = async (id: string, type: 'listing' | 'career') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5001/api/admin/forms/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchData();
        toast.success('Form başarıyla silindi');
      } else {
        throw new Error('Form silinemedi');
      }
    } catch (error) {
      toast.error('Form silinirken bir hata oluştu');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', width: '100vw', bgcolor: 'background.default', color: 'text.primary', m: 0, p: 0 }}>
        {!isMobile && (
          <AppBar position="static" color="primary" elevation={2}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: 100, height: 40, bgcolor: '#444', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2, overflow: 'hidden' }}>
                  <img
                    src="/beyaz.png"
                    alt="Logo"
                    style={{ width: '80%', height: '80%', objectFit: 'contain', display: 'block' }}
                  />
                </Box>
                <Tabs
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  textColor="inherit"
                  indicatorColor="primary"
                  sx={{
                    '.MuiTab-root': { color: '#fefefe', fontWeight: 600 },
                    '.Mui-selected': { color: '#e41e25 !important' },
                  }}
                  variant={isMobile ? 'scrollable' : 'standard'}
                >
                  <Tab label="İlanlar" />
                  <Tab label="İlan Formları" />
                  <Tab label="Kariyer Formları" />
                </Tabs>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeTab === 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => { setSelectedListing(null); setIsListingModalOpen(true); }}
                    sx={{ fontWeight: 700 }}
                  >
                    Yeni İlan
                  </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleLogout} sx={{ fontWeight: 700 }}>
                  Çıkış Yap
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        )}
        <Box sx={{
          minHeight: '80vh',
          minWidth: '80vw',
          width: '80vw',
          height: 'auto',
          mx: 'auto',
          my: 'auto',
          p: { xs: 1, sm: '10vh 10vw' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}>
          {isMobile && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mb: 2 }}>
              <Button
                variant={activeTab === 0 ? 'contained' : 'outlined'}
                color={activeTab === 0 ? 'primary' : 'secondary'}
                sx={{ fontWeight: 700, borderRadius: 2, bgcolor: activeTab === 0 ? 'primary.main' : 'background.paper', color: activeTab === 0 ? '#fff' : 'text.primary', mb: 1 }}
                onClick={() => setActiveTab(0)}
                fullWidth
              >
                İLANLAR
              </Button>
              <Button
                variant={activeTab === 1 ? 'contained' : 'outlined'}
                color={activeTab === 1 ? 'primary' : 'secondary'}
                sx={{ fontWeight: 700, borderRadius: 2, bgcolor: activeTab === 1 ? 'primary.main' : 'background.paper', color: activeTab === 1 ? '#fff' : 'text.primary', mb: 1 }}
                onClick={() => setActiveTab(1)}
                fullWidth
              >
                İLAN FORMLARI
              </Button>
              <Button
                variant={activeTab === 2 ? 'contained' : 'outlined'}
                color={activeTab === 2 ? 'primary' : 'secondary'}
                sx={{ fontWeight: 700, borderRadius: 2, bgcolor: activeTab === 2 ? 'primary.main' : 'background.paper', color: activeTab === 2 ? '#fff' : 'text.primary' }}
                onClick={() => setActiveTab(2)}
                fullWidth
              >
                KARİYER FORMLARI
              </Button>
            </Box>
          )}
          {/* Listings Table */}
          {activeTab === 0 && (
            isMobile ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {listings.map((listing) => (
                  <Paper key={listing._id} sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 3 }}>
                    <Box sx={{ fontWeight: 700, fontSize: 18, mb: 1 }}>{listing.title}</Box>
                    <Box sx={{ mb: 0.5 }}><b>Tip:</b> {listing.type}</Box>
                    <Box sx={{ mb: 0.5 }}><b>Fiyat:</b> {listing.price.toLocaleString('tr-TR')} ₺</Box>
                    <Box sx={{ mb: 0.5 }}><b>Metrekare:</b> {listing.area} m²</Box>
                    <Box sx={{ mb: 0.5 }}><b>Konum:</b> {listing.city} / {listing.district}</Box>
                    <Box sx={{ mb: 0.5 }}><b>Adres:</b> {listing.address}</Box>
                    <Box sx={{ mb: 0.5 }}><b>Açıklama:</b> {listing.description}</Box>
                    <Box sx={{ mb: 0.5 }}><b>Özellikler:</b>
                      <Box component="span" sx={{ display: 'block', ml: 1 }}>
                        {(() => {
                          const f = listing.features || {};
                          let arr: React.ReactNode[] = [];
                          if (listing.type === 'Daire' || listing.type === 'İşyeri') {
                            if (f.floor) arr.push(<div key="floor">Kat: {f.floor}</div>);
                            if (f.heatingType) arr.push(<div key="heating">Isıtma: {f.heatingType}</div>);
                            if (f.kitchenType) arr.push(<div key="kitchen">Mutfak: {f.kitchenType}</div>);
                            if (f.hasParking) arr.push(<div key="parking">Otopark: Var</div>);
                            if (f.isFurnished) arr.push(<div key="furnished">Eşyalı</div>);
                            if (f.isInComplex) arr.push(<div key="complex">Siteli</div>);
                          } else {
                            if (f.blockNo) arr.push(<div key="block"><span style={{ color: '#e41e25', fontWeight: 700 }}>Ada: {f.blockNo}</span></div>);
                            if (f.parcelNo) arr.push(<div key="parcel"><span style={{ color: '#e41e25', fontWeight: 700 }}>Parsel: {f.parcelNo}</span></div>);
                            if (f.sheetNo) arr.push(<div key="sheet"><span style={{ color: '#e41e25', fontWeight: 700 }}>Pafta: {f.sheetNo}</span></div>);
                          }
                          return arr.length > 0 ? arr : null;
                        })()}
                      </Box>
                    </Box>
                    <Box sx={{ mb: 0.5 }}><b>Tarih:</b> {new Date(listing.createdAt).toLocaleDateString('tr-TR')}</Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <IconButton color="primary" onClick={() => { setSelectedListing(listing); setIsListingModalOpen(true); }}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => { setListingToDelete(listing._id); setIsDeleteModalOpen(true); }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, width: '100%' }}>
                <TableContainer sx={{ width: '100%', minWidth: 600, overflowX: 'auto' }}>
                  <Table size="small" sx={{ width: '100%' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 100, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Başlık</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 80, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Tip</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 100, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Fiyat</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 100, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Metrekare</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 120, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Konum</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 120, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Adres</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 120, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Açıklama</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 180, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Özellikler</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 100, verticalAlign: 'middle', fontSize: 15, py: 1.5 }}>Tarih</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 700, minWidth: 100, verticalAlign: 'middle', fontSize: 15, py: 1.5 }} align="right">İşlemler</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listings.map((listing) => (
                        <TableRow key={listing._id}>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.title}</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.type}</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.price.toLocaleString('tr-TR')} ₺</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.area} m²</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>
                            <span>{listing.city}</span><br />
                            <span style={{ fontWeight: 500, color: '#fefefe' }}>{listing.district}</span>
                          </TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.address}</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{listing.description}</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>
                            {(() => {
                              const f = listing.features || {};
                              let arr: React.ReactNode[] = [];
                              if (listing.type === 'Daire' || listing.type === 'İşyeri') {
                                if (f.floor) arr.push(<div key="floor">Kat: {f.floor}</div>);
                                if (f.heatingType) arr.push(<div key="heating">Isıtma: {f.heatingType}</div>);
                                if (f.kitchenType) arr.push(<div key="kitchen">Mutfak: {f.kitchenType}</div>);
                                if (f.hasParking) arr.push(<div key="parking">Otopark: Var</div>);
                                if (f.isFurnished) arr.push(<div key="furnished">Eşyalı</div>);
                                if (f.isInComplex) arr.push(<div key="complex">Siteli</div>);
                              } else {
                                if (f.blockNo) arr.push(<div key="block"><span style={{ color: '#e41e25', fontWeight: 700 }}>Ada: {f.blockNo}</span></div>);
                                if (f.parcelNo) arr.push(<div key="parcel"><span style={{ color: '#e41e25', fontWeight: 700 }}>Parsel: {f.parcelNo}</span></div>);
                                if (f.sheetNo) arr.push(<div key="sheet"><span style={{ color: '#e41e25', fontWeight: 700 }}>Pafta: {f.sheetNo}</span></div>);
                              }
                              return arr.length > 0 ? arr : null;
                            })()}
                          </TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }}>{new Date(listing.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                          <TableCell sx={{ verticalAlign: 'middle', fontSize: 14, py: 1.5 }} align="right">
                            <IconButton color="primary" onClick={() => { setSelectedListing(listing); setIsListingModalOpen(true); }}>
                              <Edit />
                            </IconButton>
                            <IconButton color="error" onClick={() => { setListingToDelete(listing._id); setIsDeleteModalOpen(true); }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )
          )}
          {/* Listing Forms Table */}
          {activeTab === 1 && (
            <Paper sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, width: '100%' }}>
              <TableContainer sx={{ width: '100%' }}>
                <Table size={isMobile ? 'small' : 'medium'} sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Ad Soyad</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Telefon</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Ada No</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Parsel No</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Adres</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Tarih</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }} align="right">İşlemler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listingForms.map((form) => (
                      <TableRow key={form._id}>
                        <TableCell>{form.fullName}</TableCell>
                        <TableCell>{form.phone}</TableCell>
                        <TableCell>{form.blockNo || ''}</TableCell>
                        <TableCell>{form.parcelNo || ''}</TableCell>
                        <TableCell>{form.address || ''}</TableCell>
                        <TableCell>{new Date(form.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                        <TableCell align="right">
                          <IconButton color="error" onClick={() => handleDeleteForm(form._id, 'listing')}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
          {/* Career Forms Table */}
          {activeTab === 2 && (
            <Paper sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, width: '100%' }}>
              <TableContainer sx={{ width: '100%' }}>
                <Table size={isMobile ? 'small' : 'medium'} sx={{ width: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Ad Soyad</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Yaş</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Telefon</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Cinsiyet</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Konum</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }}>Tarih</TableCell>
                      <TableCell sx={{ color: 'text.primary', fontWeight: 700 }} align="right">İşlemler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {careerForms.map((form) => (
                      <TableRow key={form._id}>
                        <TableCell>{form.fullName}</TableCell>
                        <TableCell>{form.age}</TableCell>
                        <TableCell>{form.phone}</TableCell>
                        <TableCell>{form.gender}</TableCell>
                        <TableCell>{form.district}, {form.city}</TableCell>
                        <TableCell>{new Date(form.createdAt).toLocaleDateString('tr-TR')}</TableCell>
                        <TableCell align="right">
                          <IconButton color="error" onClick={() => handleDeleteForm(form._id, 'career')}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}
        </Box>
        {/* İlan Ekleme/Düzenleme Modal */}
        <Dialog
          open={isListingModalOpen}
          onClose={() => { setIsListingModalOpen(false); setSelectedListing(null); }}
          maxWidth="sm"
          fullWidth
          fullScreen
        >
          <DialogTitle sx={{ bgcolor: 'background.paper', color: 'text.primary', fontWeight: 700 }}>
            {selectedListing ? 'İlanı Düzenle' : 'Yeni İlan Ekle'}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: 'background.paper' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 1,
                bgcolor: 'background.paper',
                p: 2,
                borderRadius: 2,
                minWidth: { xs: '100%', sm: 400 },
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              <ListingForm
                initialData={selectedListing || undefined}
                onSubmit={selectedListing ? handleUpdateListing : handleCreateListing}
                onCancel={() => { setIsListingModalOpen(false); setSelectedListing(null); }}
              />
            </Box>
          </DialogContent>
        </Dialog>
        {/* Silme Onay Modalı */}
        <Dialog open={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setListingToDelete(null); }} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ bgcolor: 'background.paper', color: 'text.primary', fontWeight: 700 }}>
            İlanı Sil
          </DialogTitle>
          <DialogContent sx={{ bgcolor: 'background.paper' }}>
            <Typography>Bu ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</Typography>
          </DialogContent>
          <DialogActions sx={{ bgcolor: 'background.paper' }}>
            <Button onClick={() => { setIsDeleteModalOpen(false); setListingToDelete(null); }} color="secondary">İptal</Button>
            <Button onClick={handleDeleteListing} color="error" variant="contained">Sil</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}