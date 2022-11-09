const username = document.getElementById("username");
const password = document.getElementById("password");

// This is the log in event listener
document
  .getElementById("button-login")
  .addEventListener("click", async (event) => {
    await makeRequest("/api/user/login", "Failed to log in");
  });

// This is the sign up event listener
document
  .getElementById("button-signup")
  .addEventListener("click", async (event) => {
    if (username.value.length <= 30 && username.value.length >= 3) {
      if (password.value.length >= 8) {
        await makeRequest("/api/user", "Failed to sign up");
      } else {
        alert("Password needs to be at least 8 characters longs");
      }
    } else {
      alert("Username needs to be 3-30 characters long");
    }
  });

// This takes in a request url and error message to be displayed if needed
async function makeRequest(url, error) {
  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      username: username.value.trim(),
      password: password.value.trim(),
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(error);
    return;
  }

  let json = await response.json();

  if (!json.success) {
    alert(error);
    return;
  }

  // Redirect once done
  window.location.replace(window.location.origin);
}
