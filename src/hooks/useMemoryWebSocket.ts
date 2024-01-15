import { useEffect, useState } from 'react'
import { WebSocketConnection } from '../modules/web-socket'
import { type ServerMetricMessage } from '../types/server-metric-message'
import type SubscribeMessage from '../types/subscribe-message'

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

			socketClient.onSocketMessage((msg: { data: string }) => {
				const message: SubscribeMessage | ServerMetricMessage = JSON.parse(msg.data)
				if ('success' in message) {
					setIsConnected(Boolean(message.success))
				} else {
					// It Will Update Every 1 Second Since We Have Repeated Data
					if (message.timestamp - prevTime > 1000) {
						setPrevTime(Number(message.timestamp))
						setMemoryUsage((prev: number) => message.memory?.usedPercentage ?? 0)
					}
				}
			})

			socketClient.onSocketErrored(() => {
				setIsConnected(false)
				socketClient.closeConnection()
				const newClient = new WebSocketConnection({ baseURL: url })
				setSocketClient(newClient)
			})
		}

		return () => {
			if (socketClient !== null) {
				socketClient.closeConnection()
			}
		}
	}, [socketClient])

	return { usage: memoryUsage, free: (100 - memoryUsage), client: socketClient }
}

export default useMemoryWebSocket
