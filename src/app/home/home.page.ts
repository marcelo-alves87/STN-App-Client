import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  
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
          label: 'Sell per week',
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
			responsive: false,
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
							display: false
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
							display: false
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

}
