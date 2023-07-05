
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

export const traerMensaje = async () => {
    const { data } = await axios.get(APPIS.URL_MENSAJES);
    
    return data;
};

// Funcion enviar mensaje
export const valorMensaje = () => {
    inputMensaje.addEventListener('keypress', (e) =>{
      if (e.key === 'Enter') {
        let guardarMensaje = inputMensaje.value;
        enviarMensaje(guardarMensaje)
      }
    })
  
}
  
const enviarMensaje = async (mensaje) => {
    const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
    const idDelcontacto = JSON.parse(
      localStorage.getItem("identificador-contacto"));
  
      const data = await traerMensaje();
      
      data.forEach( async (element) => {
        
        
      let idUser1 = element.idUser1;
      let idUser2 = element.idUser2;
  
      if (idUser1 == idPrincipal && idUser2 == idDelcontacto || idUser1 ==idDelcontacto && idUser2 == idPrincipal) {
  
        const id = element.id;
        console.log(id)
        
        let arrayConversaciones = element.conversacion; 
        console.log(arrayConversaciones)
         
        const body = {
        sendBy: `${idPrincipal}`,
        date: `${fecha}`,
        hour: `${hora}` ,
        message: mensaje,
        flag: "null"
        };
  
        arrayConversaciones.push(body)
  
        try {
          const response = await axios.patch( `https://whatsapp-modulo2-miniback.onrender.com/mensajes/${id}`, {conversacion:arrayConversaciones});
          
          console.log('Mensaje enviado:', response);
        } catch (error) {
          console.error('Error al enviar el mensaje:', error);
        }
  
      }
    })
  
  }


