import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage {

  tower: NgModel; 
  estai: NgModel; 
  
  constructor(public modalCtrl: ModalController) { }

  onClick() {
    this.modalCtrl.dismiss();
  }

  logForm() {
    let data = [];
   
    
      
      if(!this.isStringEmpty(this.tower)) {
        data.push({'torre' : this.tower});
        if(!this.isStringEmpty(this.estai)) {
            data.push({'estai' : this.estai});
            this.modalCtrl.dismiss(data);
        }
      }
  }

  isStringEmpty(data : any) {
    if(data == undefined || data == '') {
      return true;
    } else {
      return false;
    }
  }

 

  

}
