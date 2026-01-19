export interface IBid {
    id:number;
    artwork: IArtwork;
    collection: ICollection;
    method: IBidMethod;
    bidder: IUser;
    bid_amount: number;
}

export interface IUser {
    name: string;
    email: string;
    contact_number: string;
    type: IUserType;
    createdAt: string;
    token:string|null;
    bids:IBid[];
    listings:IArtwork[];
}

export interface IArtwork {
    id: number;
    artist: IUser;
    category: ICategory;
    owner: IUser;
    status: IStatus;
    title: string;
    description: string;
    width: number;
    height: number;
    medium: IMedium;
    imageUrl: string;
    acquisitionSource: string;
    estimate_low: number;
    estimate_high: number;
    startingBid: number;
    reservePrice: number;
    lotNumber: number;
    artworkCreatedAt: string;
    createdAt: string;
    bids:IBid[];
}

export interface ICollection {
    id: number;
    event_id: string;
    name: string;
    start_date: string;
    end_date: string;
    location: string;
    address: string;
    description: string;
    organizer: IUser;
    artworks:IArtwork[];
}
export interface IBidMethod {
    name: string;
}

export interface ICategory {
    name: string;
}

export interface IStatus {
    name: string;
}

export interface IUserType {
    name:string;
}
export interface IMedium {
    name:string;
}
