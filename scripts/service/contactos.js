const axios = require("axios")
const luxon = require("luxon")
const sweetalert2 = require("sweetalert2")
import { APPIS } from "../modulos/appi.js";
import { contenedorTarjetas, fotoChat, principalContenedor, inputContacto, estado, estadoWpp, cerrarSesion } 
from "../modulos/elementsDom.js";
import { pintandoMensajesEntrada } from "../service/mensajes.js";
import { diaSemana, hora, ultimoTiempo, fecha } from "../modulos/luxon.js";
// import { conectado } from "./flag.js";


export let contactos = undefined

// Aqui se muestra la api
export const traerContacto = async() => {
    const {data} = await axios.get(APPIS.URL_USUARIOS)
    return data
}

//comparando contactos con el input 
export const BuscandoContacto = async (input) => {
    try {
        const { data } = await axios.get(`${APPIS.URL_USUARIOS}?Nombre_like=${input}`);
        
        return data
    } catch (error) {
        console.log(error);
    }
}

//Pintar tarjeta de contacto buscado 
export const pintarBusquedad = async () => {
    
    const dataBuscar = await BuscandoContacto(inputContacto.value)
   
    contenedorTarjetas.innerHTML = ""
    dataBuscar.forEach(element => {
        
        contenedorTarjetas.innerHTML += `   
        <div class="tarjeta_contacto" data-id="${element.id} data-flag="${element.Estado}">

            <article class="union_foto_contacto">
                <img class="foto_contacto" src=${element.Foto} alt="contacto1">
            </article>

            <article class="union_mensaje">
                <article class="nombre_dia_mensaje">
                    <span class="nombre_contacto">${element.Nombre}</span>
                    <span class="dia_mensaje">Dia</span>
                </article>

            <article class="icono_texto_mensaje">
                <img class="icono_ckeck" src="../data/Icons/check.svg" alt="check">
                <p class="mensaje_contacto">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </article>
            </article>

         </div>
        `;
        
    });

 
}


//Pintar nombre, foto y en linea en header de visualizacion mensajes
export const clickTarjetas = ()=>{
    contenedorTarjetas.addEventListener("click", (e) => {
        const seccion = e.target.closest(".tarjeta_contacto");
        // Acceder a las propiedades del elemento
        if (seccion) {        
            // const enLinea = flocalStorage.getItem('enLinea');
            const idPrincipal = JSON.parse(localStorage.getItem('identificador'));
            const idContacto = seccion.getAttribute("data-id");
            const flag = seccion.getAttribute("data-flag");
            const nombreContacto = seccion.querySelector(".nombre_contacto").textContent;
            const fotoContacto = seccion.querySelector(".foto_contacto").getAttribute("src");
            // Realizar operaciones con las propiedades obtenidas
    
            principalContenedor.innerHTML = "";
            fotoChat.innerHTML = "";
            principalContenedor.innerHTML += `<img src="${fotoContacto}" class="fotico__chat" data-id=${idPrincipal}></img>`
            principalContenedor.innerHTML += `<h1>${nombreContacto}</h1>`


            if (flag == 'true'){
                principalContenedor.innerHTML += `<span class="estado_perfil">EN LINEA</span>`
            }
            else{
                principalContenedor.innerHTML += `<span class="estado_perfil">DESCONECTADO</span>`
            }
            
            

            let EstadoFlag = document.querySelector(".estado_perfil");
            //  conectado(EstadoFlag, idContacto)
            
            let identificadorContacto = idContacto;
                identificadorContacto = localStorage.setItem("identificador-contacto",(identificadorContacto))
        }
        pintandoMensajesEntrada()
      });

} 




export const informacion = async () => {
    estado.addEventListener("click", async() => {
        const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
        const idDelcontacto = JSON.parse(
    localStorage.getItem("identificador-contacto"));
        let data = await traerContacto()
        estadoWpp.classList.remove("estado__wpp")
        estadoWpp.classList.add("estado__wpp--activa")
        data.forEach(element => {
                if (idDelcontacto == element.id) {
                    estadoWpp.innerHTML = `
                    <img src="/data/x.svg" alt="" class="atras__mensaje">
                    <h3>Nombre</h3>
                    <span>${element.Nombre}</span>
                    <h3>Estado</h3>
                    <span>${element.Informción}</span>
                    `
                    const equisAtras = document.querySelector('.atras__mensaje');
                    equisAtras.addEventListener("click", () => {
                        estadoWpp.classList.remove("estado__wpp--activa")
                        estadoWpp.classList.add("estado__wpp")
                    })
                } 
        })
    })
}


