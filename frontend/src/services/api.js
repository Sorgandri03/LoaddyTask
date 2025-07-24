const BASE_URL = "http://localhost:3001/api";

function sendLogin(email, password) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json().then((data) => {
                if (data.success === true) {
                    localStorage.setItem("user", email);
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("role", data.role);
                    return true;
                } else {
                    console.error("Unable to login");
                    return false;
                }
            });
        });
}

function sendSignup(email, password, role) {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            role: role
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json().then((data) => {
                if (data.success === true) {
                    localStorage.setItem("user", email);
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("role", role);
                    return true;
                } else {
                    console.error("Unable to register");
                    return false;
                }
            });
        });
}

function getTeams() {
    return fetch(`${BASE_URL}/teams`, {
        method: "POST",
        body: JSON.stringify({
            member: localStorage.getItem("user"),
            role: localStorage.getItem("role")
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch teams");
            }
            return response.json().then((data) => {
                return data.teams.length > 0 ?
                    JSON.parse(data.teams) : [];
            });
        });
}

function getTeamById(idteam) {
    return fetch(`${BASE_URL}/teams/${idteam}`, {
        method: "POST",
        body: JSON.stringify({
            member: localStorage.getItem("user"),
            role: localStorage.getItem("role")
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch team");
            }
            return response.json().then((data) => {
                return data.team ? JSON.parse(data.team) : [];
            });
        });
}

function createTeam(teamName, teamDescription) {
    return fetch(`${BASE_URL}/createteam`, {
        method: "POST",
        body: JSON.stringify({
            name: teamName,
            description: teamDescription,
            employer: localStorage.getItem("user")
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                return false;
            }
            return response.json().then((data) => {
                if (data.success === true) {
                    return data.idteam;
                }
                return false;
            });
        });
}

function getSkills() {
    return fetch(`${BASE_URL}/getskills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch skills");
            }
            return response.json().then((data) => {
                return data.skills ? JSON.parse(data.skills) : [];
            });
        });
}

function setSkills(skills) {
    return fetch(`${BASE_URL}/setskills`, {
        method: "POST",
        body: JSON.stringify({
            employee: localStorage.getItem("user"),
            skills: skills
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to set skills");
            }
            return response.json().then(() => {
                return true;
            });
        });
}

function getEmployeeSkills(employee) {
    return fetch(`${BASE_URL}/employee/${employee}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch employee skills");
            }
            return response.json().then((data) => {
                return data ? JSON.parse(data.skills) : [];
            });
        });
}

function addTeamMember(idteam, member) {
    return fetch(`${BASE_URL}/addmember`, {
        method: "POST",
        body: JSON.stringify({
            idteam: idteam,
            member: member
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add member");
            }
            return response.json().then((data) => {
                return data.success;
            });
        });
}

function deleteTeamMember(idteam, memberEmail) {
    return fetch(`${BASE_URL}/deletemember`, {
        method: "POST",
        body: JSON.stringify({
            idteam: idteam,
            member: memberEmail
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete member");
            }
            return response.json().then((data) => {
                return data.success;
            });
        });
}

function createTeamJob(job) {
    const name = job.name;
    const description = job.description;
    const tasks = job.tasks;
    const idteam = job.idteam.idteam;
    return fetch(`${BASE_URL}/createteamjob`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            description: description,
            idteam: idteam,
            tasks: tasks
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to create job");
            }
            return response.json().then((data) => {
                return data;
            });
        });
}

function getJob(idjob) {
    return fetch(`${BASE_URL}/job/${idjob}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch job");
            }
            return response.json().then((data) => {
                return data ? data : [];
            });
        });
}

function getTeamJobs(idteam) {
    return fetch(`${BASE_URL}/getteamjobs/${idteam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch team jobs");
            }
            return response.json().then((data) => {
                return data ? JSON.parse(data.jobs) : [];
            });
        });
}

function getEmployeeTasks(email, teamId) {
    return fetch(`${BASE_URL}/tasks?email=${email}&teamId=${teamId}`)
        .then((response) => response.json())
        .then((data) => {
            if (!data || !data.tasks) {
                throw new Error("Failed to fetch employee tasks");
            }
            return JSON.parse(data.tasks);
        })
        .catch((e) => {
            console.error("Failed to fetch employee tasks", e);
            return [];
        });
}

function taskcompleated(taskId) {
    return fetch(`${BASE_URL}/taskcompleted`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ taskId })
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data || !data.success) {
                throw new Error("Failed to mark task as completed");
            }
            console.log("Task marked as completed successfully");
            return data.success;
        });
    }

function undotaskcompleated(taskId) {
        return fetch(`${BASE_URL}/undotaskcompleted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ taskId })
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data || !data.success) {
                    throw new Error("Failed to mark task as not completed");
                }
                console.log("Task marked as not completed successfully");
                return data.success;
            });
    }

function sendToAlgorithm(idjob) {
    console.log("Sending job to algorithm with ID:", idjob);
    return fetch(`${BASE_URL}/algorithm`, {
        method: "POST",
        body: JSON.stringify({
            idjob: idjob
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to send data to algorithm");
            }
            return response.json().then((data) => {
                return true;
            });
        });
}

function assignTask(taskId, employeeEmail) {
    if(!employeeEmail) {
        employeeEmail = "null";
    }
    return fetch(`${BASE_URL}/updatetaskemployee`, {
        method: "POST",
        body: JSON.stringify({
            taskId: taskId,
            employeeEmail: employeeEmail
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update task employee");
            }
            return response.json().then((data) => {
                return data.success;
            });
        });
}

function sendNotification(idjob) {
    return fetch(`${BASE_URL}/sendnotification`, {
        method: "POST",
        body: JSON.stringify({
            job: idjob
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to send notification");
            }
            return response.json().then((data) => {
                return data.success;
            });
        });
}

export { sendLogin, sendSignup, getTeams, getTeamById, createTeam, getSkills, setSkills, getEmployeeSkills, addTeamMember, deleteTeamMember, createTeamJob, getJob, getTeamJobs, getEmployeeTasks, taskcompleated, undotaskcompleated , sendToAlgorithm , assignTask , sendNotification};
