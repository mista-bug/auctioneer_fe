import { Button, Card, Form, Label, Input, Description, FieldError, TextField, Header } from "@heroui/react";
import { Check } from "@gravity-ui/icons";
import axios from "axios";
import { API_URL } from "../config/config";

interface ILoginPage {

}

const LoginPage: React.FC<ILoginPage> = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        
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
                    <Header className="text-6xl text-neutral-200">Auctioneer</Header>
                    <p className="text-neutral-400 indent-5">Your one stop shop to see all the available art listings in your area.</p>
                </section>
                <Card>
                    <Form className="flex flex-col justify-center gap-4" onSubmit={onSubmit}>
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
                                Submit
                            </Button>
                            <Button type="reset" variant="secondary">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>


        </div>

    )
}

export default LoginPage;