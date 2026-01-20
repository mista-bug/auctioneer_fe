import { Button, Input, Label, TextArea } from "@heroui/react";
import type { IDefaultFormHandling } from "../types/types";
import InputNumberField from "../components/InputNumberField";

interface EditArtWorkFormProps extends IDefaultFormHandling {
    artistId: number | undefined;
    artworkId: number | undefined;
}

const EditArtWorkForm: React.FC<EditArtWorkFormProps> = ({ onSubmit, artistId, artworkId }) => {
    return (
        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <Input type="hidden" name='artist_id' value={artistId} />
                <Input type="hidden" name='artwork_id' value={artworkId} />
                <div className="flex flex-col justify-center">

                    <Label>Title</Label>
                    <Input name="title" placeholder="Title..." />

                </div>

                <div className="flex flex-col justify-center">
                    <Label>Description</Label>
                    <TextArea name="description" className='h-40' placeholder="Description ... " style={{ resize: "none" }}></TextArea>
                </div>

                <div className="flex flex-col justify-center">
                    <Label>Reserve Price</Label>
                    <InputNumberField name="reserve_price" defaultValue={1000} label="" max={100000} min={1000} />
                </div>
                <Button className='w-full' variant="secondary" type="submit">Submit</Button>
            </form>
        </div>
    );
}

export default EditArtWorkForm;