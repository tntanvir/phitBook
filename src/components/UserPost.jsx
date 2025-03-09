// import React from 'react';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const UserPost = ({ id }) => {
//     const [main, setMain] = useState([])

//     useEffect(() => {

//         const fetchUser = async () => {
//             try {
//                 const res1 = await fetch(`https://api-phitbook.vercel.app/authore/user/${id}/`);
//                 const userData = await res1.json();

//                 const res2 = await fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`);
//                 const userMoreData = await res2.json();
//                 const combinedData = { ...userData, ...userMoreData };



//                 setMain(combinedData);

//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchUser();
//     }, []);

//     return (
//         <div>

//             {main &&
//                 <Link to={`/profile/${main.username}`}>
//                     <div className='flex gap-3'>

//                         <div className='border border-primary  h-10 flex justify-center  w-10 overflow-hidden rounded-full '>


//                             <img src={main.image} alt="" className='flex justify-center items-center' loading='lazy' />
//                         </div>
//                         <div>

//                             <h1>{main.username}</h1>
//                             <p>{main.email}</p>
//                         </div>
//                     </div>
//                 </Link>

//             }
//         </div>
//     );
// };

// export default UserPost;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserPost = ({ id }) => {
    const [main, setMain] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res1 = await fetch(`https://api-phitbook.vercel.app/authore/user/${id}/`);
                const userData = await res1.json();

                const res2 = await fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`);
                const userMoreData = await res2.json();

                const combinedData = { ...userData, ...userMoreData };
                setMain(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    return (
        <div>
            {loading ? (
                // Skeleton Loader
                <div className="flex gap-3 animate-pulse ">
                    <div className="border border-primary h-10 w-10 overflow-hidden rounded-full bg-gray-300"></div>
                    <div>
                        <div className="h-3 w-24 bg-gray-300 rounded mb-1"></div>
                        <div className="h-2 w-32 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ) : (
                main && (
                    <Link to={`/profile/${main.username}`}>
                        <div className="flex gap-3">
                            <div className="border border-primary h-10 w-10 overflow-hidden rounded-full">
                                <img src={main.image} alt="" className="flex justify-center items-center" loading="lazy" />
                            </div>
                            <div>
                                <h1>{main.username}</h1>
                                <p>{main.email}</p>
                            </div>
                        </div>
                    </Link>
                )
            )}
        </div>
    );
};

export default UserPost;
