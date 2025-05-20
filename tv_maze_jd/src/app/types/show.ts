import { Image } from "./image";

export interface Show {
    id: number;
    name: string;
    genres: string[];
    rating:{
        average: number | null;
    };
    image?:Image
    summary: string
}