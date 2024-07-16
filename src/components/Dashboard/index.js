import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Link } from 'react-router-dom';

import { PiCity } from "react-icons/pi";
import { MdAccessTimeFilled, MdOutlineMail, MdWorkOutline, MdWork } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineSearch } from 'react-icons/ai'
import { FiPhoneCall } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import "./index.css"



const COLORS = ['#98D89E', '#F6DC7D', '#EE8484'];


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const piedata = [
    {
        count: 55,
        language: "Project 1",
    },
    {
        count: 31,
        language: "Project 2",
    },
    {
        count: 14,
        language: "Project 3",
    },
]

const Dashboard = () => {
    const history = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const profilePicture = "https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg"



    const handleLogout = () => {
        localStorage.removeItem('user');
        history('/login');
    };



    return (
        <div className="app-cont">
            {user ? (<>
                <div className="count-list">
                    <div className='top-sec'>
                        <h1 className="sidebar-head">Syoft<span className="title"></span></h1>
                        <ul className="sidebarOptionsList">

                            <li className="sidebarOptionCont active">
                                <FaRegUserCircle size="20" />
                                <p className="optionName">{user.user_firstname.split(" ")[0]}</p>
                            </li>

                            <li className="sidebarOptionCont">
                                <MdWorkOutline size="20" />
                                <p className="optionName">SDE-1</p>
                            </li>

                            <li className="sidebarOptionCont">
                                <MdOutlineMail size="20" />
                                <p className="optionName">{user.user_email}</p>
                            </li>

                            <li className="sidebarOptionCont">
                                <FiPhoneCall size="20" />
                                <p className="optionName">{user.user_phone}</p>
                            </li>

                            <li className="sidebarOptionCont">
                                <PiCity size="20" />
                                <p className="optionName">{user.user_city}</p>
                            </li>



                        </ul>


                    </div>


                    <div className="sidebarBottomCont">
                        <div className="sidebarOptionCont">
                            <IoSettingsOutline size="20" />
                            <p className="optionName">Settings</p>
                        </div>

                    </div>
                </div>

                <div className="count-cont">

                    <nav className="nav-cont">
                        <h1>Welcome, {user.user_firstname}!</h1>
                        <div className="nav-details">

                            <div className='searchInputCont'>
                                <input className='searchInput'
                                    type="search"
                                    placeholder="Search"
                                />
                                <button className='searchBtn'
                                    type="button"
                                >
                                    <AiOutlineSearch size="20" />
                                </button>
                            </div>
                            <img alt="proimg" className='pro-img' src={profilePicture} />
                            <button className="logout-button" onClick={handleLogout}>Log Out</button>

                        </div>
                    </nav>


                    <ul className="cards-list">
                        <li className="card-item c1">
                            <MdAccessTimeFilled className="card-icon" size={25} />
                            <p className="card-head">Hours Worked</p>
                            <p className="card-amt">52 hr/week</p>
                        </li>


                        <li className="card-item c2">
                            <MdWork className="card-icon" size={25} />
                            <p className="card-head">Total Projects</p>
                            <p className="card-amt">20</p>
                        </li>



                        <li className="card-item c3">
                            <SiGooglemeet className="card-icon" size={25} />
                            <p className="card-head">Total Meetings</p>
                            <p className="card-amt">41</p>
                        </li>



                        <li className="card-item c4">
                            <FaSignOutAlt className="card-icon" size={25} />
                            <p className="card-head">Total Leaves</p>
                            <p className="card-amt">10</p>
                        </li>
                    </ul>

                    {/* <div className='act-cont'>
                    <h1 className='act-head'>Activities</h1>
                    <p className='act-date'>May-June 2021</p>


                </div> */}



                    <div className='bot'>

                        <div className='pie'>
                            <div className='pie-head'>
                                <h1 className='pie-title'>Projects-Status</h1>
                                <p className='pie-date'>July 2024</p>
                            </div>
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart width="100%">
                                    <Pie
                                        cx="50%"
                                        cy="50%"
                                        data={piedata}
                                        startAngle={0}
                                        endAngle={360}
                                        dataKey="count"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={80}
                                    >
                                        {piedata.map((entry, index) => (
                                            <Cell name={entry.language} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        iconType="circle"
                                        layout="vertical"
                                        verticalAlign="middle"
                                        align="right"
                                    />
                                </PieChart>
                            </ResponsiveContainer>





                        </div>


                        <div className='schedule-cont'>
                            <div className='pie-head'>
                                <h1 className='pie-title'>Today's schedule</h1>
                                <p className='pie-date'>See All</p>
                            </div>
                            <div className='sch-card s1'>
                                <h1 className='sch-head'>Meeting with Client from Hyderabad</h1>
                                <p className='sch-date'>10.00-12.00</p>
                                <p className='sch-adress'>at Gachibowli, Hyderabad</p>
                            </div>
                            <div className='sch-card s2'>
                                <h1 className='sch-head'>Meeting With Senior Manager</h1>
                                <p className='sch-date'>14.00-15.00</p>
                                <p className='sch-adress'>Google meet</p>
                            </div>


                        </div>

                    </div>




                </div>
            </>) : (
                    <p>No user data found. Please <Link className="link" to="/login">LogIn.</Link></p>
            )}

        </div>


    )
}

export default Dashboard



