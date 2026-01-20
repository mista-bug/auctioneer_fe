import { ArrowDown, ArrowLeft, ArrowUp, Brush, Car, Eye, LifeRing, Minus, Pencil, PersonFill, Plus, TagDollar, TrashBin } from "@gravity-ui/icons";
import { Avatar, Button, Card, DateField, DateInputGroup, Input, Label, TextField } from "@heroui/react";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
import type { IArtwork, IBid, IUser } from "../types/types";
import { API_URL } from "../config/config";
import DefaultModal from "../components/ModalButton";
import ModalButton from "../components/ModalButton";
import AddBidForm from "../forms/AddBidForm";
import AlertButton from "../components/AlertButton";
import EditArtworkForm from "../forms/NewArtworkForm";
import NewArtworkForm from "../forms/NewArtworkForm";
import EditArtWorkForm from "../forms/EditArtworkForm";
import { getFormData, getLocalUserData } from "../utils/misc";
import AddBidFormFull from "../forms/AddBidFormFull";

interface IProfilePage {}

const ProfilePage:React.FC<IProfilePage> = () => {

    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        const response = await axios.get(API_URL + '/user');
        setUser(response.data);
    },[user]);

    const logout = async () => {
        try {
            const response = await axios.post(API_URL + '/logout');
            console.log('Successful logout');
          } catch (error) {
            console.log('Unsuccessful logout.');
          } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            navigate('/');
          }
    }

    const deleteBid = (id:number) => {
        try {
            axios.delete(API_URL + `/bids/${id}`);
            console.log('Success!');
        } catch (error) {
            console.error(error);
        }
    }

    const deleteArtwork = (id:number) => {
        try {
            axios.delete(API_URL + `/artworks/${id}`);
            console.log('Success!');
        } catch (error) {
            console.error(error);
        }
    }

    const editArtwork = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = getFormData(e);
        console.log(formData);
        try {
            const response = await axios.put(API_URL + '/artworks',formData);
            console.log('Success!');
            const artwork :IArtwork = response.data.data;
            navigate(`/artwork/${artwork.id}`);
        } catch (error) {
            console.error(error);
        }
    }

    const submitNewArtwork = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = getFormData(e);
        console.log(formData);
        
        try {
            const response = await axios.post(API_URL + '/artworks',formData);
            const artwork : IArtwork = response.data.data;
            navigate(`/artwork/${artwork.id}`);
            console.log('Success!');
        } catch (error) {
            console.error(error);
        }
    }

    const bidColumns = useMemo<ColumnDef<IBid>[]>(
        () => [
            {
                accessorFn: (row) => row?.artwork?.title,
                id: 'title',
                cell: (info) => info.getValue(),
                header: 'Title',
            },
            {
                accessorFn: (row) => row?.artwork?.artist?.name,
                id: 'artist',
                cell: (info) => info.getValue(),
                header: 'Artist',
            },
            {
                id:'estimate',
                header:'Estimate',
                cell: (info) => (
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center text-emerald-500"> <ArrowUp/> {info.row.original.artwork.estimate_high}</div>
                        <div className="flex flex-row items-center text-neutral-500 opacity-50"> <ArrowDown/> {info.row.original.artwork.estimate_low}</div>
                    </div>
                )
            },
            {
                id:'amount',
                header:'Amount',
                accessorFn: (row) => row?.bid_amount,
                cell: (info) => 'PHP ' + info.getValue()
            },
            {
                accessorFn: (row) => row?.bid_amount ?? 0.00,
                id: 'action',
                cell: (info) => (
                    <div className="flex flex-row gap-2">
                        <AlertButton id={info.row.original.id} onConfirm={deleteBid} body={`Are you sure you want to delete the ${info.row.original.artwork.title} bid? ( PHP ${info.row.original.bid_amount})`} variant="danger-soft" status="primary" icon={<TrashBin/>} key={info.row.original.id}/>
                        <Button variant="secondary" onClick={() => {navigate(`/artwork/${info.row.original.artwork.id}`)}}><Eye/></Button>
                    </div>
                ),
                header: '',
            },
        ],
        []
    )

    const listingColumns = useMemo<ColumnDef<IArtwork>[]>(
        () => [
            {
                accessorFn: (row) => row.title ?? 'Untitled',
                accessorKey: 'title',
                header:'Title',
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row.category.name ?? 'N/A',
                accessorKey: 'category',
                header:'Category',
                cell: (info) => info.getValue(),
            },
            {
                accessorKey: 'action',
                header:'',
                cell: (info) => (
                    <div className="flex flex-row gap-2 justify-center">
                        <ModalButton triggerLabel="" heading="Edit Listing" size="md" icon={<Pencil/>}><EditArtWorkForm artworkId={info.row.original.id} artistId={getLocalUserData()?.id} onSubmit={editArtwork}/></ModalButton>
                        <Button onClick={() => { navigate(`/artwork/${info.row.original.id}`)}} variant="secondary"><Eye/></Button>
                        <AlertButton id={info.row.original.id} onConfirm={deleteArtwork} body={`Are you sure you want to delete the listing?`} variant="danger-soft" status="primary" icon={<TrashBin/>} key={info.row.original.id}/>
                    </div>
                ),
            },
            
        ],
        []
    )

    const hasAuth = () => {
        const token = localStorage.getItem('token');
        if(token != null) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        if ( ! hasAuth()) {
            navigate('/');
        }
        getUser();
    },[])

    return (
        <div className="h-full w-full flex flex-row gap-3 p-3">
            <Card className="min-h-full w-1/4 p-3 flex items-center justify-center">
                <section className="w-full h-full p-2 gap-1 flex flex-col items-center justify-evenly ">
                    <div className="flex flex-col gap-3 outline p-10 outline-neutral-800 rounded-2xl bg-background-quaternary">
                        <div className="flex flex-col items-center">
                            <Avatar className="h-20 w-20"><PersonFill/></Avatar>
                            <header className="text-4xl">{ user?.name ?? 'User Name'}</header>
                            <p className="text-sm text-neutral-600">{ user?.type?.name ?? 'User Type'}</p>
                            <p className="text-sm text-neutral-600">{ user?.email ?? 'User Email'}</p>
                            <p className="text-sm text-neutral-600">{ user?.contact_number ?? 'User Contact'}</p>
                        </div>
                        <div className="flex flex-col w-full h-full gap-2">
                            
                        </div>
                    <Button onClick={logout} className='w-full p-3 text-md' variant="danger-soft"><ArrowLeft/> Logout</Button>
                    </div>
                </section>
            </Card>

            <div className="h-full w-full flex flex-col gap-3">
                <div className="h-1/4 flex flex-row gap-3">
                    <Card className="h-full w-full">
                        <header className="text-xl">Total Bid Orders</header>
                        <header className="text-7xl text-right text-neutral-500">{user?.bids?.length ?? 0}</header>
                    </Card>
                    <Card className="h-full w-full">
                        <header className="text-xl">Total Listed</header>
                        <header className="text-7xl text-right text-neutral-500">{user?.listings?.length ?? 0} </header>
                    </Card>
                </div>
                <Card className="h-full w-full flex flex-row">
                    <div className="h-full w-full flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xl">Bids</p>
                        </div>
                        <Table columns={bidColumns} data={user?.bids ?? []} />
                    </div>
                    <div className="h-full w-full flex flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-xl">Listings</p>
                            <ModalButton icon={<Plus/>} heading="New Listing" triggerLabel="List"> <NewArtworkForm onSubmit={submitNewArtwork}/> </ModalButton>
                        </div>
                        <Table columns={listingColumns} data={user?.listings ?? []} />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;