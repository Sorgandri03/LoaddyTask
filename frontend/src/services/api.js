const BASE_URL = "http://localhost:3001/api";

function sendLogin(email, password) {
    return fetch(`${BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
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

function sendSignup(username, email, password, role) {

}

function getTeams() {
    return fetch(`${BASE_URL}/getteams`, {
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
                return JSON.parse(data.teams);
            });
        });
}

export { sendLogin, sendSignup , getTeams };


