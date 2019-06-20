import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { MeasurementPage } from '../measurement/measurement';
import { HttpClient } from '@angular/common/http';
import { AppServices } from '../../app.services';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 })
export class HomePage {

  @ViewChild('fileInput') fileInput: any;
  appServices:AppServices;
  loader: any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public httpClient: HttpClient, public modalController: ModalController) {
    
    this.appServices = new AppServices(httpClient);
    
  }

  async createLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Por favor, aguarde ...'
    });
    this.loader.present();
  }

  async createModal(data) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'image': data.print
      }
    });
    return await modal.present();
  }

   processFile(fileEnconded64) {
    this.appServices.processFile(fileEnconded64).subscribe((data) => {
       // Rede Neural
      //this.showAlertAndCloseLoading(data);

      //Figura do Tempo
      this.showModalAndCloseLoading(data);
    });    
  }

  showModalAndCloseLoading(data) {
    this.loader.dismiss();
    this.createModal(data);    
  }

  async showAlertAndCloseLoading(data) {
    const alert = await this.alertCtrl.create({
      header: 'Resultado da Medição',
      //subHeader: 'Subtitle',
      message: 'A haste está ' + 'data.print',
      buttons: ['Fechar']
    });
    this.loader.dismiss();
    await alert.present(); 
  }

  onFileChange(event){
    let files = event.target.files;
    this.createLoading();
    this.encode64File(files[0]);
    this.fileInput.nativeElement.value = ''; 
    
  } 

  encode64File(inputValue: any): void {
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      this.processFile(myReader.result);
    }
    myReader.readAsDataURL(inputValue);
  }

  /* getData() {
    this.httpClient.get('http://localhost:3000')
    .subscribe((data) => {
      console.log(data);
    })
  } */

  // init() {
  //   this.navCtrl.push(MeasurementPage);
  // }

 /*  init() {
    const prompt = this.alertCtrl.create({
      title: 'Identificação do Estai',
      message: "Por favor, digite o nome da Linha, Torre e  Estai",
      inputs: [
        {
          name: 'Id',
          placeholder: 'Linha, Torre e Estai'
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
          text: 'Próximo',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}*/
 
     /*  init() {
        let alert = this.alertCtrl.create({
          title: 'Resultado da Medição',
          message: 'Foi detectado corrosão nessa haste de âncora. Para mais detalhes, escolha uma opção abaixo.',
          buttons: [
            {
              text: 'Exportar PDF'
            },
            {
              text: 'Encerrar',
              
            }
          ]
        });
        //this.getData();
        //alert.present();
      } */
}
