import { useContext, useMemo } from 'react'
import { HandsContext, PlayersContext } from '../../../App'
import { Hand, ID } from '../../../types'
import { useTable } from 'react-table'

const calculatePlayerScore = (playerId: ID, hand: Hand) => {
  if (hand.defendeurs?.includes(playerId)) return hand.score?.defendeurs
  if (hand.taker?.partnerId === playerId) return hand.score?.partner
  return hand.score?.taker
}

type HandDataType = {
  [index: ID]: string
}

const ScoreTable = () => {
  const [players] = useContext(PlayersContext)
  const [hands] = useContext(HandsContext)

  const data: HandDataType[] = useMemo(
    () =>
      hands.map(hand => {
        const obj: HandDataType = {}
        players.forEach(({ id }) => (obj[id] = `${calculatePlayerScore(id, hand) || '-'}`))
        return obj
      }),
    [hands, players],
  )

  const columns = useMemo(
    () =>
      players.map(player => ({
        Header: player.name,
        accessor: player.id,
        Footer: (data: any) => {
          const total: number = useMemo(
            () =>
              data.rows.reduce((sum: number, row: any) => {
                if (row.values[player.id] !== '-') return parseInt(row.values[player.id]) + sum
                return 0
              }, 0),
            [data.rows],
          )
          return (
            <>
              <strong>Total:</strong> {total}
            </>
          )
        },
      })),
    [players],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } =
    useTable({
      columns,
      data,
    })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
      <tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}

export default ScoreTable
