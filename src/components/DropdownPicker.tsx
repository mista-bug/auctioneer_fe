import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import type { IDropdownPickerChoice, IDropdownPickerProps } from "../types/types";

const DropdownPicker: React.FC<IDropdownPickerProps> = ({ data, name,onChange }) => {
    let choices: IDropdownPickerChoice[] = [];
    if (data) {
        choices = data?.map((item) => {
            return {
                id: item.id,
                name: item.name,
                textValue: item.name // Added textValue mapping
            }
        });
    }

    return (
        <ComboBox name={name} className="w-full">
            <ComboBox.InputGroup>
                <Input readOnly placeholder="Search..." />
                <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
                <ListBox>
                    {choices?.map((choice: IDropdownPickerChoice) => {
                        return (
                            <ListBox.Item key={choice.id} id={choice.id} textValue={choice.textValue}>
                                {choice.textValue}
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        )
                    })}
                </ListBox>
            </ComboBox.Popover>
        </ComboBox>
    );
}

export default DropdownPicker;