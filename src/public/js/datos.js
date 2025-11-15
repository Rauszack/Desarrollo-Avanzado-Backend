const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    let response=await fetch("/usuario", {
        // method:"get",
        headers:{
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    let datos=await response.json()
    if(response.status>=400){
        divDatos.textContent=`Error: ${datos.error} | detalle: ${datos.detalle}`
    }else{
        divDatos.textContent=JSON.stringify(datos)
    }
})