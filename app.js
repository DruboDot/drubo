 // ─── Hide/Show paragraph ───
    const content = document.getElementById("content");
    const change = document.getElementById("change");

    change.addEventListener('click', () => {
        content.classList.toggle("hde");
        change.textContent = content.classList.contains("hde") ? "SHOW" : "HIDE";
    });

    // ─── Counter ───
    let count = 0;
    document.getElementById("inValue").value = count;
    document.getElementById("minus").onclick = () => document.getElementById("inValue").value = --count;
    document.getElementById("plus").onclick  = () => document.getElementById("inValue").value = ++count;

    // ─── Add new divs INSIDE #main (not body) ───
    const main = document.getElementById("main");

    // ─── Checkout panel toggle ───
    const checkoutBtn = document.getElementById("e");
    const checkoutPanel = document.getElementById("checkout-panel");

    function toggleCheckout() {
        const willBeOpen = checkoutPanel.classList.contains("hide");
        checkoutPanel.classList.toggle("hide");
        checkoutBtn.classList.toggle("active", willBeOpen);
    }

    checkoutBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleCheckout();
    });

    document.addEventListener("click", (e) => {
        if (checkoutPanel.contains(e.target) || checkoutBtn.contains(e.target)) return;
        if (!checkoutPanel.classList.contains("hide")) {
            checkoutPanel.classList.add("hide");
            checkoutBtn.classList.remove("active");
        }
    });

    // ─── POST MODAL LOGIC ───
const postBtn = document.getElementById("postBtn");
const postModal = document.getElementById("post-modal");
const postText = document.getElementById("postText");
const submitPost = document.getElementById("submitPost");
const cancelPost = document.getElementById("cancelPost");

// open modal
postBtn.addEventListener("click", () => {
  postModal.classList.remove("hide");
  postText.focus();
});

// cancel modal
cancelPost.addEventListener("click", () => {
  postModal.classList.add("hide");
  postText.value = "";
});

// submit post
submitPost.addEventListener("click", () => {
  const text = postText.value.trim();
  if (!text) return;

  const postDiv = document.createElement("div");
  postDiv.className = "user-post";

  postDiv.innerHTML = `
    <img src="hadi.jpg" alt="hadi">
    <p>${text}</p>
  `;

  main.prepend(postDiv);

  postText.value = "";
  postModal.classList.add("hide");
});

// close modal on outside click
postModal.addEventListener("click", (e) => {
  if (e.target === postModal) {
    postModal.classList.add("hide");
  }
});