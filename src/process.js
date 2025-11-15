import fs from "fs"


console.log(`process id:`, process.pid)
console.log(`current directory:`, process.cwd())
console.log(`s.o.`, process.platform)

console.log(process.argv)

let [ , , ...argumentos]=process.argv   

let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Debe indicar el puerto con el flag --port [PORT]`)
    process.exit()
}

const PORT=argumentos[indicePort+1]
console.log(`Server running on port ${PORT}`)


console.log("variables de entorno:", process.env)
console.log("Clave:", process.env.PRUEBA_SECRET)