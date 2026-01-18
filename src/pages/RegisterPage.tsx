import { Button, Card, Form, Label, Input, Description, FieldError, TextField, Header, ComboBox, ListBox } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import { API_URL } from "../config/config";
import axios from "axios";

interface IRegisterPage {

}

const RegisterPage: React.FC<IRegisterPage> = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        
        console.log(data);
        try {
            const response = await axios.post(API_URL + '/user', data);
            console.log('Success:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <div>
                <section className="p-3">
                    <Header className="text-6xl text-neutral-200">Join us!</Header>
                    <p className="text-neutral-400 indent-5">Register by filling up this form.</p>
                </section>
                <Card className="w-100">
                    <Form className="flex flex-col justify-center gap-4" onSubmit={onSubmit}>

                        <TextField
                            isRequired
                            name="username"
                            type="text"
                            validate={(value) => {
                                if (value.length <= 2) {
                                    return 'Username must be atleast 3 characters';
                                }
                                return null;
                            }}
                        >
                            <Label>Username</Label>
                            <Input placeholder="Username" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField
                            isRequired
                            name="contact_number"
                            type="tel"
                            validate={(value) => {
                                if (value.length <= 8) {
                                    return 'Contact number must be at least 9 characters';
                                }
                                return null;
                            }}
                        >
                            <Label>Contact Number</Label>
                            <Input placeholder="Contact Number" />
                            <FieldError />
                        </TextField>

                        <ComboBox name="account_type" className="w-full" isRequired>
                            <Label>Account Type</Label>
                            <ComboBox.InputGroup>
                                <Input placeholder="Select account type..." />
                                <ComboBox.Trigger />
                            </ComboBox.InputGroup>
                            <ComboBox.Popover>
                                <ListBox>
                                    <ListBox.Item id="1" textValue="Organizer">
                                        Organizer
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="2" textValue="Artist">
                                        Artist
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                    <ListBox.Item id="3" textValue="Collector">
                                        Collector
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                </ListBox>
                            </ComboBox.Popover>
                        </ComboBox>

                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>

                        <div className="flex gap-2">
                            <Button type="submit" variant="primary">
                                <Check />
                                Register
                            </Button>
                            <Button type="reset" variant="danger-soft">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default RegisterPage;