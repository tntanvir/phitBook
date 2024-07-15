import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const formSubmit = () => {
        console.log(username, password);
        fetch('https://api-phitbook.onrender.com/authore/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.token && data.id) {
                    sessionStorage.setItem('token', data.token)
                    sessionStorage.setItem('id', data.id)

                    window.location.reload()
                    navigate('/dashboard')
                } else {
                    alert('Invalid Credentials')
                    navigate('/singin')
                }
            })
    }

    return (
        <div className='min-h-screen flex justify-center items-center'>

            <Card className="w-96">
                <CardHeader
                    // variant="gradient"
                    // color="gray"
                    className="mb-4 grid h-28 place-items-center bg-primary"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Username" size="lg" onChange={(e) => setUsername(e.target.value)} />
                    <Input label="Password" size="lg" onChange={(e) => setPassword(e.target.value)} />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button className='bg-primary' fullWidth onClick={() => formSubmit()}>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>

    );
};

export default Login;