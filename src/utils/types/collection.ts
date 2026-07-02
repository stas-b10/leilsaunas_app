export interface Collection {
  id: string;
  collection_name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number | null;
  created_at: string;
}