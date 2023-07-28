import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAlbumById, updateAlbumById } from "../api/data.js";

const template = (data, onSubmit) => html`
      <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${data.singer}">
            <input type="text" name="album" id="album-album" placeholder="Album" value="${data.album}"/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${data.imageUrl}"/>
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${data.release}"/>
            <input type="text" name="label" id="album-label" placeholder="Label" value="${data.label}"/>
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${data.sales}"/>

            <button type="submit">post</button>
          </form>
        </div>
      </section>`;

export async function showEdit(ctx) {
    const albumId = ctx.params.id;
    const data = await getAlbumById(albumId);

    ctx.render(template(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (Object.values(data).some(val => !val)) {
            alert('Empty fields');
            return null;
        }

        try {
            await updateAlbumById(albumId, data);
            ctx.page.redirect('/dashboard');
        } catch (err) {
            console.log(err.message);
        }
    }
}