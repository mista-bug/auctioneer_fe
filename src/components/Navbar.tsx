import { Avatar, AvatarImage, Button, Card, CardHeader, Header } from "@heroui/react";
import { useNavigate } from "react-router";
import AvatarDropdown from "./AvatarDropdown";
interface INavbar {

}

const Navbar:React.FC<INavbar> = () => {

    const navigate = useNavigate();

    return (
        <Card className="h-auto w-full flex flex-row items-center justify-between p-2">
            <Button onClick={() => {navigate('/')}} type="button" variant="ghost">Auctioneer</Button>
            <div className="flex flex-row gap-2">
                <Button onClick={() => {navigate('/home')}} type="button" variant="ghost">Home</Button>
                <Button onClick={() => {navigate('/profile')}} type="button" variant="ghost">Profile</Button>
                <AvatarDropdown/>
            </div>
        </Card>
    )
}

export default Navbar;