import { useReducer } from 'react'

interface IState {
  boxes: ('x' | 'o' | null)[]
  winner: 'x' | 'o' | null | 'tie'
  turn: 'x' | 'o'
  mode: 'pvp' | 'pve'
}

function getState(mode: IState['mode']): IState {
  return {
    boxes: Array(9).fill(null),
    winner: null,
    turn: 'x',
    mode,
  }
}

type Action =
  | {
      type: 'reset'
    }
  | {
      type: 'move'
      index: number
    }
  | {
      type: 'cx-mode'
    }

type Reducer = (state: IState, action: Action) => IState

const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return getState(state.mode)
    }
    case 'move': {
      const copy = structuredClone(state)
      copy.boxes[action.index] = state.turn
      copy.winner = getWinner(copy)
      copy.turn = state.turn === 'x' ? 'o' : 'x'
      if (copy.winner === null && copy.mode === 'pve') {
        copy.boxes[aiChoice(copy)] = copy.turn
        copy.winner = getWinner(copy)
        copy.turn = state.turn
      }
      return copy
    }
    case 'cx-mode': {
      return getState(state.mode === 'pvp' ? 'pve' : 'pvp')
    }
  }
}

export function useTicTacToe() {
  return useReducer(reducer, getState('pvp'))
}

export interface IuseTicTacToe {
  state: IState
  dispatch: React.Dispatch<Action>
}

function getWinner(state: IState): IState['winner'] {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (const line of lines) {
    const [a, b, c] = line
    if (
      state.turn === state.boxes[a] &&
      state.turn === state.boxes[b] &&
      state.turn === state.boxes[c]
    ) {
      return state.turn
    }
  }
  return state.boxes.includes(null) ? null : 'tie'
}

function aiChoice(state: IState) {
  let idx = state.boxes.findIndex((box) => box === null && Math.random() > 0.5)
  if (idx === -1) idx = state.boxes.lastIndexOf(null)
  return idx
}
