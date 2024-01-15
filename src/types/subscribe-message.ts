interface SubscribeMessage {
	type: string
	machine: string
	subscribe: boolean
	success: boolean
}

export default SubscribeMessage
