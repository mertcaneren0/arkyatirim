import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ListingDetail from './pages/ListingDetail';
import Hakkimizda from './pages/Hakkimizda';
import Ilanlarimiz from './pages/Ilanlarimiz';
import Blog from './pages/Blog';
import Ekibimiz from './pages/Ekibimiz';
import Kariyer from './pages/Kariyer';
import Iletisim from './pages/Iletisim';
//import AdminDashboard from './pages/AdminDashboard';
//import AdminLogin from './pages/AdminLogin';
//import AdminListings from './pages/AdminListings';
//import AdminForms from './pages/AdminForms';
//import AdminBlog from './pages/AdminBlog';
//import AdminTeam from './pages/AdminTeam';
//import AdminCareer from './pages/AdminCareer';
//import AdminContact from './pages/AdminContact';
//import AdminSettings from './pages/AdminSettings';
//import NotFound from './pages/NotFound';

export default function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/admin');
  const hideFooter = location.pathname.startsWith('/admin') || location.pathname === '/iletisim';
  
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/ilan/:id" element={<ListingDetail />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/ilanlarimiz" element={<Ilanlarimiz />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/ekibimiz" element={<Ekibimiz />} />
        <Route path="/kariyer" element={<Kariyer />} />
        <Route path="/iletisim" element={<Iletisim />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
} 