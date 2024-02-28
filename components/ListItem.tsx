'use client'
import * as React from 'react'
import { cn, useWindowSize } from '@/lib/utils'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Plus, Bookmark, Share, Navigation, MoreHorizontal, Check, Flag, Copy, MapPin } from 'lucide-react'
import { AvatarStack } from './ui/avatar-stack'
import { Button } from './ui/button'

import { AspectRatio } from './ui/aspect-ratio'
import ListDialogMapper from './ExpandListItem'

type Image = {
  src: string
  alt?: string
}

type User = {
  id: string
  name: string
  img?: Image
}

type ListData = {
  id: string
  flag: 'verified' | 'new' | 'credible'
  name: string
  location: string
  participatingUsers: User[]
  eventType: 'maintaining' | 'planting'
}

export interface PlantingLocation extends ListData {
  postAuthor: User
  images?: Image[]
  references?: string[]
  ownership: 'unknown' | 'government' | 'self'
  locationType: string[]
  plantsAllowed?: string[]
  isVerified: boolean
  priority: 'low' | 'medium' | 'high'
  isOpenForVolunteering: boolean
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  plantingLocationDetails: PlantingLocation
}

const listItemActions: actionsProperty[] = [
  { actionName: 'save', icon: <Bookmark width={16} height={16} /> },
  { actionName: 'share', icon: <Share width={16} height={16} /> },
  { actionName: 'navigation', icon: <Navigation width={16} height={16} /> },
  {
    actionName: 'more information',
    icon: <MoreHorizontal width={16} height={16} />
  },
  { actionName: 'vouch credibility', icon: <Check width={16} height={16} /> },
  {
    actionName: 'report',
    icon: <Flag width={16} height={16} />,
    color: 'text-red-600 hover:bg-black hover:text-red-600 focus:text-red-600',
    needSeparator: true
  }
]

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, title, children, plantingLocationDetails, ...props }, ref) => {
    const { isSmall } = useWindowSize()
    const [operationsActive, setOperationsActive] = React.useState<boolean>(false)
    return (
      <li
        onMouseEnter={() => setOperationsActive(true)}
        onMouseLeave={() => setOperationsActive(false)}
        ref={ref}
        {...props}
        tabIndex={0}
        data-state={operationsActive ? 'open' : 'closed'}
        className={cn(
          'w-full relative flex flex-row justify-between mb-[2px] rounded-md outline-none transition-colors data-[state=open]:bg-secondary data-[state=closed]:bg-card focus:bg-secondary border shadow-sm', // dashed bottom pattern -> lg:after:w-full lg:after:h-[1px] lg:after:absolute lg:after:bottom-[-1.5px] lg:after:bg-repeat lg:after:bg-[length:15px_1px] lg:after:bg-dash-pattern
          className
        )}
      >
        <ListActions
          asChild
          className='absolute top-1 right-1'
          actions={listItemActions}
          setOperationsActive={setOperationsActive}
        />
        <div className='relative lg:p-4 p-2 w-60'>
          <AspectRatio ratio={11 / 10} className='p-4'>
            <Image
              src='https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='Image'
              className='rounded-md object-cover'
              fill
            />
            <Button
              className='h-7 absolute right-0 bottom-0 rounded-tr-none rounded-bl-none animate-in fill-mode-forwards fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-bottom-1'
              variant={'default'}
              size={'sm'}
              data-state={operationsActive ? 'open' : 'closed'}
            >
              <Copy className='w-4 h-4 mr-2' />
              {plantingLocationDetails.images?.length ?? '1'}
              {'+'}
            </Button>
          </AspectRatio>
        </div>

        <div className='flex flex-col h-auto pl-1 pr-4 lg:pr-10 pb-2 lg:pb-3.5'>
          <div className='h-full mt-2 lg:mt-4'>
            <h6 className='block text-xs tracking-normal text-muted-foreground uppercase'>
              {plantingLocationDetails.flag}
            </h6>
            <h4 className='block line-clamp-2 text-base lg:text-lg font-semibold text-ellipsis w-40 lg:w-60 whitespace-nowrap overflow-hidden'>
              {plantingLocationDetails.name}
            </h4>
            <p className='text-xs text-ellipsis text-muted-foreground w-40 h-12 lg:h-auto overflow-clip lg:w-60'>
              {plantingLocationDetails.location}
            </p>
            {!isSmall && <AvatarStack />}
          </div>

          <ListDialogMapper isSmall={isSmall} plantingLocationDetails={plantingLocationDetails}>
            <Button
              variant='outline'
              size={isSmall ? 'sm' : 'default'}
              className='w-fit rounded-full border-foreground bg-transparent'
            >
              Join the moment
            </Button>
          </ListDialogMapper>
        </div>
      </li>
    )
  }
)
ListItem.displayName = 'ListItem'

type actionsProperty = {
  icon: React.ReactNode
  actionName: string
  needSeparator?: boolean
  color?: string
}

interface ListActionsProps extends React.ComponentPropsWithoutRef<typeof DropdownMenuTrigger> {
  actions: actionsProperty[]
  setOperationsActive: React.Dispatch<React.SetStateAction<boolean>>
}
const ListActions = React.forwardRef<React.ElementRef<typeof DropdownMenuTrigger>, ListActionsProps>(
  ({ className, title, children, setOperationsActive, actions, ...props }, ref) => {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          ref={ref}
          className={cn(
            'relative after:absolute after:h-[18px] after:w-[1px] after:left-0 after:bg-accent z-auto',
            className
          )}
          {...props}
        >
          <Button variant='ghost' size='icon'>
            <Plus className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {actions &&
            actions.map((val, idx) => {
              const needSeparator = val.needSeparator
              return (
                <div key={idx}>
                  {needSeparator && <DropdownMenuSeparator />}
                  <DropdownMenuItem asChild>
                    <Button
                      variant={'ghost'}
                      className={cn('flex justify-start w-full gap-2 capitalize', val.color)}
                      size={'sm'}
                    >
                      {val.icon}
                      {val.actionName}
                    </Button>
                  </DropdownMenuItem>
                </div>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

ListActions.displayName = 'ListActions'

export { ListItem }

export type { User, actionsProperty, ListData }
