function swapPage(event) {
  event.preventDefault();
  window.location.href = event.currentTarget.href;
}

  // Find every navigation link on the current page.
document.querySelectorAll(".nav-link").forEach((link) => {
  // Connect the swapPage function to each link's click event.
  link.addEventListener("click", swapPage);
});