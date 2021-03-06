interface IData {
	s: string
	result: string[]
}

export const data: IData[] = [
	// Base test data
	{
		s: '25525511135',
		result: ['255.255.11.135', '255.255.111.35']
	},
	{
		s: '0000',
		result: ['0.0.0.0']
	},
	{
		s: '1111',
		result: ['1.1.1.1']
	},
	{
		s: '010010',
		result: ['0.10.0.10', '0.100.1.0']
	},
	{
		s: '101023',
		result: ['1.0.10.23', '1.0.102.3', '10.1.0.23', '10.10.2.3', '101.0.2.3']
	},
	{
		s: '172162541',
		result: ['17.216.25.41', '17.216.254.1', '172.16.25.41', '172.16.254.1', '172.162.5.41', '172.162.54.1']
	},
	{ s: '000', result: [] }
]
