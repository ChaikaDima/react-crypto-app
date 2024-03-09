import { Layout, Typography } from 'antd'
import AssetsTable from '../AssetsTable'
import { useCrypto } from './AppHeader'
import PortfolioChart from './PortfolioChart'

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
}

const AppContent = () => {
  const { assets, crypto } = useCrypto()

  const cryptoPriceMap = crypto.reduce((acc, el) => {
    acc[el.id] = el.price
    return acc
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        {' '}
        Portfolio:
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((akk, elem) => (akk += elem), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  )
}

export default AppContent
