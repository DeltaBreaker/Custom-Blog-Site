const input = document.getElementById("comment-input");

document
  .getElementById("button-comment")
  .addEventListener("click", async (event) => {
    if (input.value.length > 0) {
      let location = window.location.toString().split("/");
      let response = await fetch("/api/post/" + location[location.length - 1], {
        method: "POST",
        body: JSON.stringify({
          comment: input.value,
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

      window.location.reload();
    }
  });
