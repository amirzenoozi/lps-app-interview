import React, { useEffect, useState } from 'react'
import Container from '../../components/container'
import FlexCol from '../../components/flex-col'
import FlexRow from '../../components/flex-row'
import WidgetCard from '../../components/widget-card'
import './style.scss'
import useMemoryWebSocket from '../../Hooks/useMemoryWebSocket'
import ReactApexChart from 'react-apexcharts'
import { type ApexOptions } from 'apexcharts'

function Home () {
	const [memoryUsage, setMemoryUsage] = useState<number[]>([])
	const [freeMemory, setFreeMemory] = useState<number[]>([])
	const firstServer = useMemoryWebSocket('wss://lps-monitoring.up.railway.app/realtime', 'server01')
	const secondServer = useMemoryWebSocket('wss://lps-monitoring.up.railway.app/realtime', 'server02')
	const thirdServer = useMemoryWebSocket('wss://lps-monitoring.up.railway.app/realtime', 'server03')
	const forthServer = useMemoryWebSocket('wss://lps-monitoring.up.railway.app/realtime', 'server04')
	const fifthServer = useMemoryWebSocket('wss://lps-monitoring.up.railway.app/realtime', 'server05')

	useEffect(() => {
		setMemoryUsage([
			normlizeData(firstServer.usage),
			normlizeData(secondServer.usage),
			normlizeData(thirdServer.usage),
			normlizeData(forthServer.usage),
			normlizeData(fifthServer.usage)
		])
		setFreeMemory([
			normlizeData(firstServer.free),
			normlizeData(secondServer.free),
			normlizeData(thirdServer.free),
			normlizeData(forthServer.free),
			normlizeData(fifthServer.free)
		])
	}, [firstServer, secondServer, thirdServer, forthServer, fifthServer])

	const normlizeData = (data: number) => {
		return Math.round((data / 500) * 100)
	}

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
