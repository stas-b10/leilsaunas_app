export interface Collection {
  id: string;
  collection_name: string;
  created_at: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  slug: string | null;
  menu_image_url: string | null;
  img_card_url: string | null;
}