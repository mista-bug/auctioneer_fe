import { Button, Card, Label, TextArea } from "@heroui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { API_URL } from "../config/config";
import type { ICollection } from "../types/types";
import { useNavigate, useParams } from "react-router";
import { Eye } from "@gravity-ui/icons";


const ViewCollectionPage = () => {

    const [collection, setCollection] = useState<ICollection>();
    const navigate = useNavigate();
    const param = useParams();
    const getCollection = useCallback(async () => {
        const response = await axios.get(API_URL + `/collections/${param.id}`);
        setCollection(response.data);
    }, [])

    useState(() => {
        getCollection();
    });

    return (
        <div className="w-full h-full flex flex-col gap-3 p-3">
            <Card className="w-full h-1/2 flex flex-row gap-2">
                <section className="w-1/3 h-full aspect-video overflow-hidden"><img className="object-cover h-full w-full" src='https://placehold.co/1000x1000' alt={collection?.name} /></section>
                <section className="w-full h-full flex flex-col p-3">
                    <header className="text-4xl">{collection?.name ?? 'Collection Title'}</header>

                    <section className="p-3">
                        <Card.Title>Information</Card.Title>
                        <Card.Content className="indent-3 bg-background-quaternary rounded-2xl p-3 w-1/2">
                            <p>Organizer : {collection?.organizer?.name ?? 'Collection Organizer Name'}</p>
                            <p>Start Date : {collection?.start_date ?? 'Collection Start Date'}</p>
                            <p>End Date : {collection?.end_date ?? 'Collection End Date'}</p>
                            <p>Location : {collection?.location ?? 'Location'}</p>
                            <p>Address : {collection?.address ?? 'Address'}</p>
                        </Card.Content>
                        <Card.Content>
                            <Label>Description</Label>
                            <TextArea className='w-1/2 h-30 p-3' readOnly value={collection?.description} />
                        </Card.Content>
                    </section>
                    <p></p>
                </section>
            </Card>
            <Card className="w-full h-1/2">
                <Card.Header>Artworks</Card.Header>
                <Card.Content>
                    <div className="p-3 w-full h-full grid grid-flow-col auto-cols-[200px] gap-4 overflow-x-auto overflow-y-hidden">
                        {/* {collection?.artworks.length == 0 ? () : ()} */}
                        {collection?.artworks.map((c) => {
                            return (
                                // <div className="flex flex-col w-full h-full">
                                //     <section className="h-1/2">
                                //         <img className="object-cover w-full h-full" src="https://placehold.co/600x400" alt={c.title} />
                                //     </section>
                                //     <section className="h-1/2 bg-background-quaternary p-3">
                                //         <p className="text-xl">{c.title}</p>
                                //         <p className="text-sm text-neutral-500">{c.description}</p>
                                //     </section>

                                // </div>
                                <div className="border border-neutral-800 overflow-clip rounded-2xl flex flex-col h-full">

                                    <section className="w-full h-1/2 aspect-video overflow-hidden shrink-0">
                                        <img
                                            className="w-full h-full object-cover"
                                            src='https://placehold.co/600x400'
                                            alt={c.title}
                                        />
                                    </section>
                                    <section className="bg-background-quaternary flex flex-col gap-3 justify-between flex-1 p-3">
                                        <div className="flex flex-col gap-1">
                                            <header className="text-xl font-semibold">{c.title ?? 'Collection Title'}</header>
                                            <p className="text-sm text-neutral-500 line-clamp-2">{c.description ?? 'Description'}</p>
                                        </div>
                                        <div className="flex flex-row gap-3">
                                            <Button onClick={() => { navigate(`/artwork/${c.id}`) }} variant="tertiary"><Eye /> View</Button>
                                        </div>
                                    </section>
                                </div>
                            )
                        })}
                        {/* <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div>
                    <div className="outline"></div> */}
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default ViewCollectionPage;