"use client"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const RevenueChart = ({data: {salesData}}: {data:{salesData: {month: string, totalSales: number}[]}}) => {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={salesData}>
				<XAxis dataKey="month" tickLine={false}/>
				<YAxis tickLine={false} tickFormatter={(value) => `$${value}`} />
				<Bar dataKey="totalSales" className='fill-chart-2' />
			</BarChart>
		</ResponsiveContainer>

	)
}

export default RevenueChart