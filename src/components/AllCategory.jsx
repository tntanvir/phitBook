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
        fetch('https://api-phitbook.onrender.com/category/all/')
            .then(response => response.json())
            .then(data => setCategory(data))

    }, [])
    return (
        // <div>
        //     <div className=' flex flex-col bg-red-500 gap-4 flex-wrap '>

        //         {
        //             category && category.map((e, i) => (
        //                 <Link key={i} to={`/category/${e.name}`}>

        //                     <Chip variant="ghost" value={e.name} />
        //                 </Link>
        //             ))
        //         }
        //     </div>
        // </div>
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Category
                </Typography>
            </div>
            <List>

                {
                    category && category.map((e, i) => (
                        <Link key={i} to={`/category/${e.name}`}>

                            {/* <Chip variant="ghost" value={e.name} /> */}
                            <ListItem>
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