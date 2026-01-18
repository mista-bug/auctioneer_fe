import { useCallback, useEffect, useState } from "react";
import type { ICollection } from "../types/types";
import axios from "axios";
import { API_URL } from "../config/config";
import CollectionGridChild from "./CollectionGridChild";


const CollectionGrid: React.FC = () => {

    const [collections, setCollections] = useState<ICollection[]>([]);
    const getData = useCallback(async () => {
        const collResponse = await axios.get(API_URL + '/collections');
        setCollections(collResponse.data);
    }, []);

    useEffect(() => {
        getData();
    },[]);

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            {collections.length == 0 ? (
            <div className="w-20 h-20 border-4 border-neutral-600 border-t-neutral-300 rounded-full animate-spin"></div>
            ) : (
            <div className="p-5 w-full h-full grid grid-cols-2 auto-rows-[500px] gap-3 overflow-auto">
                {collections.map((item) => {
                    return <CollectionGridChild id={item.id} organizerName={item.organizer.name} title={item.name} description={item.description} imageSrc="https://placehold.co/1000x1000" />
                })}
            </div>
            )}
        </div>
    )
}

export default CollectionGrid;