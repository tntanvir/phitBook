import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { RiUserUnfollowFill } from "react-icons/ri";
import { Tooltip } from '@material-tailwind/react';

const FollowStatasIcon = ({ username }) => {
    const [followBool, setFollowBool] = useState(false);

    const handleFollow = async () => {
        try {
            const response = await fetch(`https://api-phitbook.vercel.app/authore/user/${username}/follow/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setFollowBool(!followBool)
            } else {
                toast.error(data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })

            }
        } catch (error) {
            console.error('Error following user:', error);

        }
    };


    useEffect(() => {
        const followStatus = () => {
            fetch(`https://api-phitbook.vercel.app/authore/user/${username}/follow-status/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem('token')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setFollowBool(data.is_following)
                })

        }
        followStatus()
    }, [username])
    return (
        <div className=''>
            {followBool ?


                <RiUserUnfollowFill onClick={handleFollow} className='w-full rounded-none text-2xl hover:cursor-pointer' title='unfollow' />

                :

                <MdPersonAddAlt1 onClick={handleFollow} className='w-full rounded-none text-2xl hover:cursor-pointer' title='follow' />

            }



        </div>


    );
};

export default FollowStatasIcon;