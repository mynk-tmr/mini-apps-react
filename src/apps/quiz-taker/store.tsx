import { createContext, use, useState } from 'react'

export interface IQuestion {
  title: string
  options: [string, string, string, string]
  answerIdx: number
  marked: null | number
}

interface IState {
  qIdx: number
  score: number
  finish: boolean
  showResult: boolean
  startTime: Date
}

interface Context {
  state: IState
  questions: IQuestion[]
  mark: (choice: number) => void
  goto: (qIdx: number) => void
  reset: () => void
  showResult: () => void
}

const QuizCtx = createContext<Context | null>(null)

export function QuizProvider(props: {
  children: React.ReactNode
  questions: Omit<IQuestion, 'marked'>[]
}) {
  const [state, setState] = useState<IState>({
    qIdx: 0,
    score: 0,
    finish: false,
    showResult: false,
    startTime: new Date(),
  })

  const [questions, setQuestions] = useState<IQuestion[]>(() => {
    return props.questions.map((q) => ({ ...q, marked: null }))
  })

  function reset() {
    setState({
      qIdx: 0,
      score: 0,
      finish: false,
      showResult: false,
      startTime: new Date(),
    })

    setQuestions(questions.map((q) => ({ ...q, marked: null })))
  }

  function goto(qIdx: number) {
    setState({ ...state, qIdx })
  }

  function showResult() {
    setState({ ...state, showResult: true })
  }

  function mark(marked: number) {
    let { finish, qIdx, score } = state
    const currQues: IQuestion = { ...questions[qIdx], marked }
    if (currQues.marked === currQues.answerIdx) score++
    const $questions = questions.map((q, i) => (i === qIdx ? currQues : q))
    finish = $questions.every((a) => a.marked !== null)
    setState({ ...state, finish, score })
    setQuestions($questions)
  }

  return (
    <QuizCtx value={{ state, questions, mark, goto, reset, showResult }}>
      {props.children}
    </QuizCtx>
  )
}

export function useQuiz() {
  const ctx = use(QuizCtx)
  if (!ctx) throw new Error('No Quiz Provider')
  return ctx
}
