/* eslint-disable */
import { WebSocketConnection } from './web-socket'
describe('Buttons', () => {
	let webSocket: WebSocketConnection<any>
	let msgCount: number = 0

	beforeAll(() => {
		webSocket = new WebSocketConnection({ baseURL: 'wss://lps-monitoring.up.railway.app/realtime' })
	})

	afterAll(() => { webSocket.closeConnection() })

	test('Server 01', async () => {
		webSocket.onSocketOpened(() => {
			webSocket.emitSocketMessage({ type: 'all', machine: 'server01', subscribe: true })
		})

		webSocket.onSocketMessage((msg) => {
			if ('success' in JSON.parse(msg.data)) {
				msgCount++
			}
		})

		await new Promise((r) => setTimeout(r, 2000))
		expect(msgCount).toEqual(1)
	})

	test('Server 02', async () => {
		webSocket.onSocketOpened(() => {
			msgCount--
			webSocket.emitSocketMessage({ type: 'all', machine: 'server01', subscribe: false })
			webSocket.emitSocketMessage({ type: 'all', machine: 'server02', subscribe: true })
		})

		webSocket.onSocketMessage((msg) => {
			if ('success' in JSON.parse(msg.data)) {
				msgCount++
			}
		})

		await new Promise((r) => setTimeout(r, 2000))
		expect(msgCount).toBe(1)
	})

	test('Server 03', async () => {
		webSocket.onSocketOpened(() => {
			msgCount--
			webSocket.emitSocketMessage({ type: 'all', machine: 'server02', subscribe: false })
			webSocket.emitSocketMessage({ type: 'all', machine: 'server03', subscribe: true })
		})

		webSocket.onSocketMessage((msg) => {
			if ('success' in JSON.parse(msg.data)) {
				msgCount++
			}
		})

		await new Promise((r) => setTimeout(r, 2000))
		expect(msgCount).toBe(1)
	})

	test('Server 04', async () => {
		webSocket.onSocketOpened(() => {
			msgCount--
			webSocket.emitSocketMessage({ type: 'all', machine: 'server03', subscribe: false })
			webSocket.emitSocketMessage({ type: 'all', machine: 'server04', subscribe: true })
		})

		webSocket.onSocketMessage((msg) => {
			if ('success' in JSON.parse(msg.data)) {
				msgCount++
			}
		})

		await new Promise((r) => setTimeout(r, 2000))
		expect(msgCount).toBe(1)
	})

	test('Server 05', async () => {
		webSocket.onSocketOpened(() => {
			msgCount--
			webSocket.emitSocketMessage({ type: 'all', machine: 'server04', subscribe: false })
			webSocket.emitSocketMessage({ type: 'all', machine: 'server05', subscribe: true })
		})

		webSocket.onSocketMessage((msg) => {
			if ('success' in JSON.parse(msg.data)) {
				msgCount++
			}
		})

		await new Promise((r) => setTimeout(r, 2000))
		expect(msgCount).toBe(1)
	})
})
/* eslint-enable */
