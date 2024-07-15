import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const UserPost = ({ id }) => {
    const [main, setMain] = useState([])

    useEffect(() => {
        // const id = sessionStorage.getItem('id');
        // console.log(id);
        const fetchUser = async () => {
            try {
                const res1 = await fetch(`https://api-phitbook.onrender.com/authore/user/${id}/`);
                const userData = await res1.json();

                const res2 = await fetch(`https://api-phitbook.onrender.com/authore/usermore/?user_id=${id}`);
                const userMoreData = await res2.json();
                const combinedData = { ...userData, ...userMoreData };



                setMain(combinedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>

            {main &&
                <div className='flex gap-3'>


                    <div className='border border-primary  h-10 flex justify-center  w-10 overflow-hidden rounded-full '>


                        <img src={main.image} alt="" className='flex justify-center items-center' />
                    </div>
                    <div>

                        <h1>{main.username}</h1>
                        <p>{main.email}</p>
                    </div>

                </div>

            }
        </div>
    );
};

export default UserPost;