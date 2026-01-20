import { Label, NumberField } from "@heroui/react";

interface IInputNumberField {
    label:string;
    min:number;
    max:number;
    defaultValue:number;
    name:string;
}

const InputNumberField: React.FC<IInputNumberField> = ({label,min,max,defaultValue,name}) => {
    return (
        <NumberField className="w-full" step={min} defaultValue={defaultValue} minValue={min} maxValue={max} name={name}>
            <Label>{label}</Label>
            <NumberField.Group>
                <NumberField.DecrementButton />
                <NumberField.Input className="w-full" />
                <NumberField.IncrementButton />
            </NumberField.Group>
        </NumberField>
    );
}

export default InputNumberField;