import React from 'react';
import {Navbar} from "../components/Navbar";
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, ThemeProvider, Typography} from "@mui/material";
import Footer from "../components/Footer";
import {createTheme} from "@mui/material/styles";
import {getSkills} from "../services/api";

const theme = createTheme({
    typography: {
        fontFamily: "Helvetica",
    },
});

function submit(selectedSkills) {
    console.log("Selected skills:", selectedSkills);
}

function AddSkill(){
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const [skills, setSkills] = React.useState([]);
    React.useEffect(() => {
        getSkills().then((data) => {
            setSkills(data ?? []);
        });
    }, []);
    return (
        <Box>
            <Navbar />
            <Box sx={{ p: 4 }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h4"> Add Skills </Typography>
                    <Grid sx={{ marginTop: "30px" }}>
                        <Grid item>
                            <FormGroup>
                                {skills.map((skill) => (
                                    <FormControlLabel
                                        checked={selectedSkills.includes(skill.idskills)}
                                        onChange={() => {
                                            setSelectedSkills((prev) =>
                                                prev.includes(skill.idskills)
                                                    ? prev.filter((id) => id !== skill.idskills)
                                                    : [...prev, skill.idskills]
                                            );
                                        }}
                                        key={skill.idskills}
                                        control={<Checkbox />}
                                        label={skill.name}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                        <Button variant="contained" color="primary" onClick={() => submit(selectedSkills)} sx={{ marginTop: "30px" }}>Submit</Button>
                    </Grid>
                </ThemeProvider>
            </Box>
            <Footer />
        </Box>
    );
}

export default AddSkill;