import { Button, Label } from "@heroui/react";
import type { IArtwork, ICollection, IDefaultFormHandling } from "../types/types";
import DropdownPicker from "../components/DropdownPicker";
import axios from "axios";
import { API_URL } from "../config/config";
import { useEffect, useState } from "react";

interface AddBidFormFullProps extends IDefaultFormHandling {
    
}
 
const AddBidFormFull: React.FC<AddBidFormFullProps> = ({onSubmit}) => {
    
    const [collections,setCollections] = useState<ICollection[]>([]);
    const [artworks,setArtworks] = useState<IArtwork[]>([]);
    const getCollections = async () => {
        try {
            const response = await axios.get(API_URL + '/collections');
            setCollections(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getArtworks = async () => {
        try {
            const response = await axios.get(API_URL + '/artworks');
            setArtworks(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getCollections();
    },[])

    return ( 
        // export interface IBid {
        //     id:number;
        //     artwork: IArtwork;
        //     collection: ICollection;
        //     method: IBidMethod;
        //     bidder: IUser;
        //     bid_amount: number;
        // }
        
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
            <div className="flex flex-col justify-center">
                <Label>Collection</Label>
                <DropdownPicker onChange={getArtworks} name="collection_id" data={collections}/>
            </div>

            <div className="flex flex-col justify-center">
                <Label>Artwork</Label>
                <DropdownPicker name="artwork_id" data={artworks}/>
            </div>

            <Button type="submit" variant="secondary">Submit</Button>

        </form>
     );
}
 
export default AddBidFormFull;