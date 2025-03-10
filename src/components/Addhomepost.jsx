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
import { useContext } from "react";
import { MyContext } from "../App";
import { Checkbox } from "@material-tailwind/react";
import YouTubeVideo from "./YouTubeVideo";


const Addhomepost = () => {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [discription, setDiscription] = useState('')
    const [category, setCategory] = useState('')
    const [option, setOption] = useState([])

    const [videobool, setVideobool] = useState(true)
    const [videourl, setVideourl] = useState(null)



    const navigate = useNavigate()


    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/category/all/')
            .then(res => res.json())
            .then(data => {
                const formattedOptions = data.map(c => ({ value: c.id, label: c.name }));
                setOption(formattedOptions);
            })
            .catch(err => console.log(err));
    }, []);


    const imgtoUrl = async (e) => {
        e.preventDefault();

        if (videobool) {

            try {
                const formData = new FormData();
                formData.append('image', image);

                const res = await axios.post('https://api.imgbb.com/1/upload?key=526182029130a23070675bf11635fe8f', formData);

                if (res.data.data.url) {


                    if (res.data.data.url) {
                        const formData = new FormData();
                        formData.append('image', res.data.data.url);
                        formData.append('title', title);
                        formData.append('user', sessionStorage.getItem('id'));
                        formData.append('discription', discription);
                        category.forEach(catId => formData.append('category', catId));

                        // formData.forEach((value, key) => {
                        //     console.log(`${key}: ${value}`);
                        // });

                        const response = await fetch('https://api-phitbook.vercel.app/post/allpost/', {
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
                            // console.log(data);
                            navigate(`/profile/${sessionStorage.getItem('username')}`)
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        else {
            const formData = new FormData();
            formData.append('video', videourl);
            formData.append('title', title);
            formData.append('user', sessionStorage.getItem('id'));
            formData.append('discription', discription);
            category.forEach(catId => formData.append('category', catId));

            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });

            const response = await fetch('https://api-phitbook.vercel.app/post/allpost/', {
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
                // console.log(data);
                navigate(`/profile/${sessionStorage.getItem('username')}`)
            }
        }
    };

    const [opendawer, setOpendower] = useState(false);

    const openDrawer = () => setOpendower(true);
    const closeDrawer = () => setOpendower(false);

    const [gThem, setGThem] = useContext(MyContext);

    return (
        <div className='w-full flex min-h-screen dark:bg-black dark:text-white'>

            {/* <div className='hidden md:block w-1/5 border-r'>

                <Layout />
            </div> */}
            <div className='w-full '>

                <div className="flex justify-center items-center ">
                    <Card className='w-full p-2 shadow-none  rounded-none  dark:bg-[#3a3b3c] dark:text-white'>


                        <form className="mt-8 mb-2 w-full p-2" onSubmit={imgtoUrl}>
                            <div className="mb-1 flex flex-col gap-6">
                                <Checkbox label="Add youtube url" onClick={() => setVideobool(!videobool)} />
                                {videobool ?

                                    <div>
                                        <Typography variant="h6" className="mb-3">
                                            Image
                                        </Typography>

                                        {image ? (<div>
                                            {
                                                <img src={URL.createObjectURL(image)} alt="post img" className="w-full h-64 object-cover" />
                                            }

                                        </div>) :
                                            (<Input
                                                size="lg"
                                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                                type='file'
                                                required
                                                labelProps={{
                                                    className: "before:content-none after:content-none",
                                                }}
                                                onChange={(e) => setImage(e.target.files[0])}
                                            />)

                                        }
                                    </div>
                                    :
                                    <div>
                                        <Typography variant="h6" className="mb-3">
                                            Video URL
                                        </Typography>
                                        <Input
                                            size="lg"
                                            placeholder="Enter Video URL"
                                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 dark:text-white"
                                            required
                                            labelProps={{
                                                className: "before:content-none after:content-none",
                                            }}
                                            onChange={(e) => setVideourl(e.target.value)}
                                        />

                                        <div className="pt-2">
                                            {
                                                videourl && <YouTubeVideo videoUrl={videourl} />
                                            }
                                        </div>
                                    </div>
                                }


                                <Typography variant="h6" className="-mb-3">
                                    Category
                                </Typography>

                                <MultiSelect
                                    option={option}
                                    selectedOptions={category}
                                    setSelectedOptions={setCategory}
                                    isDarkMode={gThem === "dark" ? true : false}
                                />


                                <Typography variant="h6" className="-mb-3">
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
                                <Typography variant="h6" className="-mb-3">
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

            </div>
        </div>
    );
};

export default Addhomepost;


