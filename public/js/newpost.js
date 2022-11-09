const submit = document.getElementById("button-submit");
const titleField = document.getElementById("title");
const contentField = document.getElementById("content");

// Handles sending a new request to create a new post
submit.addEventListener("click", async (event) => {
  if (titleField.value.length == 0) {
    alert("Title cannot be empty");
    return;
  }

  if (contentField.value.length == 0) {
    alert("Content cannot be empty");
    return;
  }

  let response = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title: titleField.value,
      content: contentField.value,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert("Error creating post");
  }

  alert("Post created");
  window.location.replace(window.location.origin);
});
