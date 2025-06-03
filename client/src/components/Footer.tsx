import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İlanlarımız', href: '/ilanlar' },
    { name: 'Bilgi', href: '/bilgi' },
    { name: 'Ekibimiz', href: '/ekibimiz' },
    { name: 'Kariyer', href: '/kariyer' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  legal: [
    { name: 'Gizlilik Politikası', href: '/gizlilik' },
    { name: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
  ],
  social: [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/905555555555',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.355,4.645 C17.352,2.642,14.656,1.5,11.786,1.5 C5.786,1.5,1,6.286,1,12.214 C1,14.071,1.5,15.857,2.429,17.429 L1,23 L6.714,21.571 C8.286,22.5,10.071,23,11.929,23 C17.857,23,22.643,18.214,22.643,12.214 C22.643,9.344,21.5,6.648,19.355,4.645 Z M11.929,21 C10.286,21,8.714,20.571,7.357,19.786 L7.071,19.571 L3.857,20.429 L4.714,17.286 L4.5,17 C3.714,15.643,3.286,14.071,3.286,12.357 C3.286,7.357,7.214,3.429,12.214,3.429 C14.786,3.429,17.214,4.5,19.071,6.357 C20.929,8.214,22,10.643,22,13.214 C22,18.214,18.071,21,11.929,21 Z M16.786,13.786 C16.5,13.643,15.357,13.071,15.071,12.929 C14.786,12.786,14.571,12.786,14.357,13.071 C14.143,13.357,13.714,13.929,13.571,14.071 C13.429,14.214,13.286,14.214,13,14.071 C12.714,13.929,11.857,13.643,10.857,12.714 C10.071,11.929,9.571,11,9.429,10.714 C9.286,10.429,9.429,10.286,9.571,10.143 C9.643,10.071,9.857,9.857,10,9.714 C10.143,9.571,10.143,9.429,10.071,9.286 C10,9.143,9.571,7.929,9.357,7.357 C9.143,6.786,8.929,6.857,8.786,6.857 C8.643,6.857,8.429,6.857,8.214,6.857 C8,6.857,7.714,6.929,7.5,7.214 C7.286,7.5,6.714,8.071,6.429,8.714 C6.143,9.357,5.857,10.071,6.143,10.786 C6.429,11.5,7.286,13.214,8.857,14.714 C10.786,16.571,12.857,17.429,13.571,17.714 C14.286,18,14.929,17.857,15.429,17.357 C15.786,17,16.286,16.357,16.786,15.857 C17.286,15.357,17.071,14.929,16.786,13.786 Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img className="h-7" src="/logo.png" alt="Logo" />
            <p className="text-sm leading-6 text-gray-600">
              Emlak ilanlarınızı güvenle yayınlayın.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Hızlı Bağlantılar</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">İletişim</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="text-sm leading-6 text-gray-600">
                    Adres: Örnek Mahallesi, Örnek Sokak No:1
                  </li>
                  <li className="text-sm leading-6 text-gray-600">
                    Telefon: +90 555 555 55 55
                  </li>
                  <li className="text-sm leading-6 text-gray-600">
                    E-posta: info@example.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Yasal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Bu site 21collective tarafından hazırlanmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
} 