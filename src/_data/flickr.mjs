import flickrPhotos from "./flickr-cache.json" with { type: "json" }

const srcSizes = [
  "Small",
  "Small 320",
  "Small 400",
  "Medium",
  "Medium 640",
  "Medium 800",
  "Large"
]

const parsePhoto = (photo) => {
  if (!photo.sizes["Large"]) {
    photo.sizes["Large"] = photo.sizes["Original"]
  }

  return {
    id: photo.info.id,
    title: photo.info.title,
    href: photo.info.urls.url.find((_url) => _url.type === "photopage").text,
    img: {
      src: photo.sizes["Small"].source,
      width: photo.sizes["Small"].width,
      height: photo.sizes["Small"].height,
      orientation: photo.sizes["Small"].width > photo.sizes["Small"].height 
        ? "horizontal"
        : "vertical"
    },
    imgLg: {
      src: photo.sizes["Large"].source,
      width: photo.sizes["Large"].width,
      height: photo.sizes["Large"].height,
      orientation: photo.sizes["Large"].width > photo.sizes["Large"].height 
        ? "horizontal"
        : "vertical"
    },
    sources: Object.values(photo.sizes).reduce((acc, item) => {
      if (!srcSizes.includes(item.label)) {
        return acc
      }

      const src = {
        src: item.source,
        media: `(min-width: ${item.width}px)`
      }
      
      acc.push(src)

      return acc
    }, []).reverse()
  }
}

const flickr = {
  albums: Object.keys(flickrPhotos.albums).reduce((acc, key) => {
    const album = flickrPhotos.albums[key]
    acc[key] = album.map((id) => parsePhoto(flickrPhotos.photos[id]))

    return acc
  }, {}),
  photos: Object.keys(flickrPhotos.photos).reduce((acc, key) => {
    const photo = flickrPhotos.photos[key]
    acc[key] = parsePhoto(photo)

    return acc
  }, {})
}

export default flickr
