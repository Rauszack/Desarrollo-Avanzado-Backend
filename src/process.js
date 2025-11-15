import fs from "fs"


console.log(`process id:`, process.pid)
console.log(`current directory:`, process.cwd())
console.log(`s.o.`, process.platform)

console.log(process.argv)

// let [rutaNode, rutaScritp, ...argumentos]=process.argv   // ... son aquí el operador rest
let [ , , ...argumentos]=process.argv   // ... son aquí el operador rest

let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Debe indicar el puerto con el flag --port [PORT]`)
    process.exit()
}

const PORT=argumentos[indicePort+1]
console.log(`Server running on port ${PORT}`)

// commander

console.log("variables de entorno:", process.env)
console.log("Clave:", process.env.PRUEBA_SECRET)