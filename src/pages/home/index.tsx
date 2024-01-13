import React, { useEffect, useState } from 'react'
import Container from '../../components/container'
import FlexCol from '../../components/flex-col'
import FlexRow from '../../components/flex-row'
import WidgetCard from '../../components/widget-card'
import './style.scss'
import useMemoryWebSocket from '../../Hooks/useMemoryWebSocket'
import ReactApexChart from 'react-apexcharts'
import pieChartOptions from './pieChartOptions'

function Home () {
	const socketEndpoint: string = 'wss://lps-monitoring.up.railway.app/realtime'
	const [memoryUsage, setMemoryUsage] = useState<number[]>([])
	const [freeMemory, setFreeMemory] = useState<number[]>([])
	const firstServer = useMemoryWebSocket(socketEndpoint, 'server01')
	const secondServer = useMemoryWebSocket(socketEndpoint, 'server02')
	const thirdServer = useMemoryWebSocket(socketEndpoint, 'server03')
	const forthServer = useMemoryWebSocket(socketEndpoint, 'server04')
	const fifthServer = useMemoryWebSocket(socketEndpoint, 'server05')

	useEffect(() => {
		setMemoryUsage([
			normalizeData(firstServer.usage),
			normalizeData(secondServer.usage),
			normalizeData(thirdServer.usage),
			normalizeData(forthServer.usage),
			normalizeData(fifthServer.usage)
		])
		setFreeMemory([
			normalizeData(firstServer.free),
			normalizeData(secondServer.free),
			normalizeData(thirdServer.free),
			normalizeData(forthServer.free),
			normalizeData(fifthServer.free)
		])
	}, [firstServer, secondServer, thirdServer, forthServer, fifthServer])

	const normalizeData = (data: number) => {
		return Math.round((data / 500) * 100)
	}

	return (
		<>
			<section className={'page'}>
				<Container>
					<FlexRow>
						<FlexCol xs={12}>
							<WidgetCard title={'Memory Usage'}>
								<ReactApexChart options={pieChartOptions} series={memoryUsage} type="pie" width={'100%'} />
							</WidgetCard>
						</FlexCol>
						<FlexCol xs={12}>
							<WidgetCard title={'Free Memory'}>
								<ReactApexChart options={pieChartOptions} series={freeMemory} type="pie" width={'100%'} />
							</WidgetCard>
						</FlexCol>
					</FlexRow>
				</Container>
			</section>
		</>
	)
}

export default Home
