import React from 'react'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Delete, DeleteIcon, MapPin, PlusCircle, Trash, Image as Img } from 'lucide-react'
import { AspectRatio } from './ui/aspect-ratio'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { SlidingChoices } from './ui/sliding-choices'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp']

const formSchema = z.object({
  'Location Image': z.array(
    z
      .any()
      .refine((files) => {
        return files?.[0]?.size <= MAX_FILE_SIZE
      }, `Max image size is 5MB.`)
      .refine(
        (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
  ),
  'Location Name': z.string().min(2, {
    message: 'Location name must be at least 2 characters.'
  }),
  Location: z.string().min(10, {
    message: 'Location must be at least of 10 characters.'
  }),
  'Location Type': z.union([z.literal('nice'), z.literal('amazing'), z.literal('nice again')]),
  'Location Radius': z
    .number()
    .gt(0, { message: 'Location radius should be greater than 0' })
    .lt(100, { message: 'Location radius should be less than 100' }),
  'distance Unit': z.union([z.literal('Km'), z.literal('Mi')]),
  Priority: z.union([z.literal('Low'), z.literal('Medium'), z.literal('High')]),
  Ownership: z.union([z.literal('Unknown'), z.literal('Government'), z.literal('self')]),
  'Tree Type': z.array(z.string()),
  References: z.array(z.string().url({ message: 'Invalid URL' }))
})

const priorityOptions = ['Low', 'Medium', 'High']
const ownershipOptions = ['Unknown', 'Government', 'Self']

const NewEntryForm = ({ isSmall }: { isSmall: boolean| undefined }) => {
  const [selectedImage, setSelectedImage] = React.useState<File[] | []>([])
  const [treeTypeIsOpen, setTreeTypeIsOpen] = React.useState(false)
  const [treeTypeCollection, setTreeTypeCollection] = React.useState<string[] | []>([])
  const [referencesIsOpen, setReferencesIsOpen] = React.useState(false)
  const [referencesCollection, setReferencesCollection] = React.useState<string[] | []>([])
  const [imagesViewIsOpen, setImagesViewIsOpen] = React.useState(true)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'Location Image': [undefined],
      'Location Name': '',
      Location: '',
      'Location Type': 'nice',
      'Location Radius': 0.1,
      'distance Unit': 'Km',
      Priority: 'Low',
      Ownership: 'self',
      'Tree Type': [],
      References: []
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  React.useEffect(() => {}, [])

  return (
    <Form {...form}>
      <form
        id='new-entry-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col space-y-4 max-h-[86svh]'
        onDrag={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            for (let i = 0; i < e.dataTransfer.files['length']; i += 1) {
              const foundLocation = ACCEPTED_IMAGE_MIME_TYPES.findIndex((elem) => elem === e.dataTransfer.files[i].type)

              foundLocation !== -1 && setSelectedImage((prevState: any) => [...prevState, e.dataTransfer.files[i]])
            }
          }
        }}
      >
        <div className='grid lg:grid-cols-[1fr_1fr] lg:space-x-6 lg:rounded-none sm:rounded-none overflow-y-scroll overflow-x-hidden no-scrollbar'>
          <div className='flex flex-col items-center space-y-4'>
            <Carousel className='lg:mx-12  w-80 lg:w-[400px] h-60 lg:h-[300px] '>
              <CarouselContent>
                {selectedImage
                  ? selectedImage.map((elem, idx) => {
                      return (
                        <CarouselItem key={idx}>
                          <AspectRatio ratio={4 / 3}>
                            {elem && <Image alt='image' src={URL.createObjectURL(elem)} fill style={{objectFit:"contain"}}  className={""}/>}
                          </AspectRatio>
                        </CarouselItem>
                      )
                    })
                  : ''}
                {selectedImage.length === 0 && (
                  <CarouselItem>
                    <div className='flex items-center justify-center w-80 lg:w-[400px] h-60 lg:h-[300px] bg-border rounded'>
                      <Img width={28} height={28} className='w-10 h-10 text-accent' />
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <FormField
              control={form.control}
              name='Location Image'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button type='button' variant={'outline'} className='w-80 lg:w-[400px] h-fit'>
                      <input
                        type='file'
                        className='sr-only'
                        id='fileInput'
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files)
                          if (e.target.value.length !== 0)
                            setSelectedImage((prev) => {
                              const newFiles = [...prev]
                              if (e.target.files) {
                                for (let i = 0; i < e.target.files.length; i += 1) {
                                  const file = e.target.files[i]
                                  const foundIdx = ACCEPTED_IMAGE_MIME_TYPES.indexOf(file.type)
                                  if (foundIdx !== -1) {
                                    newFiles.push(file)
                                  }
                                }
                              }
                              return newFiles
                            })
                        }}
                        ref={field.ref}
                        multiple
                      />
                      <FormLabel htmlFor='fileInput' className='text-neutral-90 cursor-pointer inline-flex space-x-2'>
                        <PlusCircle size={ isSmall ? 45 : 60} strokeWidth={0.5} />
                        <div className='space-y-1 flex flex-col items-start justify-center'>
                          <h3 className='leading-none text-base'>Place Image here</h3>
                          <p className='text-xs text-muted-foreground'>Accepted types {ACCEPTED_IMAGE_TYPES.join(', ')}</p>
                        </div>
                      </FormLabel>
                    </Button>
                  </FormControl>
                  <Collapsible
                    open={imagesViewIsOpen}
                    onOpenChange={setImagesViewIsOpen}
                    className='space-y-2 w-80 lg:w-[400px]'
                  >
                    <div className='flex items-center justify-between'>
                      <FormLabel className='text-sm font-semibold'>Images</FormLabel>
                      <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <CaretSortIcon className='h-4 w-4' />
                          <span className='sr-only'>Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>

                    <CollapsibleContent className='space-y-1 lg:max-h-40 lg:overflow-y-scroll '>
                      {selectedImage.map((elem, idx) => {
                        return (
                          <div className='flex items-center w-full p-1 rounded-md hover:bg-secondary' key={idx}>
                            <div className='inline-flex items-center justify-center flex-shrink-0 h-14 w-14 rounded-md border text-sm shadow-sm'>
                              <AspectRatio ratio={4 / 3} className='overflow-hidden'>
                                <Image src={URL.createObjectURL(elem)} width={56} height={42} alt={'image-preview'} />
                              </AspectRatio>
                            </div>
                            <span className='sr-only'>{'image 1'}</span>
                            <p className='ms-3 text-sm font-normal w-full whitespace-nowrap overflow-scroll'>
                              {elem.name}
                            </p>

                            <Button
                              type='button'
                              variant={'ghost'}
                              size={'sm'}
                              className='ms-auto -mx-1.5 mr-0.5 -my-1.5  p-1.5 h-8 w-8'
                              onClick={() => {
                                setSelectedImage((prev) => {
                                  prev.splice(idx, 1)
                                  return [...prev]
                                })
                              }}
                            >
                              <span className='sr-only'>Delete</span>
                              <Trash width={20} />
                            </Button>
                          </div>
                        )
                      })}
                    </CollapsibleContent>
                  </Collapsible>
                  
                </FormItem>
              )}
            />
          </div>
          <div className='space-y-3 p-1'>
            <FormField
              control={form.control}
              name='Location Name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                {/* <FormMessage>{"Name shouldn't have any number"}</FormMessage> */}
                </FormItem>
              )}
            />
            <div className='flex w-80 lg:w-[400px]'>
              <FormField
                control={form.control}
                name='Location'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>{field.name}</FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} className='rounded-r-none border-r-transparent' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className='mt-auto w-12 rounded-l-none border-l-transparent' type='button'>
                <MapPin height={20} width={20} />
              </Button>
            </div>
            {/* <FormField
            control={form.control}
            name="locationType"
            render={({ field }) => (
              <FormItem className="space-y-1 w-80">
                <FormLabel className="font-medium text-sm mb">
                  Location Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="flex">
            <FormField
              control={form.control}
              name="locationRadius"
              render={({ field }) => (
                <FormItem className="w-10/12 space-y-1">
                  <FormLabel className="font-medium text-sm mb ">
                    Size
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      className="rounded-r-none border-r-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="distanceUnit"
              render={({ field }) => (
                <FormItem className="w-2/12 mt-auto space-y-1">
                  <FormLabel className="sr-only">Size Units</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-foreground text-background rounded-l-none ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent align="end">
                      <SelectItem value="m@example.com" className="">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div> */}

            <FormField
              control={form.control}
              name='Priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='relative'>
                      <SlidingChoices childrenClassName='py-3' className='border-input'>
                        {formSlidingChoiceWrapper(priorityOptions)}
                      </SlidingChoices>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='Ownership'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='relative'>
                      <SlidingChoices childrenClassName='py-3' className='border-input'>
                        {formSlidingChoiceWrapper(ownershipOptions)}
                      </SlidingChoices>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='Tree Type'
              render={({ field }) => (
                <Collapsible
                  open={treeTypeIsOpen}
                  onOpenChange={setTreeTypeIsOpen}
                  className='space-y-2 w-80 lg:w-[400px]'
                >
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>{field.name}</FormLabel>
                      <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <CaretSortIcon className='h-4 w-4' />
                          <span className='sr-only'>Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <FormControl>
                      <Input
                        placeholder='shadcn'
                        type='text'
                        {...field}
                        onKeyDown={(e) => {
                          if (e.code === 'Enter') {
                            const target = e.target as HTMLInputElement
                            e.preventDefault()
                            setTreeTypeCollection((prev) => [target.value, ...prev])

                            form.resetField('Tree Type')
                          }
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>

                  <CollapsibleContent className='space-y-1'>
                    {treeTypeCollection.map((elem, idx) => {
                      return (
                        <div className='flex items-center justify-between space-x-1' key={idx}>
                          <p className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>{elem}</p>
                          <Button
                            type='button'
                            variant={'ghost'}
                            size={'sm'}
                            onClick={() => {
                              setTreeTypeCollection((prev) => {
                                prev.splice(idx, 1)
                                return [...prev]
                              })
                            }}
                          >
                            <Trash width={20} />
                          </Button>
                        </div>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )}
            />

            <FormField
              control={form.control}
              name='References'
              render={({ field }) => (
                <Collapsible
                  open={referencesIsOpen}
                  onOpenChange={setReferencesIsOpen}
                  className='space-y-2 w-80 lg:w-[400px]'
                >
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>{field.name}</FormLabel>
                      <CollapsibleTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <CaretSortIcon className='h-4 w-4' />
                          <span className='sr-only'>Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <FormControl>
                      <Input
                        placeholder='shadcn'
                        type='text'
                        {...field}
                        onKeyDownCapture={(e) => {
                          if (e.code === 'Enter') {
                            const target = e.target as HTMLInputElement
                            setReferencesCollection((prev) => [target.value, ...prev])
                            form.resetField('References')
                          }
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                  </FormItem>

                  <CollapsibleContent className='space-y-1'>
                    {referencesCollection.map((elem, idx) => {
                      return (
                        <div className='flex items-center justify-between space-x-1' key={idx}>
                          <p className='rounded-md border px-4 py-2 font-mono text-sm shadow-sm'>{elem}</p>
                          <Button
                            type='button'
                            variant={'ghost'}
                            size={'sm'}
                            onClick={() => {
                              setReferencesCollection((prev) => {
                                prev.splice(idx, 1)
                                return [...prev]
                              })
                            }}
                          >
                            <Trash width={20} />
                          </Button>
                        </div>
                      )
                    })}
                  </CollapsibleContent>
                </Collapsible>
              )}
            />
          </div>
        </div>
        <Button className='w-flex self-end'>Submit</Button>
      </form>
    </Form>
  )
}

const formSlidingChoiceWrapper = (options: string[]) => {
  const SlidingChoices: React.ReactElement[] = options.map((elem, idx) => {
    return (
      <FormItem className='flex self-center m-auto space-y-0 px-6' key={idx}>
        <FormControl>
          <RadioGroupItem value={elem} className='sr-only' />
        </FormControl>
        <FormLabel className='font-normal w-full'>{elem}</FormLabel>
      </FormItem>
    )
  })
  return SlidingChoices
}

export default NewEntryForm
