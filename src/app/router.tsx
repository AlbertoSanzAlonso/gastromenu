import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'nosotros',
        lazy: async () => {
          const [{ NosotrosPage }, { nosotrosPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/NosotrosPage'),
            import('@/data/dossier/nosotros'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: NosotrosPage,
            loader: () => loadDossierPage('nosotros', nosotrosPage),
          }
        },
      },
      {
        path: 'cartas',
        lazy: async () => {
          const [{ CartasPage }, { cartasPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/CartasPage'),
            import('@/data/dossier/cartas'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: CartasPage,
            loader: () => loadDossierPage('cartas', cartasPage),
          }
        },
      },
      {
        path: 'atriles',
        lazy: async () => {
          const [{ AtrilesPage }, { atrilesPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/AtrilesPage'),
            import('@/data/dossier/atriles'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: AtrilesPage,
            loader: () => loadDossierPage('atriles', atrilesPage),
          }
        },
      },
      {
        path: 'manteles',
        lazy: async () => {
          const [{ MantelesPage }, { mantelesPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/MantelesPage'),
            import('@/data/dossier/manteles'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: MantelesPage,
            loader: () => loadDossierPage('manteles', mantelesPage),
          }
        },
      },
      {
        path: 'exclusividades',
        lazy: async () => {
          const [{ ExclusividadesPage }, { exclusividadesPage }, { loadDossierPage }] =
            await Promise.all([
              import('@/pages/ExclusividadesPage'),
              import('@/data/dossier/exclusividades'),
              import('@/lib/cloudflare/content'),
            ])
          return {
            Component: ExclusividadesPage,
            loader: () => loadDossierPage('exclusividades', exclusividadesPage),
          }
        },
      },
      {
        path: 'blog',
        lazy: async () => {
          const [{ BlogPage }, { blogPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/BlogPage'),
            import('@/data/dossier/blog'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: BlogPage,
            loader: () => loadDossierPage('blog', blogPage),
          }
        },
      },
      {
        path: 'blog/:slug',
        lazy: async () => {
          const [{ BlogArticlePage }, { blogPage }, { loadDossierPage }] = await Promise.all([
            import('@/pages/BlogArticlePage'),
            import('@/data/dossier/blog'),
            import('@/lib/cloudflare/content'),
          ])
          return {
            Component: BlogArticlePage,
            loader: () => loadDossierPage('blog', blogPage),
          }
        },
      },
      {
        path: 'contacto',
        lazy: async () => {
          const { ContactPage } = await import('@/pages/ContactPage')
          return { Component: ContactPage }
        },
      },
      {
        path: 'aviso-legal',
        lazy: async () => {
          const { AvisoLegalPage } = await import('@/pages/AvisoLegalPage')
          return { Component: AvisoLegalPage }
        },
      },
      {
        path: 'privacidad',
        lazy: async () => {
          const { PrivacidadPage } = await import('@/pages/PrivacidadPage')
          return { Component: PrivacidadPage }
        },
      },
      { path: 'condiciones', element: <Navigate to="/condiciones-de-venta" replace /> },
      {
        path: 'condiciones-de-venta',
        lazy: async () => {
          const { CondicionesVentaPage } = await import('@/pages/CondicionesVentaPage')
          return { Component: CondicionesVentaPage }
        },
      },
    ],
  },
  {
    path: '/admin',
    lazy: async () => {
      const { AdminLayout } = await import('@/pages/admin/AdminLayout')
      return { Component: AdminLayout }
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { AdminHomePage } = await import('@/pages/admin/AdminHomePage')
          return { Component: AdminHomePage }
        },
      },
      {
        path: 'contenido',
        lazy: async () => {
          const { AdminContentPage } = await import('@/pages/admin/AdminContentPage')
          return { Component: AdminContentPage }
        },
      },
      {
        path: 'galeria',
        lazy: async () => {
          const { AdminGalleryPage } = await import('@/pages/admin/AdminGalleryPage')
          return { Component: AdminGalleryPage }
        },
      },
      {
        path: 'equipo',
        lazy: async () => {
          const { AdminTeamPage } = await import('@/pages/admin/AdminTeamPage')
          return { Component: AdminTeamPage }
        },
      },
      {
        path: 'consultas',
        lazy: async () => {
          const { AdminInquiriesPage } = await import('@/pages/admin/AdminInquiriesPage')
          return { Component: AdminInquiriesPage }
        },
      },
    ],
  },
])
