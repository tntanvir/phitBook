import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => {

    const Pages = [
        {
            path: '/dashboard',
            text: 'Dashboard',
        },
        {
            path: '/dashboard/mypost',
            text: 'My Post',
        },
        {
            path: '/dashboard/addpost',
            text: 'Add Post'
        },
        {
            path: '/dashboard/addCategory',
            text: 'Add Category'
        },



    ]

    return (
        <div className='min-h-screen '>
            <div className='flex flex-col gap-1 p-1'>
                {Pages.map((page, index) => (
                    <Link key={index} to={page.path} className='text-gray-800 hover:text-gray-700 '>
                        <div className='bg-gray-100 p-2 rounded-md hover:bg-blue-100 hover:text-black '>

                            {page.text}

                        </div>
                    </Link>
                ))}
            </div>
        </div>




    );
};

export default Layout;