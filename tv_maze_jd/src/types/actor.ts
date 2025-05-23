import type { Image } from "./image";

export interface Actor{
    id: number;
    name: string;
    country?: {
        name: string;
        code: string;
        timezone: string;
    };
    birthday?: string;
    deathday?: string;
    gender?: string;
    image?:Image;
}