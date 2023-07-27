import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/auth.js";

const template = (onRegister) => html`
      <section id="register">
        <div class="form">
          <h2>Register</h2>
          <form class="login-form" @submit=${onRegister}>
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
          </form>
        </div>
      </section>`;


export function showRegister(ctx) {
    ctx.render(template(onRegister));

    async function onRegister(e) {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const pass = formData.get('password');
        const rePass = formData.get('re-password');
    
        if ([email, pass, rePass].some(el => el === '')) {
            alert('You have empty fields');
            return null;
        } else if (pass !== rePass) {
          alert('Passwords do not match');
          return null;
        }
    
        try {
          await register(email, pass);
    
          ctx.page.redirect('/dashboard')
        } catch (err) {
          console.log(err.message);
        }
    }
}