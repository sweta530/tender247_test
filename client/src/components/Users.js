import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function Users() {
    const [userData, setUserData] = React.useState([]);
    const navigate = useNavigate()

    React.useEffect(() => {
        fetchUserData()
    }, [])
    async function fetchUserData() {
        try {
            let result = await fetch('http://localhost:5000/user')
            if (!result.ok) {
                throw new Error("Can not fetch the data")
            } else {
                result = await result.json()
                // console.log(result.data);
                setUserData(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <List sx={{ width: '60%', bgcolor: 'background.paper', margin: 'auto' }}>
            <h1>Users</h1>
            {userData.map((user, index) => (
                <div key={index}>
                    <ListItem alignItems="center" sx={{ gap: '45px' }} >
                        <ListItemAvatar >
                            <Avatar alt={user.name} src={user.profile_picture} sx={{ width: '60px', height: '60px' }} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Email : {user.email}
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Contact Number : {user.contact_info ? user.contact_info : "Not Available"}
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        User Name : {user.user_name}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                        <div>
                            <ListItemButton onClick={() => { navigate('/edit/' + user._id) }} >
                                <ListItemIcon>
                                    <EditIcon />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DeleteIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}

        </List>
    );
}
