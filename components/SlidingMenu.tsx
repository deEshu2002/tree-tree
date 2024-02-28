'use client'
import React from 'react'
import { SlidingChoices } from './ui/sliding-choices'
import { cn, useWindowSize } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Pin, LogOut, LogIn, Home, Search, Plus, UserRound, Info } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import NewEntryForm from './NewEntryForm'

const menuValues = ['Home', 'Search', 'Add Location', 'Profile', 'Info']
const menuValuesIcons = [
  <Home key={0} width={16} />,
  <Search key={1} width={16} />,
  <Plus key={2} width={16} />,
  <UserRound key={3} width={16} />,
  <Info key={4} width={16} />
]

const SlidingMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const size = useWindowSize()

    const [profileActive, setProfileActive] = React.useState(false)

    const mouseEnterFunctions = menuValues.map((elem) => {
      if (elem === 'Profile') {
        return () => setProfileActive(true)
      }
    })
    const mouseLeaveFunctions = menuValues.map((elem) => {
      if (elem === 'Profile') {
        return () => setProfileActive(false)
      }
    })

    return (
      <div className={cn('flex sm', className)} ref={ref}>
        <SlidingChoices
          childrenClassName=''
          childrenOnMouseEnter={mouseEnterFunctions}
          childrenOnMouseLeave={mouseLeaveFunctions}
        >
          {menuValues.map((elem, idx) => {
            if (elem === 'Profile') {
              return (
                <React.Fragment key={idx}>
                  <Profile
                    open={profileActive}
                    isLoggedIn={true}
                    elem={size.isSmall ? menuValuesIcons[idx] : 'Profile'}
                    className={size.isSmall ? 'py-1' : 'py-5'}
                    isSmall={size.isSmall}
                  />
                </React.Fragment>
              )
            } else
              return (
                <React.Fragment key={idx}>
                  <DialogTemp
                    value={size.isSmall ? menuValuesIcons[idx] : elem}
                    className={size.isSmall ? 'py-1' : 'py-5'}
                    isSmall ={size.isSmall}
                  />
                </React.Fragment>
              )
          })}
        </SlidingChoices>
      </div>
    )
  }
)

SlidingMenu.displayName = 'SlidingMenu'

const Profile = ({
  open,
  isLoggedIn,
  elem,
  className,
  isSmall
}: {
  open: boolean
  isLoggedIn: boolean
  elem: React.ReactNode
  className: string
  isSmall: boolean | undefined
}) => {
  return (
    <DropdownMenu modal={false} open={open}>
      <DropdownMenuTrigger className={cn('px-6 focus-visible:outline-none', className)}>{elem}</DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          'rounded-3xl shadow-none border-2 border-foreground p-3 my-3 flex flex-col justify-center',
          isSmall ? 'w-60' : 'w-72'
        )}
        sideOffset={0}
      >
        {!isLoggedIn && (
          <Button className='rounded-full gap-2 text-base font-medium py-6' size={'lg'}>
            <LogIn />
            Sign In
          </Button>
        )}
        {isLoggedIn && <ProfileOptions isSmall={isSmall} />}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ProfileOptions = ({ isSmall }: { isSmall: boolean | undefined }) => {
  return (
    <React.Fragment>
      <DropdownMenuItem className='text-base font-medium rounded-2xl'>
        <Avatar className={cn('border-2 border-background mr-2', isSmall ? 'w-8 h-8' : 'w-12 h-12')}>
          <AvatarImage src='https://github.com/shadcn.png' alt='user' />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
        Profile Name
      </DropdownMenuItem>
      <DropdownMenuItem className={cn(' rounded-2xl text-base font-medium', isSmall ? 'h-10' : 'h-14')}>
        My List
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className={cn('rounded-2xl text-base font-medium', isSmall ? 'h-10' : 'h-14')}>
        Log out
        <LogOut className='ml-2' />
      </DropdownMenuItem>
    </React.Fragment>
  )
}

const DialogTemp = ({ value, className, isSmall }: { value: string | React.ReactNode; className: string; isSmall: boolean| undefined }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className={cn(' px-6 hover:bg-inherit hover:text-inherit', className)}>
          {value}
        </Button>
      </DialogTrigger>
      <DialogContent
        // className="top-[10svh] translate-y-[-10svh] "
        className='w-fit max-w-sm lg:max-w-5xl p-4 pt-12 lg:p-10'
      >
        {/* className="grid gap-3 p-8 w-fit h-fit lg:grid-cols-[1fr_1fr] lg:rounded-none sm:rounded-none" */}
        <NewEntryForm isSmall={isSmall}/>
      </DialogContent>
    </Dialog>
  )
}

export { SlidingMenu }
