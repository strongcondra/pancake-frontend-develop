import { useState } from 'react'
import styled from 'styled-components'
import { DeserializedPool } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { useMatchBreakpointsContext } from '@pancakeswap/uikit'
import NameCell from './Cells/NameCell'
import EarningsCell from './Cells/EarningsCell'
import AprCell from './Cells/AprCell'
import TotalStakedCell from './Cells/TotalStakedCell'
import EndsInCell from './Cells/EndsInCell'
import ExpandActionCell from './Cells/ExpandActionCell'
import ActionPanel from './ActionPanel/ActionPanel'
import AutoEarningsCell from './Cells/AutoEarningsCell'
import AutoAprCell from './Cells/AutoAprCell'
import StakedCell from './Cells/StakedCell'

interface PoolRowProps {
  pool: DeserializedPool
  account: string
}

const StyledRow = styled.div`
  background-color: transparent;
  display: flex;
  cursor: pointer;
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account }) => {
  const { isXs, isSm, isMd, isLg, isXl, isXxl, isTablet, isDesktop } = useMatchBreakpointsContext()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const isCakePool = pool.sousId === 0

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={pool} />
        {pool.vaultKey ? (
          isXLargerScreen && <AutoEarningsCell pool={pool} account={account} />
        ) : (
          <EarningsCell pool={pool} account={account} />
        )}
        {isXLargerScreen && pool.vaultKey && isCakePool ? <StakedCell pool={pool} account={account} /> : null}
        {isLargerScreen && !isCakePool && <TotalStakedCell pool={pool} />}
        {pool.vaultKey ? <AutoAprCell pool={pool} /> : <AprCell pool={pool} />}
        {isLargerScreen && isCakePool && <TotalStakedCell pool={pool} />}
        {isDesktop && !isCakePool && <EndsInCell pool={pool} />}
        <ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
        />
      )}
    </>
  )
}

export default PoolRow
