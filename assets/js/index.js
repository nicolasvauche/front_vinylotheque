window.addEventListener('DOMContentLoaded', () => {
  const dragElt = document.getElementById('suggestedAlbum')
  let x = 2
  let y = 0
  Drog.on(dragElt)
  Drog.move(dragElt, x, y)

  dragElt.addEventListener('dragenter', e => {
    console.log('ok')
  })
})
