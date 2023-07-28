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

export async function getLikesByAlbumId(id) {
    return get(`/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function addLike(data) {
    return post('/data/likes', data)
}

export async function getLikesByUser(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

