import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdMenu } from "react-icons/io";
import { CgCloseO } from "react-icons/cg";
function NavList() {
    const [userid, setUserid] = useState('')

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        setUserid(id)
    }, [])

    const singout = () => {
        fetch('https://api-phitbook.onrender.com/authore/logout/')
            .then(res => {
                sessionStorage.removeItem('id');
                sessionStorage.removeItem('token');
                window.location.href = '/singin'

            })
    }
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to='/' className="flex items-center hover:text-blue-500 transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                {userid && <Link to='/dashboard' className="flex items-center hover:text-blue-500 transition-colors">
                    Dashboard
                </Link>}
            </Typography>

            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to='/' className="flex items-center hover:text-blue-500 transition-colors">
                    Docs
                </Link>
            </Typography>

            {userid ?

                <Button onClick={singout} size="sm" className="bg-primary">Singout</Button>

                :
                <>
                    <Link to='/singin'>
                        <Button size="sm" className="bg-primary">Singin</Button>
                    </Link>
                    <Link to='/singup'>
                        <Button size="sm" className="bg-primary">Singup</Button>
                    </Link>
                </>

            }
        </ul>
    );
}

export function NavbarSimple() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen px-6 py-3 rounded-none shadow-none blur-none sticky top-0 z-50">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to='/'

                    className="mr-4 cursor-pointer py-1.5 text-2xl font-bold"
                >
                    Phi<span className="text-[#3da9fc]">Book</span>
                </Link>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        // <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        <CgCloseO className="font-bold text-2xl" />

                    ) : (
                        // <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        <IoMdMenu className="font-bold text-2xl" />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}