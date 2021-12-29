class cards_devices{

    frmwrk:FrameWork;

        constructor(frmwrk:FrameWork){
            this.frmwrk=frmwrk;
        }

    showCards(data:DeviceParameters[]){

        let cards:string="";
        let is_checked:string="";
        let devicesUl:HTMLElement=this.frmwrk.getElementById("cards_for_devices");
        for (let i in data){
            if (data[i].state==1){
                is_checked = "checked";
            }else{
                is_checked = "";
            }
        
        if (data[i].dimmer==false){
            cards+= ` 
            <div class="row">
                <div class="col s12 m4">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${data[i].name}</span>
                            <p>${data[i].description}</p>
                            <div class="switch">
                                <label>
                                    Off
                                    <input 
                                        type="checkbox" ${is_checked} 
                                        id="device_${data[i].id}">
                                    <span class="lever"></span>
                                    On
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        }else{
            cards+= ` 
            <div class="row">
                <div class="col s12 m4">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${data[i].name}</span>
                            <p>${data[i].description}</p>
                            <p class="range-field">
                                <input 
                                type="range" 
                                id=dimmer_${data[i].id} 
                                min="0" 
                                max="100"
                                value = ${data[i].state} 
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>`
        }
        }
        devicesUl.innerHTML=cards;
    }
    
}