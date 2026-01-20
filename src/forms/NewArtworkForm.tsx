import { Button, Header, Input, Label, Separator, TextArea } from "@heroui/react";
import type React from "react";
import DropdownPicker from "../components/DropdownPicker";
import axios from "axios";
import { API_URL } from "../config/config";
import { useEffect, useState } from "react";
import type { ICategory, ICollection, IDefaultFormHandling, IMedium, IUser } from "../types/types";
import InputNumberField from "../components/InputNumberField";

const NewArtworkForm: React.FC<IDefaultFormHandling> = ({onSubmit}) => {

    const [collections, setCollections] = useState<ICollection[]>([]);
    const [medium, setMedia] = useState<IMedium[]>([]);
    const [category, setCategory] = useState<ICategory[]>([]);
    const [user, setUser] = useState<IUser>();

    const getCollections = async () => {
        const response = await axios.get(API_URL + '/collections');
        setCollections(response.data);
    }

    const getMedia = async () => {
        const response = await axios.get(API_URL + '/media');
        setMedia(response.data);
    }

    const getCategory = async () => {
        const response = await axios.get(API_URL + '/category');
        setCategory(response.data);
    }


    useEffect(() => {
        getCollections();
        getMedia();
        getCategory();
        const user = localStorage.getItem('user');
        if(user) {
            setUser(JSON.parse(user));
        }
    }, []);

    return (
        <div>
            {/* id: number;
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
             */}

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <Input name="artist_id" type="hidden" value={user?.id} />
                <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-2 w-1/2">
                        <Label>General</Label>
                        <section className="flex flex-col gap-3 p-1">
                            <div className="flex flex-col justify-center">
                                <Label>Title</Label>
                                <Input name="title" placeholder="Title..." />
                            </div>

                            <div className="flex flex-col justify-center">
                                <Label>Description</Label>
                                <TextArea name="description" className='h-40' placeholder="Description ... " style={{ resize: "none" }}></TextArea>
                            </div>

                            <div className="flex flex-col justify-center">
                                <Label>Collection</Label>
                                <DropdownPicker name="collection_id" data={collections} />
                            </div>

                            <div className="flex flex-col justify-center">
                                <Label>Medium</Label>
                                <DropdownPicker name="medium_id" data={medium} />
                            </div>

                            <div className="flex flex-col justify-center">
                                <Label>Category</Label>
                                <DropdownPicker name="category_id" data={category} />
                            </div>

                        </section>
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">

                    <section className="flex flex-col gap-3 p-1">
                    <Label>Canvas Information</Label>
                        
                            <div className="flex flex-row gap-2 w-full ">
                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>Width</Label>
                                    <InputNumberField name="width" defaultValue={10} label="" max={100} min={10} />
                                </div>

                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>Height</Label>
                                    <InputNumberField name="height" defaultValue={10} label="" max={100} min={10} />
                                </div>
                            </div>
                    </section>
                    <section className="flex flex-col gap-3 p-1">
                    <Label>Estimate</Label>
                            <div className="flex flex-row gap-2 w-full ">
                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>Low</Label>
                                    <InputNumberField name="estimate_low" defaultValue={10} label="" max={100000} min={10} />
                                </div>

                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>High</Label>
                                    <InputNumberField name="estimate_high" defaultValue={10} label="" max={100000} min={10} />
                                </div>
                            </div>
                    </section>
                    <section className="flex flex-col gap-3 p-1">
                    <Label>Values</Label>
                        
                            <div className="flex flex-row gap-2 w-full ">
                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>Reserve Price</Label>
                                    <InputNumberField name="reserve_price" defaultValue={10} label="" max={100000} min={10} />
                                </div>

                                <div className="flex flex-col justify-center w-1/2">
                                    <Label>Starting Bid</Label>
                                    <InputNumberField name="starting_bid" defaultValue={10} label="" max={100000} min={10} />
                                </div>
                            </div>
                    </section>
                    
                    
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default NewArtworkForm;