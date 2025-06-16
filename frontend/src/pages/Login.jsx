import { isAuthenticated } from "../components/PrivateRoute";
import { Navbar } from "../components/Navbar";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Footer from "../components/Footer";
import * as React from "react";
import { sendLogin } from "../services/api";

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        sendLogin(email, password).then((response) => {
            if (response === false) {
                alert("Login failed");
            } else {
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("role", JSON.stringify(response.user.role));
                localStorage.setItem("isAuthenticated", "true");
                window.location.replace("./dashboard");
            }
        })
    };

    return isAuthenticated() ? window.location.replace("./dashboard") : (
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
                        <Typography variant="h4" align="center">Log In</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid sx={{ marginTop: "30px" }}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid sx={{ marginTop: "30px" }}>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid display="flex" justifyContent="center" sx={{ marginTop: "30px" }}>
                            <Button
                                type="submit"
                                id="submit"
                                variant="contained"
                                size="large">
                                Submit
                            </Button>
                        </Grid>
                    </form>
                    <Grid display="flex" justifyContent="center" sx={{ marginTop: "30px" }}>
                        <Typography sx={{ fontSize: 'sm', alignSelf: 'center' }}>
                            Don&apos;t have an account? <a href="/signup">Sign Up</a>
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </Box>
    );
}

export default Login;