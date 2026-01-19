import { ArrowLeft, Brush, Car, PersonFill, TagDollar } from "@gravity-ui/icons";
import { Avatar, Button, Card, DateField, DateInputGroup, Input, Label, TextField } from "@heroui/react";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";
import type { IArtwork, IBid, IUser } from "../types/types";
import { API_URL } from "../config/config";
import DefaultModal from "../components/ModalButton";
import ModalButton from "../components/ModalButton";

interface IProfilePage {}

const ProfilePage:React.FC<IProfilePage> = () => {

    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        const response = await axios.get(API_URL + '/user');
        setUser(response.data);
    },[user]);

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
                accessorFn: (row) => row?.artwork?.estimate_low ?? 0.00,
                id: 'estimate_low',
                cell: (info) => info.getValue(),
                header: 'Estimate Low',
            },
            {
                accessorFn: (row) => row?.artwork?.estimate_high ?? 0.00,
                id: 'estimate_high',
                cell: (info) => info.getValue(),
                header: 'Estimate High',
            },
            {
                accessorFn: (row) => row?.bid_amount ?? 0.00,
                id: 'bid_amount',
                cell: (info) => info.getValue(),
                header: 'Bid Amount',
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
                accessorFn: (row) => row.reservePrice ?? 0.00,
                accessorKey: 'reserve_price',
                header:'Reserve Price',
                cell: (info) => info.getValue(),
            },
            {
                accessorFn: (row) => row.medium.name ?? 'N/A',
                accessorKey: 'medium',
                header:'Medium',
                cell: (info) => info.getValue(),
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
                            <ModalButton triggerLabel="List" icon={<Brush />} description="List">
                                <form action=""></form>
                            </ModalButton>
                        </div>
                    <Button className='w-full p-3 text-md' variant="danger-soft"><ArrowLeft/> Logout</Button>
                    </div>
                </section>
            </Card>

            <div className="h-full w-full flex flex-col gap-3">
                <div className="h-1/4 flex flex-row gap-3">
                    <Card className="h-full w-full">
                        <header className="text-xl">Buy Info</header>
                        <header className="text-md text-neutral-500">Total Buy Offers</header>
                        <header className="text-md text-neutral-500">Latest Buy Offer</header>
                    </Card>
                    <Card className="h-full w-full">
                        <header className="text-xl">Sell Info</header>
                        <header className="text-md text-neutral-500">Total Listed </header>
                        <header className="text-md"></header>
                    </Card>
                </div>
                <Card className="h-full w-full flex flex-row">
                    <div className="h-full w-full">
                        <header className="text-xl">Bids</header>
                        <Table columns={bidColumns} data={user?.bids ?? []} />
                    </div>
                    <div className="h-full w-full">
                        <header className="text-xl">Listings</header>
                        <Table columns={listingColumns} data={user?.listings ?? []} />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;