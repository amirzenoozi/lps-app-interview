import { ApexOptions } from 'apexcharts';

const lineChartOptions: ApexOptions = {
	chart: {
		id: 'realtime',
		height: 350,
		type: 'line',
		animations: {
			enabled: false,
			easing: 'linear',
			dynamicAnimation: {
				speed: 200
			}
		},
		toolbar: {
			show: false
		},
		zoom: {
			enabled: false
		}
	},
	grid: {
		padding: {
			bottom: 40
		}
	},
	dataLabels: {
		enabled: false
	},
	stroke: {
		curve: 'smooth'
	},
	markers: {
		size: 0
	},
	xaxis: {
		type: 'datetime',
	},
	yaxis: {
		max: 100,
		min: 0,
	},
	legend: {
		position: 'bottom',
		horizontalAlign: 'center',
		floating: true,
		offsetY: 0,
	}
};

export default lineChartOptions;
