import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="Test title" />);
});

it("matches snapshot", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test title" />
  );

  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // move backward in the carousel
  const leftArrow = container.querySelector(".fa-chevron-circle-left");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("left arrow not shown on the fist image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  //ask about it
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  //tests non-existence of left arrow
  expect(container.querySelector(".fa-chevron-circle-left")).toHaveClass(
    "hidden"
  ); //toHaveClass
});

it("left arrow shown when on last image", function () {
  const { container, debug } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  debug();
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  //left arrow should be in the dom
  expect(
    container.querySelector(".fa-chevron-circle-left")
  ).toBeInTheDocument();
});

it("right arrow exists when on the fist image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector(".fa-chevron-circle-right")
  ).toBeInTheDocument();

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("right arrow does not exist when last image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
  //tests non-existence of right arrow
  expect(container.querySelector(".fa-chevron-circle-right")).toHaveClass(
    "hidden"
  );
});
