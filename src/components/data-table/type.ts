export interface DataTableHeaderProp {
	slug: string;
	title: string;
	sortable: boolean;
	style: object;
}

export interface DataTableHeaderCell extends DataTableHeaderProp {
	onHeaderClick: Function,
}

export interface DataTableCell {
	value: any;
	style: object;
}

export interface DataTableProps {
	headers: Array<DataTableHeaderProp>;
	records: Array<any>;
	onHeaderClick: Function;
}
