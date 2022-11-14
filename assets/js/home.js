window.addEventListener('DOMContentLoaded', () => {
  // Fetch albums list
  fetch('data/albums.json')
    .then(response => response.json())
    .then(response => suggest(response))
    .catch(e => console.log(e))

  // Suggest an album
  const suggest = data => {
    const randomItem = data[(Math.random() * data.length) | 0]

    if (randomItem) {
      const imgElt = document.getElementById('cover')
      imgElt.src = 'assets/img/' + randomItem.cover
      imgElt.alt = randomItem.artist + ' - ' + randomItem.album

      const artistElt = document.getElementById('artist')
      artistElt.innerText = randomItem.artist

      const albumElt = document.getElementById('album')
      albumElt.innerText = randomItem.album

      const yearElt = document.getElementById('year')
      yearElt.innerText = randomItem.year

      const categoryElt = document.getElementById('category')
      categoryElt.innerText = randomItem.category
    } else {
      console.log('No item')
    }
  }

  // Like an album
  const likeBtn = document.querySelector('.app-controls .like')
  likeBtn.addEventListener('click', e => {
    e.preventDefault()
    e.target.parentNode.classList.toggle('on')
  })

  /* Swipe album > */
  let xDown = null
  let yDown = null

  const getTouches = evt => {
    return evt.touches || evt.originalEvent.touches
  }

  const handleTouchStart = evt => {
    const firstTouch = getTouches(evt)[0]
    xDown = firstTouch.clientX
    yDown = firstTouch.clientY
  }

  const handleTouchMove = evt => {
    if (!xDown || !yDown) {
      return
    }

    const xUp = evt.touches[0].clientX
    const yUp = evt.touches[0].clientY

    const xDiff = xDown - xUp
    const yDiff = yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        window.alert('On écoute !')
      } else {
        // window.alert('On zappe')
      }

      window.location.reload()
    }
  }

  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)
  /* < Swipe album */
})
