/* global localStorage */

const submit = document.getElementById('submit')

submit.addEventListener('click', event => {
  let selectedTime = document.getElementsByName('time')
  let selectedTransport = document.getElementsByName('transportation')
  let data = {}

  selectedTransport.forEach(method => {
    if (method.checked) data.transportation = method.value
  })
  selectedTime.forEach(time => {
    if (time.checked) data.time = time.value
  })

  localStorage.setItem('data', JSON.stringify(data))
})
