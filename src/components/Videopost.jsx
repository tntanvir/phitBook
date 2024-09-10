import { useState, useEffect } from 'react';
import Postcard from './Postcard';
import { MultiLevelSidebar } from './MultiLevelSidebar';
import HomeProfile from './HomeProfile';
import { Link } from 'react-router-dom';
import { MdPhotoLibrary } from 'react-icons/md';
import { Avatar } from '@material-tailwind/react';
import UserSuggest from './UserSuggest';


const Videopost = () => {
    const [video, setvideo] = useState(null)
    const [datareload, setDatareload] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        fetch(`https://api-phitbook.onrender.com/post/allpost/?image_null=true&video_not_null=true`)
            .then(res => res.json())
            .then(data => setvideo(data))
    }, [datareload])
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);
    useEffect(() => {
        const id = sessionStorage.getItem('id');
        setId(id);

        fetch(`https://api-phitbook.onrender.com/authore/usermore/?user_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setUser(data)
                // console.log(data);

            })

    }, [])





    return (
        <div className='min-h-screen flex justify-between dark:bg-black bg-white '>
            <div>
                <MultiLevelSidebar />
            </div>
            <div className='flex flex-col items-center w-full ' >
                <div className='hide-scrollbar h-screen  w-fit pb-20'>

                    <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
                    {sessionStorage.getItem('id') && <div className='bg-gray-200/50 rounded-md p-4 dark:bg-transparent dark:border dark:border-gray-500/50 ' onClick={handleOpen}>


                        <div className='flex gap-3  items-center '>
                            <div className='w-1/12' >
                                <Link to='/dashboard'>
                                    <Avatar src={user?.image} alt="avatar" size="sm" className="border border-primary" />
                                </Link>
                            </div>


                            <input type="text" placeholder={`what's on your mind!`} className='w-full rounded-full placeholder:pl-5 outline-none p-2 dark:bg-[#3a3b3c]' />
                            <MdPhotoLibrary className='text-4xl text-primary' />
                        </div>
                    </div>}

                    {
                        video && <Postcard post={video} datareload={datareload} setDatareload={setDatareload} />
                    }

                </div>

            </div>

            <div className='w-full'>
                <HomeProfile />
                {id && <UserSuggest />}
            </div>

        </div>
    );
};

export default Videopost;