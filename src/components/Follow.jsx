// import React from 'react';
// import {
//     Button,
//     Dialog,
//     DialogHeader,
//     DialogBody,
//     DialogFooter,
// } from "@material-tailwind/react";
// import { useState } from 'react';
// import { Avatar } from '@material-tailwind/react';
// import { Bounce, toast } from 'react-toastify';

// const Follow = ({ data, following, followers }) => {

//     const [openFollowing, setOpenFollowing] = useState(false);
//     const [openFollowers, setOpenFollowers] = useState(false);


//     const handleOpenFollowing = () => setOpenFollowing(!openFollowing);
//     const handleOpenFollowers = () => setOpenFollowers(!openFollowers);


//     //follow

//     const [followBool, setFollowBool] = useState('')

//     const handleFollow = async (username) => {
//         console.log(username);
//         try {
//             const response = await fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow/`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Token ${sessionStorage.getItem('token')}`,
//                 },
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 toast.success(data.message, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     transition: Bounce,
//                 })
//                 setFollowBool(!followBool)
//             } else {
//                 toast.error(data.error, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     transition: Bounce,
//                 })

//             }
//         } catch (error) {
//             console.error('Error following user:', error);

//         }
//     };
//     // useEffect(() => {
//     //     const followStatus = () => {

//     //         fetch(`https://api-phitbook.onrender.com/authore/user/${username}/follow-status/`, {
//     //             method: 'GET',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Token ${sessionStorage.getItem('token')}`,
//     //             },
//     //         })
//     //             .then(res => res.json())
//     //             .then(data => {
//     //                 console.log(data)
//     //                 setFollowBool(data.is_following)
//     //             })

//     //     }
//     //     followStatus()
//     // }, [username])
//     const followStatus = (username) => {
//         console.log(username);
//         let status = null;

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
//                 // setFollowBool(data.is_following)
//                 status = data.is_following
//                 return status
//             })

//         return status


//     }


//     return (
//         <div className='flex gap-10'>

//             {
//                 followers && console.log(followers)
//             }

//             {data && <h1 className='flex gap-2 justify-center items-center'><p className='font-bold text-xl'>{data.length}</p> Posts</h1>}
//             {following && <h1 onClick={handleOpenFollowing} className='flex gap-2 justify-center items-center hover:cursor-pointer'><p className='font-bold text-xl'>{following.length}</p> Following</h1>}
//             {followers && <h1 onClick={handleOpenFollowers} className='flex gap-2 justify-center items-center hover:cursor-pointer'><p className='font-bold text-xl'>{followers.length} </p> Followers</h1>}


//             <>

//                 <Dialog open={openFollowing} handler={handleOpenFollowing} size='xs'>
//                     <DialogHeader>Following</DialogHeader>
//                     <DialogBody>
//                         {/* You can display following users here */}
//                         {following && following.map((user, index) => (
//                             <p key={index}>{user.name}</p>
//                         ))}
//                     </DialogBody>
//                     <DialogFooter>
//                         <Button
//                             variant="text"
//                             color="red"
//                             onClick={handleOpenFollowing}
//                             className="mr-1"
//                         >
//                             <span>Cancel</span>
//                         </Button>
//                     </DialogFooter>
//                 </Dialog>

//                 {/* Followers Dialog */}
//                 <Dialog open={openFollowers} handler={handleOpenFollowers} size='xs'>
//                     <DialogHeader>Followers</DialogHeader>
//                     <DialogBody>

//                         {followers && followers.map((user, index) => (
//                             <div key={index} className='flex justify-between'>
//                                 <div className='flex gap-3'>
//                                     <div>

//                                         <Avatar src={user?.follower?.image} />
//                                     </div>
//                                     <div>

//                                         <p>{user?.follower?.username}</p>
//                                         <p>{user?.follower?.first_name} {user?.follower?.last_name}</p>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     {followStatus(user?.follower?.username) ? <Button size='sm' onClick={() => handleFollow(user?.follower?.username)}>unfollow</Button> : <Button size='sm' onClick={() => handleFollow(user?.follower?.username)}>follow</Button>}
//                                 </div>
//                             </div>
//                         ))}
//                     </DialogBody>
//                     <DialogFooter>
//                         <Button
//                             variant="text"
//                             color="red"
//                             onClick={handleOpenFollowers}
//                             className="mr-1"
//                         >
//                             <span>Cancel</span>
//                         </Button>
//                     </DialogFooter>
//                 </Dialog>
//             </>
//         </div>
//     );
// };

// export default Follow;




import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar
} from "@material-tailwind/react";
import { Bounce, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Follow = ({ data, following, followers }) => {

    // console.log("follow", data);

    const [openFollowing, setOpenFollowing] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [followStatusMap, setFollowStatusMap] = useState({}); // Store follow statuses of each follower

    const handleOpenFollowing = () => setOpenFollowing(!openFollowing);
    const handleOpenFollowers = () => setOpenFollowers(!openFollowers);

    const handleFollow = async (username) => {
        // console.log(username);
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
                });
                setFollowStatusMap(prev => ({
                    ...prev,
                    [username]: !followStatusMap[username] // Toggle follow status
                }));
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
                });
            }
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    useEffect(() => {
        // When the followers dialog is opened, fetch follow status for each follower
        if (openFollowers && followers) {
            const fetchFollowStatus = async () => {
                const statuses = {};
                for (const user of followers) {
                    try {
                        const response = await fetch(`https://api-phitbook.onrender.com/authore/user/${user?.follower?.username}/follow-status/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${sessionStorage.getItem('token')}`,
                            },
                        });
                        const data = await response.json();
                        statuses[user?.follower?.username] = data.is_following;
                    } catch (error) {
                        console.error('Error fetching follow status:', error);
                    }
                }
                setFollowStatusMap(statuses); // Store all follow statuses
            };

            fetchFollowStatus();
        }
    }, [openFollowers, followers]);

    return (
        <div className='flex gap-10'>
            {data && <h1 className='flex gap-2 justify-center items-center'><p className='font-bold text-xl'>{data.length}</p> Posts</h1>}
            {following && (
                <h1 onClick={handleOpenFollowing} className='flex gap-2 justify-center items-center hover:cursor-pointer'>
                    <p className='font-bold text-xl'>{following.length}</p> Following
                </h1>
            )}
            {followers && (
                <h1 onClick={handleOpenFollowers} className='flex gap-2 justify-center items-center hover:cursor-pointer'>
                    <p className='font-bold text-xl'>{followers.length} </p> Followers
                </h1>
            )}

            {/* Following Dialog */}
            <Dialog open={openFollowing} handler={handleOpenFollowing} size='xs'>
                <DialogHeader>Following</DialogHeader>
                <DialogBody>
                    {following && following.map((user, index) => (
                        <div key={index} className='flex justify-between'>
                            <Link to={'/profile/' + user?.following?.username}>
                                <div className='flex gap-3'>
                                    <Avatar src={user?.following?.image} />
                                    <div>
                                        <p>{user?.following?.username}</p>
                                        <p>{user?.following?.first_name} {user?.following?.last_name}</p>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                {followStatusMap[user?.following?.username] ? (
                                    <Button size='sm' onClick={() => handleFollow(user?.following?.username)}>Unfollow</Button>
                                ) : (
                                    <Button size='sm' onClick={() => handleFollow(user?.following?.username)}>Follow</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpenFollowing} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Followers Dialog */}
            <Dialog open={openFollowers} handler={handleOpenFollowers} size='xs'>
                <DialogHeader>Followers</DialogHeader>
                <DialogBody>
                    {followers && followers.map((user, index) => (
                        <div key={index} className='flex justify-between'>
                            <Link to={'/profile/' + user?.follower?.username}>
                                <div className='flex gap-3'>
                                    <Avatar src={user?.follower?.image} />
                                    <div>
                                        <p>{user?.follower?.username}</p>
                                        <p>{user?.follower?.first_name} {user?.follower?.last_name}</p>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                {followStatusMap[user?.follower?.username] ? (
                                    <Button size='sm' onClick={() => handleFollow(user?.follower?.username)}>Unfollow</Button>
                                ) : (
                                    <Button size='sm' onClick={() => handleFollow(user?.follower?.username)}>Follow</Button>
                                )}
                            </div>
                        </div>
                    ))}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpenFollowers} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Follow;
