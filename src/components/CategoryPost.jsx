import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Postcard from './Postcard';
import AllCategory from './AllCategory';
import DataNotFound from './DataNotFound';
import {
    Drawer,
    Button,
    IconButton,
} from "@material-tailwind/react";
import HomeProfile from './HomeProfile';
import UserSuggest from './UserSuggest';

const CategoryPost = () => {
    const { category } = useParams() //name


    const [categoryto, setCategoryto] = useState([]);
    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/category/all/')
            .then(response => response.json())
            .then(data => setCategoryto(data))


    }, [])
    const CategorytoId = (name) => {
        if (categoryto.length > 0) {
            const cat = categoryto.find(c => c.name === name)
            if (cat) {
                return cat.id
            }
        }

    }


    const [data, setData] = useState([])
    const [id, setId] = useState(null);
    useEffect(() => {
        setId(sessionStorage.getItem('id'));

        fetch(`https://api-phitbook.vercel.app/post/allpost/?category=${CategorytoId(category)}`)
            .then(response => response.json())
            .then(data => setData(data))
    }, [categoryto, category])



    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        // <div>
        //     <AllCategory />

        //     {
        //         data.length > 0 ? <Postcard post={data} /> : <DataNotFound />
        //     }
        // </div>

        <div className=' flex dark:bg-black dark:text-white'>
            <div className='hidden md:block'>

                <AllCategory />
            </div>
            <div className='flex flex-col items-center w-full ' >
                <Button onClick={openDrawer} className='md:hidden'>Open Drawer</Button>
                <div className='hide-scrollbar h-screen  w-fit pb-20'>

                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

                    {
                        data.length > 0 ? <Postcard post={data} /> : <DataNotFound />
                    }
                </div>
            </div>
            <div className='w-full'>
                <HomeProfile />
                {id && <UserSuggest />}
            </div>
            <>
                <Drawer open={open} onClose={closeDrawer} className="p-4">
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
                    <AllCategory />
                </Drawer>
            </>


        </div>
    );
};

export default CategoryPost;


