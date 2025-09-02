import { type IuseTicTacToe, useTicTacToe } from './engine'

export default {
  title: 'Tic Tac Toe',
  href: '/tictactoe',
  component: App,
}

function App() {
  const [state, dispatch] = useTicTacToe()
  return (
    <div>
      <Winner state={state} />
      <TicTacToe state={state} dispatch={dispatch} />
      <Controls state={state} dispatch={dispatch} />
    </div>
  )
}

function Winner(props: Pick<IuseTicTacToe, 'state'>) {
  const {
    state: { winner },
  } = props
  let JSX: string = ''
  if (winner === null) JSX = 'In Progress'
  else if (winner === 'tie') JSX = 'Tie'
  else JSX = `${winner} wins!`

  return <p className="text-3xl font-bold text-center mb-4 capitalize">{JSX}</p>
}

function TicTacToe(props: IuseTicTacToe) {
  const { state, dispatch } = props
  return (
    <fieldset
      disabled={state.winner !== null}
      className="flex flex-wrap size-[300px]"
    >
      {state.boxes.map((box, i) => (
        <button
          key={i}
          disabled={box !== null}
          type="button"
          className="size-1/3 border text-6xl font-bold"
          onClick={() => dispatch({ type: 'move', index: i })}
        >
          <span className={`${box === 'x' ? 'text-red-500' : ''}`}>{box}</span>
        </button>
      ))}
    </fieldset>
  )
}

function Controls(props: IuseTicTacToe) {
  const { state, dispatch } = props
  return (
    <div className="flex justify-center gap-4 mt-4 *:basis-1/2 text-sm">
      <button
        type="button"
        className="border p-2"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
      <button
        type="button"
        className="border p-2"
        onClick={() => dispatch({ type: 'cx-mode' })}
      >
        Battle {state.mode === 'pvp' ? 'AI' : 'Human'}
      </button>
    </div>
  )
}
