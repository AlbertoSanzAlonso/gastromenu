import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { atrilesPage } from '@/data/dossier/atriles'
import { blogPage } from '@/data/dossier/blog'
import { cartasPage } from '@/data/dossier/cartas'
import { exclusividadesPage } from '@/data/dossier/exclusividades'
import { mantelesPage } from '@/data/dossier/manteles'
import { nosotrosPage } from '@/data/dossier/nosotros'
import { loadDossierPage } from '@/lib/cloudflare/content'
import { AdminContentPage } from '@/pages/admin/AdminContentPage'
import { AdminGalleryPage } from '@/pages/admin/AdminGalleryPage'
import { AdminHomePage } from '@/pages/admin/AdminHomePage'
import { AdminInquiriesPage } from '@/pages/admin/AdminInquiriesPage'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminTeamPage } from '@/pages/admin/AdminTeamPage'
import { AtrilesPage } from '@/pages/AtrilesPage'
import { AvisoLegalPage } from '@/pages/AvisoLegalPage'
import { BlogPage } from '@/pages/BlogPage'
import { CartasPage } from '@/pages/CartasPage'
import { ContactPage } from '@/pages/ContactPage'
import { ExclusividadesPage } from '@/pages/ExclusividadesPage'
import { HomePage } from '@/pages/HomePage'
import { MantelesPage } from '@/pages/MantelesPage'
import { NosotrosPage } from '@/pages/NosotrosPage'
import { PrivacidadPage } from '@/pages/PrivacidadPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'nosotros',
        loader: () => loadDossierPage('nosotros', nosotrosPage),
        element: <NosotrosPage />,
      },
      {
        path: 'cartas',
        loader: () => loadDossierPage('cartas', cartasPage),
        element: <CartasPage />,
      },
      {
        path: 'atriles',
        loader: () => loadDossierPage('atriles', atrilesPage),
        element: <AtrilesPage />,
      },
      {
        path: 'manteles',
        loader: () => loadDossierPage('manteles', mantelesPage),
        element: <MantelesPage />,
      },
      {
        path: 'exclusividades',
        loader: () => loadDossierPage('exclusividades', exclusividadesPage),
        element: <ExclusividadesPage />,
      },
      {
        path: 'blog',
        loader: () => loadDossierPage('blog', blogPage),
        element: <BlogPage />,
      },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'aviso-legal', element: <AvisoLegalPage /> },
      { path: 'privacidad', element: <PrivacidadPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'contenido', element: <AdminContentPage /> },
      { path: 'galeria', element: <AdminGalleryPage /> },
      { path: 'equipo', element: <AdminTeamPage /> },
      { path: 'consultas', element: <AdminInquiriesPage /> },
    ],
  },
])
