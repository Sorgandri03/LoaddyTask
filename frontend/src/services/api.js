const BASE_URL = "http://localhost:3001/api";

function sendLogin(email, password) {
    return fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json().then((data) => {
                const response = data.filter((user) => user.password === password);
                if (response.length > 0) {
                    localStorage.setItem("token", "dummy-token"); // Replace with actual token logic
                    localStorage.setItem("user", email);
                    localStorage.setItem("isAuthenticated", "true");
                    return email;
                } else {
                    console.error("Unable to login");
                    return false; // Login failed
                }
            });
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


