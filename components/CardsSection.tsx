'use client'
import * as React from 'react'

import { cn, useWindowSize } from '@/lib/utils'

import { Label } from './ui/label'
import Filters from './Filters'
import { ListItem, PlantingLocation } from './ListItem'

const user = {
  id: 'hello123',
  name: 'hello',
  img: { src: 'https://github.com/shadcn.png', alt: 'profile' }
}

const listItemData: PlantingLocation[] = [
  {
    id: 'hello',
    flag: 'verified',
    name: "Nice place to visit i can't recommend enough this is the place to go to bro. YOu have to trust me",
    location: 'Swapna enclave semapur, New Delhi, India, 203302',
    participatingUsers: [user, user, user],
    eventType: 'planting',
    postAuthor: user,
    images: [
      {
        src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ],
    references: [
      "hellothisissomethingthatisverylongandidon'tknowwhattodoaboutitsojusttakeit",
      "hellothisissomethingthatisverylongandidon'tknowwhattodoaboutitsojusttakeit"
    ],
    ownership: 'government',
    locationType: ['nicest', 'nice'],
    plantsAllowed: ['what', 'is', 'this'],
    isVerified: true,
    priority: 'low',
    isOpenForVolunteering: true
  },
  {
    id: 'hello',
    flag: 'verified',
    name: 'Nice',
    location: 'Swapna enclave, semapur, New Delhi, India, 203302',
    participatingUsers: [user, user, user],
    eventType: 'planting',
    postAuthor: user,
    images: [],
    references: ['hello'],
    ownership: 'government',
    locationType: ['nicest', 'nice'],
    plantsAllowed: ['what', 'is', 'this'],
    isVerified: true,
    priority: 'low',
    isOpenForVolunteering: true
  },
  {
    id: 'hello',
    flag: 'verified',
    name: 'Nice',
    location: 'Swapna enclave, semapur, New Delhi, India, 203302',
    participatingUsers: [user, user, user],
    eventType: 'planting',
    postAuthor: user,
    images: [],
    references: ['hello'],
    ownership: 'government',
    locationType: ['nicest', 'nice'],
    plantsAllowed: ['what', 'is', 'this'],
    isVerified: true,
    priority: 'low',
    isOpenForVolunteering: true
  },
  {
    id: 'hello',
    flag: 'verified',
    name: 'Nice',
    location: 'Swapna enclave, semapur, New Delhi, India, 203302',
    participatingUsers: [user, user, user],
    eventType: 'planting',
    postAuthor: user,
    images: [],
    references: ['hello'],
    ownership: 'government',
    locationType: ['nicest', 'nice'],
    plantsAllowed: ['what', 'is', 'this'],
    isVerified: true,
    priority: 'low',
    isOpenForVolunteering: true
  }
]

export type switches = [string, string, boolean, React.Dispatch<React.SetStateAction<boolean>>]

const CardsSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }>(
  ({ className, asChild, ...props }, ref) => {
    const { isSmall } = useWindowSize()
    const [filterOpen, setFilterOpen] = React.useState(false)
    const [plantingEvent, setPlantingEvent] = React.useState(true)
    const [maintainingEvent, setMaintainingEvent] = React.useState(true)
    const [distanceFrame, setDistanceFrame] = React.useState([0, 100])
    const [onlyVerified, setOnlyVerified] = React.useState(false)
    const [openForVolunteering, setOpenForVolunteering] = React.useState(false)
    const [highestPriority, setHighestPriority] = React.useState(false)

    const switchesGroup: switches[] = [
      [
        'Only Verified',
        'Only credible sources will be shown after toggling this button',
        onlyVerified,
        setOnlyVerified
      ],
      [
        'Open For Volunteering',
        'Those events in which a user can volunteer for this',
        openForVolunteering,
        setOpenForVolunteering
      ],
      [
        'Highest Priority',
        'Such zones where there is a high priority to plant or maintain trees',
        highestPriority,
        setHighestPriority
      ]
    ]

    return (
      <section
        className={cn('relative rounded-2xl text-card-foreground bg-transparent', className)}
        ref={ref}
        {...props}
      >
        <div className='flex px-5 justify-end pb-2'>
          <Label aria-labelledby='list-section' className={'sr-only text-lg font-semibold leading-none my-auto'}>
            Places
          </Label>
          <Filters
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            plantingEvent={plantingEvent}
            setPlantingEvent={setPlantingEvent}
            maintainingEvent={maintainingEvent}
            setMaintainingEvent={setMaintainingEvent}
            distanceFrame={distanceFrame}
            setDistanceFrame={setDistanceFrame}
            switchesGroup={switchesGroup}
          />
        </div>
        <ul id='list-section' className='max-h-[80svh] flex gap-2 lg: lg:flex-col overflow-x-auto first:mt-2 p-2.5 overflow-y-scroll no-scrollbar'>
          {listItemData &&
            listItemData.map((elem, idx) => {
              return <ListItem plantingLocationDetails={elem} key={idx} />
            })}
        </ul>
      </section>
    )
  }
)

CardsSection.displayName = 'CardsSection'

export default CardsSection
