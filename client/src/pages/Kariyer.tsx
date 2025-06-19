import { Box, Container, Typography, TextField, Button, MenuItem, Alert, Card, CardContent } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import QuickWhatsApp from '../components/QuickWhatsApp';
import { useState } from 'react';
import { Work, PersonAdd, Star } from '@mui/icons-material';
import { API_BASE_URL } from '../config/api';

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
      const response = await fetch(`${API_BASE_URL}/forms/career`, {
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
    <Box 
      sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0-20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3,
          zIndex: 0,
        }
      }}
    >
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <Work sx={{ fontSize: 48, mr: 2, color: '#fff' }} />
            <Typography 
              component="h1" 
              variant="h1" 
              fontWeight={800} 
              fontSize={{ xs: 32, md: 48 }} 
              color="#fff" 
              textAlign="center"
              sx={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.2
              }}
            >
              Kariyer
            </Typography>
          </Box>
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
            Hayalinizdeki Kariyere İlk Adım
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          py: { xs: 6, md: 10 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <GridLegacy container spacing={4}>
          {/* Why Join Us Section */}
          <GridLegacy item xs={12} md={6}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
                height: 'fit-content',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15-15c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  zIndex: 0,
                }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Star sx={{ fontSize: 32, mr: 2, color: '#e41e25' }} />
                  <Typography 
                    variant="h4" 
                    sx={{
                      fontWeight: 700, 
                      color: '#ffffff',
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    Neden Ark Gayrimenkul?
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="body1" 
                    sx={{
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: { xs: 16, md: 17 }, 
                      mb: 3,
                      lineHeight: 1.7
                    }}
                  >
                    Gayrimenkul sektöründe lider konumdaki şirketimizde kariyerinizi geliştirin.
                  </Typography>

                  {[
                    'Dinamik ve genç ekip',
                    'Sürekli eğitim ve gelişim fırsatları',
                    'Rekabetçi maaş ve prim sistemi',
                    'Kariyerde hızlı ilerleme imkanı',
                    'Modern ofis ortamı',
                    'Başarı odaklı çalışma kültürü'
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: '#4ade80',
                          mr: 2,
                          flexShrink: 0
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)',
                          fontSize: '0.95rem'
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </GridLegacy>

          {/* Application Form */}
          <GridLegacy item xs={12} md={6}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 30c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15zm15-15c0-8.284-6.716-15-15-15s-15 6.716-15 15 6.716 15 15 15 15-6.716 15-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  zIndex: 0,
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PersonAdd sx={{ fontSize: 32, mr: 2, color: '#e41e25' }} />
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700, 
                      color: '#ffffff',
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    Başvuru Formu
                  </Typography>
                </Box>

                <Typography 
                  variant="body2" 
                  sx={{
                    color: 'rgba(255,255,255,0.7)', 
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  Ekibimize katılmak için aşağıdaki formu doldurun. Başvurunuz gizli tutulacaktır.
                </Typography>

                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mb: 3,
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      color: '#4ade80',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      '& .MuiAlert-icon': {
                        color: '#4ade80'
                      }
                    }}
                  >
                    {success}
                  </Alert>
                )}
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      '& .MuiAlert-icon': {
                        color: '#f87171'
                      }
                    }}
                  >
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <GridLegacy container spacing={3}>
                    <GridLegacy item xs={12}>
                      <TextField
                        label="Ad Soyad"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          }
                        }}
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
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                backgroundColor: '#2d3748',
                                '& .MuiMenuItem-root': {
                                  color: '#fff',
                                  '&:hover': {
                                    backgroundColor: 'rgba(228,30,37,0.1)',
                                  },
                                  '&.Mui-selected': {
                                    backgroundColor: '#e41e25',
                                    '&:hover': {
                                      backgroundColor: '#c41e25',
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          },
                          '& .MuiSelect-icon': {
                            color: 'rgba(255,255,255,0.7)',
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          }
                        }}
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
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            '& fieldset': {
                              borderColor: 'rgba(255,255,255,0.2)',
                            },
                            '&:hover fieldset': {
                              borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#e41e25',
                            },
                            '& input': {
                              color: '#fff',
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                              color: '#e41e25',
                            }
                          }
                        }}
                      />
                    </GridLegacy>
                    <GridLegacy item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loading}
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: 18, 
                          py: 1.5, 
                          mt: 2,
                          background: 'linear-gradient(135deg, #e41e25 0%, #c41e25 100%)',
                          boxShadow: '0 8px 32px rgba(228, 30, 37, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #c41e25 0%, #a41e25 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 40px rgba(228, 30, 37, 0.4)',
                          },
                          '&:disabled': {
                            background: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)',
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                      </Button>
                    </GridLegacy>
                  </GridLegacy>
                </Box>
              </CardContent>
            </Card>
          </GridLegacy>
        </GridLegacy>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 