

import React, { useEffect, useState } from "react";

const HomeProfile = () => {
    const [usermore, setUsermore] = useState(null);
    const [nextdata, setNextdata] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading

    useEffect(() => {
        const id = sessionStorage.getItem("id");

        // First fetch for usermore data
        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUsermore(data);
            });
    }, []);

    useEffect(() => {
        if (!usermore) return;

        const id = sessionStorage.getItem("id");

        // Second fetch for user data
        fetch(`https://api-phitbook.vercel.app/authore/user/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setNextdata({ ...data, usermore });
                setLoading(false); // Stop loading once data is fetched
            });
    }, [usermore]);

    return (
        <div className="bg-gray-200/50 dark:bg-transparent dark:border-x dark:border-b dark:border-gray-50/50 dark:text-gray-300 w-full">
            <div className="flex justify-center flex-col items-center gap-1">
                {/* Profile Image Skeleton */}
                <div className="border-4 border-primary h-48 w-48 flex justify-center items-center overflow-hidden rounded-full">
                    {loading ? (
                        <div className="h-full w-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                    ) : (
                        <img
                            src={nextdata?.usermore?.image}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Name & Info Skeleton */}
                {loading ? (
                    <div className="flex flex-col items-center gap-2 mt-4">
                        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                ) : (
                    <>
                        <h1>{nextdata?.username}</h1>
                        <h1>
                            {nextdata?.first_name} {nextdata?.last_name}
                        </h1>
                        <h1>{nextdata?.email}</h1>
                        <h1>{nextdata?.usermore?.location}</h1>
                        <h1>{nextdata?.usermore?.phone_number}</h1>
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeProfile;

