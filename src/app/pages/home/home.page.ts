import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController, MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AppServices } from '../../app.services';
import { ModalPage } from '../modal/modal.page';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
 })
export class HomePage {

  appServices:AppServices;
  loader: any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public httpClient: HttpClient, public modalController: ModalController, public menuController : MenuController) {
    
    this.appServices = new AppServices(httpClient);
    
  }

  shutdown() {
   console.log('a')
  }

  openMenu() {
    this.menuController.open();
  }





  async createLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Por favor, aguarde ...',
      cssClass: 'loading-custom'
    });
    this.loader.present();
  }

  async showConnectionAndCalibrationStatus(data) {
    
    if(data.status == 0) {

      const alert = await this.alertCtrl.create({
        header: 'Mensagem',
        //subHeader: 'Subtitle',
        message: 'Não foi possível realizar a conexão com o intrumento.',
        buttons: ['Fechar'],
        cssClass: 'alert-custom'
      });
      this.loader.dismiss();
      await alert.present(); 

    }

    else if(data.status == 1) {
      const alert = await this.alertCtrl.create({
        header: 'Mensagem',
        //subHeader: 'Subtitle',
        message: 'Nenhuma calibração foi encontrada. Por favor, realize a calibração mecânica com as cargas de calibração.',
        buttons: ['Continuar'],
        cssClass: 'alert-custom'
      });
      this.loader.dismiss();
      await alert.present(); 
    }

    else if(data.status == 2) {
        const alert = await this.alertCtrl.create({
          header: 'Mensagem',
          //subHeader: 'Subtitle',
          message: 'A última calibração foi feita em ' + data.date + '. Deseja realizar uma nova calibração?',
          buttons: [{ text: 'Não', cssClass: 'secondary', handler: () => {
            alert.dismiss();
            //this.createMeasurementForm();
          }}, {
            text: 'Sim',
            handler: () => {
              //console.log('Fazer a calibração');
            }
          }],
          cssClass: 'alert-custom'
        });
        this.loader.dismiss();
        await alert.present(); 
    }
  }

  async showAlertAndCloseLoading(data) {
    const alert = await this.alertCtrl.create({
      header: 'Resultado da Medição',
      //subHeader: 'Subtitle',
      message: 'A haste está ' + '<strong>' + data.print + '</strong>',
      buttons: ['Fechar'],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }

  
  myclick() {
    this.checkConnectionAndCalibrationStatus();
    
  }

  checkConnectionAndCalibrationStatus() {
    this.createLoading();
    this.appServices.checkConnectionAndCalibrationStatus().subscribe((data:any) => {
      console.log(data);
      this.showConnectionAndCalibrationStatus(data);
    });
  }

 async createMeasurementForm() {
  
  const modal = await this.modalController.create({
    component: ModalPage,
    cssClass: 'modal-custom',
      componentProps: {
        //'image': data.image
      }
  });
  modal.onDidDismiss()
      .then((data : any) => {
        this.executeProcess(data.data); // Here's your selected user!
    });
  return await modal.present();
  }
  executeProcess(data) {
    this.appServices.processFile(data).subscribe((data1) => {
        console.log(data1);
    });
  }

   
   /* processFile(fileEnconded64) {
    this.appServices.processFile(fileEnconded64).subscribe((data:any) => {
      if(data.print != undefined) {
        this.showAlertAndCloseLoading(data);
      } else if(data.image != undefined) {
        this.showModalAndCloseLoading(data);
      }
    });    
  } */

 

 /*  // onFileChange(event){
  //   let files = event.target.files;
  //   this.createLoading();
  //   this.encode64File(files[0]);
  //   this.fileInput.nativeElement.value = ''; 
    
  } 
 */
 

  
 // encode64File(inputValue: any): void {
  //   var myReader:FileReader = new FileReader();
  
  //   myReader.onloadend = (e) => {
  //     this.processFile(myReader.result);
  //   }
  //   myReader.readAsDataURL(inputValue);
  // }
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
