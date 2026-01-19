
import {ArrowLeft, EllipsisVertical, Gear, Lock, Pencil, Person, PersonFill, SquarePlus, TrashBin} from "@gravity-ui/icons";
import { Avatar, Button, Description, Dropdown, DropdownTrigger, Header, Kbd, Label, Separator } from "@heroui/react";
import { useCallback, useEffect, useState } from "react";
import type { IUser } from "../types/types";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URL } from "../config/config";

interface IAvatarDropdown {

}

const AvatarDropdown:React.FC<IAvatarDropdown> = () => {

    const [user,setUser] = useState<IUser>();
    const navigate = useNavigate();
    useEffect(() => {
      const localStorageUser = localStorage.getItem('user');
      const localStorageToken = localStorage.getItem('token');
      let user: IUser;
      
      if(localStorageToken !=null && localStorageUser != null) {
        console.log('exists!');
        user = JSON.parse(localStorageUser);
        user.token = localStorageToken;
        setUser(user);
      }
    },[]);

    const logout = useCallback(async () => {
      try {
        const response = await axios.post(API_URL + '/logout');
        console.log('Successful logout');
      } catch (error) {
        console.log('Unsuccessful logout.');
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
      }
    },[]);

    return (
        <Dropdown>
          <Dropdown.Trigger
            aria-label="Menu"
            className="button button-md button--tertiary button--icon-only data-[focus-visible=true]:status-focused"
          >
            <PersonFill className="outline-none" />
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Section>
                <Header>Actions</Header>
                <Dropdown.Item onClick={() => {navigate('/profile')}} id="new-file" textValue="My Account">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <Person className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>{user?.name + "'s Account " ?? 'My Account'} <p className="text-neutral-600">{user?.email}</p></Label>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="edit-file" textValue="Edit file">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <Gear className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Settings</Label>
                    <Description>View your security settings</Description>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
              <Separator />
              <Dropdown.Section>
                <Dropdown.Item onClick={logout} id="delete-file" textValue="Delete file" variant="danger">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <ArrowLeft className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Logout</Label>
                    <Description>Log out of your account.</Description>
                  </div>
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      );
}

export default AvatarDropdown;