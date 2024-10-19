import { useState, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';
import { MultiLevelSidebar } from './MultiLevelSidebar';
import FollowStatas from './FollowStatas';
import { Link } from 'react-router-dom';

const AllUser = () => {
    const [userData, setUserData] = useState([]);
    const [usermoreData, setUsermoreData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {

        // Fetch both APIs concurrently
        const fetchUserAndMore = async () => {
            try {
                const [userResponse, usermoreResponse] = await Promise.all([
                    fetch(`https://api-phitbook.vercel.app/authore/user/`),  // Get all users
                    fetch(`https://api-phitbook.vercel.app/authore/usermore/`)  // Get additional user info
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





    return (
        <div className='min-h-screen dark:bg-black bg-white pt-3 dark:text-white'>
            <div className='flex'>
                <div className=''>
                    <MultiLevelSidebar />
                </div>
                <div className='flex flex-wrap gap-3 justify-center w-full'>
                    {combinedData.map((user) => (
                        <div key={user.id} className='w-1/4 min-h-52  '>
                            <div className='border-2 border-gray-300 rounded-md overflow-hidden h-full flex flex-col justify-between'>
                                <Link to={`/profile/${user.username}`}>

                                    <div className='min-h-52 max-h-52 overflow-hidden '>
                                        {user.image ? <img
                                            src={user.image}
                                            alt={user.username}
                                            className='w-full h-full object-cover rounded-t-md'
                                            onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010'}
                                        /> :

                                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010" alt="not load" />
                                        }
                                    </div>
                                    <div className='p-2 text-center'>
                                        <h3 className='text-lg font-semibold'>{user.username}</h3>
                                        <p className='text-sm text-gray-600'>{user.location}</p>
                                    </div>
                                </Link>
                                <div className='text-center '>
                                    <FollowStatas username={user.username} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
};

export default AllUser; 