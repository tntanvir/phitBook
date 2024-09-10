import { useState } from 'react';
import Layout from './Layout';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
} from "@material-tailwind/react";
import { Drawer } from '@material-tailwind/react';
import { IconButton } from '@material-tailwind/react';
import { RiMenuUnfoldLine } from 'react-icons/ri';

const Category = () => {
    const [Name, setName] = useState('')
    const [Slug, setSlug] = useState('')
    const submitbtn = () => {
        fetch('https://api-phitbook.onrender.com/category/all/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                name: Name,
                slug: Slug
            })
        }).then(res => res.json())
            .then(data => {
                setName('')
                setSlug('')
                // console.log(data);
            }).catch(err => {
                console.log(err)
            });

    }
    const [opendawer, setOpendower] = useState(false);

    const openDrawer = () => setOpendower(true);
    const closeDrawer = () => setOpendower(false);
    return (
        <div className='flex min-h-screen dark:bg-black dark:text-white'>

            <div className='hidden md:block w-1/5 border-r'>

                <Layout />
            </div>
            <div className='w-full '>
                <div className=' w-full  pl-3 '>
                    <RiMenuUnfoldLine onClick={openDrawer} className='md:hidden text-2xl' />

                </div>
                <div className="flex justify-center items-center  h-full  ">
                    <Card className="w-96">
                        <CardHeader>
                            <Typography variant="h3" color="white" className='bg-primary text-center uppercase'>
                                Add Category
                            </Typography>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-4">
                            <Input label="Category Name" value={Name} size="lg" onChange={(e) => setName(e.target.value)} />
                            <Input label="Slug Name" value={Slug} size="lg" onChange={(e) => setSlug(e.target.value)} />

                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="outlined" fullWidth className='' onClick={() => submitbtn()}>
                                Submit
                            </Button>

                        </CardFooter>
                    </Card>
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
        </div>
    );
};

export default Category;