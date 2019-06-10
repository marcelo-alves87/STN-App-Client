import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';

/**
 * Generated class for the MeasurementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-measurement',
  templateUrl: 'measurement.html',
})
export class MeasurementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurementPage');
  }

 /*  presentCalibrando() {
    const loader = this.loadingCtrl.create({
      content: "Calibrando...",
      duration: 5000
    });
    loader.present();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Arquivo',
      message: "Digite o nome do arquivo para exportação",
      inputs: [
        {
          name: 'Arquivo',
          placeholder: 'Arquivo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  } */
}
