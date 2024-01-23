import { Table, TableBody, TableContainer, styled } from '@mui/material'
import type { FC } from 'react'
import type { IScreenComponent } from '../../types/components'
import ListItem from '../ListItem/ListItem'

const StyledTable = styled(Table)({
  '&.MuiTable-root': {
    width: '100%',
    borderCollapse: 'separate', 
    borderSpacing: '10px'
  }
})

const Screen:FC<IScreenComponent> = ({data}) => {
  return (
    <TableContainer>
      <StyledTable>
        <TableBody>
        {data.map(item => 
          <ListItem key={item.id} itemData={item}/>
        )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}
export default Screen