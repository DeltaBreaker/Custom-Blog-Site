// Loop through all buttons with edit-comment class and add this event listener
const commentEditButtons = document.getElementsByClassName("edit-comment");
Array.prototype.forEach.call(commentEditButtons, (element) => {
  element.addEventListener("click", async (event) => {
    // Get the comment id from the data value
    let location = event.srcElement.getAttribute("data-id");

    // Make the request and send JSON update data
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

// Loop through all buttons with delete-comment class and add this event listener
const commentDeleteButtons = document.getElementsByClassName("delete-comment");
Array.prototype.forEach.call(commentDeleteButtons, (element) => {
  element.addEventListener("click", async (event) => {
    // Get the comment id from the data value
    let location = event.srcElement.getAttribute("data-id");

    // Make the request to delete a comment
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

// This button just redirects to the new post page
const newPost = document.getElementById("new-post");
newPost.addEventListener("click", async (event) => {
  window.location.replace(window.location.origin + "/post/new");
});
