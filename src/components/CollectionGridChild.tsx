import { Eye } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { useNavigate } from "react-router";

interface ICollectionGridChild {
    imageSrc?:string;
    title?:string;
    description?:string;
    id?:number;
    organizerName?:string;
}

const CollectionGridChild:React.FC<ICollectionGridChild> = ({imageSrc,title,description,id,organizerName}) => {
    
    const navigate = useNavigate();
    
    return (
        <div className="border border-neutral-800 overflow-clip rounded-2xl flex flex-col h-full">
            <section className="w-full h-1/2 aspect-video overflow-hidden shrink-0">
                <img 
                    className="w-full h-full object-cover" 
                    src={imageSrc} 
                    alt={title} 
                />
            </section>
            <section className="bg-background-quaternary flex flex-col gap-3 justify-between flex-1 p-3">
                <div className="flex flex-col gap-1">
                    <header className="text-xl font-semibold">{title ?? 'Collection Title'}</header>
                    <p className="text-sm text-neutral-600">by {organizerName ?? 'Organizer Name'}</p>
                    <p className="text-sm text-neutral-500 line-clamp-2">{description ?? 'Description'}</p>
                </div>
                <div className="flex flex-row gap-3">
                   <Button onClick={() => {navigate(`/collections/${id}`)}} variant="tertiary"><Eye/> View</Button>
                </div>
            </section>
        </div>
    )    
}

export default CollectionGridChild;