import React, { useState } from 'react'
import './editUser.css'
import Avatar from '@mui/material/Avatar';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
    const [user, setUser] = useState({})
    let id = ""
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchUserData()
    }, [])
    async function fetchUserData() {
        let currentUser = localStorage.getItem('user')
        currentUser = JSON.parse(currentUser)
        if (currentUser.user_role === 'user') {
            id = currentUser._id
        } else {
            navigate('/users')
        }
        try {
            let result = await fetch('http://localhost:5000/user/' + id)
            if (!result.ok) {
                throw new Error("Can not fetch the data")
            } else {
                result = await result.json()
                setUser(result.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='user-detail-container' >
            <div className='header'>
                {
                    user.profile_picture &&
                    <Avatar alt={user.first_name} src={user.profile_picture} sx={{ width: 80, height: 80 }} />
                }
                <h2 className='head'>{user.name}</h2>
                <h4 className='head'>{user.email}</h4>
            </div>
            <div className='main-content'>
                <table className='user_detail-table'>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>User Name</td>
                            <td>{user.user_name}</td>
                        </tr>
                        <tr>
                            <td>Contact Info</td>
                            <td>{user.contact_info ? user.contact_info : "Not Available"}</td>
                        </tr>
                    </tbody>
                </table>
                <Button variant="contained" onClick={() => navigate('/edit/' + user._id)}>Update</Button>
            </div>
        </div>
    )
}

export default Home
