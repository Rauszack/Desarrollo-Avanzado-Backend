import PetsMemoryDAO from "../dao/petsdao.js";
class PetsController {
  static getPets = async (req, res) => {
    try {
       let pets=await PetsMemoryDAO.get()

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json({ pets });
    } catch (error) {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: `Internal server error` });
    }
  };
  static createPet = async (req, res) => {
    let { name, specie } = req.body;

    // validaciones... lógica de negocio... etc.

    if (!name || !specie) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: `name | specie son requridos` });
    }

    try {
      let nuevaMascota=await PetsMemoryDAO.save({name, specie})
      res.setHeader("Content-Type", "application/json");
      res.status(201).json({ message: "mascota creada...!!", nuevaMascota });
    } catch (error) {
      console.log(error);
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: `Internal server error` });
    }
  };
}

export default PetsController;