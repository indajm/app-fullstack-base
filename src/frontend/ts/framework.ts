/* Creamos otra clase que va a ser un framework propio para emprolijar el código 
Se va a encargar de hacer las peticiones a los servidores */

class FrameWork{
    public requestGET(url: string, listener: GetResponseListener){ //listener es a quién quiero que le avise
        //Vamos a hacer que nos responda a una interfaz en vez de a nuestro main

        /** Primero, genero el objeto de petición (es el objeto XMLHttpRequest) */
        let xml = new XMLHttpRequest();

        /** Segundo paso,  configuro qué función quiero que se ejecute cuando tenemos una respuesta del servidor */
        xml.onreadystatechange = function respuestaServidor() {
            if (xml.readyState == 4){ /** Significa que tenemos información para mostrar. Si el estado es 1, 2 o 3, todavía está procesando la info */
                listener.handleGetResponse(xml.status, xml.responseText);
            }
            
        }

        /** Tercer paso, abro un enlace de conexión con el servidor */
        xml.open("GET", url, true); /** La ruta es donde voy a hacer la petición. El true indica que la petición va a ser asíncrona */

        /** Por último, enviamos la información */
        xml.send();
    }


    public requestPOST(url: string, listener: PostResponseListener, newdata: object){
        console.log("newdata: ", newdata);
        let xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function (){
            if (xmlHttp.readyState == 4){ // Significa que tenemos información para mostrar. Si el estado es 1, 2 o 3, todavía está procesando la info
                console.log("XMLHttpRequest: ", xmlHttp);
                if (xmlHttp.status == 200){
                    listener.handlePostResponse(xmlHttp.status, xmlHttp.responseText);
                } else{
                    listener.handlePostResponse(xmlHttp.status, null);
                }
            }
        }
        
        console.log("url: " + url);
        xmlHttp.open("POST", url);
        console.log("Salgo de app.post");
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(JSON.stringify(newdata));
        console.log("stringify: ", JSON.stringify(newdata));
    }


    public requestDELETE(url: string, listener: DeleteResponseListener, data: any){ //listener es a quién quiero que le avise
        //Vamos a hacer que nos responda a una interfaz en vez de a nuestro main

        /** Primero, genero el objeto de petición (es el objeto XMLHttpRequest) */
        let xml = new XMLHttpRequest();

        /** Segundo paso,  configuro qué función quiero que se ejecute cuando tenemos una respuesta del servidor */
        xml.onreadystatechange = function respuestaServidor() {
            console.log(xml.readyState);
            if (xml.readyState == 4){ /** Significa que tenemos información para mostrar. Si el estado es 1, 2 o 3, todavía está procesando la info */
                listener.handleDeleteResponse(xml.status, xml.responseText);
            }
            
        }
        console.log("OPEN DELETE");
        /** Tercer paso, abro un enlace de conexión con el servidor */
        xml.open("DELETE", url, true); /** La ruta es donde voy a hacer la petición. El true indica que la petición va a ser asíncrona */
        xml.setRequestHeader("Content-Type", "application/json");
        /** Por último, enviamos la información */
        console.log("JSON: ", JSON.stringify(data));
        xml.send(JSON.stringify(data));
    }

    public getElementById(id: string):HTMLElement
    {
        let element:HTMLElement;
        element = document.getElementById(id);
        return element;
    }

    public current_button_click(id: string, listener: EventListenerObject){
        let id_element: HTMLElement = this.getElementById(id);
        id_element.addEventListener("click", listener);
    }

    
    public getElementByEvent(evt:Event):HTMLElement
    {
        return <HTMLElement>evt.target;
    }


    public getCurrentState(id:string):boolean{
        let elem:HTMLInputElement = <HTMLInputElement>this.getElementById(id);
        console.log("Element is checked? " + elem.checked);
        return elem.checked; //returns if the element is checked
        
    }
}