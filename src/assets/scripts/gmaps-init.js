const API_KEY = 'AIzaSyBfYsLC7ixn481Rt0JHv-4JjJbZqqda2UQ'
const CALLBACK_NAME = 'gmapsCallback'

let isInitialized = !!window.google
let resolveInitPromise
let rejectInitPromise

const promise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve
  rejectInitPromise = reject
})

export default function init () {
  if (isInitialized) {
    return promise
  }
  isInitialized = true
  window[CALLBACK_NAME] = () => {
    resolveInitPromise(window.google)
  }
  const script = document.createElement('script')
  script.async = true
  script.defer = true
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`
  script.onerror = rejectInitPromise
  document.querySelector('head').appendChild(script)
  return promise
}
