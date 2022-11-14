window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.app-main form')

  loginForm.addEventListener('submit', e => {
    e.preventDefault()
    window.location.href = 'home.html'
  })
})
