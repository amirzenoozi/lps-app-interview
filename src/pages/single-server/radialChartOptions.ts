import { ApexOptions } from 'apexcharts';

const radialChartOptions: ApexOptions = {
	chart: {
		height: 350,
		type: 'radialBar',
		offsetY: -10,
		animations: {
			enabled: false,
			easing: 'linear',
			speed: 0,
		},
	},
	grid: {
		padding: {
			bottom: 10
		}
	},
	plotOptions: {
		radialBar: {
			startAngle: -135,
			endAngle: 135,
			dataLabels: {
				name: {
					show: false,
					fontSize: '16px',
					color: undefined,
					offsetY: 40
				},
				value: {
					offsetY: 60,
					fontSize: '16px',
					color: undefined,
					formatter: function (val: any) {
						return val + "%";
					}
				}
			}
		}
	},
	fill: {
		type: 'solid',
		colors: [({ value }: any) => {
			if(value < 20) {
				return '#5e943b'
			} else if (value >= 21 && value < 40) {
				return '#a5ac3e'
			}else if (value >= 41 && value < 60) {
				return '#ffdc1b'
			}else if (value >= 61 && value < 80) {
				return '#ec9b00'
			}else if (value >= 81) {
				return '#d9534f'
			}
		}],
	},
	stroke: {
		dashArray: 4,
	},
};

export default radialChartOptions;
