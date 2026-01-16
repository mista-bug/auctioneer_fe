import { Button, Card, Form, Label, Input, Description, FieldError, TextField, Header, SearchField } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import Table from "../components/Table";

interface IHomePage {

}

const HomePage: React.FC<IHomePage> = () => {

    // const columns = React.useMemo<ColumnDef<any>[]>(
    //     () => [
    //       {
    //         accessorKey: 'id',
    //         header:'Id',
    //         cell: (info) => info.getValue(),
    //         // footer: (props) => props.column.id,
    //       },
    //       {
    //         accessorFn: (row) => row.name,
    //         id: 'name',
    //         cell: (info) => info.getValue(),
    //         header: 'Name',
    //         // footer: (props) => props.column.id,
    //       },
    //     //   {
    //     //     // accessorFn: (row) => row.canvas_id,
    //     //     accessorKey: 'id',
    //     //     cell:(info) => <div className="flex flex-row items-center justify-center">
    //     //       <SillyArtButton clicked={() => {navigate(`${info.getValue()}`)}} title="View">
    //     //         <svg fill="pink" width="20px" height="20px" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    //     //           <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z" />
    //     //         </svg>
    //     //       </SillyArtButton> 
    //     //       </div>,
    //     //     header: 'Actions',
    //     //     // footer: (props) => props.column.id,
    //     //   },
    //     //   {
    //     //     accessorFn: (row) => row.client_id,
    //     //     accessorKey: 'client',
    //     //     header: 'Client',
    //     //     // footer: (props) => props.column.id,
    //     //   },
    //     //   {
    //     //     accessorFn: (row) => row.medium_id,
    //     //     accessorKey: 'medium',
    //     //     header: 'Medium',
    //     //     // footer: (props) => props.column.id,
    //     //   },
    //       // {
    //       //   accessorKey: 'created_at',
    //       //   header: 'Created At',
    //       //   // footer: (props) => props.column.id,
    //       // },
    //     ],
    //     [],
    // )

    return (
        <div className="h-screen w-full flex flex-col gap-3 overflow-y-auto p-3">
            <Card className="min-h-1/2 w-full p-3 flex flex-row items-center justify-center font-medium">
                <section className="p-2 h-full w-1/2 flex flex-col justify-center">
                    <header className="text-4xl">Auctions Page</header>
                    <p className="text-md font-light text-neutral-400 italic">See all new auctions available.</p>
                </section>

                <section className=" border-l border-l-neutral-700 p-2 p-10 h-full w-1/2 gap-3 flex flex-col justify-center">
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
                    <header className="text-2xl text-neutral-300">Buy Orders</header>
                </div>
                <div className="h-full w-1/2  flex flex-col p-2">
                    <header className="text-2xl text-neutral-300">Active Collections</header>
                </div>
                {/* <Table columns={columns} data={} /> */}
            </Card>
        </div>
    )
}

export default HomePage;