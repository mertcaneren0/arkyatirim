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
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

interface LoginFormData {
  username: string;
  password: string;
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

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5001/api/auth/login', {
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
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1, sm: 2, md: 3 },
        }}
      >
        <Container 
          maxWidth="sm" 
          sx={{
            px: { xs: 1, sm: 2 },
            width: '100%',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: { xs: 1, sm: 2 },
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                bgcolor: '#444',
                borderRadius: { xs: 1, sm: 2 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: { xs: 2, sm: 3 },
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#888', 
                  fontWeight: 700,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                LOGO
              </Typography>
            </Box>

            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: { xs: 2, sm: 3 },
                fontWeight: 700,
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                textAlign: 'center',
              }}
            >
              Admin Paneli
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1.5, sm: 2 },
                maxWidth: { xs: '100%', sm: '400px' },
              }}
            >
              <TextField
                {...register('username', { required: 'Kullanıcı adı zorunludur' })}
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#666' },
                    '&:hover fieldset': { borderColor: '#888' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 },
                  },
                }}
              />

              <TextField
                {...register('password', { required: 'Şifre zorunludur' })}
                label="Şifre"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#666' },
                    '&:hover fieldset': { borderColor: '#888' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    py: { xs: 1, sm: 1.5 },
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isLoading}
                startIcon={<LockOutlined />}
                sx={{
                  mt: { xs: 1.5, sm: 2 },
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 3 },
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  borderRadius: { xs: 1, sm: 1.5 },
                  '& .MuiButton-startIcon': {
                    mr: { xs: 0.5, sm: 1 },
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