export interface DataTableHeader {
	slug: string;
	title: string;
	sortable: boolean;
	style: object;
}

export interface DataTableHeaderCell extends DataTableHeader {
	onHeaderClick: Function,
}

export interface DataTableCell {
	value: any;
	style: object;
}

export interface DataTableProps {
	headers: Array<DataTableHeader>;
	records: Array<any>;
	onHeaderClick: Function;
}
