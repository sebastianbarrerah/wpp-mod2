
import { APPIS } from "../modulos/appi.js";
import { buscarMensaje, iconoBuscar, equis, inputBuscarMensaje, contenedorBuscarPrincipal, cerrarMensajes, estado } from "../modulos/elementsDom.js";
import { hora, diaSemana, fecha } from "../modulos/luxon.js";

export const buscadorMensajes = () => {
    iconoBuscar.addEventListener("click", () => {
        buscarMensaje.classList.remove("section__buscar");
        buscarMensaje.classList.add("verBuscar");
        inputBuscarMensaje.focus()
    })
    equis.addEventListener("click", () => {
        buscarMensaje.classList.add("section__buscar");
        buscarMensaje.classList.remove("verBuscar");
    })
}


export const mostrarMensaje = async () => {
    try {
        const { data } = await axios.get(`${APPIS.URL_MENSAJES}`);
        return data
        
    } catch (error) {
        console.log(error);
    }
}

export const pintarMensaje = async () => {
    inputBuscarMensaje.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            let valorMensaje = inputBuscarMensaje.value;
            
        const dataMensaje = await mostrarMensaje()

        const idPrincipal = JSON.parse(localStorage.getItem("identificador")); 
        const idDelcontacto = JSON.parse(localStorage.getItem("identificador-contacto"));

        contenedorBuscarPrincipal.innerHTML = "";
        dataMensaje.forEach(element => {

            let idUser1 = element.idUser1;
            let idUser2 = element.idUser2;

            if (idUser1 == idPrincipal && idUser2 == idDelcontacto){

                element.conversacion.filter(item => {
                    console.log(item.message);
                    const guardarMensaje = item.message.includes(valorMensaje);
                    console.log(guardarMensaje);
                    if (guardarMensaje == true) {
                        
                        contenedorBuscarPrincipal.innerHTML += 
                        `
                        <span class="fecha">${fecha}</span>
                        <div class="mensajes">${item.message}</div>

                        `
                    }
                })
            }
            

          })

    }
   })
   cerrarMensajes.addEventListener('click', () => {
    contenedorBuscarPrincipal.innerHTML = "";
   })
   
}



                
// const buscar = (consulta) => {
//     return usuarios.filter(item => {
//         return item.nombre.includes(consulta) 
//     })
// }

// console.log(buscar("Seb"));

                    // contenedorBuscarPrincipal.innerHTML += `   
                    // <div class="tarjeta_contacto" data-id="${element.id}">
            
                    //     <article class="union_foto_contacto">
                    //         <img class="foto_contacto" src=${element.Foto} alt="contacto1">
                    //     </article>
            
                    //    
            
                    //     <article class="icono_texto_mensaje">
                    //         <img class="icono_ckeck" src="../data/Icons/check.svg" alt="check">
                    //         <p class="mensaje_contacto">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    //     </article>
                    //     </article>
            
                    //  </div>
                    // `;



