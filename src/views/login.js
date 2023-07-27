import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";

const template = (onLogin) => html`
      <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form class="login-form" @submit=${onLogin}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="#">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`

export function showLogin(ctx) {
  ctx.render(template(onLogin))

  async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (Object.values(data).some(val => !val)) {
      alert('You have empty fields');
      return null;
    }


    try {
      await login(data.email, data.password);

      ctx.page.redirect('/dashboard')
    } catch (err) {
      console.log(err.message);
    }
  }
}