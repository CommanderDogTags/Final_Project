import { Query } from "../index";

const getComments = async (photo_id: string) => Query(`SELECT c.comment_id, c.photo_id, c.comment, u.username, u.avatar_path, c._created FROM comments c JOIN users u ON u.user_id = c.user_id WHERE c.photo_id =? ORDER BY _created DESC`, [photo_id]);

const postComment = async (comment: string, user_id: number, photo_id: number) => Query<{insertId:number}>(`INSERT INTO comments (comment, user_id, photo_id) VALUES (?)`, [[comment, user_id, photo_id]]);

export default {
    getComments,
    postComment
}