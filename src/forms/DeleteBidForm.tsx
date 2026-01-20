import type { IDefaultFormHandling } from "../types/types";

interface IDeleteBidForm extends IDefaultFormHandling {

}

const DeleteBidForm:React.FC<IDeleteBidForm> = ({onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            
        </form>
    )
}

export default DeleteBidForm;
