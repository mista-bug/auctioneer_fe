import axios from "axios";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config/config";
import { useNavigate, useParams } from "react-router";
import type { IArtwork, IBid, IProvenanceRecord, IUser } from "../types/types";
import { Button, Card, CardContent, CardHeader, CardTitle, Description, Input, Label, NumberField, Tabs, TextArea, useOverlayState } from "@heroui/react";
import Table from "../components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import BidEntry from "../components/BidEntry";
import ModalButton from "../components/ModalButton";
import { CircleCheck, TagDollar } from "@gravity-ui/icons";
import AddBidForm from "../forms/AddBidForm";
import { getLocalUserData } from "../utils/misc";

const ViewArtworkPage: React.FC = () => {

    const param = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState<IArtwork|null>(null);
    const [provenance, setProvenance] = useState<IProvenanceRecord[]>([]);
    
    const getData = useCallback(async () => {
        const artworkResponse = await axios.get(API_URL + `/artworks/${param.id}`);
        setArtwork(artworkResponse.data);
        setProvenance(artworkResponse.data.provenance);
        console.log(artworkResponse.data);
    }, []);

    const submitBid = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string|number> = {};
        
        if(user){
            formData.forEach((value, key) => {
                data[key] = value.toString();
            });
            const parsedUser : IUser = JSON.parse(user);
            data['user_id'] = parsedUser.id.toString();
        } else {
            console.error('Failed to bid');
        }

        try {
            const response = await axios.post(API_URL + '/bids',data);
            console.log('Successful!');
            navigate('/');
        } catch (error) {
            console.error(error);
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

    const provenanceColumns = React.useMemo<ColumnDef<IProvenanceRecord>[]>(
        () => [
          {
            // accessorFn: (row) => row.bid_amount,
            id: 'info',
            cell: (info) => (
                <div className="flex flex-col">
                    <p>{info.row.original.owner.name}</p>
                    <p className="text-neutral-500">{info.row.original.transfer_date}</p>
                </div>
            ),
            header: 'Holders',
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
                            <p>Owner : {artwork?.owner?.name ?? 'Current Owner Name'}</p>
                            <p>Status : {artwork?.status?.name ?? 'Status'}</p>
                        </Card.Content>
                        <Card.Content>
                            <Label>Description</Label>
                            <TextArea className='w-1/2 h-30 p-3' style={{resize:"none"}} readOnly value={artwork?.description}/>
                        </Card.Content>
                    </section>
                    <section className="w-1/7 p-3">
                       {
                        getLocalUserData()?.id !== artwork?.artist.id ? (
                            <ModalButton size="sm" triggerLabel="Bid" heading="Bid Menu" icon={<TagDollar/>}>
                                <AddBidForm onSubmit={submitBid} artwork_id={artwork?.id} collection_id={artwork?.collection_id}/>
                            </ModalButton>
                        ) : (
                            <div></div>
                        )}
                    </section>
                </section>
            </Card>
            <div className="w-full h-1/2 flex flex-row gap-3">
                <Card className="w-1/2 h-full">
                    <Card.Header>Bid Info</Card.Header>
                    <Card.Content>
                        <Table columns={bidInfoColumns} data={artwork?.bids ?? []} />
                    </Card.Content>
                </Card>
                <Card className="w-1/2 h-full">
                    <Card.Header>Provenance Records</Card.Header>
                    <Card.Content>
                        <Table columns={provenanceColumns} data={artwork?.provenance ?? []} />
                    </Card.Content>
                </Card>
            </div>
        </div>
    )
}

export default ViewArtworkPage;