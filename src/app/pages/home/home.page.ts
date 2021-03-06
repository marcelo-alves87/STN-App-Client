import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController, MenuController, Events } from '@ionic/angular';
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

    
  constructor(public navCtrl: NavController,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public httpClient: HttpClient, public modalController: ModalController, public menuController : MenuController, public events: Events) {
    
    this.appServices = new AppServices(httpClient);

    events.subscribe('about', (data) => {
      this.showAboutAlert();
    });
        
  }

  async showAboutAlert() {
    this.menuController.close();
    const alert = this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Este sistema é resultado de um projeto de pesquisa desenvolvido pelas instituições UFPE – Universidade Federal de Pernambuco, e IATI – Instituto Avançado de Tecnologia e Inovação, para a empresa Sistema de Transmissão Nordeste S.A. - STN, vinculado ao Programa de Pesquisa e Desenvolvimento do Setor Elétrico Brasileiro promovido pela ANEEL – Agência Nacional de Energia Elétrica.',
      buttons: ['Fechar'],
      cssClass: 'alert-custom alert-about'
    });
    (await alert).present(); 
  }

  async shutdown() {
    const alert = this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Deseja realmente fechar a aplicação?',
      buttons: ['Não', {
        text: 'Sim',
        handler: () => {
          this.shutdownNow();
        }
      }],
      cssClass: 'alert-custom'
    });
    (await alert).present(); 
  }
  shutdownNow() {
    this.appServices.shutdown().subscribe((data:any) => {
               
    });
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


  async createNonVNAConnectionAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Não foi possível realizar a conexão com o intrumento. Por favor, tente novamente.',
      buttons: ['Fechar'],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }

  async showConnectionAndCalibrationStatus(data) {
   
    if(data.status == 1) {
     
      this.appServices.checkCalAlreadySaved().subscribe((data:any) => {
        this.loader.dismiss();
        if(data.status == 0) {
         this.startNewCalibrationAlert();
        } else {
          this.confirmLoadedCalAlert(data);
        }         
      });
    } else {
      this.createNonVNAConnectionAlert();
    }


    /*if(data.status == '1') {
      this.appServices.checkCalAlreadySaved().subscribe((data:any) => {
        console.log(data);         
      }); 
    }
    if(data.status === '0.1.0') {
      this.startNewCalibrationAlert();
    }

    if(data.status === '0.1.1') {
      this.confirmLoadedCalAlert(data);
    }
    
    else if(data.status == 0) {

      this.createNonVNAConnection();

    }

    else if(data.status === '1.1') {
      this.startNewCalibrationAlert();
    }

    else if(data.status == 1) {
        
    }*/
  }

async confirmLoadedCalAlert(data) {
  const alert = await this.alertCtrl.create({
    header: 'Mensagem',
    //subHeader: 'Subtitle',
    message: 'A última calibração foi feita em ' + data.date.trim() +'. Deseja realizar uma nova calibração?',
    buttons: [{ text: 'Não', cssClass: 'secondary', handler: () => {
      alert.dismiss();
      this.createMeasurementForm();
      //this.startMeasurement();
    }}, {
      text: 'Sim',
      handler: () => {
        this.startNewCalibration();
      }
    }],
    cssClass: 'alert-custom'
  });
  this.loader.dismiss();
  await alert.present(); 
}

async startNewCalibrationAlert() {
  const alert = await this.alertCtrl.create({
    header: 'Mensagem',
    //subHeader: 'Subtitle',
    message: 'Nenhuma calibração foi encontrada. Por favor, realize a calibração mecânica com as cargas de calibração.',
    buttons: ['Fechar', { text : 'Continuar', handler: () => {
      alert.dismiss();
      this.startNewCalibration();
    }}],
    cssClass: 'alert-custom'
  });
  this.loader.dismiss();
  await alert.present();
}


 async startNewCalibration() {
    this.appServices.startNewCalibration().subscribe((data:any) => {
         
          if(data.status === '1.0') {
            this.createNonVNAConnectionAlert();
          } else if(data.status === '1.1') {
            this.createInitCalibrationProcess();
          } 
    });    
  }
 async createInitCalibrationProcess() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, continue o processo de calibração com as cargas de calibração em mãos.',
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.createOpenCalibration();
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }
  async createOpenCalibration() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, conecte a carga Open e continue o processo.',
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.appServices.openCalibrationStatus().subscribe(data => {
            if(data === '2.1') {
              this.createNonVNAConnectionAlert();
            } else {
              this.createShortCalibration();
            }
        });
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }
  
  async createShortCalibration() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, conecte a carga Short e continue o processo.',
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.appServices.shortCalibrationStatus().subscribe(data => {
            if(data === '3.1') {
              this.createNonVNAConnectionAlert();
            } else {
              this.createLoadCalibration();
            }
        });
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }
  async createLoadCalibration() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, conecte a carga Load e continue o processo.',
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.appServices.loadCalibrationStatus().subscribe(data => {
            if(data === '4.1') {
              this.createNonVNAConnectionAlert();
            } else {
              this.createAlertSaveCalibration();
            }
        });
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }

 async createAlertSaveCalibration() {
    this.loader = await this.loadingCtrl.create({
      message: 'Por favor, aguarde a finalização da calibração ...',
      cssClass: 'loading-custom'
    });
    this.loader.present();
    this.appServices.saveCalibrationStatus().subscribe(data => {
      if(data === '5.1') {
        this.createNonVNAConnectionAlert();
      } else {
        this.loader.dismiss();
        this.createMeasurementForm();
        //this.startMeasurement();
      }
    });
  }
  
  

  async showAlertAndCloseLoading(data) {
    var message = ''
    //console.log(data['data1'])
    
    if(data['data1'] < 0.5) {
      var value = (1 - data['data1']) * 100 
      var value2 = data['data1'] * 100 
      message = 'Haste ' + value.toFixed(2) + ' % normal e ' +  value2.toFixed(2) + 'corroída.'   
    } else {
      var value = (1 - data['data1']) * 100 
      var value2 = (data['data1']) * 100 
      message = 'Haste ' + value.toFixed(2) + ' % normal e ' +  value2.toFixed(2) + 'corroída.'  
    }
    
    const alert = await this.alertCtrl.create({
      header: 'Condição da Haste',
      //subHeader: 'Subtitle',

      message: message,
      buttons: [{text : 'Fechar'}, { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.repeatMeasureAgain()
      }}],
      cssClass: 'alert-custom alert-final'
    });
    this.loader.dismiss();
    await alert.present(); 
   
  }

  async repeatMeasureAgain() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Deseja medir uma nova haste?',
      buttons: ['Não', { text : 'Sim', handler: () => {
        alert.dismiss();
        this.createConnectionAlert();
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present();
  }

  
  myclick() {
    this.createConnectionAlert();
  }


  // 1 Passo
  async createConnectionAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, conecte o cabo coaxial ao VNA.',
      buttons: ['Fechar', { text : 'Continuar', handler: () => {
        alert.dismiss();
        this.checkConnectionAndCalibrationStatus();
      }}],
      cssClass: 'alert-custom'
    });
    await alert.present();
  }

  checkConnectionAndCalibrationStatus() {
    this.createLoading();
    this.appServices.checkConnectionAndCalibrationStatus().subscribe((data:any) => {
      //console.log(data);
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
        this.executeProcess(data); // Here's your selected user!
    });
  return await modal.present();
  }
  executeProcess(data) {
      this.createConnectionAgainAlert(data);
  }
  
  async createConnectionAgainAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'O cabo coaxial foi conectado ao MDSC?',
      buttons: [{ text : 'Não', handler: () => {
        alert.dismiss();
        this.createConnectionAlert();
      }}, { text : 'Sim', handler: () => {
        alert.dismiss();
        this.createInitMeasurementAlert(data);
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present();
  }

  async createInitMeasurementAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Iniciar medição.',
      buttons: [{ text : 'Fechar'}, { text : 'Continuar', handler: () => {
        alert.dismiss();
        this.startMeasurement(data);
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present();
  }

  async createMeasurementLoading() {
    this.loader = await this.loadingCtrl.create({
      message: 'Correlação encontrada. Processo de análise sendo efetuado. Por favor aguarde ...',
      cssClass: 'loading-custom'
    });
    this.loader.present();
  }

  async processData() {
    this.createMeasurementLoading();
    this.appServices.processFile().subscribe((data1) => {
      this.loader.dismiss();
      this.showAlertAndCloseLoading(data1);
    });    
  }

  getCorrImage(corr_value) {
    var num = (corr_value * 100).toFixed(0)
    var num1 = parseInt(num)
    var vel_img = 'Vel_1.png';
    if(num1 <= 8.3333) {
      vel_img = 'Vel_1.png'
    } else if(num1 > 8.3333 && num1 <= 16.6666) {
      vel_img = 'Vel_2.png'
    } else if(num1 > 16.666 && num1 <= 25) {
      vel_img = 'Vel_3.png'
    } else if(num1 > 25 && num1 <= 33.333) {
      vel_img = 'Vel_4.png'
    } else if(num1 > 33.333 && num1 <= 41.666) {
      vel_img = 'Vel_5.png'
    } else if(num1 > 41.666 && num1 <= 50) {
      vel_img = 'Vel_6.png'
    } else if(num1 > 50 && num1 <= 58.333) {
      vel_img = 'Vel_7.png'
    } else if(num1 > 58.333 && num1 <= 66.666) {
      vel_img = 'Vel_8.png'
    } else if(num1 > 66.666 && num1 <= 75) {
      vel_img = 'Vel_9.png'
    } else if(num1 > 75 && num1 <= 83.333) {
      vel_img = 'Vel_10.png'
    } else if(num1 > 83.333 && num1 <= 91.666) {
      vel_img = 'Vel_11.png'
    } else if(num1 > 91.666) {
      vel_img = "Vel_12.png"
    }
    return vel_img
  }
 
 
  async startOtherMeasurement(data) {
    data['corr'] += 1;

    var message1 = 'Dados não correlacionados. Por favor, remonte o sistema e efetue mais uma medição.';

    if(data['corr_value'] != undefined) {
      var vel_img = this.getCorrImage(data['corr_value'])
      var num = (data['corr_value'] * 100).toFixed(0)      
      message1 = '<ion-grid style="height: 100%"><ion-row justify-content-center><img class="velocity" src="../assets/imgs/' + vel_img + '"/></ion-row><ion-row class="velocity-percent-row" justify-content-center><span class="velocity-percent">%</span></ion-row><ion-row justify-content-center><span class="velocity-text">' + num + '</span></ion-row><ion-row class="process-result-row" justify-content-center><span class="process-result">' + message1 + '</ion-row></ion-grid>'
    }
    
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: message1,
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.createLoading();
        this.appServices.startMeasurement(data).subscribe((data1) => {
        
         this.loader.dismiss();
          if(data1['data'] == 0) {
            this.startOtherMeasurement(data);
          } else if(data1['data'] == 2) {
            this.processData();
          } else if(data1['data'] == 1) {
            this.creatDefaultAlert('Os dados não estão correlacionados. A medição será invalidada.')
          } else if(data1['data'] == 3) {
            data['corr_value'] = data1['corr']
            this.startOtherMeasurement(data);
          }
        });
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 

  }

  async creatDefaultAlert(message1) {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: message1,
      buttons: ['Fechar'],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
  }

  async startMeasurement(data2) {
    const alert = await this.alertCtrl.create({
      header: 'Mensagem',
      //subHeader: 'Subtitle',
      message: 'Por favor, realize a montagem do MDSC e selecione CONTINUAR para iniciar a medição.',
      buttons: [{ text: 'Fechar'} , { text: 'Continuar', handler: () => {
        alert.dismiss();
        this.createLoading();
        data2['corr'] = 1
        this.appServices.startMeasurement(data2).subscribe((data1) => {
          this.loader.dismiss();
          if(data1['data'] == 0) {
            this.startOtherMeasurement(data2);
          } else {
            // criar alerta de erro
          }
        });
      }}],
      cssClass: 'alert-custom'
    });
    this.loader.dismiss();
    await alert.present(); 
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
