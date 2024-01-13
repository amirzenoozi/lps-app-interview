import type { ApexOptions } from 'apexcharts'

const pieChartOptions: ApexOptions = {
	chart: {
		animations: {
			enabled: false
		}
	},
	labels: ['Server 01', 'Server 02', 'Server 03', 'Server 04', 'Server 05'],
	responsive: [{
		breakpoint: 480,
		options: {
			chart: {
				width: 200
			},
			legend: {
				position: 'bottom'
			}
		}
	}]
}

export default pieChartOptions
