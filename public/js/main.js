const logout = document.getElementById("logout");

// Adds a logout listener
if (logout) {
  logout.addEventListener("click", async (event) => {
    await fetch("/api/user/logout");
    window.location.replace(window.location.origin);
  });
}
