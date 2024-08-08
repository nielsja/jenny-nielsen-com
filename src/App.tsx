import { useState } from "react";
import "./App.css";
import angular from "./assets/angular.svg";
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

  const images = [csharp, angular];

  const image = new Image();
  image.src = images[imageIndex];
  image.onload = () => {
    context?.drawImage(image, 0, 0);
  };
  function logFrameInfo() {
    const scrollFraction =
      html.scrollTop / (html.scrollHeight - window.innerHeight);
    console.log(`frame positions:\n
      html.scrollTop = ${html.scrollTop}\n
      html.scrollHeight = ${html.scrollHeight}\n
      window.innerHeight = ${window.innerHeight}\n
      scrollFraction = ${scrollFraction}\n
      Math.ceil(scrollFraction * images.length) = ${Math.ceil(
        scrollFraction * images.length
      )}\n
      images.length -1 = ${images.length - 1}\n
      `);
  }
  function updateImage(newFrameIndex: number) {
    setImageIndex(newFrameIndex);
    image.src = images[newFrameIndex];
    context?.drawImage(image, 0, 0);
  }

  window.addEventListener("scroll", () => {
    // logFrameInfo();
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const imageNumber = Math.ceil(scrollFraction * images.length - 1);
    const frameIndex = Math.min(images.length - 1, imageNumber);
    updateImage(frameIndex);
    requestAnimationFrame(() => updateImage(frameIndex));
  });

  return (
    <>
      <canvas id="main-page"></canvas>
      <p>
        hello, world!{" "}
        {canvas !== null ? "canvas is not null" : "canvas is null"}
      </p>
    </>
  );
}

export default App;
