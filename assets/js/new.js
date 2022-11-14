window.addEventListener('DOMContentLoaded', () => {
  // Search an album
  let artistName = ''
  let albumName = ''
  const searchParams = new URL(document.location).searchParams
  if (searchParams.get('album') || searchParams.get('artist')) {
    albumName = searchParams.get('album')
    artistName = searchParams.get('artist')

    const artistInput = document.getElementById('artistName')
    artistInput.value = artistName

    const albumInput = document.getElementById('albumName')
    albumInput.value = albumName

    // Fetch albums list
    fetch('data/albums.json')
      .then(response => response.json())
      .then(response => searchAlbums(response))
      .catch(e => console.log(e))
  }

  const searchAlbums = data => {
    const resultsStart = data.filter(
      album => album.title.toLowerCase().indexOf(albumName.toLowerCase()) !== -1
    )

    const results = resultsStart.filter(
      album =>
        album.artist.toLowerCase().indexOf(artistName.toLowerCase()) !== -1
    )

    if (results.length > 0) {
      console.log(results)

      const imgElt = document.getElementById('cover')
      imgElt.src = 'assets/img/' + results[0].cover
      imgElt.alt = results[0].artist + ' - ' + results[0].title

      const artistElt = document.getElementById('artist')
      artistElt.innerText = results[0].artist

      const albumElt = document.getElementById('album')
      albumElt.innerText = results[0].title

      const yearElt = document.getElementById('year')
      yearElt.innerText = results[0].year

      const categoryElt = document.getElementById('category')
      categoryElt.innerText = results[0].category

      const resultsElt = document.getElementById('results')
      resultsElt.classList.add('on')
    } else {
      console.log('Nothing found')
    }
  }

  /* Add an album > */
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
        if (window.confirm('On ajoute ?')) {
          window.location.href = 'new.html'
        }
      } else {
        window.location.reload()
      }
    }
  }

  document.addEventListener('touchstart', handleTouchStart, false)
  document.addEventListener('touchmove', handleTouchMove, false)
  /* < Add an album */
})
