import { Box, Container, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import QuickWhatsApp from '../components/QuickWhatsApp';
import { useState } from 'react';

const genderOptions = [
  { value: 'Kadın', label: 'Kadın' },
  { value: 'Erkek', label: 'Erkek' },
];

export default function Kariyer() {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    phone: '',
    gender: '',
    city: '',
    district: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!form.fullName || !form.age || !form.phone || !form.gender || !form.city || !form.district) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/forms/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });
      if (response.ok) {
        setSuccess('Başvurunuz başarıyla iletildi!');
        setForm({ fullName: '', age: '', phone: '', gender: '', city: '', district: '' });
      } else {
        const data = await response.json();
        setError(data.message || 'Başvuru gönderilemedi.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f7f7f7', minHeight: '70vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="sm" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight={700} color="#232323" mb={4} textAlign="center">
          Ark Gayrimenkul Kariyer Başvuru Formu
        </Typography>
        <Typography variant="body1" color="#232323" mb={4} textAlign="center">
          Ekibimize katılmak için aşağıdaki formu doldurun. Başvurunuz gizli tutulacaktır.
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: '#fff', p: 4, borderRadius: 3, boxShadow: 2 }}>
          <GridLegacy container spacing={3}>
            <GridLegacy item xs={12}>
              <TextField
                label="Ad Soyad"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                fullWidth
                required
              />
            </GridLegacy>
            <GridLegacy item xs={12} sm={6}>
              <TextField
                label="Yaş"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 16, max: 100 }}
              />
            </GridLegacy>
            <GridLegacy item xs={12} sm={6}>
              <TextField
                label="Telefon"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </GridLegacy>
            <GridLegacy item xs={12} sm={6}>
              <TextField
                select
                label="Cinsiyet"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                fullWidth
                required
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </GridLegacy>
            <GridLegacy item xs={12} sm={6}>
              <TextField
                label="Şehir"
                name="city"
                value={form.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </GridLegacy>
            <GridLegacy item xs={12}>
              <TextField
                label="İlçe"
                name="district"
                value={form.district}
                onChange={handleChange}
                fullWidth
                required
              />
            </GridLegacy>
            <GridLegacy item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ fontWeight: 700, fontSize: 18, py: 1.5, mt: 2 }}
              >
                {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
              </Button>
            </GridLegacy>
          </GridLegacy>
        </Box>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 