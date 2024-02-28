import { cn } from '@/lib/utils'
import React from 'react'

type SlidingChoiceProps<T> = {
  [K in keyof T]: T[K]
} & { asChild?: boolean }

type SlidingChoicesProps = SlidingChoiceProps<React.HTMLAttributes<HTMLDivElement>> & {
  children: Array<React.ReactNode>
  childrenClassName: string
  childrenOnMouseEnter?: Array<(() => void) | undefined>
  childrenOnMouseLeave?: Array<(() => void) | undefined>
  childrenOnClick?: Array<(() => void) | undefined>
}
const SlidingChoices = React.forwardRef<HTMLDivElement, SlidingChoicesProps>(
  ({ className, children, childrenClassName, childrenOnMouseEnter, childrenOnMouseLeave, ...props }, ref) => {
    const [stopFocus, setStopFocus] = React.useState(0)
    const [InFocus, setInFocus] = React.useState(0)
    const [shiftedFocus, setShiftedFocus] = React.useState(0)

    const itemsRef = React.useRef<Array<HTMLLIElement | null>>([])
    const sliderRef = React.useRef<HTMLDivElement | null>(null)
    const containerRef = React.useRef<HTMLUListElement | null>(null)

    React.useEffect(() => {
      const prevRef = itemsRef.current[shiftedFocus]
      const curRef = itemsRef.current[InFocus]
      const sRef = sliderRef.current
      const cRef = containerRef.current

      if (!prevRef || !curRef || !sRef || !cRef) return

      const dimensions = curRef.getBoundingClientRect()
      const width = dimensions.width
      const left = dimensions.left
      const cW = cRef.getBoundingClientRect().left

      sRef.animate(
        { left: `${left - cW}px`, width: `${width}px` },
        {
          fill: 'forwards',
          duration: 1500,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }
      )

      if (shiftedFocus === InFocus) return

      childrenOnMouseEnter && childrenOnMouseEnter[InFocus]?.call(this)
      childrenOnMouseLeave && childrenOnMouseLeave[shiftedFocus]?.call(this)
      setShiftedFocus(InFocus)
    }, [InFocus, shiftedFocus, childrenOnMouseEnter, childrenOnMouseLeave])

    function hoverOverSelected() {
      const sRef = sliderRef.current
      if (!sRef) return
      // also return when on hover card need to be open

      if (stopFocus === InFocus) return
      sRef.dataset.state = 'offPlace'
      setTimeout(() => {
        setInFocus(stopFocus)
      }, 100)
      setTimeout(() => {
        sRef.dataset.state = 'onPlace'
      }, 500)
    }

    return (
      <div className={'flex h-full w-fit rounded-full top-0'}>
        <div
          className={cn('bg-popover p-1 rounded-full border-2 border-foreground h-fit', className)}
          {...props}
          ref={ref}
          onMouseLeave={() => hoverOverSelected()}
        >
          <ul ref={containerRef} className='relative flex flex-row rounded-full'>
            {children.map((elem, idx) => {
              return (
                <li
                  key={idx}
                  ref={(el) => (itemsRef.current[idx] = el)}
                  className={cn(
                    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium z-10 transition-colors', // base
                    InFocus === idx ? 'text-background' : 'text-foreground',
                    childrenClassName // "py-3"
                  )}
                  onMouseEnter={(e) => {
                    setInFocus(idx)
                  }}
                  onClick={(e) => {
                    setStopFocus(idx)
                  }}
                  onFocus={(e) => {
                    if (childrenOnMouseEnter && typeof childrenOnMouseEnter[idx] === 'function') return
                    setStopFocus(idx)
                    setInFocus(idx)
                  }}
                >
                  {elem}
                </li>
              )
            })}
            <div
              ref={sliderRef}
              data-state={'onPlace'}
              className='absolute h-full bg-foreground rounded-full top-0 fill-mode-forwards
                 data-[state=onPlace]:animate-in data-[state=offPlace]:slide-out-to-bottom-2 data-[state=offPlace]:animate-out data-[state=offPlace]:fade-out-0 data-[state=onPlace]:fade-in-0 data-[state=offPlace]:zoom-out-95 data-[state=onPlace]:zoom-in-95 data-[state=onPlace]:slide-in-from-bottom-2'
            ></div>
          </ul>
        </div>
      </div>
    )
  }
)
SlidingChoices.displayName = 'SlidingChoices'

export { SlidingChoices }
