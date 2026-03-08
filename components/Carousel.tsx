"use client"
import React, { useCallback, useEffect, useRef } from 'react'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  usePrevNextButtons
} from './CarouselButton'
import { Button } from './ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useDotButton } from './CarouselDot'

import image1 from "../public/carousel_1.jpg"
import image2 from "../public/achievement-2.jpeg"
import image3 from "../public/achievement-3.jpeg"
import image4 from "../public/achievement-4.jpeg"
import image5 from "../public/achievement-5.jpg"
import image6 from "../public/achievement-5.jpg"

const TWEEN_FACTOR_BASE = 0.2

type PropType = {
  slides?: number[]
  options?: EmblaOptionsType
}

const slides = [
  {
    id: 1,
    year: "Nimbus 2k24",
    title: "Best Sustainable Team in Nimbus",
    image: image1,
  },
  {
    id: 2,
    year: "Nimbus 2k23",
    title: "Best Event Execution Team",
    image: image2,
  },
  {
    id: 3,
    year: "Nimbus 2k21",
    title: "Best Management Team",
    image: image3,
  },
  {
    id: 4,
    year: "Nimbus 2k18",
    title: "Best Innovative Team",
    image: image4,
  },
  {
    id: 5,
    year: "Nimbus 2k17",
    title: "Best Events in Nimbus",
    image: image5,
  },

  {
    id: 6,
    year: "Nimbus 2k16",
    title: "Best Innovative Team",
    image: image6,
  },
]

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `translateX(${translate}%)`
        })
      })
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenParallax(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax)
  }, [emblaApi, tweenParallax])

  return (
    <div className="relative embla max-w-6xl border">

      <div className='absolute h-full bg-gradient-to-r from-black to-transparent w-[10%] z-20' />
      <div className='absolute right-0 h-full bg-gradient-to-l from-black to-transparent w-[10%] z-20' />

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__parallax">
                <div className="embla__parallax__layer">
                  <Image
                    className={`embla__parallax__img duration-500 max-h-[200px] md:max-h-[450px] ${selectedIndex === index ? "opacity-100" : "opacity-30"}`}
                    src={slide.image}
                    alt="Your alt text"
                  />
                </div>
              </div>
              <div className={`p-4 mt-4 bg-gradient-to-r from-black/40 to-indigo-900/40 duration-500 border border-gray-700 rounded-3xl  ${selectedIndex === index ? "opacity-100" : "opacity-30"}`}>
                <h2 className='md:text-3xl text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 font-bold inline-block text-transparent bg-clip-text'>
                  {slide.year}
                </h2>
                <p className='text-white text-lg md:text-2xl mt-2'>
                  {slide.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <Button
          onClick={onPrevButtonClick}
          className="absolute left-4 md:left-8 top-[50%] z-30 bg-yellow-600 hover:bg-purple-500 rounded-full p-2"
          aria-label='Left Item'
          size="icon"
          variant="ghost"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </Button>
        <Button
          onClick={onNextButtonClick}
          className="absolute right-4 md:right-8 z-30 top-[50%] hover:bg-purple-500 bg-yellow-600 rounded-full p-2"
          aria-label={"Right Item"}
          size="icon"
          variant="ghost"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}

export default EmblaCarousel
