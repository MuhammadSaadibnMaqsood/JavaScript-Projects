let name = document.getElementById("name-input");
let post = document.getElementById("post-input");
let allpostdiv = document.getElementById("all-posts");
let isEdit = false;
let isComment = false;

let id = 0;
let posts = [];

function addPost() {
  posts.push({ id: id, name: name.value, post: post.value, comment: [null] });
  id++;
  post.value = "";
  name.value = "";
  render();
}

function render() {
  allpostdiv.innerHTML = "";

  posts.map((post) => {
    allpostdiv.innerHTML += `
      <div class="all-post">
        <div class="single-post">
          <div style="display: flex; gap: 4px; justify-content: space-between">
            <p class="post-name">User: ${post.name ? post.name : 'annonymous'}</p>
            <div style="display: flex; gap: 4px">
              <button onmouseover="handlehover()" class="delete-btn" onclick="deletePost(${post.id})">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUnGQ0hFVLPjusTGBAm0Q3k7-XaTCm9mUYaw&s" alt="" />
                <p class="hidden">delete</p>
              </button>
              <button class="edit-btn" onclick="editPost(${post.id}, event)">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTprVUjh1WdoCRQ4RZVVuZj-pDkdGgzueMZxQ&s" alt="" />
                   <p class="hidden">edit</p>
              </button>
            </div>
          </div>
          <p class="post-text">${post.post}</p>
        </div>
        <button class = "comment-btn" onclick="handleComment(${post.id}, event)">comment</button>
        <div class="comment-input" id="comment-input-${post.id}"></div>
        <div class="comment-output">
          ${post.comment.map((com, index) => (com ? `<p>${index}: ${com}</p>` : '')).join("")}
        </div>
      </div>
    `;
  });
}

function deletePost(id) {
  posts = posts.filter((p) => p.id !== id);
  render();
}

function editPost(id, event) {
  if (document.getElementById("edit-post-input")) return;

  const button = event.target;
  const singlePostDiv = button.closest(".single-post");

  const currentPost = posts.find((p) => p.id === id);

  const html = `
    <div class="edit-container">
      <textarea id="edit-post-input" rows="6">${currentPost.post}</textarea>
      <button class="save-btn" onclick="save(${id})">Save</button>
    </div>
  `;

  singlePostDiv.insertAdjacentHTML("beforeend", html);
}

function save(id) {
  let editPostInput = document.getElementById("edit-post-input");

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts[i].post = editPostInput.value;
    }
  }

  render();
  isEdit = false;
}

function handleComment(id, event) {
  const btn = event.target;
  const container = document.getElementById(`comment-input-${id}`);

  if (container.innerHTML.trim() !== "") return;

  container.innerHTML = `
    <input type="text" id="comment-text-${id}" />
    <button onclick="handleCommentSave(${id})">done</button>
  `;
}

function handleCommentSave(id) {
  const commentInput = document.getElementById(`comment-text-${id}`);
  const commentText = commentInput.value;

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts[i].comment.push(commentText);
    }
  }

  render();
}

function handlehover() {
  console.log("hover");
}