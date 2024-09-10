import { Avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { Bounce, toast } from 'react-toastify';
import FollowStatasIcon from './FollowStatasIcon';
import { Link } from 'react-router-dom';


const UserSuggest = () => {
    const [userData, setUserData] = useState([]);
    const [usermoreData, setUsermoreData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const id = sessionStorage.getItem('id');

        // Fetch both APIs concurrently
        const fetchUserAndMore = async () => {
            try {
                const [userResponse, usermoreResponse] = await Promise.all([
                    fetch(`https://api-phitbook.onrender.com/authore/user/`),  // Get all users
                    fetch(`https://api-phitbook.onrender.com/authore/usermore/`)  // Get additional user info
                ]);

                const userData = await userResponse.json();
                const usermoreData = await usermoreResponse.json();

                // Set states with the responses
                setUserData(userData);
                setUsermoreData(usermoreData);

                // Merge user and usermore data
                const mergedData = userData.map(user => {
                    const usermore = usermoreData.find(u => u.user === user.id);
                    return {
                        ...user,
                        ...usermore // Merging data if usermore exists
                    };
                });

                setCombinedData(mergedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserAndMore();
    }, []);



    const [followBool, setFollowBool] = useState('')

    const handleFollow = async (username) => {
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



    // useEffect(() => {
    //     const followStatus = () => {

    //         fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow-status/`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${sessionStorage.getItem('token')}`,
    //             },
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data)
    //                 setFollowBool(data.is_following)
    //             })

    //     }
    //     followStatus()
    // }, [username])

    return (
        <div className='dark:text-white'>
            <Link to='explore'>
                <h1 className='text-end text-primary py-2'>All Exploror</h1>
            </Link>
            <div className='dark:text-white  max-h-60 hide-scrollbar'>
                {combinedData.length > 0 ? (
                    combinedData.map((user, index) => (
                        <div key={index} className="p-4 border-b flex justify-between">
                            <div className='flex gap-5'>
                                <div>

                                    <Avatar src={user.image} alt={user.username} />
                                </div>
                                <div>
                                    <p>{user.username}</p>
                                    <p>{user.email}</p>

                                </div>
                            </div>
                            <div>

                                <FollowStatasIcon username={user?.username} />
                            </div>

                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default UserSuggest;
