import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Button, Center, Heading, Image, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <Center sx={{"width": "100%", "height": "100vh"}}>
  <VStack sx={{"padding": "2em", "shadow": "lg", "borderRadius": "lg"}}>
  <Heading>
  {`Get A Duck:)`}
</Heading>
  <Button colorScheme={`yellow`} isLoading={state.processing} onClick={(_e) => addEvents([Event("state.get_duck", {})], (_e))} sx={{"width": "100%"}}>
  {`QUACK`}
</Button>
  <Fragment>
  {isTrue(state.complete) ? (
  <Fragment>
  <Image src={state.image_url} sx={{"height": "25em", "width": "25em"}}/>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
</VStack>
</Center>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
