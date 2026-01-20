import { Button, Input, Label, NumberField, TextField } from "@heroui/react"
import type { IDefaultFormHandling } from "../types/types"

interface IAddBidForm extends IDefaultFormHandling {
    artwork_id?:number;
    collection_id?:number;
}

const AddBidForm:React.FC<IAddBidForm> = ({onSubmit,artwork_id,collection_id}) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5 items-center">
            <Input type="hidden" name="artwork_id" value={artwork_id} />
            <Input type="hidden" name="collection_id" value={collection_id} />

            <NumberField
                defaultValue={1000.00}
                minValue={1000.00}
                step={1000.00}
                name="bid_amount"
                formatOptions={{
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    style: "decimal",
                }}
            >
                <Label>Bid Amount</Label>
                <NumberField.Group>
                    <NumberField.DecrementButton />
                    <NumberField.Input className="w-full" />
                    <NumberField.IncrementButton />
                </NumberField.Group>
            </NumberField>

            <Button type="submit" className='w-1/2'>Bid</Button>

        </form>
        
    )
}

export default AddBidForm;