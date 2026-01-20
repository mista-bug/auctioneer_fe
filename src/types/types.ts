import type { ReactNode } from "react";

export interface IBid {
    id:number;
    artwork: IArtwork;
    collection: ICollection;
    method: IBidMethod;
    bidder: IUser;
    bid_amount: number;
}

export interface IUser {
    id: number;
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
    collection_id:number;
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
    collection:ICollection;
    provenance:IProvenanceRecord[];
}

export interface IProvenanceRecord {
    artwork_id:number;
    collection_id:number;
    user_id:number;
    acquisition_date:string;
    sale_price:number;
    acquisition_method_id:number;
    transfer_date:string;
    sale_location:string;
    sale_address:string;
    owner_number:number;
    owner:IUser;
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
    id:number;
    name: string;
}

export interface IStatus {
    name: string;
}

export interface IUserType {
    name:string;
}
export interface IMedium {
    id:number;
    name:string;
}

export interface IDefaultFormHandling {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IAlertButton {
    body:string;
    label?:string;
    id:number;
    icon:ReactNode;
    status:string;
    variant:"primary" | "secondary" | "tertiary" | "ghost" | "danger" | "danger-soft" | undefined;
    onConfirm:(id:number) => void;
    // onClose:() => void
}
export interface IDropdownPickerProps {
    name:string;
    data?:any[];
    onChange?: () => void;
}

export interface IDropdownPickerChoice {
    id:string;
    textValue:string;
}