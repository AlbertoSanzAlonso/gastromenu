export type GalleryCategorySlug =
  | 'cartas'
  | 'manteles'
  | 'portamenus'
  | 'adiciones'
  | 'bajo-platos'

export interface GalleryCategory {
  id: string
  slug: GalleryCategorySlug
  title: string
  subtitle: string | null
  sort_order: number
  created_at: string
}

export interface GalleryItem {
  id: string
  category_id: string
  title: string
  description: string | null
  image_url: string | null
  sort_order: number
  featured: boolean
  created_at: string
}

export interface TeamMember {
  id: string
  title: string
  description: string | null
  image_url: string | null
  sort_order: number
  created_at: string
}

export interface ContactInquiry {
  id?: string
  establishment_name: string
  establishment_type: string
  contact_first_name: string
  contact_last_name: string
  phone: string
  address: string | null
  email: string
  interests: string[]
  message: string | null
  privacy_accepted: boolean
  created_at?: string
}

export interface SiteContent {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      gallery_categories: {
        Row: GalleryCategory
        Insert: Omit<GalleryCategory, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<GalleryCategory>
        Relationships: []
      }
      gallery_items: {
        Row: GalleryItem
        Insert: Omit<GalleryItem, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<GalleryItem>
        Relationships: []
      }
      team_members: {
        Row: TeamMember
        Insert: Omit<TeamMember, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<TeamMember>
        Relationships: []
      }
      contact_inquiries: {
        Row: ContactInquiry & { id: string; created_at: string }
        Insert: Omit<ContactInquiry, 'id' | 'created_at'>
        Update: Partial<ContactInquiry>
        Relationships: []
      }
      site_content: {
        Row: SiteContent
        Insert: Omit<SiteContent, 'id' | 'updated_at'> & {
          id?: string
          updated_at?: string
        }
        Update: Partial<SiteContent>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
