const axios = require("axios")
const luxon = require("luxon")
const sweetalert2 = require("sweetalert2")
import { APPIS } from "../modulos/appi.js";
import {
  mensajesSalida,
  contenedorEnviarMensaje,
  inputMensaje,
  contenedorMensajes2,
  contenedorMensajes3,
  iconoEnviar
} from "../modulos/elementsDom.js";
import {
  ahora,
  fecha,
  diaSemana,
  hora,
  ultimoTiempo,
} from "../modulos/luxon.js";
import { nuevoUsuario } from "./registro.js";


export const traerMensajes = async () => {
  const { data } = await axios.get(APPIS.URL_MENSAJES);
  return data;
};

export const pintandoMensajesEntrada = async () => {
  const data = await traerMensajes();
  const idPrincipal = JSON.parse(localStorage.getItem("identificador")); //
  const idDelcontacto = JSON.parse(
    localStorage.getItem("identificador-contacto")
  );
  contenedorMensajes2.innerHTML ="";
  data.forEach((element) => {
    let idUser1 = element.idUser1;
    let idUser2 = element.idUser2;

    if (idUser1 == idPrincipal && idUser2 == idDelcontacto || idUser1 ==idDelcontacto && idUser2 == idPrincipal) {
      element.conversacion.forEach((objeto, index) => {
        if (idUser1 == objeto.sendBy) {

          contenedorMensajes2.innerHTML += `
          <span class="dia_envio_mensaje">${diaSemana}</span>
          <article class="mensaje_entrada">
                   
                   <p>${objeto.message}<span class="span__hora ">${objeto.hour}</span></p>
                   <div class="div__acciones">
                   <button class="accion__eliminar" acciones>eliminar</button>
                   <button class="accion__editar" acciones>editar</button>
                   </div>

          </article>
                   
                `;
        } else {
          contenedorMensajes2.innerHTML += `
          
          <article class="mensaje_salida">  
              
              <p>"${objeto.message}" <span class="span__hora">${objeto.hour}</span></p>
              <div class="div__acciones">
              <button class="accion__eliminar" acciones>eliminar</button>
              <button class="accion__editar" acciones>editar</button>
              </div>
              
          </article>
                  
                `;
             
          
        }
        
        const botonEliminar = contenedorMensajes2.querySelectorAll('.accion__eliminar')
        const ArrayEliminar = Array.from(botonEliminar)
        const botonEditar = contenedorMensajes2.querySelectorAll('.accion__editar')
        const ArrayEditar = Array.from(botonEditar)
        eliminar(ArrayEliminar)
        editar(ArrayEditar)
      });
    }
  });
};

setInterval(pintandoMensajesEntrada, 5000)


export const editar = async (ArrayEditar) => {
  const datos = await traerMensajes()
  const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
  const idDelcontacto = JSON.parse(localStorage.getItem("identificador-contacto"));
  ArrayEditar.forEach((element, index) => {
    element.addEventListener("click", async () => {
      let numeroBotonEditar = index;
      await datos.forEach(objeto => {
        let idUser1 = objeto.idUser1;
        let idUser2 = objeto.idUser2;
        if(objeto.idUser2 == idDelcontacto){
          const arrayTotal = objeto.conversacion
          const arrayMensajeria = objeto.conversacion[numeroBotonEditar]
          
          inputMensaje.value = arrayMensajeria.message;
          
          iconoEnviar.addEventListener("click", () => {
              arrayMensajeria.message = inputMensaje.value

              inputMensaje.value = "";
              contenedorMensajes2.innerHTML ="";
              arrayTotal.forEach(producto => {
                
                if (idUser1 == producto.sendBy) {

                  contenedorMensajes2.innerHTML += `
                  
                  <article class="mensaje_entrada">
                           <p>${producto.message}<span class="span__hora ">${objeto.hour}</span></p>
                           <div class="div__acciones">
                           <button class="accion__eliminar" acciones>eliminar</button>
                           <button class="accion__editar" acciones>editar</button>
                           </div>
        
                  </article>
                           
                        `;
                } else {
                  contenedorMensajes2.innerHTML += `
                  
                  <article class="mensaje_salida">  
                      <p>"${producto.message}" <span class="span__hora">${objeto.hour}</span></p>
                      <div class="div__acciones">
                      <button class="accion__eliminar" acciones>eliminar</button>
                      <button class="accion__editar" acciones>editar</button>
                      </div>
                      
                  </article>
                          
                        `;
                  
                }
              })
              
          })
          
        }

      })
       
    })
  })
   
}

export const eliminar = async (ArrayEliminar) => {
  const datos = await traerMensajes()
  const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
  const idDelcontacto = JSON.parse(
    localStorage.getItem("identificador-contacto"));
   
  
  ArrayEliminar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      let numeroBoton = index;
      
      datos.forEach(async (element, index) => {
        
        let idUser1 = element.idUser1;
        let idUser2 = element.idUser2;
        
        if(idUser1 == idPrincipal && idUser2 == idDelcontacto || idUser1 ==idDelcontacto && idUser2 == idPrincipal){

          let mensajeEliminar = element.conversacion
          console.log(mensajeEliminar)

          let id = element.id;
          console.log(id)

          mensajeEliminar.splice(numeroBoton,1)
          console.log(mensajeEliminar);

          contenedorMensajes2.innerHTML ="";
          mensajeEliminar.forEach(async(objeto, index) =>{

            try {
              const response = await axios.patch(`https://whatsapp-modulo2-miniback.onrender.com/mensajes/${id}`, {conversacion:mensajeEliminar});
              
              console.log('Mensaje enviado:', response);

              for (let index = 0; index < mensajeEliminar.length; index++) {  
                if (idUser1 == objeto.sendBy) {
              
                  contenedorMensajes2.innerHTML += `
                  
                  <article class="mensaje_entrada">
                           <p>${element.message}<span class="span__hora ">${element.hour}</span></p>
                           <div class="div__acciones">
                           <button class="accion__eliminar" acciones>eliminar</button>
                           <button class="accion__editar" acciones>editar</button>
                           </div>
              
                  </article>
                           
                        `;
                } else {
                  contenedorMensajes2.innerHTML += `
                  
                  <article class="mensaje_salida">  
                      <p>"${element.message}" <span class="span__hora">${element.hour}</span></p>
                      <div class="div__acciones">
                      <button class="accion__eliminar" acciones>eliminar</button>
                      <button class="accion__editar" acciones>editar</button>
                      </div>
                      
                  </article>
                          
                        `;
                  
                }  
                 
              } 
              





            } catch (error) {
              console.error('Error al enviar el mensaje:', error);
            }
                
            

          })
        
        }
        
      })
    })

  })
  
 
}






