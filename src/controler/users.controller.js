export const getUsers=async(req, res)=>{
try {
     res.setHeader('Content-Type','application/json');
    res.status(200).json({usuarios:"Usuarios"})
} catch (error) {
    res.setHeader('Content-Type','application/json');
    res.status(500).json({error:"Internal Server Error"})
}


   
}

export const createUser =async(req, res)=>{
    try {
        res.setHeader('Content-Type','application/json');
    res.status(200).json({payload:"Usuario creado"})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
    res.status(500).json({error:"Internal Server Error"})
    }

}