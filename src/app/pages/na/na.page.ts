import { Component, ViewChild, OnInit } from '@angular/core';
import { AppServices } from '../../app.services';
import { ChartComponent } from 'angular2-chartjs';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-na',
  templateUrl: './na.page.html',
  styleUrls: ['./na.page.scss'],
})
export class NaPage implements OnInit {

  appServices:AppServices;
  @ViewChild(ChartComponent) chart: ChartComponent;
  type;
  data;
  options;
  
  constructor(public navCtrl: NavController, public httpClient: HttpClient, public socket: Socket) {
	  this.appServices = new AppServices(httpClient);
  }

  makechart() {
	this.type = 'line';
		this.data = {
			labels: [],
			datasets: [
        {
          label: 'NA',
		  fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
          spanGaps: false,
        }
      ]
		}
		this.options = {
			maintainAspectRatio: false,
			responsive: true,
			legend: { display: true },
			title: {
				display: true,
				text: ''
			},
			scales:
				{
					yAxes: [{
						// barPercentage: 0.4,
						barThickness: 20,
						barPercentage: .1,
						categoryPercentage: .1,
						isFixedWidth: true,						
						barWidth: 200,
						gridLines: {
							display: true
						},
            scaleLabel: {
							display: true,
							labelString: 'S11 (dB)',
							fontSize: 20
						},
					}],
					xAxes: [{
						display: true,
						gridLines: {
							display: true
						},
						scaleLabel: {
							display: true,
							labelString: 'Frequency (Hz)',
							fontSize: 20
						}
					}],
				}
		}
  }

  ngOnInit() {
    this.makechart();
    this.update();
    this.socket.connect();
  }

	toback() {
		this.navCtrl.back();
	}

	camera() {

		var a = document.createElement('a');
  		a.href = this.chart.chart.toBase64Image();
  		a.download = 'my_file_name.png';
		a.click();    
    this.socket.emit('test', 'Hello World' );
	}

	update() {

    this.appServices.getFrequencyData({}).subscribe((data) => {
      let mydata = Object.values(data['data']);
      
      mydata.forEach((element, index) => {
        this.chart.data.datasets[0].data[index] = element['s11'].toFixed(2)
        this.chart.data.labels[index] = element['freq'].toFixed(0) 
      });
      this.chart.chart.update();
    });   

    /* setTimeout(() => {
      this.update()
    },1000); */
	}
  
}
