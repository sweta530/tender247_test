import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

const defaultTheme = createTheme();

export default function EditUser() {
    const navigate = useNavigate()
    const [userData, setUserData] = React.useState([])
    const { id } = useParams()

    React.useEffect(() => {
        fetchUserData()
    }, [])
    async function fetchUserData() {
        try {
            let result = await fetch('http://localhost:5000/user/' + id)
            if (!result.ok) {
                throw new Error("Can not fetch the data")
            } else {
                result = await result.json()
                setUserData(result.data[0])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
            name: data.get('name'),
            user_name: data.get('user_name'),
            contact_info: data.get('contact_info'),
            profile_picture: data.get('profile_picture')
        });
        try {
            let result = await fetch('http://localhost:5000/user/' + id, {
                method: 'PUT',
                body: data
            })
            if (!result.ok) {
                throw new Error("Failed to register user")
            } else {
                result = await result.json()
                console.log("user register successfully")
                let currentUser = localStorage.getItem('user')
                currentUser = JSON.parse(currentUser)
                if (currentUser.user_role === 'admin') {
                    navigate('/users')
                } else {
                    navigate('/home')
                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "profile_picture") {
            if (files.length > 0) {
                setUserData(prevState => ({
                    ...prevState,
                    profile_image: files[0]
                }));
            }
        } else {
            setUserData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Update User
                    </Typography>
                    {
                        userData.profile_picture &&
                        <Avatar alt={userData.name} src={userData.profile_picture} sx={{ width: '60px', height: '60px' }} />
                    }
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={userData.name ? userData.name : ""}
                                    onChange={handleChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="user_name"
                                    label="User Name"
                                    name="user_name"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                    value={userData.user_name ? userData.user_name : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    value={userData.email ? userData.email : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="contact_info"
                                    label="Contact Number"
                                    name="contact_info"
                                    onChange={handleChange}
                                    value={userData.contact_info ? userData.contact_info : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    value={userData.password ? userData.password : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="profile_picture"
                                    // label="Profile Picture"
                                    type="file"
                                    id="profile_picture"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Update User
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}