import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";

const AllCategory = () => {
    const [category, setCategory] = useState()
    useEffect(() => {
        fetch('https://api-phitbook.vercel.app/category/all/')
            .then(response => response.json())
            .then(data => setCategory(data))

    }, [])
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-black dark:text-white">
            <div className="mb-2 p-4">
                <Typography variant="h5" className='dark:bg-black dark:text-white'>
                    Category
                </Typography>
            </div>
            <List>

                {
                    category && category.map((e, i) => (
                        <Link key={i} to={`/category/${e.name}`}>

                            {/* <Chip variant="ghost" value={e.name} /> */}
                            <ListItem className='dark:bg-black dark:text-white dark:hover:bg-blue-gray-700/90'>
                                <ListItemPrefix>
                                </ListItemPrefix>
                                {e.name}
                            </ListItem>
                        </Link>
                    ))
                }

            </List>
        </Card>
    );
};

export default AllCategory;