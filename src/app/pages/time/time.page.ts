import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';
import { NavController } from '@ionic/angular';
/* npm install angular2-chartjs chart.js --save
npm install @types/chart.js --save */

@Component({
  selector: 'time-home',
  templateUrl: 'time.page.html',
  styleUrls: ['time.page.scss'],
})

export class TimePage implements OnInit {
  
  constructor(public navCtrl: NavController) {

  }

  @ViewChild(ChartComponent) chart: ChartComponent;
	type;
	data;
	options;

  ngOnInit() {
    
		this.type = 'line';
		this.data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
			datasets: [
        {
          label: 'Distância para Faulta',
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
          data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
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
							min: 0,
							stepSize: 1,
							fixedStepSize: 1,
						}
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
						}
					}],
				}
		}
	}

	toback() {
		this.navCtrl.back();
	}

}
