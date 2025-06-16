const BASE_URL = "http://localhost:8080/api";

function sendLogin(email, password) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            return false;
        })
        .then((data) => {
            return data;
        });
}

function sendSignup(username, email, password, role) {

}

function getTeams() {
    return fetch(`${BASE_URL}/teams`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch teams");
            }
            return response.json();
        });
}

export { sendLogin, sendSignup , getTeams };


