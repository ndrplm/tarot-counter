import { useState } from 'react'

import AutomaticCount from './AutomaticHandsCount'
import ManualCount from './ManualHandsCount'

const HandsCount = () => {
  const [countMode, setCountMode] = useState<'manual' | 'auto'>()
  return (
    <>
      <div>
        <label>Comment voulez vous compter vos levées? </label>

        <input type="button" value="Manuellement" onClick={() => setCountMode('manual')} />
        <input type="button" value="Automatiquement" onClick={() => setCountMode('auto')} />
      </div>

      {countMode === 'auto' && <AutomaticCount />}
      {countMode === 'manual' && <ManualCount />}
    </>
  )
}

export default HandsCount
