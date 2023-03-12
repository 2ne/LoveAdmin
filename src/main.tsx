import React from 'react'
import ReactDOM from 'react-dom'

import { ConfigProvider } from 'antd'
import './App.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#06b6d4',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#f43f5e',
          colorInfo: '#06b6d4',
          colorTextBase: '#18181b',
          borderRadius: 4,
          wireframe: false,
          fontFamily: "'Barlow', sans-serif"
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
