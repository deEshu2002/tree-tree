import React from 'react'
import Image from 'next/image'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { MapPin, Bookmark } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Badge } from './ui/badge'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel'
import { Card, CardContent } from './ui/card'
import { AspectRatio } from './ui/aspect-ratio'
import { ListItemProps } from './ListItem'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

function ListDialogMapper({
  children,
  isSmall,
  plantingLocationDetails
}: ListItemProps & {
  children: React.ReactNode
  isSmall: boolean | undefined
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-w-fit'>
        <div className='flex flex-wrap justify-center gap-4 w-[75vw] max-w-[1024px]'>
          <div className='mx-10 flex-grow flex-shrink basis-96 my-auto'>
            <Carousel className=''>
              <CarouselContent>
                {plantingLocationDetails.images &&
                  plantingLocationDetails.images.map((elem, idx) => {
                    return (
                      <CarouselItem key={idx}>
                        <AspectRatio ratio={4 / 3}>
                          <Image alt='location image' src={elem.src} fill />
                        </AspectRatio>
                      </CarouselItem>
                    )
                  })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <DescriptionTabs
            className='flex-grow flex-shrink basis-96'
            plantingLocationDetails={plantingLocationDetails}
          />
        </div>
        <div className='w-full flex justify-between gap-2 items-center'>
          <div className=''>
            <Button variant={'ghost'} size={'sm'} className='hover:bg-inherit px-0 w-fit' id='author'>
              <Avatar className='border-2 border-background w-9 h-9 mr-2'>
                <AvatarImage
                  src={plantingLocationDetails.postAuthor.img?.src}
                  alt={plantingLocationDetails.postAuthor.img?.alt}
                />
                <AvatarFallback>{plantingLocationDetails.postAuthor.name.toUpperCase().substring(0, 2)}</AvatarFallback>
              </Avatar>
              <p className='text-base max-w-28 overflow-clip'>{plantingLocationDetails.postAuthor.name}</p>
            </Button>
          </div>
          <div className='flex gap-2'>
            <Button className='rounded-full p-0 w-9 h-9'>
              <Bookmark />
            </Button>
            <Button className='rounded-full'>Join {!isSmall ? ' the moment' : ''}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DescriptionTabs({ plantingLocationDetails, className }: ListItemProps) {
  return (
    <Tabs defaultValue='details' className={cn('w-full', className)}>
      <TabsList className='w-fit grid grid-cols-3'>
        <TabsTrigger value='details'>Details</TabsTrigger>
        <TabsTrigger value='plants-type'>Plants Type</TabsTrigger>
        <TabsTrigger value='hero-board'>Hero Board</TabsTrigger>
      </TabsList>
      <TabsContent value='details' className=''>
        <Card className='shadow-none rounded-md h-56 lg:h-96 overflow-y-scroll'>
          <CardContent className='space-y-2 pt-4'>
            <h3 className='text-muted-foreground text-sm'>{plantingLocationDetails.flag}</h3>
            <h2 className='font-semibold text-lg lg:text-2xl leading-none'>{plantingLocationDetails.name}</h2>
            <div className='flex text-sm h-fit content-start'>
              <MapPin width={16} height={16} className='mr-1 mt-0.5' />
              <p className='line-clamp-2'>{plantingLocationDetails.location}</p>
            </div>
            <ul className='flex flex-wrap gap-1'>
              {plantingLocationDetails.locationType.map((elem, idx) => {
                return (
                  <li key={idx}>
                    <Badge variant='outline' className='w-fit my-2'>
                      {elem}
                    </Badge>
                  </li>
                )
              })}
            </ul>

            <div className='flex w-full h-full gap-4'>
              <div className='flex-auto flex justify-between'>
                <div>
                  <h4 className='text-sm font-semibold flex-auto'>Priority</h4>
                  <p className='text-sm'>{plantingLocationDetails.priority}</p>
                </div>
                <Separator orientation='vertical' className='' />
              </div>
              <div className='flex-auto'>
                <h4 className='text-sm font-semibold'>Ownership</h4>
                <p className='text-sm'>{plantingLocationDetails.ownership}</p>
              </div>
            </div>
            <Separator />
            <div className=''>
              <h4 className='text-sm font-semibold'>References</h4>
              <ul className='flex flex-wrap'>
                {plantingLocationDetails.references?.map((elem, idx) => {
                  return (
                    <li
                      key={idx}
                      className='text-sm overflow-clip max-w-96 break-words cursor-pointer hover:underline hover:text-ring'
                      role='link'
                      tabIndex={0}
                      onClick={() => window.open(`${elem}`)}
                    >
                      {elem},{' '}
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='plants-type'>
        <Card className='shadow-none rounded-md h-56 lg:h-96 overflow-y-scroll'>
          <CardContent className='space-y-2 p-2'>
            <table className={'w-full caption-bottom text-sm'}>
              <tbody className={'[&_tr:last-child]:border-0'}>
                {plantingLocationDetails.plantsAllowed?.map((elem, idx) => {
                  return (
                    <tr
                      className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                      key={idx}
                    >
                      <td className={'p-2 align-middle [&:has([role=checkbox])]:pr-0'}>{elem}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='hero-board'>
        <Card className='shadow-none rounded-md h-56 lg:h-96 overflow-y-scroll'>
          <CardContent className='space-y-2 p-2'>
            <table className={'w-full caption-bottom text-sm'}>
              <tbody className={'[&_tr:last-child]:border-0'}>
                {plantingLocationDetails.participatingUsers?.map((elem, idx) => {
                  return (
                    <tr
                      className='border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
                      key={idx}
                    >
                      <td className={'flex p-2 align-middle [&:has([role=checkbox])]:pr-0'}>
                        <Avatar className='border-2 border-background w-7 h-7 mr-2'>
                          <AvatarImage src={elem.img?.src} alt={elem.img?.alt} />
                          <AvatarFallback>{elem.name.toUpperCase().substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {elem.name}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default ListDialogMapper
