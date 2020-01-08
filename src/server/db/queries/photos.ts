import { Query } from "../index";

const getAll = () => Query<[]>(`SELECT p.photo_id, u.username, u.role, p.caption, p.image_path, p._created FROM photos p JOIN users u ON u.user_id = p.user_id ORDER BY _created DESC`);

const postPhoto = async (image_path: string, caption: string, user_id: number) => Query<{}>(`INSERT INTO photos (image_path, caption, user_id) VALUES (?)`, [[image_path, caption, user_id]]);

const deletePhoto = async (photo_id: string) => Query<{}>(`DELETE FROM photos WHERE photo_id =?`, [photo_id]);

export default {
    getAll,
    postPhoto,
    deletePhoto
}