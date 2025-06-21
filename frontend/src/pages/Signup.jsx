import { isAuthenticated } from "../components/PrivateRoute";
import { Navbar } from "../components/Navbar";
import {Box, Button, Grid, TextField, Typography, InputLabel, Select, MenuItem, FormControl} from "@mui/material";
import Footer from "../components/Footer";
import * as React from "react";
import { sendSignup } from "../services/api";

function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        sendSignup(email, password).then((response) => {
            if (response === false) {
                alert("Login failed");
            } else {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("isAuthenticated", "true");
                window.location.replace("./Dashboard");
            }
        })
    };

    return isAuthenticated() ? window.location.replace("./Dashboard") : (
        <Box>
            <Navbar />
            <div>
                <Grid container
                      direction="column"
                      sx={{
                          alignItems: "center",
                          marginTop: "30px"
                      }}>
                    <Grid>
                        <Typography variant="h4" align="center">Sign Up</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid sx={{marginTop: "30px"}}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid sx={{marginTop: "30px"}}>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid sx={{marginTop: "30px"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Role"
                                    variant="outlined"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value={"employer"}>Employer</MenuItem>
                                    <MenuItem value={"employee"}>Employee</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid display="flex" justifyContent="center" sx={{marginTop: "30px"}}>
                            <Button
                                type="submit"
                                id="submit"
                                variant="contained"
                                size="large">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                    <Grid display="flex" justifyContent="center" sx={{marginTop: "30px"}}>
                        <Typography sx={{fontSize: 'sm', alignSelf: 'center'}}>
                            Already have an account? <a href="/">Log In</a>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </Box>
    );
}

export default Signup;