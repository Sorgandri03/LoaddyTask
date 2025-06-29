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
            member : localStorage.getItem("user"),
            role : localStorage.getItem("role")
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
        method: "GET",
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

export { sendLogin, sendSignup , getTeams , getTeamById };


