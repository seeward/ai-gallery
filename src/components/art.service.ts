

export interface fetchAIImagesReturnObject {
    images: AIArtImage[];
    total: number;
}
export interface AIArtImage {
    name: string;
    description: string;
    image: string;
    seed: number;
    its: number;
    g_scale: number;
    resolution: string;
    cid: string;
}

export class ArtService {

    private _baseUrl:string = 'https://codeplant-backend.glitch.me';
    private _getEndpoint: string = '/getAllAIImages';
    private _addEndpoint:string = '/addAIImage';

    getImages = async (count:number,skip:number):Promise<fetchAIImagesReturnObject> => {
        const response = await fetch(`${this._baseUrl}${this._getEndpoint}?count=${count}&skip=${skip}`);
        return await response.json() as fetchAIImagesReturnObject;
    }
}