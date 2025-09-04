import { useAutoPlay, useSlideShow } from './funcs'

export default {
  title: 'Slide Show',
  href: '/slideshow',
  component: App,
}

const images = Array.from(
  { length: 8 },
  (_, i) => `https://i.pravatar.cc/300?u=${i * 8}`,
).reverse()

function App() {
  const cara = useSlideShow(images.length)
  return (
    <div>
      <ImageGrid {...cara} />
      <small className="text-center block mt-3">
        Showing {cara.active + 1} / {images.length}
      </small>
      <GotoButtons {...cara} />
      <PlayButton strategy={cara.next} />
    </div>
  )
}

function ImageGrid(props: ReturnType<typeof useSlideShow>) {
  return (
    <div className="flex gap-4 items-center">
      <ControlButton onClick={props.prev}>&lt;</ControlButton>
      <div className="grow grid *:col-start-1 *:row-start-1 overflow-x-hidden">
        {images.map((image, i) => (
          <SlideImage key={image} show={i === props.active} src={image} />
        ))}
      </div>
      <ControlButton onClick={props.next}>&gt;</ControlButton>
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

function SlideImage(props: { show: boolean; src: string }) {
  const tw_style = props.show
    ? 'opacity-100 blur-none z-10'
    : 'opacity-0 blur-sm z-0'
  return (
    <img
      src={props.src}
      alt={`Carousel image`}
      aria-hidden={!props.show}
      height={300}
      width={300}
      className={`rounded-sm transition-all duration-300 ease-in-out ${tw_style}`}
    />
  )
}

function GotoButtons(props: ReturnType<typeof useSlideShow>) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {images.map((_, i) => (
        <button
          key={i}
          disabled={i === props.active}
          type="button"
          className="border rounded-full size-8 disabled:border-yellow-500"
          onClick={() => props.goto(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

function PlayButton(props: { strategy: () => void }) {
  const { playing, toggle } = useAutoPlay(props.strategy)
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
