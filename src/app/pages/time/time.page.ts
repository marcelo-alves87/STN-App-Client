import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AppServices } from '../../app.services';

/* npm install angular2-chartjs chart.js --save
npm install @types/chart.js --save */

@Component({
  selector: 'time-home',
  templateUrl: 'time.page.html',
  styleUrls: ['time.page.scss'],
})

export class TimePage implements OnInit {

  appServices:AppServices;
  @ViewChild(ChartComponent) chart: ChartComponent;
  type;
  data;
  options;

  
  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
	this.appServices = new AppServices(httpClient);
  }

  makechart() {
	this.type = 'line';
		this.data = {
			labels: [],
			datasets: [
        {
          label: 'DPF',
		  fill: true,
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
						barPercentage: .5,
						categoryPercentage: .2,
						isFixedWidth: true,
						//Number - Pixel width of the bar
						barWidth: 200,
						gridLines: {
							display: true
						},
						ticks: {
							min: 1,
							max: 1.6,
							stepSize: 0.1,
							fixedStepSize: 0.1,
						},
						
					}],
					xAxes: [{
						display: true,
						gridLines: {
							display: true
						},
						ticks: {
							min: 0,
							stepSize: 1,
							fixedStepSize: 1,
							fontSize: 15
						},
						scaleLabel: {
							display: true,
							labelString: 'Distância (m)',
							fontSize: 20
						}
					}],
				}
		}
  }

  ngOnInit() {
	this.makechart();
	setTimeout(() => {
		this.update()
	},1000);
  }

	toback() {
		this.navCtrl.back();
	}

	camera() {

		var a = document.createElement('a');
  		a.href = this.chart.chart.toBase64Image();
  		a.download = 'my_file_name.png';
		a.click(); 

	}

	update() {

		let mydata = Object.values(this.appServices.getTimeDomainData()['data']);
		
		mydata.forEach((element, index) => {
			this.chart.data.datasets[0].data[index] = element.vswr.toFixed(2)
			this.chart.data.labels[index] = element.time.toFixed(2) 
		});

		
		
		this.chart.chart.update();
	}
}
