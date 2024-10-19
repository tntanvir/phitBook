import React, { useEffect, useState } from 'react';

const HomeProfile = () => {

    const [usermore, setUsermore] = useState(null);

    useEffect(() => {
        const id = sessionStorage.getItem('id');

        // First fetch for usermore data
        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setUsermore(data);
            });
    }, []);

    const [nextdata, setNextdata] = useState(null);

    useEffect(() => {
        const id = sessionStorage.getItem('id');

        // Second fetch for user data
        fetch(`https://api-phitbook.vercel.app/authore/user/${id}/`)
            .then(response => response.json())
            .then(data => {

                // setUsermore(prevState => ({
                //     ...prevState,
                //     user: data,
                // }));
                setNextdata({ ...data, usermore });
            });
    }, [usermore]);

    return (
        <div>

            {
                nextdata?.usermore && <div className='bg-gray-200/50 dark:bg-transparent dark:border-x dark:border-b dark:border-gray-50/50 dark:text-gray-300 w-full'>
                    <div className=' flex justify-center flex-col items-center gap-1'>
                        <div className='border-4 border-primary h-48 w-48 flex justify-center items-center overflow-hidden rounded-full'>
                            <img src={nextdata?.usermore?.image} alt="" className='h-full w-full object-cover' loading='lazy' />
                        </div>
                        <h1>{nextdata?.username}</h1>
                        <h1>{nextdata?.first_name} {nextdata?.last_name}</h1>
                        <h1>{nextdata?.email}</h1>
                        <h1>{nextdata?.usermore?.location}</h1>
                        <h1>{usermore?.usermore?.phone_number}</h1>
                    </div>
                </div>
            }
        </div>
    );
};

export default HomeProfile;
