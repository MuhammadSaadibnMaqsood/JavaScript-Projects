import { signUp, login } from "../db.js";

const registerbutton = document.getElementById("register-btn");

if (registerbutton) {
  registerbutton.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("Confirm-password").value;

    if (password != confirm_password) {
      Swal.fire({
        title: "Password mismatched!",
        text: "Please enter same password.",
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#764ba2",
      });
    } else {
      if (password && name && email) {
        const data = await signUp(email, password);

        if (data) {
          Swal.fire({
            title: "Login!",
            text: "Login successfully.",
            icon: "success",
            confirmButtonText: "Close",
            confirmButtonColor: "#764ba2",
          });

          window.location.href = "/";
        }
      }
    }
  });
} else {
  const login_user_btn = document.getElementById("login_user_btn");
  login_user_btn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
      const data = await login(email,password);
      if (data) {
        window.location.href = "/";
      }
    }
  });
}
