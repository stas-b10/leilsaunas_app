export interface OptionGroups {
    id: string;
    name: string;
    slug: string;
    input_type: "single" | "multiple" | "toggle";
    display_order: number;
    created_at: string;
}