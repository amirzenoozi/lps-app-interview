export interface DataTableHeaderProp {
	slug: string
	title: string
	sortable: boolean
	style: object
}

export interface DataTableHeaderCellProp extends DataTableHeaderProp {
	onHeaderClick: Function
}

export interface DataTableCellProp {
	value: any
	style: object
}

export interface DataTableProps {
	headers: DataTableHeaderProp[]
	records: any[]
	onHeaderClick: Function
}
