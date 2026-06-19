export interface SaunaModel {
  id: string;
  series_id: string;

  model_name: string;
  model_description: string;

  people: number;

  area_m2: string;

  rooms: number;

  exterior_mm: string;
  exterior_in: string;

  interior_mm: string;
  interior_in: string;

  weight_kg: string;
  weight_lbs: string;

  product_sheet_url: string;

  created_at: string;
}