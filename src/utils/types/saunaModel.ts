export interface SaunaModel {
  id: string;
  series_id: string;

  model_name: string;
  model_description: string | null;

  people: number | null;

  area_m2: number | null;

  rooms: number | null;

  exterior_mm: string | null;
  exterior_in: string | null;

  interior_mm: string | null;
  interior_in: string | null;

  weight_kg: number | null;
  weight_lbs: number | null;

  product_sheet_url: string | null;

  created_at: string;
}