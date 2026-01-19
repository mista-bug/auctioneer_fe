import axios from "axios";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { useParams } from "react-router";
import type { IArtwork, IBid } from "../types/types";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, NumberField, Tabs, TextArea } from "@heroui/react";
import Table from "../components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import BidEntry from "../components/BidEntry";
import ModalButton from "../components/ModalButton";
import { TagDollar } from "@gravity-ui/icons";

const ViewArtworkPage: React.FC = () => {

    const param = useParams();
    const [artwork, setArtwork] = useState<IArtwork|null>(null);
    
    const getData = useCallback(async () => {
        const artworkResponse = await axios.get(API_URL + `/artworks/${param.id}`);
        setArtwork(artworkResponse.data);
    }, []);

    const submitBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        
        try {
            const response = await axios.post(API_URL + '/bids',data);
        } catch (error) {
            console.error('Failed to bid');
        }
    }

    useEffect(() => {
        getData();
    },[]);

    const bidInfoColumns = React.useMemo<ColumnDef<IBid>[]>(
        () => [
          {
            accessorFn: (row) => row.bid_amount,
            id: 'amount',
            cell: (info) => (<BidEntry bidder={info.row.original.bidder?.name} amount={info.row.original.bid_amount} />),
            header: '',
          },
        ],
        [],
    )

    return (
        <div className="w-full h-full flex flex-col gap-3 p-3">
            <Card className="w-full h-1/2 flex flex-row gap-2">
                <section className="w-1/3 h-full aspect-video overflow-hidden"><img className="object-cover h-full w-full" src='https://placehold.co/1000x1000' alt={artwork?.title} /></section>
                <section className="w-full h-full flex flex-col p-3">
                    <header className="text-4xl">{artwork?.title ?? 'Artwork Title'}</header>
                    
                    <section className="p-3">
                        <Card.Title>Information</Card.Title>
                        <Card.Content className="indent-3 bg-background-quaternary rounded-2xl p-3 w-1/2">
                            <p>Artist : {artwork?.artist?.name ?? 'Artist Name'}</p>
                            <p>Category : {artwork?.category.name ?? 'Category Name'}</p>
                            <p>Owner : {artwork?.owner.name ?? 'Current Owner Name'}</p>
                            <p>Status : {artwork?.status.name ?? 'Status'}</p>
                        </Card.Content>
                        <Card.Content>
                            <Label>Description</Label>
                            <TextArea className='w-1/2 h-30 p-3' style={{resize:"none"}} readOnly value={artwork?.description}/>
                        </Card.Content>
                    </section>
                    <section className="w-1/7 p-3">

                        <ModalButton triggerLabel="Bid" heading="Bid Menu" icon={<TagDollar/>}>
                            <form onSubmit={submitBid} className="flex flex-col gap-5 items-center">

                                <NumberField className="w-full" step={1000} defaultValue={1000} minValue={1000} name="bid_amount">
                                    <Label>Amount</Label>
                                    <NumberField.Group>
                                        <NumberField.DecrementButton />
                                        <NumberField.Input className="w-full" />
                                        <NumberField.IncrementButton />
                                    </NumberField.Group>
                                </NumberField>

                                <Button type="submit" className='w-1/2'>Bid</Button>

                            </form>
                        </ModalButton>
                    </section>
                </section>
            </Card>
            <Card className="w-full h-1/2">
                <Card.Header>Bid Info</Card.Header>
                <Card.Content>
                    <Table columns={bidInfoColumns} data={artwork?.bids ?? []}/>
                </Card.Content>
            </Card>
        </div>
    )
}

export default ViewArtworkPage;