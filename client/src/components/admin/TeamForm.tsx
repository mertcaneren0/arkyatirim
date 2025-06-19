import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  Chip,
  Stack,
  Input,
  Avatar,
  Alert
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { API_BASE_URL } from '../../config/api';

export interface TeamMemberData {
  _id?: string;
  fullName: string;
  position: string;
  bio: string;
  specialties: string[];
  profileImage?: string;
  order: number;
  isActive: boolean;
}

interface TeamFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: TeamMemberData | null;
  loading?: boolean;
}

export default function TeamForm({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  loading = false 
}: TeamFormProps) {
  const [formData, setFormData] = useState<TeamMemberData>({
    fullName: '',
    position: '',
    bio: '',
    specialties: [],
    order: 0,
    isActive: true
  });
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [newSpecialty, setNewSpecialty] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        specialties: [...initialData.specialties]
      });
      
      if (initialData.profileImage) {
        setImagePreview(`${API_BASE_URL.replace('/api', '')}${initialData.profileImage}`);
      }
    } else {
      setFormData({
        fullName: '',
        position: '',
        bio: '',
        specialties: [],
        order: 0,
        isActive: true
      });
      setImagePreview('');
    }
    setProfileImage(null);
    setNewSpecialty('');
    setErrors({});
  }, [initialData, open]);

  const handleInputChange = (field: keyof TeamMemberData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profileImage: 'Dosya boyutu 5MB\'tan küçük olmalıdır'
        }));
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profileImage: 'Sadece JPEG, JPG, PNG ve WebP formatları desteklenir'
        }));
        return;
      }

      setProfileImage(file);
      setErrors(prev => ({
        ...prev,
        profileImage: ''
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad soyad gerekli';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Pozisyon gerekli';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Biyografi gerekli';
    } else if (formData.bio.length > 2000) {
      newErrors.bio = 'Biyografi 2000 karakterden uzun olamaz';
    }

    if (formData.specialties.length === 0) {
      newErrors.specialties = 'En az bir uzmanlık alanı ekleyin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('position', formData.position);
    submitData.append('bio', formData.bio);
    submitData.append('specialties', JSON.stringify(formData.specialties));
    submitData.append('order', formData.order.toString());
    submitData.append('isActive', formData.isActive.toString());

    if (profileImage) {
      console.log('=== TEAM FORM DEBUG ===');
      console.log('Profile image file:', profileImage);
      console.log('File name:', profileImage.name);
      console.log('File size:', profileImage.size);
      console.log('File type:', profileImage.type);
      submitData.append('profileImage', profileImage);
    } else {
      console.log('No profile image selected');
    }

    console.log('FormData contents:');
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    onSubmit(submitData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { 
          backgroundColor: '#2d3748',
          color: '#fff'
        }
      }}
    >
      <DialogTitle sx={{ color: '#fff', borderBottom: '1px solid #4a5568' }}>
        {initialData ? 'Ekip Üyesini Düzenle' : 'Yeni Ekip Üyesi Ekle'}
      </DialogTitle>
      
      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Profile Image Upload */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#a0aec0' }}>
              Profil Fotoğrafı
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={imagePreview}
                sx={{ 
                  width: 120, 
                  height: 120, 
                  border: '3px solid #e41e25',
                  bgcolor: '#4a5568'
                }}
              />
              
                             <label htmlFor="profile-image-upload">
                 <input
                   accept="image/*"
                   id="profile-image-upload"
                   type="file"
                   onChange={handleImageChange}
                   style={{ display: 'none' }}
                 />
                 <Button
                   variant="outlined"
                   component="span"
                   startIcon={<PhotoCamera />}
                   sx={{ 
                     color: '#e41e25',
                     borderColor: '#e41e25',
                     '&:hover': {
                       borderColor: '#c41e3a',
                       backgroundColor: 'rgba(228,30,37,0.1)'
                     }
                   }}
                 >
                   Fotoğraf Seç
                 </Button>
               </label>
              
              {errors.profileImage && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.profileImage}
                </Alert>
              )}
            </Box>
          </Box>

          {/* Form Fields */}
          <TextField
            label="Ad Soyad"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={!!errors.fullName}
            helperText={errors.fullName}
            fullWidth
            required
            InputLabelProps={{ sx: { color: '#a0aec0' } }}
            InputProps={{ 
              sx: { 
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a5568'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e41e25'
                }
              } 
            }}
          />

          <TextField
            label="Pozisyon"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            error={!!errors.position}
            helperText={errors.position}
            fullWidth
            required
            InputLabelProps={{ sx: { color: '#a0aec0' } }}
            InputProps={{ 
              sx: { 
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a5568'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e41e25'
                }
              } 
            }}
          />

          <TextField
            label="Biyografi"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            error={!!errors.bio}
            helperText={errors.bio}
            fullWidth
            multiline
            rows={4}
            required
            InputLabelProps={{ sx: { color: '#a0aec0' } }}
            InputProps={{ 
              sx: { 
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4a5568'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#e41e25'
                }
              } 
            }}
          />

          {/* Specialties */}
          <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#a0aec0' }}>
              Uzmanlık Alanları *
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                label="Yeni uzmanlık alanı"
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                size="small"
                sx={{ flexGrow: 1 }}
                InputLabelProps={{ sx: { color: '#a0aec0' } }}
                InputProps={{ 
                  sx: { 
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#4a5568'
                    }
                  } 
                }}
              />
              <Button 
                onClick={handleAddSpecialty}
                variant="outlined"
                sx={{ 
                  color: '#e41e25',
                  borderColor: '#e41e25'
                }}
              >
                Ekle
              </Button>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {formData.specialties.map((specialty, index) => (
                <Chip
                  key={index}
                  label={specialty}
                  onDelete={() => handleRemoveSpecialty(specialty)}
                  sx={{
                    backgroundColor: '#e41e25',
                    color: '#fff',
                    '& .MuiChip-deleteIcon': {
                      color: '#fff'
                    }
                  }}
                />
              ))}
            </Stack>
            
            {errors.specialties && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                {errors.specialties}
              </Typography>
            )}
          </Box>

          {/* Order and Active Status */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <TextField
              label="Sıra"
              type="number"
              value={formData.order}
              onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
              size="small"
              sx={{ width: 120 }}
              InputLabelProps={{ sx: { color: '#a0aec0' } }}
              InputProps={{ 
                sx: { 
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4a5568'
                  }
                } 
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#e41e25',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#e41e25',
                    },
                  }}
                />
              }
              label="Aktif"
              sx={{ color: '#a0aec0' }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: '1px solid #4a5568', px: 3, py: 2 }}>
        <Button 
          onClick={onClose}
          sx={{ color: '#a0aec0' }}
        >
          İptal
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: '#e41e25',
            '&:hover': {
              backgroundColor: '#c41e3a'
            }
          }}
        >
          {loading ? 'Kaydediliyor...' : (initialData ? 'Güncelle' : 'Oluştur')}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 