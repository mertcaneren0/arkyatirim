import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LockOutlined, PersonOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { API_BASE_URL } from '../../config/api';

interface LoginFormData {
  username: string;
  password: string;
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    primary: {
      main: '#e41e25',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '16px',
          fontWeight: 600,
          padding: '16px 32px',
          fontSize: '1.1rem',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(135deg, #e41e25 0%, #c41e25 100%)',
          boxShadow: '0 8px 24px rgba(228, 30, 37, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #c41e25 0%, #a41e25 100%)',
            boxShadow: '0 12px 32px rgba(228, 30, 37, 0.6)',
            transform: 'translateY(-3px)',
          },
          '&:disabled': {
            background: 'linear-gradient(135deg, rgba(228, 30, 37, 0.6) 0%, rgba(196, 30, 37, 0.6) 100%)',
            boxShadow: '0 4px 16px rgba(228, 30, 37, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            background: 'rgba(30, 41, 59, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              border: 'none',
            },
            '&:hover': {
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused': {
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid #e41e25',
              boxShadow: '0 8px 24px rgba(228, 30, 37, 0.3)',
            },
            '&.Mui-error': {
              border: '1px solid #ef4444',
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8',
            fontSize: '1rem',
            '&.Mui-focused': {
              color: '#e41e25',
            },
            '&.Mui-error': {
              color: '#ef4444',
            },
          },
          '& .MuiInputBase-input': {
            color: '#f8fafc',
            fontSize: '1rem',
            padding: '18px 16px',
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.875rem',
          },
        },
      },
    },
  },
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        toast.success('Giriş başarılı!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Kullanıcı adı veya şifre hatalı!');
      }
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 20%, rgba(228, 30, 37, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(100, 116, 139, 0.15) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(228, 30, 37, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            pointerEvents: 'none',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
            '50%': { transform: 'translateY(-20px) translateX(10px)' },
          },
        }}
      >
        <Container 
          maxWidth="sm" 
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 5, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '480px',
              mx: 'auto',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(228, 30, 37, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 100, sm: 120, md: 140 },
                height: { xs: 100, sm: 120, md: 140 },
                background: 'linear-gradient(135deg, rgba(228, 30, 37, 0.2) 0%, rgba(196, 30, 37, 0.1) 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: { xs: 3, sm: 4 },
                overflow: 'hidden',
                border: '1px solid rgba(228, 30, 37, 0.3)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(228, 30, 37, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 40px rgba(228, 30, 37, 0.3)',
                },
              }}
            >
              <img
                src="/beyaz.png"
                alt="Logo"
                style={{ 
                  width: '75%', 
                  height: '75%', 
                  objectFit: 'contain', 
                  display: 'block',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                }}
              />
            </Box>

            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: { xs: 1, sm: 2 },
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Admin Panel
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, sm: 4 },
                color: '#94a3b8',
                textAlign: 'center',
                fontSize: '1.1rem',
                fontWeight: 500,
              }}
            >
              Ark Gayrimenkul Yönetim Sistemi
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 2.5, sm: 3 },
              }}
            >
              <TextField
                {...register('username', { required: 'Kullanıcı adı zorunludur' })}
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlined sx={{ color: '#94a3b8', fontSize: '1.5rem' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                {...register('password', { required: 'Şifre zorunludur' })}
                label="Şifre"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#94a3b8', fontSize: '1.5rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ 
                          color: '#94a3b8',
                          '&:hover': { 
                            color: '#e41e25',
                            backgroundColor: 'rgba(228, 30, 37, 0.1)',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<LockOutlined />}
                sx={{
                  mt: { xs: 1, sm: 2 },
                  py: { xs: 2, sm: 2.5 },
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.6s',
                  },
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
              >
                {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
} 