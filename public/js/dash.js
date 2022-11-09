const commentEditButtons = document.getElementsByClassName("edit-comment");
Array.prototype.forEach.call(commentEditButtons, (element) => {
  element.addEventListener("click", async (event) => {
    let location = event.srcElement.getAttribute("data-id");
    let response = await fetch("/api/post/comment/" + location, {
      method: "PUT",
      body: JSON.stringify({
        comment: document.getElementById("comment-" + location).value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Error updating comment");
      return;
    }

    alert("Comment updated");
  });
});

const commentDeleteButtons = document.getElementsByClassName("delete-comment");
Array.prototype.forEach.call(commentDeleteButtons, (element) => {
  element.addEventListener("click", async (event) => {
    let location = event.srcElement.getAttribute("data-id");
    let response = await fetch("/api/post/comment/" + location, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Error delete comment");
      return;
    }

    alert("Comment deleted");
    window.location.reload();
  });
});

const newPost = document.getElementById("new-post");
newPost.addEventListener("click", async (event) => {
  window.location.replace(window.location.origin + "/post/new");
});
