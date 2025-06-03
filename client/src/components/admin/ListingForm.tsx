import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Stack, FormControlLabel, Checkbox } from '@mui/material';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText, Button } from '@mui/material';

export interface ListingFormData {
  title: string;
  type: 'Daire' | 'İşyeri' | 'Arsa' | 'Tarla' | 'Çiftlik' | 'Fabrika';
  listingType?: 'Kiralık' | 'Satılık';
  price: number;
  area: number;
  description: string;
  city: string;
  district: string;
  address: string;
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
    buildingAge?: number;
    buildingFloorCount?: number;
    locatedFloor?: number;
    hasBalcony?: boolean;
    hasElevator?: boolean;
    landArea?: number;
    farmHeating?: string;
    farmBuildingType?: string;
    farmDeedStatus?: string;
    zoningStatus?: string;
  };
  images?: File[];
}

interface Props {
  initialData?: ListingFormData;
  onSubmit: (data: ListingFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ListingForm({ initialData, onSubmit, onCancel }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ListingFormData>({
    defaultValues: initialData,
  });

  const type = watch('type');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleFormSubmit = async (data: ListingFormData) => {
    try {
      setIsLoading(true);
      await onSubmit({ ...data, images: selectedImages });
      toast.success(initialData ? 'İlan güncellendi' : 'İlan oluşturuldu');
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ width: '100%', p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Stack spacing={2}>
        <TextField
          label="Başlık"
          fullWidth
          {...register('title', { required: 'Başlık zorunludur' })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <FormControl fullWidth error={!!errors.type}>
          <InputLabel id="type-label">Tip</InputLabel>
          <Select
            labelId="type-label"
            label="Tip"
            value={type || ''}
            {...register('type', { required: 'Tip zorunludur' })}
            onChange={e => setValue('type', e.target.value as ListingFormData['type'])}
          >
            <MenuItem value="Daire">Daire</MenuItem>
            <MenuItem value="İşyeri">İşyeri</MenuItem>
            <MenuItem value="Arsa">Arsa</MenuItem>
            <MenuItem value="Tarla">Tarla</MenuItem>
            <MenuItem value="Çiftlik">Çiftlik</MenuItem>
            <MenuItem value="Fabrika">Fabrika</MenuItem>
          </Select>
          {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
        </FormControl>
        {type === 'Daire' && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="listing-type-label">Tipi</InputLabel>
            <Select
              labelId="listing-type-label"
              label="Tipi"
              defaultValue=""
              {...register('listingType', { required: 'Tipi zorunludur' })}
              onChange={e => setValue('listingType', e.target.value as 'Kiralık' | 'Satılık')}
            >
              <MenuItem value="Kiralık">Kiralık</MenuItem>
              <MenuItem value="Satılık">Satılık</MenuItem>
            </Select>
          </FormControl>
        )}
        <TextField
          label="Fiyat (₺)"
          fullWidth
          type="number"
          {...register('price', { required: 'Fiyat zorunludur', min: 0 })}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField
          label="Metrekare (m²)"
          fullWidth
          type="number"
          {...register('area', { required: 'Metrekare zorunludur', min: 0 })}
          error={!!errors.area}
          helperText={errors.area?.message}
        />
        <TextField
          label="Şehir"
          fullWidth
          {...register('city', { required: 'Şehir zorunludur' })}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <TextField
          label="İlçe"
          fullWidth
          {...register('district', { required: 'İlçe zorunludur' })}
          error={!!errors.district}
          helperText={errors.district?.message}
        />
        <TextField
          label="Adres"
          fullWidth
          multiline
          rows={2}
          {...register('address', { required: 'Adres zorunludur' })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />
        <TextField
          label="Açıklama"
          fullWidth
          multiline
          rows={3}
          {...register('description', { required: 'Açıklama zorunludur' })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        {/* Özellikler */}
        {(type === 'Daire' || type === 'İşyeri') && (
          <Stack spacing={2}>
            <TextField
              label="Kat"
              fullWidth
              type="number"
              {...register('features.floor')}
            />
            <FormControl fullWidth>
              <InputLabel id="heating-label">Isıtma Tipi</InputLabel>
              <Select
                labelId="heating-label"
                label="Isıtma Tipi"
                defaultValue=""
                {...register('features.heatingType')}
                onChange={e => setValue('features.heatingType', e.target.value)}
              >
                <MenuItem value="">Seçiniz</MenuItem>
                <MenuItem value="Doğalgaz">Doğalgaz</MenuItem>
                <MenuItem value="Merkezi">Merkezi</MenuItem>
                <MenuItem value="Klima">Klima</MenuItem>
                <MenuItem value="Soba">Soba</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="kitchen-label">Mutfak Tipi</InputLabel>
              <Select
                labelId="kitchen-label"
                label="Mutfak Tipi"
                defaultValue=""
                {...register('features.kitchenType')}
                onChange={e => setValue('features.kitchenType', e.target.value)}
              >
                <MenuItem value="">Seçiniz</MenuItem>
                <MenuItem value="Ankastre">Ankastre</MenuItem>
                <MenuItem value="Amerikan">Amerikan</MenuItem>
                <MenuItem value="Açık">Açık</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={<Checkbox {...register('features.hasParking')} onChange={e => setValue('features.hasParking', e.target.checked)} />}
              label="Otopark Var"
            />
            <FormControlLabel
              control={<Checkbox {...register('features.isFurnished')} onChange={e => setValue('features.isFurnished', e.target.checked)} />}
              label="Eşyalı"
            />
            <FormControlLabel
              control={<Checkbox {...register('features.isInComplex')} onChange={e => setValue('features.isInComplex', e.target.checked)} />}
              label="Siteli"
            />
            <TextField label="Bina Yaşı" fullWidth type="number" {...register('features.buildingAge')} />
            <TextField label="Bulunduğu Kat" fullWidth type="number" {...register('features.locatedFloor')} />
            <TextField label="Bina Kat Sayısı" fullWidth type="number" {...register('features.buildingFloorCount')} />
            <FormControlLabel control={<Checkbox {...register('features.hasBalcony')} onChange={e => setValue('features.hasBalcony', e.target.checked)} />} label="Balkon" />
            <FormControlLabel control={<Checkbox {...register('features.hasElevator')} onChange={e => setValue('features.hasElevator', e.target.checked)} />} label="Asansör" />
          </Stack>
        )}
        {(type === 'Arsa' || type === 'Tarla' || type === 'Çiftlik' || type === 'Fabrika') && (
          <Stack spacing={2}>
            <TextField
              label="Ada No"
              fullWidth
              {...register('features.blockNo')}
            />
            <TextField
              label="Parsel No"
              fullWidth
              {...register('features.parcelNo')}
            />
            <TextField
              label="Pafta No"
              fullWidth
              {...register('features.sheetNo')}
            />
          </Stack>
        )}
        {type === 'Çiftlik' && (
          <Stack spacing={2}>
            <TextField label="Arazi Metrekaresi" fullWidth type="number" {...register('features.landArea')} />
            <FormControl fullWidth>
              <InputLabel id="farm-heating-label">Isıtma</InputLabel>
              <Select labelId="farm-heating-label" label="Isıtma" defaultValue="" {...register('features.farmHeating')} onChange={e => setValue('features.farmHeating', e.target.value)}>
                <MenuItem value="">Seçiniz</MenuItem>
                <MenuItem value="Soba">Soba</MenuItem>
                <MenuItem value="Doğalgaz">Doğalgaz</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="farm-building-type-label">Yapı Tipi</InputLabel>
              <Select labelId="farm-building-type-label" label="Yapı Tipi" defaultValue="" {...register('features.farmBuildingType')} onChange={e => setValue('features.farmBuildingType', e.target.value)}>
                <MenuItem value="">Seçiniz</MenuItem>
                <MenuItem value="Ahşap">Ahşap</MenuItem>
                <MenuItem value="Betonarme">Betonarme</MenuItem>
                <MenuItem value="Çelik">Çelik</MenuItem>
                <MenuItem value="Prefabrik">Prefabrik</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="farm-deed-status-label">Tapu Durumu</InputLabel>
              <Select labelId="farm-deed-status-label" label="Tapu Durumu" defaultValue="" {...register('features.farmDeedStatus')} onChange={e => setValue('features.farmDeedStatus', e.target.value)}>
                <MenuItem value="">Seçiniz</MenuItem>
                <MenuItem value="Kat Mülkiyeti">Kat Mülkiyeti</MenuItem>
                <MenuItem value="Kat İrtifakı">Kat İrtifakı</MenuItem>
                <MenuItem value="Hisseli Tapu">Hisseli Tapu</MenuItem>
                <MenuItem value="Müstakil Tapulu">Müstakil Tapulu</MenuItem>
                <MenuItem value="Arsa Tapulu">Arsa Tapulu</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}
        {type === 'Arsa' && (
          <Stack spacing={2}>
            <TextField label="İmar Durumu" fullWidth {...register('features.zoningStatus')} />
          </Stack>
        )}
        {/* Fotoğraf Yükleme Alanı */}
        <div>
          <Button variant="contained" component="label">
            Fotoğraf Yükle
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageChange}
            />
          </Button>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Önizleme" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }} />
            ))}
          </Box>
        </div>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" onClick={onCancel}>
            İptal
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? 'Kaydediliyor...' : initialData ? 'Güncelle' : 'Kaydet'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
} 