const axios = require("axios")
const luxon = require("luxon")
const sweetalert2 = require("sweetalert2")
import { BotonInicio, contenedorTarjetas, contenedorInicioSesion, contenedorBienvenido, contenedorHome, registro, contenedorRegistro, fotoIdPrincipal} from "./elementsDom.js";
import { VerificarIngreso} from "../service/peticionesHTTP.js";
import { APPIS } from "./appi.js";
import { nuevoUsuario } from "../service/registro.js";
import { informacion } from "../service/contactos.js";
import {
    ahora,
    fecha,
    diaSemana,
    hora,
    ultimoTiempo,
  } from "../modulos/luxon.js";

//Funcion que pinta interfaz home y tarjetas contactos
export const pintarHome = (arrayCargarContactos) =>{

    contenedorHome.classList.add('contenedor__verHome')

    contenedorInicioSesion.classList.add("hidden__inicioSesion");

 //Pintar tarjetas
     
     contenedorTarjetas.innerHTML = ``;
     arrayCargarContactos.forEach((element, index) =>{
        
   
     contenedorTarjetas.innerHTML += `
     <div class="tarjeta_contacto" data-id="${element.Id}" data-flag="${element.Estado}">

     <article class="union_foto_contacto">
         <img class="foto_contacto" src=${element.Foto} alt="contacto1">
     </article>

     <article class="union_mensaje">
         <article class="nombre_dia_mensaje">
             <span class="nombre_contacto">${element.Nombre}</span>
             <span class="dia_mensaje">${diaSemana}</span>
         </article>

         <article class="icono_texto_mensaje">
             <img class="icono_ckeck" src="../data/Icons/check.svg" alt="check">
             <p class="mensaje_contacto">Ver los mensajes que tienes con este contacto accede al chat</p>
         </article>
     </article>

    
     </div>  
     `
      const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
      let indicador = idPrincipal - 1
      if (index == indicador){
           fotoIdPrincipal.innerHTML = `
           <img class="foto_perfil" src="${element.Foto}" alt="foto perfil">
           `
     }
    });
    informacion()

}


//Funcionalidad con el boton entrar
const entrando = (btnEntrar) => {
    btnEntrar.addEventListener("click", (e) => {
        e.preventDefault()
        const formulario = document.getElementById("formulario")
        VerificarIngreso(APPIS.URL_USUARIOS, formulario)
        
    })
}

//Funcion cambio de pagina de bienvenido a inicio sesion
export const btnInicio = () => {
     BotonInicio.addEventListener("click", () => {
        contenedorInicioSesion.innerHTML = "";
        contenedorInicioSesion.innerHTML += `
        <section class="inicio">
        <a href="../html/index.html" class="btn__atras" id="btn__atras">Atrás
        </a>
        <form id="formulario">
            <fieldset class="recuadro">
                
                <legend>Inicia Sesión</legend>
            
                <label for="numero" class="titulo-input">Numero de celular</label>
                <input class="input_inicioSesion" type="number" name="numero" id="numero__celular" required>
                
                <label for="contraseña" class="titulo-input">Contraseña</label>
                <input  class="input_inicioSesion" type="password" name="contraseña" id="contraseña__celular" required>

                <button id="btn__entrar" class="btn__entrar">Entrar</button>
                

            </fieldset>
        </form>
        <div class="inicial__secundario">
            <img src="/data/imagenwpp.svg" alt="">
            <span class="spn__wpp">Whatsapp</span>

        </div>
    </section>`
    contenedorBienvenido.classList.add("hidden")
    const btnEntrar = document.getElementById('btn__entrar');
    entrando(btnEntrar)   
    });
}   

// pintar formulario de registro
export const pintarRegistro = () => { 
    registro.addEventListener("click", () => {

        contenedorBienvenido.classList.add("hidden")
        contenedorRegistro.classList.add("activa")
        contenedorRegistro.classList.remove("section__formulario")
        contenedorRegistro.innerHTML = "";
        contenedorRegistro.innerHTML += `

        <fieldset class="field">

            <form action="" class="formulario__registro">

            <a href="../html/index.html" class="btn__atras" id="btn__atras" class="registro__btn">Atrás
            </a>
    
            <label class="label__form" for="phone">Celular</label>
            <input class="input__form" type="number" id="phone" placeholder="Ingresa el celular" required>
            
            <label class="label__form" for="name">Nombre</label>
            <input class="input__form" type="text" id="name" placeholder="Ingresa el nombre" name="nombre" required>
    
            <label class="label__form" for="password">Contraseña</label>
            <input class="input__form" type="text" id="password" placeholder="Ingresa la contraseña" required>
    
            <label class="label__form" for="foto">Foto</label>
            <input class="input__form" type="text" id="foto__registro" placeholder="Ingresa la URL de la foto" required>
            
            <button class="btn__form" type="submit">Registrar</button>
        </form>
        </fieldset>
        
        `;

    const registroBoton = contenedorRegistro.querySelector(".btn__form")
    nuevoUsuario(registroBoton)
    });

}





