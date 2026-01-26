// Mengambil elemen-elemen untuk animasi geser
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

// Event listener untuk mengaktifkan panel register
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });
}

// Event listener untuk mengaktifkan panel login
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
}

// Logika untuk Show/Hide Password
const togglePasswordButtons = document.querySelectorAll(".toggle-password");

togglePasswordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Cari input password yang berada di dalam container yang sama
    const passwordInput = button.previousElementSibling;

    // Cek tipe input saat ini dan ubah
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Ganti ikon mata
    button.classList.toggle("fa-eye-slash");
    button.classList.toggle("fa-eye");
  });
});
