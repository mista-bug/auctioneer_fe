import type { IBid } from "../types/types"

interface IBidEntry {
    bidder:string;
    amount:number;
}

const BidEntry:React.FC<IBidEntry> = ({bidder,amount}) => {
    return (

        // <div className="text-left bg-background-tertiary p-1 rounded-md flex flex-col justify-center items-start">
        //                 <div className="flex gap-2 text-neutral-500"><i>PHP</i> <p className="text-emerald-500">{amount}</p></div>
        //                 <div className="text-xs text-gray-500"><i>offered by</i>  {bidder}</div>
        //             </div>
        <div className="flex flex-row gap-1 items-center">
            <p className="">{bidder}</p> <i className="text-sm text-neutral-500">offered</i><p className="text-emerald-500">PHP {amount}</p>
        </div>
    )
}

export default BidEntry;