import { Layout, Select, Space, Button, Modal, Drawer } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import CryptoContext from '../../context/crypto-context'
import AddAssetForm from '../AddAssetForm'
import CoinInfoModal from '../CoinInfoModal'

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const AppHeader = () => {
  const { crypto } = useCrypto()
  const [select, setSelect] = useState(false)
  const [modal, setModal] = useState(false)
  const [coin, setCoin] = useState(null)
  const [drawer, setDrawer] = useState(false)

  const keypress = (event) => {
    if (event.key === '/') {
      setSelect((prev) => !prev)
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])

  function handleSelect(value) {
    console.log(value)
    setModal((prev) => !prev)
    setCoin(crypto.find((coin) => coin.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(options) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={options.data.icon}
              alt={options.data.label}
            />{' '}
            {options.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset{' '}
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  )
}
export default AppHeader

export function useCrypto() {
  return useContext(CryptoContext)
}
