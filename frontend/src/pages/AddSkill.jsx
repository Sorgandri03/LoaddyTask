import React from 'react';
import {Navbar} from "../components/Navbar";
import {Box, Checkbox, FormControlLabel, FormGroup, Grid, ThemeProvider, Typography} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";
import {getSkills} from "../services/api";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function AddSkill(){
    const skills = getSkills();
    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 4 }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4"> Add Skill Test</Typography>
                    <Grid sx={{ marginTop: "30px" }}>
                        <Grid item>
                            <FormGroup>
                                {skills.map((skill) => (
                                    <FormControlLabel
                                        key={skill.id}
                                        control={<Checkbox />}
                                        label={skill.name}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default AddSkill;