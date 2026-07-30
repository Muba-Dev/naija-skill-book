export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artisans: {
        Row: {
          id: string; name: string; profession: string; category: string
          location: string; city: string; state: string
          rating: number | null; review_count: number | null
          price_min: number | null; price_max: number | null
          bio: string | null; verified: boolean | null; available: boolean | null
          years_experience: number | null; phone: string | null; email: string | null
          avatar: string | null; cover_image: string | null
          portfolio: string[] | null; tags: string[] | null
          completed_jobs: number | null
          created_at: string | null; updated_at: string | null
        }
        Insert: {
          id?: string; name: string; profession: string; category: string
          location: string; city: string; state: string
          rating?: number | null; review_count?: number | null
          price_min?: number | null; price_max?: number | null
          bio?: string | null; verified?: boolean | null; available?: boolean | null
          years_experience?: number | null; phone?: string | null; email?: string | null
          avatar?: string | null; cover_image?: string | null
          portfolio?: string[] | null; tags?: string[] | null
          completed_jobs?: number | null
        }
        Update: {
          id?: string; name?: string; profession?: string; category?: string
          location?: string; city?: string; state?: string
          rating?: number | null; review_count?: number | null
          price_min?: number | null; price_max?: number | null
          bio?: string | null; verified?: boolean | null; available?: boolean | null
          years_experience?: number | null; phone?: string | null; email?: string | null
          avatar?: string | null; cover_image?: string | null
          portfolio?: string[] | null; tags?: string[] | null
          completed_jobs?: number | null
        }
      }
      bookings: {
        Row: {
          id: string; artisan_id: string; user_id: string | null
          customer_name: string; date: string; time: string
          description: string | null; status: string; price: number
          created_at: string | null; updated_at: string | null
        }
        Insert: {
          id?: string; artisan_id: string; user_id?: string | null
          customer_name?: string; date: string; time?: string
          description?: string | null; status?: string; price?: number
        }
        Update: {
          id?: string; artisan_id?: string; user_id?: string | null
          customer_name?: string; date?: string; time?: string
          description?: string | null; status?: string; price?: number
        }
      }
      reviews: {
        Row: {
          id: string; artisan_id: string; user_id: string | null
          user_name: string; user_avatar: string | null
          rating: number; text: string | null; date: string | null
          created_at: string | null
        }
        Insert: {
          id?: string; artisan_id: string; user_id?: string | null
          user_name?: string; user_avatar?: string | null
          rating: number; text?: string | null; date?: string | null
        }
        Update: {
          id?: string; artisan_id?: string; user_id?: string | null
          user_name?: string; user_avatar?: string | null
          rating?: number; text?: string | null; date?: string | null
        }
      }
      services: {
        Row: {
          id: string; artisan_id: string; name: string
          description: string | null; price: number; duration: string | null
          created_at: string | null
        }
        Insert: {
          id?: string; artisan_id: string; name: string
          description?: string | null; price?: number; duration?: string | null
        }
        Update: {
          id?: string; artisan_id?: string; name?: string
          description?: string | null; price?: number; duration?: string | null
        }
      }
      profiles: {
        Row: {
          id: string; name: string; phone: string | null
          avatar: string | null; role: string; location: string | null
          member_since: string | null; created_at: string | null; updated_at: string | null
        }
        Insert: {
          id: string; name?: string; phone?: string | null
          avatar?: string | null; role?: string; location?: string | null
        }
        Update: {
          id?: string; name?: string; phone?: string | null
          avatar?: string | null; role?: string; location?: string | null
        }
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
  }
}