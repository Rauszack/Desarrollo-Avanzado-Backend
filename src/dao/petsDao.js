import { pets } from "../data/pets.js";
class PetsMemoryDAO{
    static async get(){
        return pets
    }

    static async save(pet){
        let id=1
        if(pets.length>0){
            id=Math.max(...pets.map(d=>d.id))+1
        }

        let nuevaMascota={
            id, 
            ...pet
        }

        pets.push(nuevaMascota)
        
        return nuevaMascota
    }
}

export default PetsMemoryDAO;