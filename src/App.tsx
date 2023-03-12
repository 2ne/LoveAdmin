import React, { ReactElement, useState } from 'react'
import { Button } from 'antd'

function App(): ReactElement {
  const [count, setCount] = useState(0)

  return (
    <div className="p-20 border shadow-xl border-gray-50 rounded-xl">
      <Button type="primary" onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </Button>
    </div>
  )
}

export default App
