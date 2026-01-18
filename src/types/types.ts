export interface IBid {
    artwork: IArtwork;
    collection: ICollection;
    method: IBidMethod;
    bidder: IUser;
    bid_amount: number;
}

export interface IUser {
    name: string;
    email: string;
    contactNumber: string;
    type: string;
    createdAt: string;
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
    medium: string;
    imageUrl: string;
    acquisitionSource: string;
    estimateLow: number;
    estimateHigh: number;
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
