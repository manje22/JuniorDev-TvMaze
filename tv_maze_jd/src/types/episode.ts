import { Image } from "./image";

export interface Episode{
    id: number;
    name: string;
    season: number;
    number: number;
    summary: string;
    image?:Image
}