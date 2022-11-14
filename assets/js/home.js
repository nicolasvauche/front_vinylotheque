window.addEventListener('DOMContentLoaded', () => {
  const likeBtn = document.querySelector('.app-controls .like')
  likeBtn.addEventListener('click', e => {
    e.preventDefault()
    e.target.parentNode.classList.toggle('on')
  })

  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)

  var xDown = null
  var yDown = null

  function getTouches (evt) {
    return evt.touches || evt.originalEvent.touches
  }

  function handleTouchStart (evt) {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  function handleTouchMove (evt) {
    if (!xDown || !yDown) {
      return
    }

    var xUp = evt.touches[0].clientX
    var yUp = evt.touches[0].clientY

    var xDiff = xDown - xUp
    var yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        window.alert('On écoute !')
      } else {
        window.alert('On zappe')
      }

      window.location.reload()
    }
  }
})
