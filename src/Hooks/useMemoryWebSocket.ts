/* eslint-disable */
import { useEffect, useState } from 'react'
import { WebSocketConnection } from '../modules/web-socket'

const useMemoryWebSocket = (url: string, serverId: string) => {
	const [socketClient, setSocketClient] = useState<any>(null)
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [prevTime, setPrevTime] = useState<number>(0)
	const [memoryUsage, setMemoryUsage] = useState<number>(0)

	// Create Initial Socket Connection
	useEffect(() => {
		const socketConnection: any = new WebSocketConnection({ baseURL: url })
		setSocketClient(socketConnection)

		// Close Connection When Component Unmount
		return () => {
			if (socketClient !== null) {
				socketClient.closeConnection()
			}
		}
	}, [])

	// Start Listening To Server
	useEffect(() => {
		// Check If Server ID Is Not Undefined
		if (socketClient !== null) {
			socketClient.onSocketOpened(() => {
				if (!isConnected) {
					socketClient.emitSocketMessage({ type: 'memory', machine: serverId, subscribe: true })
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
						setMemoryUsage((prev: any) => message.memory.usedPercentage)
					}
				}
			})

			socketClient.onSocketErrored(() => {
				setIsConnected(false)
				socketClient.closeConnection()
				const newClient = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
				setSocketClient(newClient)
			})
		}

		return () => {
			if (socketClient !== null) {
				socketClient.closeConnection()
			}
		}

	}, [socketClient])


	return  { usage: memoryUsage, free: (100 - memoryUsage), client: socketClient }
}

export default useMemoryWebSocket
/* eslint-enable */
