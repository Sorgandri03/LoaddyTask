import { isAuthenticated } from "../components/PrivateRoute";
import { NavbarWithoutLogin } from "../components/Navbar";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Footer from "../components/Footer";
import * as React from "react";

function Login() {
    return isAuthenticated() ? window.location.replace('./Dashboard') : (
        <Box>
            <NavbarWithoutLogin/>
            <div>
                <Grid container
                      direction="column"
                      sx={{
                          alignItems: "center",
                          marginTop: "30px"
                      }}>
                    <Grid>
                        <Typography variant="h4" align="center">Login</Typography>
                    </Grid>
                    <Grid sx={{ marginTop: "30px" }}>
                            <TextField id="username" label="Username" variant="outlined" />
                    </Grid>
                    <Grid sx={{ marginTop: "30px" }}>
                        <TextField id="password" label="Password" variant="outlined" type="password" />
                    </Grid>
                    <Grid sx={{ marginTop: "30px" }}>
                        <Button id="submit" variant="contained" size={"large"}>Submit</Button>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </Box>

    );
}

export default Login;