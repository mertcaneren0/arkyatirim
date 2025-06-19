import { Box, Container, Typography, CardMedia, List, ListItem, ListItemIcon, ListItemText, Card, CardContent } from '@mui/material';
import GridLegacy from '@mui/material/GridLegacy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuickWhatsApp from '../components/QuickWhatsApp';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

interface TeamMember {
  _id: string;
  fullName: string;
  position: string;
  bio: string;
  specialties: string[];
  profileImage?: string;
  order: number;
  isActive: boolean;
}

export default function Ekibimiz() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/team/active`);
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data);
        }
      } catch (error) {
        console.error('Ekip üyeleri yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)'
      }}>
        <Typography variant="h5" sx={{ color: '#4a5568' }}>
          Yükleniyor...
        </Typography>
      </Box>
    );
  }

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
            Ekibimiz
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
            Gayrimenkul Alanında Uzman Kadromuz
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: { xs: 6, md: 10 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(26,32,44,0.95) 0%, rgba(45,55,72,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            p: { xs: 3, md: 6 },
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
          {/* Dynamic Team Members */}
          {teamMembers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                Henüz ekip üyesi eklenmemiş
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Ekip üyeleri admin panelinden eklenebilir
              </Typography>
            </Box>
          ) : (
            teamMembers.map((member, index) => (
              <Card
                key={member._id}
                sx={{
                  background: 'linear-gradient(135deg, rgba(74,85,104,0.8) 0%, rgba(113,128,150,0.6) 100%)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 3,
                  mb: index === teamMembers.length - 1 ? 0 : 6,
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.4)',
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <GridLegacy container spacing={4} alignItems="center">
                    <GridLegacy item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Box 
                        sx={{ 
                          width: '100%', 
                          maxWidth: 280, 
                          aspectRatio: '3/4', 
                          borderRadius: 3, 
                          overflow: 'hidden', 
                          boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.3)',
                          border: '2px solid rgba(255,255,255,0.1)',
                          transition: 'transform 0.3s ease',
                          bgcolor: '#4a5568',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      >
                        {member.profileImage && !imageErrors.has(member._id) ? (
                          <CardMedia
                            component="img"
                            image={`API_BASE_URL.replace('/api', '')${member.profileImage}`}
                            alt={member.fullName}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={() => {
                              setImageErrors(prev => new Set(prev).add(member._id));
                            }}
                          />
                        ) : (
                          <Typography 
                            variant="h1" 
                            sx={{ 
                              color: '#fff', 
                              fontSize: '4rem', 
                              fontWeight: 700 
                            }}
                          >
                            {member.fullName.charAt(0)}
                          </Typography>
                        )}
                      </Box>
                    </GridLegacy>
                    <GridLegacy item xs={12} md={8}>
                      <Typography 
                        variant="h4" 
                        sx={{
                          fontWeight: 700, 
                          color: '#ffffff', 
                          mb: 3,
                          fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                      >
                        {member.fullName} – {member.position}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{
                          color: 'rgba(255,255,255,0.9)', 
                          fontSize: { xs: 16, md: 17 }, 
                          mb: 3,
                          lineHeight: 1.7,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {member.bio}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        sx={{
                          fontWeight: 700, 
                          color: '#ff6b6b', 
                          mb: 2,
                          fontSize: { xs: '1.1rem', md: '1.2rem' }
                        }}
                      >
                        🎯 Uzmanlık Alanları:
                      </Typography>
                      <List dense>
                        {member.specialties.map((specialty, specialtyIndex) => (
                          <ListItem key={specialtyIndex} sx={{ py: 0.5 }}>
                            <ListItemIcon>
                              <CheckCircleIcon sx={{ color: '#4ade80' }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={specialty}
                              sx={{ 
                                '& .MuiListItemText-primary': { 
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: '0.95rem'
                                } 
                              }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </GridLegacy>
                  </GridLegacy>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Container>
      <QuickWhatsApp />
    </Box>
  );
} 