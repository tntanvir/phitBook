// import { Avatar } from '@material-tailwind/react';
// import React, { useEffect, useState } from 'react';
// import { Bounce, toast } from 'react-toastify';
// import FollowStatasIcon from './FollowStatasIcon';
// import { Link } from 'react-router-dom';

// const UserSuggest = () => {
//     const [userData, setUserData] = useState([]);
//     const [usermoreData, setUsermoreData] = useState([]);
//     const [combinedData, setCombinedData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserAndMore = async () => {
//             try {
//                 const [userResponse, usermoreResponse] = await Promise.all([
//                     fetch(`https://api-phitbook.vercel.app/authore/user/`),
//                     fetch(`https://api-phitbook.vercel.app/authore/usermore/`)
//                 ]);

//                 const userData = await userResponse.json();
//                 const usermoreData = await usermoreResponse.json();

//                 setUserData(userData);
//                 setUsermoreData(usermoreData);

//                 const mergedData = userData.map(user => {
//                     const usermore = usermoreData.find(u => u.user === user.id);
//                     return {
//                         ...user,
//                         ...usermore
//                     };
//                 });

//                 setCombinedData(mergedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchUserAndMore();
//     }, []);

//     return (
//         <div className='dark:text-white'>
//             <Link to='/explore'>
//                 <h1 className='text-end text-primary py-2'>All Exploror</h1>
//             </Link>
//             <div className='dark:text-white max-h-60 hide-scrollbar'>
//                 {loading ? (
//                     Array.from({ length: 5 }).map((_, index) => (
//                         <div key={index} className="p-4 border-b flex justify-between animate-pulse w-32">
//                             <div className='flex gap-5'>
//                                 <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
//                                 <div>
//                                     <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
//                                     <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                                 </div>
//                             </div>
//                             <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
//                         </div>
//                     ))
//                 ) : (
//                     combinedData.map((user, index) => (
//                         <div key={index} className="p-4 border-b flex justify-between">
//                             <div className='flex gap-5'>
//                                 <Avatar src={user.image} alt={user.username} />
//                                 <div>
//                                     <p>{user.username}</p>
//                                     <p>{user.email}</p>
//                                 </div>
//                             </div>
//                             <FollowStatasIcon username={user?.username} />
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserSuggest;

import { Avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import FollowStatasIcon from './FollowStatasIcon';
import { Link } from 'react-router-dom';

const UserSuggest = () => {
    const [combinedData, setCombinedData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndMore = async () => {
            try {
                const [userResponse, usermoreResponse] = await Promise.all([
                    fetch(`https://api-phitbook.vercel.app/authore/user/`),
                    fetch(`https://api-phitbook.vercel.app/authore/usermore/`)
                ]);

                const userData = await userResponse.json();
                const usermoreData = await usermoreResponse.json();

                const mergedData = userData.map(user => {
                    const usermore = usermoreData.find(u => u.user === user.id);
                    return { ...user, ...usermore };
                });

                setCombinedData(mergedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndMore();
    }, []);

    return (
        <div className='dark:text-white'>
            <Link to='/explore'>
                <h1 className='text-end text-primary py-2'>All Exploror</h1>
            </Link>
            <div className='dark:text-white max-h-60 hide-scrollbar'>
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="p-4 border-b flex justify-between animate-pulse">
                            <div className='flex gap-4 items-center'>
                                <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div>
                                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                </div>
                            </div>
                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    ))
                ) : (
                    combinedData.length > 0 ? (
                        combinedData.map((user, index) => (
                            <div key={index} className="p-4 border-b flex justify-between">
                                <div className='flex gap-4 items-center'>
                                    <Avatar src={user.image} alt={user.username} />
                                    <div>
                                        <p>{user.username}</p>
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <FollowStatasIcon username={user?.username} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No users found.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default UserSuggest;
