/* global localStorage */

const submit = document.getElementById('submit')

submit.addEventListener('click', event => {
  let selectedTime = document.getElementsByName('time')
  selectedTime.forEach(time => {
    if (time.checked) localStorage.setItem('selectedTime', time.value)
  })
})
