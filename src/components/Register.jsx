import React, { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [image, setImage] = useState(null)
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [Email, setEmail] = useState('')
    const [Phone, setPhone] = useState('')
    const [Location, setLocation] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmpassword] = useState('')

    const navigate = useNavigate()



    const updateImgtoUrl = async (e) => {


        try {
            const formData = new FormData();
            formData.append('image', e);

            const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

            if (res.data.data.url) {
                setImage(res.data.data.url)
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', image)
        formData.append('username', username)
        formData.append('first_name', firstname)
        formData.append('last_name', lastname)
        formData.append('email', Email)
        formData.append('phone_number', Phone)
        formData.append('location', Location)
        formData.append('password', password)
        formData.append('confirm_password', confirmpassword)
        fetch('https://api-phitbook.vercel.app/authore/registar/', {
            method: 'POST',
            body: formData,

        }).then(res => res.json()).then(data => {
            if (data.errors) {
                console.log(data.errors);
            }
            else {
                // console.log(data);
                navigate('/singin')
            }

        })

    }

    return (
        <div className='flex justify-center items-center dark:bg-black dark:text-white'>
            <Card className='md:w-1/2 w-full p-2 '>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-full p-2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Image
                        </Typography>
                        <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            type='file'
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => updateImgtoUrl(e.target.files[0])}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            User Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="User Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            First Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="First Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Last Name
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Last Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Phone Number
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Phone Number"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Location
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Location"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Confirm  Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button className="mt-6 bg-primary" fullWidth type="submit">
                        sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to={'/singin'} className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
};

export default Register;
