import { useState } from "react";
import axios from 'axios';
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Layout from './Layout';
import { useEffect } from "react";
import MultiSelect from "./MultiSelect";
import { Drawer } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { RiMenuUnfoldLine } from "react-icons/ri";


const Addpost = () => {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [discription, setDiscription] = useState('')
    const [category, setCategory] = useState('')
    const [option, setOption] = useState([])



    const navigate = useNavigate()


    useEffect(() => {
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(res => res.json())
            .then(data => {
                const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
                setOption(formattedOptions);
            })
            .catch(err => console.log(err));
    }, []);


    const imgtoUrl = async (e) => {
        e.preventDefault();

        console.log(image);

        try {
            const formData = new FormData();
            formData.append('image', image);

            const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

            if (res.data.data.url) {
                console.log(res.data.data.url);

                if (res.data.data.url) {
                    const formData = new FormData();
                    formData.append('image', res.data.data.url);
                    formData.append('title', title);
                    formData.append('user', sessionStorage.getItem('id'));
                    formData.append('discription', discription);
                    category.forEach(catId => formData.append('category', catId));

                    formData.forEach((value, key) => {
                        console.log(`${key}: ${value}`);
                    });

                    const response = await fetch('https://api-phitbook.onrender.com/post/allpost/', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Token ${sessionStorage.getItem('token')}`,
                        },
                        body: formData,
                    });

                    const data = await response.json();

                    if (data.errors) {
                        console.log('error', data.errors);
                    } else {
                        console.log(data);
                        navigate('/dashboard/mypost')
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [opendawer, setOpendower] = useState(false);

    const openDrawer = () => setOpendower(true);
    const closeDrawer = () => setOpendower(false);

    return (
        <div className='flex min-h-screen'>

            <div className='hidden md:block w-1/5 border-r'>

                <Layout />
            </div>
            <div className='w-full '>
                <div className=' w-full  pl-3 '>
                    <RiMenuUnfoldLine onClick={openDrawer} className='md:hidden text-2xl' />

                </div>
                <div className="flex justify-center items-center ">
                    <Card className='md:w-1/2 p-2'>
                        <Typography variant="h4" color="blue-gray">
                            Add Post
                        </Typography>

                        <form className="mt-8 mb-2 w-full p-2" onSubmit={imgtoUrl}>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Image
                                </Typography>
                                <Input
                                    size="lg"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    type='file'
                                    required
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => setImage(e.target.files[0])}
                                />

                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Select
                                </Typography>

                                <MultiSelect
                                    option={option}
                                    selectedOptions={category}
                                    setSelectedOptions={setCategory}
                                />


                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Title
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Enter Title"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    required
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Typography variant="h6" color="blue-gray" className="-mb-3">
                                    Discription
                                </Typography>
                                <Textarea size="lg" required label="Textarea Large" rows={10} onChange={(e) => setDiscription(e.target.value)} />
                            </div>
                            <Button className="mt-6 bg-primary" fullWidth type="submit">
                                submit
                            </Button>


                        </form>
                    </Card>
                </div>
                <Drawer open={opendawer} onClose={closeDrawer} className="p-4">
                    <div className="mb-6 flex items-center justify-between">
                        {/* <Typography variant="h5" color="blue-gray">
                        Material Tailwind
                    </Typography> */}
                        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </IconButton>
                    </div>
                    <Layout />
                </Drawer>
            </div>
        </div>
    );
};

export default Addpost;









