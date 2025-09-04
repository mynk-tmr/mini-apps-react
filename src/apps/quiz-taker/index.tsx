import { QuizProvider, useQuiz } from './store'

export default {
  title: 'Quiz Taker',
  href: '/quiz-taker',
  component: App,
}

function App() {
  return (
    <QuizProvider
      questions={[
        {
          title: 'What is the capital of France?',
          options: ['Paris', 'Amsterdam', 'Berlin', 'Rome'],
          answerIdx: 0,
        },
        {
          title: 'What is the capital of Italy?',
          options: ['Rome', 'London', 'Paris', 'Venice'],
          answerIdx: 0,
        },
        {
          title: 'What is the capital of Germany?',
          options: ['Monaco', 'Berlin', 'Naorobi', 'Tokyo'],
          answerIdx: 1,
        },
        {
          title: 'What is the capital of China?',
          options: ['Imphal', 'Osaka', 'Seoul', 'Beijing'],
          answerIdx: 3,
        },
      ]}
    >
      <Container />
    </QuizProvider>
  )
}

function Container() {
  const { state } = useQuiz()
  return state.showResult ? <DisplayResult /> : <AskQuestions />
}

function AskQuestions() {
  const { state, questions } = useQuiz()
  const current = questions[state.qIdx]
  return (
    <section>
      <span>Score: {state.score}</span>
      <h2 className="my-3 border-t text-xl py-2 font-semibold">
        {state.qIdx + 1}. {current.title}
      </h2>
      <fieldset
        disabled={current.marked !== null}
        className="grid gap-1 min-w-xs"
      >
        {current.options.map((option, i) => (
          <QuizButton option={i} key={i}>
            {option}
          </QuizButton>
        ))}
      </fieldset>
      <Controls />
    </section>
  )
}

function QuizButton(props: { children: React.ReactNode; option: number }) {
  const { state, questions, mark } = useQuiz()
  const current = questions[state.qIdx]
  let tw_bg = ''
  if (current.marked !== null) {
    if (current.marked === props.option) tw_bg = 'bg-red-600'
    if (current.answerIdx === props.option) tw_bg = 'bg-green-600'
  }

  return (
    <button
      type="button"
      className={`border p-2 ${tw_bg}`}
      onClick={() => mark(props.option)}
    >
      {props.children}
    </button>
  )
}

function Controls() {
  const {
    goto,
    reset,
    showResult,
    state: { qIdx, finish },
    questions,
  } = useQuiz()

  if (finish) {
    return (
      <div className="flex justify-center gap-4 mt-4 *:rounded-xs *:px-2 *:py-1">
        <button onClick={showResult} type="button" className="bg-sky-600">
          Show Result
        </button>
      </div>
    )
  }

  const gotoNext = () => goto(qIdx + 1)
  const gotoPrev = () => goto(qIdx - 1)

  const disNext = qIdx === questions.length - 1
  const disPrev = qIdx === 0
  return (
    <div className="flex justify-center gap-4 mt-4 *:rounded-xs *:px-2 *:py-1 *:disabled:bg-transparent">
      <button
        disabled={disNext}
        onClick={gotoNext}
        type="button"
        className="bg-indigo-600"
      >
        Next
      </button>
      <button
        disabled={disPrev}
        onClick={gotoPrev}
        type="button"
        className="bg-amber-600"
      >
        Prev
      </button>
      <button onClick={reset} type="button" className="bg-rose-600">
        Reset
      </button>
    </div>
  )
}

function DisplayResult() {
  const { state, reset, questions } = useQuiz()
  const duration = (Date.now() - state.startTime.getTime()) / 1000
  return (
    <div className="min-w-xs grid gap-2">
      <h2 className="text-2xl pb-2">Result</h2>
      <p className="text-3xl mb-4">Score: {state.score}</p>
      <p>Time Taken: {Math.round(duration)} seconds</p>
      <ol>
        {questions.map((q, i) => (
          <li key={i}>
            {q.answerIdx === q.marked ? '✅' : '❌'} {q.title}
            <span className="text-green-600"> ({q.options[q.answerIdx]})</span>
            {q.answerIdx !== q.marked && (
              <span className="text-red-600">
                {' '}
                ({q.options[q.marked as number]})
              </span>
            )}
          </li>
        ))}
      </ol>
      <button onClick={reset} type="button" className="bg-rose-600 py-2">
        Reset
      </button>
    </div>
  )
}
