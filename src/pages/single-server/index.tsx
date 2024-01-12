import React, { useEffect, useRef, useState } from 'react'
import Container from '../../components/container'
import FlexCol from '../../components/flex-col'
import FlexRow from '../../components/flex-row'
import WidgetCard from '../../components/widget-card'
import RadioGroup from '../../components/radio-group'
import { WebSocketConnection } from '../../modules/web-socket'
import ReactApexChart from 'react-apexcharts'
import { useParams } from 'react-router-dom'
import lineChartOptions from './lineChartOptions'
import radialChartOptions from './radialChartOptions'
import metricOptions from '../../constants/metricOptions'
import './style.scss'

function SingleServer () {
	const { serverId } = useParams<{ serverId: string }>()
	const streamMemoryRef = useRef<any>(null)
	const streamCPURef = useRef<any>(null)

	const [socketClient, setSocketClient] = useState<any>()
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [cpuUsage, setCpuUsage] = useState<number[]>([])
	const [memoryUsage, setMemoryUsage] = useState<number[]>([])
	const [cpuUsageTimeline, setCpuUsageTimeline] = useState<any[]>([])
	const [prevTime, setPrevTime] = useState<number>(0)
	const [metric, setMetric] = useState<string>('all')
	const prevMetricRef = useRef<string>('all')

	// Create Initial Socket Connection
	useEffect(() => {
		const socketConnection = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
		setSocketClient(socketConnection)

		// Close Connection When Component Unmount
		return () => {
			if (socketClient !== undefined) {
				socketClient.closeConnection()
			}
		}
	}, [])

	// Start Listening To Server
	useEffect(() => {
		// Reset All Data
		setCpuUsage([])
		setMemoryUsage([])
		setCpuUsageTimeline([[], [], [], []])
		setPrevTime(0)

		// Check If Server ID Is Not Undefined
		if (socketClient !== undefined) {
			socketClient.onSocketOpened(() => {
				if (!isConnected) {
					socketClient.emitSocketMessage({ type: metric, machine: serverId, subscribe: true })
				}
			})

			socketClient.onSocketMessage((msg: any) => {
				if ('success' in JSON.parse(msg.data)) {
					setIsConnected(JSON.parse(msg.data).success)
				} else {
					const message = JSON.parse(msg.data)

					// It Will Update Every 1 Second Since We Have Repeated Data
					if (message.timestamp - prevTime > 1000) {
						setPrevTime(message.timestamp)
						if (metric === 'all' || metric === 'cpu') {
							setCpuUsage(message.cpu.map((item: any) => item.usage))
							setCpuUsageTimeline((prev: any) => {
								const cpuUsageTemp: any[] = []
								message.cpu.forEach((item: any, index: number) => {
									cpuUsageTemp.push([...prev[index] || [], [message.timestamp, item.usage]])
								})
								return cpuUsageTemp
							})
						}

						if (metric === 'all' || metric === 'memory') {
							setMemoryUsage((prev: any) => [...prev, [message.timestamp, message.memory.usedPercentage]])
						}
					}
				}
			})

			socketClient.onSocketErrored((err: any) => {
				setIsConnected(false)
				socketClient.closeConnection()
				const newClient = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
				setSocketClient(newClient)
			})
		}
	}, [socketClient])

	// Update ServerID
	useEffect(() => {
		if (serverId !== undefined && socketClient !== undefined) {
			setIsConnected(false)
			socketClient.closeConnection()
			const newClient = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
			setSocketClient(newClient)
			prevMetricRef.current = metric
		}
	}, [serverId])

	// Update Metrics
	useEffect(() => {
		if (prevMetricRef.current !== metric) {
			setIsConnected(false)
			socketClient.closeConnection()
			const newClient = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
			setSocketClient(newClient)
			prevMetricRef.current = metric
		}
	}, [metric])

	// Update Memory Usage Charts Realtime
	useEffect(() => {
		streamMemoryRef.current?.chart?.updateSeries([
			{
				data: memoryUsage.slice(Math.max(memoryUsage.length - 20, 0)),
				name: 'Used Memory',
				color: '#ec9b00'
			}
		])
	}, [memoryUsage])

	// Update CPU Usage Charts Realtime
	useEffect(() => {
		const updatedSeries: any[] = []
		for (let i = 0; i < cpuUsageTimeline.length; i++) {
			updatedSeries.push({
				data: cpuUsageTimeline[i].slice(Math.max(cpuUsageTimeline[i].length - 20, 0)) || [],
				name: `CPU #${i}`,
				color: colors[i] || '#ec9b00'
			})
		}
		streamCPURef.current?.chart?.updateSeries(updatedSeries)
	}, [cpuUsageTimeline])

	// Static Options
	const colors = ['#16716f', '#afab75', '#a00715', '#672f54', '#f30d63', '#8d6eb0', '#6f7c9b', '#764838', '#0ba2ca', '#581ac9', '#e67d04', '#e4152b']

	return (
		<>
			<section className={'page'}>
				<h1 className={'page__title'}>Server Name: <span>{ serverId }</span></h1>
				<Container>
					<FlexRow>
						<FlexCol xs={24}>
							<div className={'page__controller'}>
								<RadioGroup
									options={metricOptions}
									value={metric}
									name={'metric-type'}
									clickHandler={(value: string) => { setMetric(value) }}
								/>
							</div>
						</FlexCol>
						{ ['all', 'cpu'].includes(metric) && cpuUsage.map((item, index) => {
							return (
								<FlexCol xs={24} sm={12} md={6} key={`cpu-${index}`}>
									<WidgetCard title={`CPU-#${index}`}>
										<ReactApexChart options={{ ...radialChartOptions, labels: [`CPU-#${index}`] }} series={[item]} type="radialBar" height={'100%'} width={'100%'} />
									</WidgetCard>
								</FlexCol>
							)
						})}
						{ ['all', 'memory'].includes(metric) && <FlexCol xs={24}>
							<WidgetCard title={'Memory Usage'}>
								<ReactApexChart ref={streamMemoryRef} options={lineChartOptions} type={'line'}
									series={memoryUsage} height={400}/>
							</WidgetCard>
						</FlexCol> }
						{ ['all', 'cpu'].includes(metric) && <FlexCol xs={24}>
							<WidgetCard title={'All CPUs Usage'}>
								<ReactApexChart ref={streamCPURef} options={lineChartOptions} type={'line'}
									series={cpuUsageTimeline} height={400}/>
							</WidgetCard>
						</FlexCol> }
					</FlexRow>
				</Container>
			</section>
		</>
	)
}

export default SingleServer
