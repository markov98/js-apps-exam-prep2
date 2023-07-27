import { del, get, post, put } from './api.js';

export async function getAllAlbums() {
    return await get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getAlbumById(id) {
    return get("/data/albums/" + id);
}

export async function addAlbum(data) {
    return post("/data/albums/", data);
}

export async function updateAlbumById(id, data) {
    return put("/data/albums/" + id, data);
}

export async function deleteAlbumById(id) {
    return del("/data/albums/" + id);
}
