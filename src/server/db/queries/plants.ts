import { Query } from "../index";

const postPlant= async (user_id: number, trefle_id: number, common_name: string, scientific_name: string) => Query<{insertId:number}>(`INSERT INTO plants (user_id, trefle_id, common_name, scientific_name) VALUES (?)`, [[user_id, trefle_id, common_name, scientific_name]]);

const getPlants = async (user_id: string) => Query(`SELECT * from plants WHERE user_id=? ORDER BY _created DESC`, [user_id]);

const deletePlant = async (plant_id: string) => Query<{}>(`DELETE FROM plants WHERE plant_id =?`, [plant_id]);

export default {
    postPlant,
    getPlants,
    deletePlant
}