import {
  SlideShowProvider,
  useAutoPlay,
  useSlideShow,
} from './context-provider'

export default {
  title: 'Slide Show',
  href: '/slideshow',
  component: App,
}

function App() {
  const images = Array.from(
    { length: 8 },
    (_, i) => `https://i.pravatar.cc/300?u=${i * 8}`,
  ).reverse()
  return (
    <SlideShowProvider images={images}>
      <div>
        <ImageGrid />
        <Showing />
        <GotoButtons />
        <PlayButton />
      </div>
    </SlideShowProvider>
  )
}

function Showing() {
  const { active, max } = useSlideShow()
  return (
    <small className="text-center block mt-3">
      Showing {active + 1} / {max}
    </small>
  )
}

function ImageGrid() {
  const { prev, next } = useSlideShow()
  return (
    <div className="flex gap-4 items-center">
      <ControlButton onClick={prev}>&lt;</ControlButton>
      <SlideImages />
      <ControlButton onClick={next}>&gt;</ControlButton>
    </div>
  )
}

function ControlButton(props: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className="size-12 rounded-full text-3xl bg-zinc-500 hover:bg-zinc-600"
      {...props}
    >
      {props.children}
    </button>
  )
}

function SlideImages() {
  const { active, images } = useSlideShow()

  return (
    <div className="grow grid *:col-start-1 *:row-start-1 overflow-x-hidden">
      {images.map((image, i) => (
        <img
          key={i}
          src={image}
          alt={`Carousel image`}
          aria-hidden={i !== active}
          height={300}
          width={300}
          className={`rounded-sm transition-all duration-300 ease-in-out
            ${i === active ? 'z-10 blur-none opacity-100' : 'z-0 blur-sm opacity-0'}
        `}
        />
      ))}
    </div>
  )
}

function GotoButtons() {
  const { images, goto, active } = useSlideShow()
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {images.map((_, i) => (
        <button
          key={i}
          disabled={i === active}
          type="button"
          className="border rounded-full size-8 disabled:border-yellow-500"
          onClick={() => goto(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

function PlayButton() {
  const { next } = useSlideShow()
  const { playing, toggle } = useAutoPlay(next)
  return (
    <button
      type="button"
      className="block w-full mt-4 py-2 text-center bg-sky-600 hover:bg-sky-700"
      onClick={toggle}
    >
      {playing ? 'Stop' : 'Play'}
    </button>
  )
}
