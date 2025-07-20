import { Navbar } from "../components/Navbar";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Footer from "../components/Footer";
import * as React from "react";
import { createTeam } from "../services/api";

function CreateTeam() {
    const [name, setName] = React.useState("");
    const [description, setDescr] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        createTeam(name, description).then((response) => {
            if (response === false) {
                alert("Failed to create team");
            } else {
                window.location.replace("/teams/" + response);
            }
        })
    };

    return (
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
                        <Typography variant="h4" align="center">Create a new Team</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <Grid sx={{ marginTop: "30px" }}>
                            <TextField
                                id="name"
                                label="Team Name"
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid sx={{ marginTop: "30px" }}>
                            <TextField
                                id="description"
                                label="Team Description"
                                variant="outlined"
                                type="text"
                                value={description}
                                onChange={(e) => setDescr(e.target.value)}
                            />
                        </Grid>
                        <Grid display="flex" justifyContent="center" sx={{ marginTop: "30px" }}>
                            <Button
                                type="submit"
                                id="submit"
                                variant="contained"
                                size="large">
                                Create Team
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </div>
            <Footer />
        </Box>
    );
}

export default CreateTeam;