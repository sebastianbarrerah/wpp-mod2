
import { contenedorTarjetas, fotoPerfil, buscador, perfil, atras, nombrePerfil, BotonEditar, camara, fotoAcambiar, fotoPerfilNueva, fotoIdPrincipal } from "../modulos/elementsDom.js"; 
import { APPIS} from "../modulos/appi.js"




//Mostrar y ocultar ventana de editar perfil 
export const agregandoPerfil = () => {
    fotoPerfil.addEventListener("click", () => {
        buscador.classList.add("oculta")
        buscador.classList.remove("contenedor_buscar")
        contenedorTarjetas.classList.add("ocultas")
        contenedorTarjetas.classList.remove("contenedor_contactos")
        perfil.classList.remove("perfil")
        perfil.classList.add("contenedor_perfil")
    
    });

    atras.addEventListener("click", () => {

        perfil.classList.remove("contenedor_perfil")
        perfil.classList.add("perfil")

        buscador.classList.add("contenedor_buscar")
        buscador.classList.remove("oculta")

        contenedorTarjetas.classList.remove("ocultas")
        contenedorTarjetas.classList.add("contenedor_contactos")
    })
}; 


//Editar nombre de perfil y foto de esa barra de perfil
export const editarPerfil = async() => {
    BotonEditar.addEventListener("click", (e) => {
    nombrePerfil.focus()
    let ValorInput= nombrePerfil.value
    let nombreUsuario = nombrePerfil.placeholder
    nombrePerfil.setAttribute("placeholder", ValorInput)
    console.log(nombreUsuario);
    nombrePerfil.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault(); 
          nombrePerfil.blur();
        }
      });
    })  

    camara.addEventListener("click", () => {
        let fotoNueva = prompt('Ingrese la URL de la foto')
        // if (fotoNueva) {
        //   fotoAcambiar.setAttribute("src", fotoNueva);
        //   fotoPerfilNueva.setAttribute("src", fotoNueva);
         
        // }
        cambiarFoto(fotoNueva); 

    });
}


export const traerFotos = async() => {
  const {data} = await axios.get(APPIS.URL_USUARIOS)
  return data
}

export const cambiarFoto = async(src) =>{
  const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
  
  let indicador = idPrincipal;

  let arrayFotos = await traerFotos()
  arrayFotos.forEach(item  => {
    
    if(item.id == indicador){ 
      let Nombre = item.Nombre;
      let Celular = item.Celular;
      let Contraseña = item.Contraseña;
      let Estado = item.Estado;
      let Información = item.Informción;
      let Fecha_hora = item.Fecha_hora;
      
      
    axios.put(`${APPIS.URL_USUARIOS}/${indicador}`, { Foto: src, Nombre: Nombre, Celular: Celular, Contraseña: Contraseña, Estado: Estado, Informción: Información, Fecha_hora: Fecha_hora })
    .then(response => {
      // item.Foto = src;
      
      console.log('si da')
      location.reload()
    })
    .catch(error=>{
      console.log('error')
    })
    
    }

  });
  

}

// const axios = require('axios');

