const username = document.getElementById("username");
const password = document.getElementById("password");

document.getElementById("button-login").addEventListener("click", async (event) => {
    let response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' },
    });
});

document.getElementById("button-signup").addEventListener("click", async (event) => {
    if (username.value.length <= 30 && username.value.length >= 3) {
        if (password.value.length >= 8) {
            let response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({ username: username.value, password: password.value }),
                headers: { 'Content-Type': 'application/json' },
            });

            console.log(response.ok)

            if(!response.ok) {
                alert("Failed to sign up");
                return;
            }

            let json = await response.json();

            console.log(json);

            if(!json.success) {
                alert("Failed to sign up");
                return;
            }

            window.location.replace(window.location.origin);
        } else {
            alert("Password needs to be at least 8 characters longs");
        }
    } else {
        alert("Username needs to be 3-30 characters long");
    }
});