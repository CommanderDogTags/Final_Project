import { Query } from "../index";

const getAll = () => Query<[]>(`SELECT p.photo_id, u.username, u.role, u.avatar_path, p.caption, p.image_path, p._created, COUNT(c.comment_id) as comment_count FROM photos p JOIN users u ON u.user_id = p.user_id LEFT JOIN comments c ON c.photo_id = p.photo_id GROUP BY p.photo_id ORDER BY p._created DESC`);

const getSinglePhoto = async (photo_id: string) => Query<{}[]>(`SELECT p.photo_id, u.username, u.role u.avatar_path, p.caption, p.image_path, p._created FROM photos p JOIN users u ON u.user_id = p.user_id WHERE p.photo_id =?`, [photo_id]);

const postPhoto = async (image_path: string, caption: string, user_id: number) => Query<{}>(`INSERT INTO photos (image_path, caption, user_id) VALUES (?)`, [[image_path, caption, user_id]]);

const deletePhoto = async (photo_id: string) => Query<{}>(`DELETE FROM photos WHERE photo_id =?`, [photo_id]);

const editPhoto = async (caption: string, photo_id: string) => Query<{}>(`UPDATE photos SET caption=? WHERE photo_id=?`, [caption, photo_id]);

const getUsersPhotos = (user_id: number) => Query<{}[]>('SELECT p.photo_id, p.image_path, p.caption, p._created, u.username, u.avatar_path FROM photos p JOIN users u ON u.user_id = p.user_id WHERE p.user_id =? ORDER BY p._created DESC', [user_id]);

const findUsersPhotos = (username: string) => Query<{}[]>('SELECT photos.*, users.username, users.avatar_path FROM photos JOIN users ON users.user_id = photos.user_id WHERE username LIKE ? ORDER BY _created DESC', [`%${username}%`])

export default {
    getAll,
    getSinglePhoto, 
    postPhoto,
    deletePhoto,
    editPhoto,
    getUsersPhotos,
    findUsersPhotos
}