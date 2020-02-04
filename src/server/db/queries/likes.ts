import { Query } from "../index";

const submitLike = async (user_id: number, photo_id: number) => Query<{insertId:number}>(`INSERT INTO likes (user_id, photo_id) VALUES (?)`, [[user_id, photo_id]]);

const getLikedPhotos = async (user_id: number) => Query(`SELECT l.user_id, l.photo_id, p.image_path, p.caption, u.username, u.avatar_path, l._created, COUNT(c.comment_id) as comment_count FROM likes l JOIN photos p ON p.photo_id = l.photo_id JOIN users u on u.user_id = p.user_id LEFT JOIN comments c ON c.photo_id = l.photo_id WHERE l.user_id =? GROUP BY l.photo_id ORDER BY p._created DESC`, [user_id]);

const checkLikedPhotos = async (user_id: number, photo_id: string) => Query(`SELECT * from likes WHERE user_id=? and photo_id=? ORDER BY _created DESC`, [user_id, photo_id]);

const deleteLike = async (user_id:string, photo_id: string) => Query<{}>(`DELETE FROM likes WHERE (user_id, photo_id) = (?)`, [[user_id, photo_id]]);

export default {
    submitLike,
    getLikedPhotos,
    deleteLike,
    checkLikedPhotos
}