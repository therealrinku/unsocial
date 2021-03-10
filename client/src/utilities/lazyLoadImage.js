const lazyLoadImage = () => {
  const Images = document.querySelectorAll(".lazy-image");
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const image = entry.target;
      const newSrc = image.getAttribute("data-src");
      image.src = newSrc;
    });
  }, {});

  Images.forEach((image) => {
    observer.observe(image);
  });
};

export default lazyLoadImage;
