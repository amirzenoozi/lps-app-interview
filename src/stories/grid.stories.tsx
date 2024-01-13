import FlexRow from '../components/flex-row'
import FlexCol from '../components/flex-col'

const meta = {
	title: 'General/Grid',
	component: {
		FlexRow,
		FlexCol
	},
	parameters: {
		layout: 'centered'
	},
	render: (args: any) => {
		return (
			<FlexRow>
				{
					[...Array(args.cols)].map((_, index) => {
						return (
							<FlexCol key={index} xs={args.xs} sm={args.sm} md={args.md} lg={args.lg} xl={args.xl} xxl={args.xxl}>
								<div style={{ backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', width: '25px', padding: '4px 12px' }}>Col</div>
							</FlexCol>
						)
					})
				}
			</FlexRow>
		)
	},
	tags: ['autodocs'],
	argTypes: {
		cols: { control: { type: 'range', min: 1, max: 24, step: 1 } },
		xs: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' },
		sm: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' },
		md: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' },
		lg: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' },
		xl: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' },
		xxl: { control: { type: 'range', min: 0, max: 24, step: 1 }, defaultValue: '1' }
	}
}

export default meta

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
	args: {
		xs: 1,
		sm: 1,
		md: 1,
		lg: 1,
		xl: 1,
		xxl: 1
	}
}
