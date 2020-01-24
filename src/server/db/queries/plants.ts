import { Query } from "../index";

const postPlant= async (user_id: number, id: number, common_name: string, scientific_name: string) => Query<{insertId:number}>(`INSERT INTO plants (user_id, id, common_name, scientific_name) VALUES (?)`, [[user_id, id, common_name, scientific_name]]);

export default {
    postPlant
}