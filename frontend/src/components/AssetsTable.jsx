import { Table } from 'antd'
import { useCrypto } from './layout/AppHeader'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',

    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
]

const AssetsTable = () => {
  const { assets } = useCrypto()

  const data = assets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.amount,
  }))

  return (
    <div>
      <Table
        pagination={false} //pages
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}

export default AssetsTable
