import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from "../App";
import { Link } from "react-router-dom";

const Login = () => {
    const [state, setState] = useContext(MyContext);


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const formSubmit = () => {
        // console.log(username, password);
        fetch('https://api-phitbook.vercel.app/authore/login/', {
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
                // console.log(data)
                if (data.token && data.id) {
                    sessionStorage.setItem('token', data.token)
                    sessionStorage.setItem('id', data.id)
                    sessionStorage.setItem('username', data.user)

                    setState(!state)
                    navigate('/dashboard')
                    window.location.reload()
                } else {
                    alert('Invalid Credentials')
                    navigate('/singin')
                }
            })
    }

    return (
        <div className='min-h-screen flex justify-center items-center dark:bg-black dark:text-gray-300'>

            <Card className="w-96 ">
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
                        <Link to={'/singup'}
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </CardFooter>
            </Card>
        </div>

    );
};

export default Login;