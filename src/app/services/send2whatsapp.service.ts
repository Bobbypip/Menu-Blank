import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Send2whatsappService {

  constructor() { }

  send(customerLat, customerLon, manualAddressOK, objects2Print){
    console.log("Whatsapp");
    let name = localStorage.getItem('customerName');
    let manualAddress = localStorage.getItem('manualAddress');
    let lat = customerLat;
    let lon = customerLon;
    let googleAddress = "https://www.google.com/maps/search/?api=1%26query="+lat+","+lon+"";
    let address = "";
    var order = "";
    manualAddressOK ? address = manualAddress : address = googleAddress;

    const getfPortionName = i => {

      let prt = objects2Print[i];
      let extraPotions = "";
      let dressings = "";

      if(prt.fExtraPortion){
        if ((prt[0].quantity > 0) || (prt[1].quantity > 0) || (prt[2].quantity > 0) || (prt[4].quantity > 0)){
          extraPotions = extraPotions + "Porciones Extras:" + "%0a";
          if(prt[0].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[0].quantity + " x " + prt[0].extraPortionName + "%0a"}
          if(prt[1].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[1].quantity + " x " + prt[1].extraPortionName + "%0a"}
          if(prt[2].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[2].quantity + " x " + prt[2].extraPortionName + "%0a"}
          if(prt[3].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[3].quantity + " x " + prt[3].extraPortionName + "%0a"}
        }
      }

      if(prt.fDressingsOrder.cebollaAsada ||
         prt.fDressingsOrder.chimichurri ||
         prt.fDressingsOrder.cilantro ||
         prt.fDressingsOrder.ketchup ||
         prt.fDressingsOrder.pinaHabanero ||
         prt.fDressingsOrder.quesoAmarillo ||
         prt.fDressingsOrder.ranch ||
         prt.fDressingsOrder.salsaBBQ ||
         prt.fDressingsOrder.salsaBuffalo ||
         prt.fDressingsOrder.salsaVerde ||
         prt.fDressingsOrder.tamarindoPicante){
          dressings = dressings + "Aderezos:" + "%0a"

          if(prt.fDressingsOrder.cebollaAsada){ dressings = dressings + "%20%20%20%20" + "Cebolla asada%0a" }
          if(prt.fDressingsOrder.chimichurri){ dressings = dressings + "%20%20%20%20" + "Chimichurri%0a" }
          if(prt.fDressingsOrder.cilantro){ dressings = dressings + "%20%20%20%20" + "Cilantro%0a" }
          if(prt.fDressingsOrder.ketchup){ dressings = dressings + "%20%20%20%20" + "Cilantro%0a" }
          if(prt.fDressingsOrder.pinaHabanero){ dressings = dressings + "%20%20%20%20" + "Piña Habanero%0a" }
          if(prt.fDressingsOrder.quesoAmarillo){ dressings = dressings + "%20%20%20%20" + "Queso Amarillo%0a" }
          if(prt.fDressingsOrder.ranch){ dressings = dressings + "%20%20%20%20" + "Ranch%0a" }
          if(prt.fDressingsOrder.salsaBBQ){ dressings = dressings + "%20%20%20%20" + "Salasa BBQ%0a" }
          if(prt.fDressingsOrder.salsaBuffalo){ dressings = dressings + "%20%20%20%20" + "Salsa Buffalo%0a" }
          if(prt.fDressingsOrder.salsaVerde){ dressings = dressings + "%20%20%20%20" + "Salsa Verde%0a" }
          if(prt.fDressingsOrder.tamarindoPicante){ dressings = dressings + "%20%20%20%20" + "Tamarindo Picante%0a" }
        }

      return "%0a" + "%2aOrden%2a" + "%0a" + "Porción: "+ prt.fPortion.name + "%0a" + extraPotions + dressings;
    }

    const forLoop = async _ => {

      console.log('Start')

      for (var i = 0; i<objects2Print.length; i++){
            order = order + await getfPortionName(i);
      }

      if(localStorage.getItem("customerName")){
        if(localStorage.getItem("customerName")){
          window.location.href = "https://api.whatsapp.com/send?phone=5214612543596&text=%2aNombre:%2a%20"+name+"%0a%2aDirección:%2a%20"+address+"%0a%0a%2aResumen%20del%20pedido:%2a%0a"+order;
          localStorage.clear();
        }else{
          alert("Agrega al menos una orden a tu pedido")
        }
      }else{
        alert("Proporciona tu nombre para levantar tu pedido")
      }
      
      console.log('End');
    }

    forLoop(1);
  }
}
