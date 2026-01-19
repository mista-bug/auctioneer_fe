import { Button, Card, Form, Label, Input, Description, FieldError, TextField, Header, SearchField, NumberField } from "@heroui/react";
import { Brush, Check, ChevronRight, Ellipsis, ListCheck, ListOl, Square, TagDollar } from "@gravity-ui/icons";
import React, { useCallback, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import Table from "../components/Table";
import type { IArtwork, IBid, ICollection } from "../types/types.ts";
import {API_URL} from "../config/config.ts";
import axios from "axios";
import { useNavigate } from "react-router";
import CollectionGridChild from "../components/CollectionGridChild.tsx";
import CollectionGrid from "../components/CollectionGrid.tsx";

interface IHomePage {

}


const HomePage: React.FC<IHomePage> = () => {

    const navigate = useNavigate();
    const bidsColumns = React.useMemo<ColumnDef<IBid>[]>(
        () => [
          {
            accessorFn: (row) => row.artwork.title,
            id: 'title',
            cell: (info) => (
                <div className="w-full h-full gap-3 flex flex-row border-b border-neutral-800 p-2">
                    <div className="w-1/2 flex flex-col justify-center items-start">
                        <div className="font-semibold">{info.row.original.artwork.title}</div>
                        <div className="text-xs text-gray-500"><i>by </i>{info.row.original.artwork.artist.name}</div>
                    </div>
                    <div className="w-1/2 text-left bg-background-tertiary p-1 rounded-md flex flex-col justify-center items-start">
                        <div className="flex gap-2 text-neutral-500"><i>PHP</i> <p className="text-emerald-500">{info.row.original.bid_amount}</p></div>
                        <div className="text-xs text-gray-500"><i>from</i>  {info.row.original.bidder.name}</div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button variant="tertiary" onClick={() => {navigate(`/artwork/${info.row.original.artwork.id}`)}}> <ChevronRight/> </Button>
                    </div>
                </div>
              ),
            header: '',
          },
        ],
        [],
    )

    const [bids,setBids] = useState<IBid[]>([]);
    const [collections,setCollections] = useState<ICollection[]>([]);

    const getData = useCallback(async () => {
        const collResponse = await axios.get(API_URL + '/collections');
        const bidResponse = await axios.get(API_URL + '/bids');
        setCollections(collResponse.data);
        setBids(bidResponse.data);
    },[]);

    const hasAuth = () => {
        const token = localStorage.getItem('token');
        if(token != null) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if(hasAuth()){
            getData();
        } else {
            navigate('/');
        }
        
    },[]);
    
    
    return (
        <div className="h-screen w-full flex flex-col gap-3 overflow-y-auto p-3">
            <Card className="min-h-1/2 w-full p-3 flex flex-row items-center justify-center font-medium">
                <section className="p-2 h-full w-1/2 gap-3 flex flex-col justify-center">
                    <div>
                        <header className="text-4xl">Auctions Page</header>
                        <p className="text-md font-light text-neutral-400 italic">See all new auctions available.</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <Button className='bg-emerald-600'><TagDollar/>Bid</Button>
                        <Button variant="secondary"><Brush/> List</Button>
                    </div>
                </section>

                <section className=" border-l border-l-neutral-700 p-10 h-full w-1/2 gap-3 flex flex-col justify-center">
                    <SearchField name="search">
                    <header className="text-4xl">Search</header>
                    <p className="text-md font-light text-neutral-400 italic">Looking for a particular piece or collection?</p>

                        <SearchField.Group>
                            <SearchField.SearchIcon />
                            <SearchField.Input className="w-1/2 h-full" placeholder="Enter Artwork here..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                    <div className="flex gap-3">
                        <Button variant="primary">Submit</Button>
                        <Button variant="secondary">Clear</Button>
                    </div>
                </section>
            </Card>

            <Card className="min-h-full w-full p-3 flex flex-row">
                <div className="h-full w-1/2  flex flex-col p-1">
                    <header className="text-2xl text-neutral-300">Recent Bids</header>
                    <Table columns={bidsColumns} data={bids} />

                    {/* {bids ? (
                        <Table columns={bidsColumns} data={bids} />
                    ) : (
                        <div></div>
                    )} */}
                </div>
                <div className="h-full w-1/2  flex flex-col p-2">
                    <header className="text-2xl text-neutral-300">Active Collections</header>
                    <CollectionGrid/>
                </div>
            </Card>
        </div>
    )
}

export default HomePage;