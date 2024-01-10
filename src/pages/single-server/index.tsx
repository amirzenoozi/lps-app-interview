import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/container';
import FlexCol from '../../components/flex-col';
import FlexRow from '../../components/flex-row';
import WidgetCard from '../../components/widget-card';
import './style.scss';
import { WebSocketConnection } from '../../modules/web-socket';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { useParams } from 'react-router-dom';

function SingleServer() {
	const { t } = useTranslation();
	const { serverId } = useParams<{ serverId: string }>();
	const streamMemoryRef = useRef<any>(null);
	const streamCPURef = useRef<any>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [cpuUsage, setCpuUsage] = useState<Array<number>>([]);
	const [memoryUsage, setMemoryUsage] = useState<Array<number>>([]);
	const [cpuUsageTimeline, setCpuUsageTimeline] = useState<Array<any>>([[], [], [], []]);
	const [prevTime, setPrevTime] = useState<number>(0);

	useEffect(() => {
		let socketClient = new WebSocketConnection({baseURL: 'wss://lps-monitoring.up.railway.app/realtime'});

		if (serverId !== undefined) {

			socketClient.onSocketOpened(() => {
				if (!isConnected) {
					socketClient.emitSocketMessage({"type": "all", "machine": serverId, "subscribe": true});
				}
			});

			socketClient.onSocketMessage((msg: any) => {
				if ('success' in JSON.parse(msg.data)) {
					setIsConnected(JSON.parse(msg.data).success);
				} else {
					const message = JSON.parse(msg.data);

					// It Will Update Every 1 Second Since We Have Repeated Data
					if (message.timestamp - prevTime > 1000) {
						setPrevTime(message.timestamp);
						setCpuUsage(message.cpu.map((item: any) => item.usage));
						setMemoryUsage((prev: any) => [...prev, [message.timestamp, message.memory.usedPercentage]]);
						setCpuUsageTimeline((prev: any) => {
							return [
								[...prev[0], [message.timestamp, message.cpu[0].usage]],
								[...prev[1], [message.timestamp, message.cpu[1].usage]],
								[...prev[2], [message.timestamp, message.cpu[2].usage]],
								[...prev[3], [message.timestamp, message.cpu[3].usage]],
							];
						});
					}
				}
			});

			socketClient.onSocketErrored((err: any) => {
				setIsConnected(false);
				socketClient.closeConnection();
				socketClient = new WebSocketConnection({baseURL: 'wss://lps-monitoring.up.railway.app/realtime'});
			});
		}

		return () => {
			socketClient.closeConnection();
		};
	}, [serverId]);

	useEffect(() => {
		streamMemoryRef.current?.chart?.updateSeries([
			{
				data: memoryUsage.slice(Math.max(memoryUsage.length - 20, 0)),
				name: 'Used Memory',
				color: '#ec9b00',
			},
		]);
	}, [memoryUsage]);

	useEffect(() => {
		streamCPURef.current?.chart?.updateSeries([
			{
				data: cpuUsageTimeline[0].slice(Math.max(cpuUsageTimeline[0].length - 20, 0)) || [],
				name: 'CPU #1',
				color: '#003f5c',
			},{
				data: cpuUsageTimeline[1].slice(Math.max(cpuUsageTimeline[1].length - 20, 0)) || [],
				name: 'CPU #2',
				color: '#58508d',
			},{
				data: cpuUsageTimeline[2].slice(Math.max(cpuUsageTimeline[2].length - 20, 0)) || [],
				name: 'CPU #3',
				color: '#bc5090',
			},{
				data: cpuUsageTimeline[3].slice(Math.max(cpuUsageTimeline[3].length - 20, 0)) || [],
				name: 'CPU #4',
				color: '#ff6361',
			},
		]);
	}, [cpuUsageTimeline]);

	const radialOptions: ApexOptions = {
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
	const lineOptions: ApexOptions = {
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
	}

	return (
		<>
			<section className={'page'}>
				<Container>
					<FlexRow>
						{ cpuUsage.length > 0 && cpuUsage.map((item, index) => {
							return (
								<FlexCol xs={24} sm={12} md={6} key={`cpu-${index}`}>
									<WidgetCard title={`CPU-#${index}`}>
										<ReactApexChart options={{...radialOptions, labels: [`CPU-#${index}`]}} series={[item]} type="radialBar" height={'100%'} width={'100%'} />
									</WidgetCard>
								</FlexCol>
							)
						})}
						<FlexCol xs={24}>
							<WidgetCard title={'Memory Usage'}>
								<ReactApexChart ref={streamMemoryRef} options={lineOptions} type={'line'} series={memoryUsage} height={400} />
							</WidgetCard>
						</FlexCol>
						<FlexCol xs={24}>
							<WidgetCard title={'All CPUs Usage'}>
								<ReactApexChart ref={streamCPURef} options={lineOptions} type={'line'} series={cpuUsageTimeline} height={400} />
							</WidgetCard>
						</FlexCol>
					</FlexRow>
				</Container>
			</section>
		</>
	);
}

export default SingleServer;
