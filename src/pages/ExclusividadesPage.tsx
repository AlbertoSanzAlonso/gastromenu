import { useLoaderData } from 'react-router-dom'
import { DossierPage } from '@/components/sections/DossierPage'
import type { DossierPageContent } from '@/data/dossierTypes'

export function ExclusividadesPage() {
  const content = useLoaderData() as DossierPageContent
  return <DossierPage content={content} />
}
