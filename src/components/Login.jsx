import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useContext } from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from "../App";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa6";

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
                    navigate(`/profile/${data.user}`)
                    window.location.reload()
                } else {
                    alert('Invalid Credentials')
                    navigate('/singin')
                }
            })
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);


    const copyclick = () => {

        setUsername('fuadvai')
        setPassword('Tanvir12345678')
        handleOpen()


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
                    <Input label="Username" value={username} size="lg" onChange={(e) => setUsername(e.target.value)} />
                    <Input label="Password" value={password} size="lg" onChange={(e) => setPassword(e.target.value)} />
                </CardBody>
                <CardFooter className="pt-0 flex flex-col justify-center items-center gap-3">
                    <Button className='bg-primary' fullWidth onClick={() => formSubmit()}>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Link to={'/signup'}
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Link>
                    </Typography>
                    <h1 onClick={handleOpen} className="text-center border border-dashed border-black rounded-md w-1/2 font-semibold cursor-pointer">Demo login</h1>
                </CardFooter>
            </Card>
            <>
                <Dialog open={open} handler={handleOpen}>
                    <DialogHeader>Demo Login info</DialogHeader>
                    <DialogBody>
                        <h1 className='font-bold'>User</h1>
                        <div className='flex justify-between items-center'>
                            <div>
                                <p> username : fuadvai</p>
                                <p>password : Tanvir12345678</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <FaCopy className='text-2xl' onClick={() => copyclick()} />
                            </div>
                        </div>

                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            </>
        </div>

    );
};

export default Login;