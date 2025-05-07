const doggos = () => {
    // Trusted Types
  // Needed to generate safe strings for "innerHtml" setting
  if (typeof trustedTypes == "undefined")
    trustedTypes = { createPolicy: (n, rules) => rules };
      
  const lbPolicy = trustedTypes.createPolicy("lightbox-html", {
    createHTML: (input) => input
  })

  // Lightbox
  const lightboxImages = document.querySelectorAll("a.lightbox")

  if (lightboxImages.length) {
    const dialog = document.querySelector("dialog.lightbox")
    const dialogImg = dialog.querySelector("img")

    const showLightbox = (anchor, e) => {
      dialogImg.src = anchor.dataset.lbImage
      dialogImg.width = anchor.dataset.lbImageWidth
      dialogImg.height = anchor.dataset.lbImageHeight

      dialog.showModal()
      e.stopPropagation()
      e.preventDefault()
    }

    const hideLIghtbox = (e) => {
      e.stopPropagation()
      e.preventDefault()
      // allow right click in modal
      if (e.button !== 2) {
        dialog.close()
      }
    }

    lightboxImages.forEach((anchor) => {
      anchor.onclick = (e) => showLightbox(anchor, e)
    })

    dialog.onmousedown = hideLIghtbox
  }
}

"loading"===document.readyState ?
  document.addEventListener("DOMContentLoaded", doggos, false):
  doggos()
