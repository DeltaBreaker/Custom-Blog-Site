const input = document.getElementById("comment-input");
const editButton = document.getElementById("button-edit");
const deleteButton = document.getElementById("button-delete");
const commentButton = document.getElementById("button-comment");
const titleField = document.getElementById("title");
const contentField = document.getElementById("content");

// Sends a request to post a comment to the current post
if (commentButton) {
  commentButton.addEventListener("click", async (event) => {
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
}

// Sends a request to update a post
editButton.addEventListener("click", async (event) => {
  let location = window.location.toString().split("/");
  let response = await fetch("/api/post/" + location[location.length - 1], {
    method: "PUT",
    body: JSON.stringify({
      title: titleField.value,
      content: contentField.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(error);
    return;
  }

  alert("Post updated");
});

// Sends a request to delete a post
deleteButton.addEventListener("click", async (event) => {
  let location = window.location.toString().split("/");
  let response = await fetch("/api/post/" + location[location.length - 1], {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(error);
    return;
  }

  alert("Post deleted");
  window.location.replace(window.location.origin);
});
