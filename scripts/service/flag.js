
import { APPIS } from "../modulos/appi.js";
import { estadoPerfil } from "../modulos/elementsDom.js";

const BaseUsuarios = async() => {
    const { data } = await axios.get(APPIS.URL_USUARIOS)
    return data
}

export const flag = async() => {
    const usuarios = await BaseUsuarios()
    
    const idPrincipal = JSON.parse(localStorage.getItem("identificador"));
    
    
    usuarios.forEach (async (element,index) => {
        
        if (idPrincipal) {
            
            
          {
                
                try {
                    const response = await axios.patch(`${APPIS.URL_USUARIOS}/${idPrincipal}`, {Estado: true});

                    // console.log(usuarios);
                } catch (error) {
                    console.log(error, "fallo el flag");
                }
     
                // estadoPerfil.style.display = "none"
            }
        }
    });


}
