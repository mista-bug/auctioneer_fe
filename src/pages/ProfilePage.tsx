import { Car, PersonFill } from "@gravity-ui/icons";
import { Avatar, Card, DateField, DateInputGroup, Input, Label, TextField } from "@heroui/react";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "../components/Table";
import type { ColumnDef } from "@tanstack/react-table";

interface IProfilePage {

}

interface IUserData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const ProfilePage:React.FC<IProfilePage> = () => {

    const [data, setData] = useState<IUserData[]>([]);

    const getBuys = useCallback(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => setData(response.data));
    },[])

    const bidColumns = useMemo<ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'id',
                header:'Id',
                cell: (info) => info.getValue(),
                // footer: (props) => props.column.id,
              },
              {
                accessorFn: (row) => row.name,
                id: 'name',
                cell: (info) => info.getValue(),
                header: 'Name',
                // footer: (props) => props.column.id,
              },
        ],
        []
    )

    useEffect(() => {
        getBuys();
    },[])

    return (
        <div className="h-full w-full flex flex-row gap-3 p-3">
            <Card className="min-h-full w-1/4 p-3 flex items-center justify-center">
                <section className="w-full h-full p-2 gap-3 flex flex-col items-center justify-center">
                    <Avatar className="h-20 w-20"><PersonFill/></Avatar>
                    <header className="text-4xl">User Name</header>
                    <TextField className="w-full flex" name="email" type="email" isReadOnly>
                        <Label>Email</Label>
                        <Input readOnly value='email' />
                    </TextField>
                    <DateField className="w-full " name="date" isReadOnly>
                        <Label>Joined At</Label>
                        <DateInputGroup>
                            <DateInputGroup.Input>
                                {(segment) => <DateInputGroup.Segment segment={segment} />}
                            </DateInputGroup.Input>
                        </DateInputGroup>
                    </DateField>
    
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
                        <Table columns={bidColumns} data={data} />
                    </div>
                    <div className="h-full w-full">
                        <header className="text-xl">Listings</header>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProfilePage;