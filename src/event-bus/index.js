import EventBus from '@/services/EventBus'
import MessageEvents from './MessageEvents'

function setTitle (title) {
  title = title ? `${title} - ${process.env.REACT_APP_APP_NAME}` : process.env.REACT_APP_APP_NAME
  window.document.title = title
}

const events = {
  ...MessageEvents,
  setTitle
}

Object.keys(events).forEach(eventName => {
  EventBus.on(eventName, events[eventName])
})
