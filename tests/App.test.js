import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "../src/App";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders app successfully", async () => {
  const fakeData = {
    info: {
      count: 671,
      pages: 34,
    },
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        species: "Human",
        origin: {
          name: "Earth (C-137)",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      }
    ]
  };

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(container).toMatchSnapshot();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockClear();
  delete global.fetch;
});

it("renders new page successfully", async () => {
  const fakeData = {
    info: {
      count: 671,
      pages: 34,
    },
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        species: "Human",
        origin: {
          name: "Earth (C-137)",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      }
    ]
  };

  const fakeData2 = {
    info: {
      count: 671,
      pages: 34,
    },
    results: [
      {
        id: 1,
        name: "Rick Sanchez 2",
        species: "Human",
        origin: {
          name: "Earth (C-137)",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      }
    ]
  };

  global.fetch = jest.fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData)
      }))
    .mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeData2)
      })
    );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  await act(async () => {
    container.querySelector("#pagination > ul > li:nth-child(3) > button").click();
  });

  expect(container).toMatchSnapshot();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockClear();
  delete global.fetch;
});

it("renders app successfully with uneven data", async () => {
  const fakeData = {};

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(container).toMatchSnapshot();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockClear();
  delete global.fetch;
});

it("renders error", async () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.reject("Error")
);

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(container).toMatchSnapshot();

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockClear();
  delete global.fetch;
});
