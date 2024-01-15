interface cpuMetricMessage {
	id: number | string
	usage: number
}

interface memoryMetricMessage {
	total: number
	free: number
	used: number
	usedPercentage: number
	freePercentage: number
}

interface ServerMetricMessage {
	machine: string
	timestamp: number
	memory?: memoryMetricMessage
	cpu?: cpuMetricMessage[]
}

export type {
	ServerMetricMessage,
	memoryMetricMessage,
	cpuMetricMessage
}
