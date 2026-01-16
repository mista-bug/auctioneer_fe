
import {ArrowLeft, EllipsisVertical, Gear, Lock, Pencil, Person, PersonFill, SquarePlus, TrashBin} from "@gravity-ui/icons";
import { Avatar, Button, Description, Dropdown, DropdownTrigger, Header, Kbd, Label, Separator } from "@heroui/react";

interface IAvatarDropdown {

}

const AvatarDropdown:React.FC<IAvatarDropdown> = () => {
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
                <Dropdown.Item id="new-file" textValue="My Account">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <Person className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>My Account</Label>
                  </div>
                  {/* <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>N</Kbd.Content>
                  </Kbd> */}
                </Dropdown.Item>
                <Dropdown.Item id="edit-file" textValue="Edit file">
                  <div className="flex h-8 items-center justify-center pt-px">
                    <Gear className="size-4 shrink-0 text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Settings</Label>
                    <Description>View your security settings</Description>
                  </div>
                  {/* <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Content>E</Kbd.Content>
                  </Kbd> */}
                </Dropdown.Item>
              </Dropdown.Section>
              <Separator />
              <Dropdown.Section>
                <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
                  <div className="flex h-8 items-start justify-center pt-px">
                    <ArrowLeft className="size-4 shrink-0 text-danger" />
                  </div>
                  <div className="flex flex-col">
                    <Label>Logout</Label>
                    <Description>Log out of your account.</Description>
                  </div>
                  {/* <Kbd className="ms-auto" slot="keyboard" variant="light">
                    <Kbd.Abbr keyValue="command" />
                    <Kbd.Abbr keyValue="shift" />
                    <Kbd.Content>D</Kbd.Content>
                  </Kbd> */}
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      );
}

export default AvatarDropdown;