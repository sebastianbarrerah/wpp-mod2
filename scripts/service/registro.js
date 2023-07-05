
import { APPIS } from "../modulos/appi.js";
// import { contenedorRegistro, registroBoton } from "../modulos/elementsDom.js";


const cargarContactos = async(url) => {
    const {data} = await axios.get(url)
    return data
}

export const nuevoUsuario = async (boton) =>{
    
    try {
        boton.addEventListener("click", async (e) => {
            e.preventDefault()
            const inputNombre = document.getElementById("name").value;
            const inputCelular = document.getElementById("phone").value;
            const inputContraseña = document.getElementById("password").value;
            const inputUrl = document.getElementById("foto__registro").value;

        
        const usuariosActuales = await cargarContactos(APPIS.URL_USUARIOS);
        
       
        const nuevoCelular = inputCelular;

        if(inputNombre == "" || inputCelular =="" || inputContraseña == "" || inputUrl ==""){
            Swal.fire({
                icon: 'info',
                title: 'Campo faltante',
            })
        }
        else{
            const compararCelular = usuariosActuales.find((user)=> user.Celular == nuevoCelular);
        
        if(compararCelular){
            Swal.fire({
                icon: 'info',
                title: 'Usuario ya registrado',
                footer: '<a href="">Regresa a la página de inicio</a>'
            })
            return
        }
        else{

            const newUsuario = {
                Nombre: inputNombre, 
                Celular:  inputCelular, 
                Contraseña: inputContraseña,
                Foto:inputUrl,
            }

            agregarUsuario(newUsuario); 
        }
        }

     });
        
    } catch (error) {
        console.log(error);
    }
}


const agregarUsuario = (newUsuario) =>{

    axios.post(APPIS.URL_USUARIOS, newUsuario,{
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then((response)=> {
        Swal.fire({
            icon: 'success',
            title: 'Usuario registrado exitosamente',
            footer: '<a href="">Regresa a la página de inicio</a>'
        })
        console.log('Usuario agregado', response.data)
    })
    .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no registrado',
            footer: '<a href="">Regresa a la página de inicio</a>'
        })
        console.log('Usuario no agregado exitosamente', error)

    })

    

}