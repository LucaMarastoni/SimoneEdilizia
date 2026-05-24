(() => {
  const links = Array.from(document.querySelectorAll("[data-lightbox]"));
  const lightbox = document.getElementById("lightbox");

  if (!links.length || !lightbox) {
    return;
  }

  const image = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const previousButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");
  const controls = [closeButton, previousButton, nextButton].filter(Boolean);

  let currentIndex = 0;
  let lastFocusedElement = null;

  const showImage = (index) => {
    currentIndex = (index + links.length) % links.length;
    const link = links[currentIndex];
    const thumbnail = link.querySelector("img");

    image.src = link.href;
    image.alt = thumbnail ? thumbnail.alt : link.dataset.caption || "Foto lavoro";
    caption.textContent = link.dataset.caption || "";
  };

  const openLightbox = (index) => {
    lastFocusedElement = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    image.removeAttribute("src");
    document.body.classList.remove("lightbox-open");

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openLightbox(index);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => showImage(currentIndex - 1));
  nextButton.addEventListener("click", () => showImage(currentIndex + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    }

    if (event.key === "Tab" && controls.length) {
      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus();
      }
    }
  });
})();
