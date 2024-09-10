import { Button } from '@material-tailwind/react';
import React from 'react';
import { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';

const FollowStatas = ({ username }) => {
    const [followBool, setFollowBool] = useState(false);

    const handleFollow = async () => {
        try {
            const response = await fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow/`, {
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
            fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow-status/`, {
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
        <div className='w-full'>
            {followBool ? <Button disabled={username === 'tntanvir' ? true : false} onClick={handleFollow} className='w-full rounded-none bg-primary'>unfollow</Button> :
                <Button disabled={username === 'tntanvir' ? true : false} onClick={handleFollow} className='w-full rounded-none bg-primary'>follow</Button>}
        </div>
    );
};

export default FollowStatas;