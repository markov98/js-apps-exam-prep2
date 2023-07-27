import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbumById, getAlbumById } from "../api/data.js";


const template = (album, user, onDelete) => html`
      <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="./images/BackinBlack.jpeg" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>
          
          ${album._ownerId === user?._id 
          ? html`
          <div id="action-buttons">
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
            : nothing}
            
          </div>
            </section>`

export async function showDetails(ctx) {
    const albumId = ctx.params.id;

    const album = await getAlbumById(albumId);

    ctx.render(template(album, ctx.user, onDelete));

    async function onDelete(event) {
      event.preventDefault();

      try {
        await deleteAlbumById(albumId);
        ctx.page.redirect('/dashboard');
      } catch (e) {
        alert(e.massage)
      }
    }
}