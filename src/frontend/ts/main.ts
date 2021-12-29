interface DeviceParameters{
    id: number;
    name: string;
    description: string;
    state: number;
    type: number;
    dimmer: boolean;
}

/** Hagamos una clase para  estructurar los cambios. Heredamos las interfaces: EventListenerObject, GetResponseListener */
class Main implements EventListenerObject, GetResponseListener, PostResponseListener{
     private nombre: string;
     /** Definimos un array de tipo User */
     private lista: Array<User> = new Array();
     private framework:FrameWork = new FrameWork();
     private cards_devices:cards_devices;


     public getElement(id: string): HTMLElement{
        /** Recuperamos el botón que tiene ese id*/
        return document.getElementById(id)
     }

    public handleEvent(ev:Event){ /** Se entra a esta función cuando pasa cualquier evento de los que declaré más abajo */
        console.log("Entró a handleEvent");
        let element: HTMLElement = this.framework.getElementByEvent(ev);
        
        console.log("Clicked element: ", element.id);

        switch(element.id){
            case "btn":
                console.log("Estoy en case btn");
                this.framework.requestGET("devices", this);
                break;
            default: 
                console.log("Estoy adentro del switch default");
                console.log("element.id: ", element.id);

                if (element.id.includes("device")){
                    console.log("A device with an on-off switch was pressed")
                    let data:object = {"id":element.id, "state":this.framework.getCurrentState(element.id)};
                    this.framework.requestPost("devices", this, data);
                }else{
                    console.log("A device with a dimmer was pressed")
                    /* Get the value from the slider. I need to add <HTMLInputElement>(...).value because TypeScript is typesafe,
                    so, if I don't add that, it works but it returns an error saying 'The property value does not exist on value of
                    type HTMLElement. Solution: https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
                    */
                    var inputValue = (<HTMLInputElement>this.framework.getElementByEvent(ev)).value;
                    let data:object = {"id":element.id, "state":inputValue};
                    this.framework.requestPost("devices", this, data);
                }
                

                break;
        }
        
    }

    public handleGetResponse(status: number, response: string){
        console.log("status: " + status);

        //Let's print the full content of http://localhost:8080/devices
        
        console.log(response);
        
        if (status==200){
            let respuestaObjetos:Array<DeviceParameters> = JSON.parse(response);
            console.log("data: ", respuestaObjetos);
            //this.framework.current_button_click("device_1", this);
            this.cards_devices.showCards(respuestaObjetos);

            document.getElementById("cards_for_devices");

            for (let disp in respuestaObjetos){
                if (respuestaObjetos[disp].dimmer==false){
                    this.framework.current_button_click(`device_${respuestaObjetos[disp].id}`, this);
                }else{
                    this.framework.current_button_onclick(`dimmer_${respuestaObjetos[disp].id}`, this);
                }
            }
            /*for (let disp of respuestaObjetos){
                console.log(disp.name, disp.state);
            }*/
        }
    }

    public handlePostResponse(status: number, response:string):void{
        if (status==200){
            console.log("response handlePost: ", response);
        }
        else{
            console.log("response handlePost: STATUS NOT 200");
        }
    }

    /** Veamos el uso de Ajax 
     * Va a ir al servidor a consultar el listado de dispositivos (lo que veo en localhost:8000/devices)
    */
    public consultarDisp(): void{
        
    }


    public main(){
        /*let button = this.getElement("btn");
        button.addEventListener("click", this);

        let button_AC_Kitchen = this.getElement("AC_Kitchen");
        button_AC_Kitchen.addEventListener("AC_Kitchen", this);*/

        this.framework = new FrameWork();
        this.cards_devices = new cards_devices(this.framework);
        this.framework.requestGET("devices", this);
        this.framework.current_button_click("btn", this);
    }
    
}

window.onload = function inicio() {
    
    let miObjeto: Main = new Main();
    miObjeto.main();

    // Los botones (id, name) están definidos en index.html

    //M.AutoInit;

}