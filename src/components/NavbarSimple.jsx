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
import { useContext } from "react";
import { MyContext } from "../App";
import { MdDarkMode, MdHome } from "react-icons/md";
import { Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { RxVideo } from "react-icons/rx";
import { SlUserFollowing } from "react-icons/sl";
function NavList() {
    const [userid, setUserid] = useState('')
    const { state, setState } = useContext(MyContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        setUserid(id)
        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                // console.log(data);

            })

    }, [state])




    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium flex md:hidden"
            >
                <Link to='/' className="flex items-center hover:text-blue-500 transition-colors md:hidden ">
                    home
                </Link>
                <Link to='/' className="hidden md:flex items-center hover:text-blue-500 transition-colors">
                    <MdHome className="text-2xl " />
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                {data && <Link to='/dashboard' className="flex items-center hover:text-blue-500 transition-colors">
                    <Avatar src={data?.image} alt="avatar" size="sm" className="border border-primary shadow-xl shadow-green-900/20 ring-4 ring-blue-100"
                    />
                </Link>}
            </Typography>



            {data === null &&



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
    const [userid, setUserid] = useState('')

    const { state, setState } = useContext(MyContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        const id = sessionStorage.getItem('id')
        setUserid(id)
        fetch(`https://api-phitbook.vercel.app/authore/usermore/?user_id=${id}`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                // console.log(data);

            })

    }, [state])
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);
    const navigate = useNavigate();

    const [stext, setStext] = useState('')
    const handleSearch = () => {
        navigate(`/profile/${stext}`)
        setStext('')

    }

    //them
    const [them, setThem] = useState(null);
    const [gThem, setGThem] = useContext(MyContext);
    useEffect(() => {

        if (localStorage.getItem("them")) {
            setThem(localStorage.getItem("them"));
            setGThem(localStorage.getItem("them"));

        }

        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThem('dark');
            setGThem('dark');

        }
        else {
            setThem('light');
            setGThem('light');
        }
    }, [])

    useEffect(() => {
        if (them == "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }
        them != null && localStorage.setItem("them", them);
    }, [them]);
    const mode = () => {
        setThem(them === "dark" ? "light" : "dark");
        setGThem(them === "dark" ? "light" : "dark");
        localStorage.setItem("them", them);
    }

    return (
        <Navbar className="mx-auto max-w-screen px-6 py-3 rounded-none shadow-none blur-none sticky top-0 z-50 dark:bg-black border-t-0 border-l-0 border-r-0 border-b dark:border-gray-50/10 border-gray-300/50 ">
            <div className="flex items-center justify-between text-blue-gray-900">
                <div className="flex gap-3 justify-center items-center">
                    <Link to='/'

                        className="mr-4 cursor-pointer py-1.5 text-2xl font-bold w-10 h-10 bg-primary text-white text-center rounded-full"
                    >
                        P
                    </Link>
                    <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2  gap-3 dark:bg-[#3a3b3c] dark:text-white">
                        <div className="flex items-center w-full pr-2">
                            <svg
                                className="w-5 h-5 text-gray-500 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 16l-2 2m10-10a6 6 0 11-8 8 6 6 0 018-8z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search by username"
                                className="bg-transparent outline-none text-sm w-full "
                                value={stext}
                                onChange={(e) => setStext(e.target.value)}
                            />
                        </div>
                        <div
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white w-7 h-7 rounded-full flex items-center justify-center cursor-pointer" onClick={() => handleSearch()}
                        >
                            <svg
                                className="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 16l-2 2m10-10a6 6 0 11-8 8 6 6 0 018-8z"
                                />
                            </svg>
                        </div>

                    </div>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium hidden md:flex"
                    >
                        <Link to='/' className="flex items-center hover:text-blue-500 transition-colors md:hidden ">
                            home
                        </Link>
                        <Link to='/' className="hidden md:flex items-center hover:text-blue-500 dark:hover:text-blue-500 transition-colors dark:text-gray-200">
                            <MdHome className="text-3xl " />
                        </Link>

                    </Typography>
                    {data && <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium hidden md:flex"
                    >
                        <Link to='/followingpost' className="flex items-center hover:text-blue-500 transition-colors md:hidden ">
                            FollowPost
                        </Link>
                        <Link to='/followingpost' className="hidden md:flex items-center hover:text-blue-500 dark:hover:text-blue-500 transition-colors dark:text-gray-200">
                            <SlUserFollowing className="text-3xl " />
                        </Link>

                    </Typography>}
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium hidden md:flex"
                    >
                        <Link to='/video' className="flex items-center hover:text-blue-500 transition-colors md:hidden ">
                            video
                        </Link>
                        <Link to='/video' className="hidden md:flex items-center hover:text-blue-500 dark:hover:text-blue-500 transition-colors dark:text-gray-200">
                            <RxVideo className="text-3xl " />
                        </Link>

                    </Typography>

                </div>
                <div className="hidden lg:flex justify-center items-center gap-3">
                    <div className='text-3xl cursor-pointer'>
                        {
                            them === "dark" ?
                                <CiLight onClick={() => mode()} />
                                :
                                <MdDarkMode onClick={() => mode()} />
                        }
                    </div>
                    <NavList />
                </div>
                <div className="lg:hidden flex">
                    <div className='text-3xl cursor-pointer '>
                        {
                            them === "dark" ?
                                <CiLight onClick={() => mode()} />
                                :
                                <MdDarkMode onClick={() => mode()} />
                        }
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

            </div>
            <Collapse open={openNav}>

                <NavList />
            </Collapse>
        </Navbar>
    );
}