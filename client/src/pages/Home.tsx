import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface ListingFormData {
  fullName: string;
  phone: string;
  blockNo: string;
  parcelNo: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'all' | 'apartment' | 'commercial' | 'land'>('all');
  const { register, handleSubmit, reset } = useForm<ListingFormData>();

  const onSubmit = async (data: ListingFormData) => {
    try {
      const response = await fetch('http://localhost:5001/api/forms/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Hayalinizdeki Evi Bulun
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" aria-hidden="true" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-primary-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" aria-hidden="true" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            İlanlar
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14">
                        {/* İlan listesi buraya gelecek */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      {/* TEFE-TÜFE Kutusu */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <p className="text-sm text-gray-600">
          Mayıs 2025 - Ticari Konut Yüzdesi - %52.20
        </p>
      </div>

      {/* Filtreleme Barı */}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Fiyat Aralığı
              </label>
              <input
                type="range"
                id="price"
                className="mt-1 block w-full"
                min="0"
                max="10000000"
                step="100000"
              />
            </div>
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                Metrekare
              </label>
              <input
                type="range"
                id="area"
                className="mt-1 block w-full"
                min="0"
                max="1000"
                step="10"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                İl
              </label>
              <select
                id="city"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Seçiniz</option>
                <option value="istanbul">İstanbul</option>
                <option value="ankara">Ankara</option>
                <option value="izmir">İzmir</option>
              </select>
            </div>
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                İlçe
              </label>
              <select
                id="district"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="">Seçiniz</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* İlan Grid */}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* İlan kartları buraya gelecek */}
          </div>
        </div>
      </div>

      {/* İlanım Var Formu */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              İlanım Var
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              İlanınızı eklemek için formu doldurun, size ulaşalım.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  Ad Soyad
                </label>
                <div className="mt-2">
                  <input
                    {...register('fullName', { required: true })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Telefon
                </label>
                <div className="mt-2">
                  <input
                    {...register('phone', { required: true })}
                    type="tel"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="blockNo" className="block text-sm font-medium leading-6 text-gray-900">
                  Ada No
                </label>
                <div className="mt-2">
                  <input
                    {...register('blockNo', { required: true })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="parcelNo" className="block text-sm font-medium leading-6 text-gray-900">
                  Parsel No
                </label>
                <div className="mt-2">
                  <input
                    {...register('parcelNo', { required: true })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Ekibimiz */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ekibimiz
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Profesyonel ekibimizle hizmetinizdeyiz.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-2">
            <div className="flex items-start gap-x-6">
              <img
                src="/team-1.jpg"
                alt=""
                className="h-16 w-16 flex-none rounded-full bg-gray-50"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  Ahmet Yılmaz
                </h3>
                <p className="text-sm leading-6 text-gray-600">Genel Müdür</p>
              </div>
            </div>
            <div className="flex items-start gap-x-6">
              <img
                src="/team-2.jpg"
                alt=""
                className="h-16 w-16 flex-none rounded-full bg-gray-50"
              />
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                  Ayşe Demir
                </h3>
                <p className="text-sm leading-6 text-gray-600">Satış Müdürü</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 