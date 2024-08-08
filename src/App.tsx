import { useState } from "react";
import "./App.css";
import csharp from "./assets/csharp.svg";

function App() {
  useState();
  const [imageIndex, setImageIndex] = useState(0);
  // const [frameIndex, setFrameIndex] = useState(0);
  // const [scrollPosition, setScrollPosition] = useState(0);

  const html = document.documentElement;
  const canvas = document.getElementById("main-page") as HTMLCanvasElement;
  const context = canvas?.getContext("2d");
  if (canvas) {
    canvas.getContext("2d");
    canvas.width = 1158;
    canvas.height = 770;
  }

  const images = [
    csharp,
    //  angular
  ];

  const image = new Image();
  image.src = images[imageIndex];
  image.onload = () => {
    context?.drawImage(image, 0, 0);
  };
  // function logFrameInfo() {
  //   const scrollFraction =
  //     html.scrollTop / (html.scrollHeight - window.innerHeight);
  //   console.log(`frame positions:\n
  //     html.scrollTop = ${html.scrollTop}\n
  //     html.scrollHeight = ${html.scrollHeight}\n
  //     window.innerHeight = ${window.innerHeight}\n
  //     scrollFraction = ${scrollFraction}\n
  //     Math.ceil(scrollFraction * images.length) = ${Math.ceil(
  //       scrollFraction * images.length
  //     )}\n
  //     images.length -1 = ${images.length - 1}\n
  //     `);
  // }
  // function updateImage(newFrameIndex: number) {
  //   setImageIndex(newFrameIndex);
  //   image.src = images[newFrameIndex];
  //   context?.drawImage(image, 0, 0);
  // }

  window.addEventListener("scroll", () => {
    // logFrameInfo();
    // const scrollTop = html.scrollTop;
    // const maxScrollTop = html.scrollHeight - window.innerHeight;
    // const scrollFraction = scrollTop / maxScrollTop;
    // const imageNumber = Math.ceil(scrollFraction * images.length - 1);
    // const frameIndex = Math.min(images.length - 1, imageNumber);
    // updateImage(frameIndex);
    // requestAnimationFrame(() => updateImage(frameIndex));
    const zoom = document.querySelector(".zoom") as HTMLImageElement;
    const minZoom = 1;
    const maxZoom = 2;
    const windowHeight = window.innerHeight;
    const vh = window.innerHeight / 100;
    const scrollTop = document.documentElement.scrollTop;
    const midPoint = scrollTop + windowHeight / 2;
    const windowBottom = scrollTop + windowHeight;
    const imageHeight = zoom.height;
    const firstImageStart = zoom.y;
    const firstImageStop = zoom.y + imageHeight;
    const windowTop25 = windowHeight * 0.25;
    const windowBottom25 = windowHeight * 0.75;
    let scale = maxZoom;
    let distanceFromMiddle = 0;
    let percentageAwayFromMiddle = 0;
    if (windowTop25 < firstImageStart && firstImageStart < windowBottom25) {
      scale = maxZoom;
    } else if (firstImageStart <= windowTop25) {
      distanceFromMiddle = windowTop25 - firstImageStart;
      percentageAwayFromMiddle = distanceFromMiddle / (windowHeight * 0.25);
      scale = Math.max((1 - percentageAwayFromMiddle) * maxZoom, minZoom);
    } else if (firstImageStart >= windowBottom25) {
      distanceFromMiddle = firstImageStart - windowBottom25;
      percentageAwayFromMiddle = distanceFromMiddle / (windowHeight * 0.25);
      scale = Math.max((1 - percentageAwayFromMiddle) * maxZoom, minZoom);
    }
    console.log(`
      windowHeight = ${windowHeight}\n
      scrollTop = ${scrollTop}\n
      midPoint = ${midPoint}\n
      windowBottom = ${windowBottom}\n
      imageHeight = ${imageHeight}\n
      firstImageStart = ${firstImageStart}\n
      firstImageStop = ${firstImageStop}\n
      windowTop25 = ${windowTop25}\n
      windowBottom25 = ${windowBottom25}\n
      distanceFromMiddle = ${distanceFromMiddle}\n
      percentageAwayFromMiddle = ${percentageAwayFromMiddle}\n
      percentageScaling = ${1 - percentageAwayFromMiddle}\n
      zoomScaling = ${(1 - percentageAwayFromMiddle) * maxZoom}\n
      image starts in top 25% of window? ${firstImageStart <= windowTop25}\n
      image starts in middle 50% of window? ${
        windowTop25 < firstImageStart && firstImageStart < windowBottom25
      }\n
      image starts in bottom 25% of window? ${
        firstImageStart >= windowBottom25
      }\n
      scale = ${scale}
      `);
    if (zoom) {
      zoom.style.transform = `scale(${scale})`;
    }
  });

  return (
    <>
      {/* <canvas id="main-page"></canvas> */}
      <p>
        hello, world!{" "}
        {canvas !== null ? "canvas is not null" : "canvas is null"}
      </p>
      <section className="top"></section>
      <section className="wrap">
        {images.map((img, index) => {
          return <img key={`img-${index}`} src={img} className="zoom"></img>;
        })}
      </section>
      <section className="bottom"></section>
    </>
  );
}

export default App;
