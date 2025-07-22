let name = document.getElementById("name-input");
let post = document.getElementById("post-input");
let allpostdiv = document.getElementById("all-posts");

let id = 0;
let posts = [];

function addPost() {
  posts.push({ id: id, name: name.value, post: post.value });
  id++;

  post.value = "";
  name.value = "";
  render();
}

function render() {
  console.log(allpostdiv);

  allpostdiv.innerHTML = "";

  posts.map((post) => {
    allpostdiv.innerHTML += `<div class="all-post">
          <div class="single-post">
            <div style="display: flex; gap: 4px; justify-content: space-between;">
              <p class="post-name">user: ${
                post.name ? post.name : "annonymouse"
              }</p>
              <div style="display: flex; gap: 4px">
                <button onclick="deletePost(${post.id})">delete</button>
                <button onclick="editPost(${post.id})">edit</button>
              </div>
            </div>
            <p class="post-text">${post.post}</p>
          </div>
        </div>`;
  });
}

function deletePost(id) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      posts.splice(i, 1);
    }
  }
  render();
}

function editPost(){
    
}
