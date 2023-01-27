const express = require("express");
const axios = require("axios");
const {prepare} = require("../setup/test-helper")

// This is a very basic, simple way one can check for thresholds in app execution.
// Although provided for demonstration purposes, the usage of Artillery tests for
// performance testing is recommended
describe("Testing Routes with different time thresholds.", () => {
  it("Get / in 1000ms", async () => {
    const response = await axios.get(prepare("/"));
    expect(response.status).toEqual(200);
  }, 1000);

  it("Get / in 500ms", async () => {
    const response = await axios.get(prepare("/"));
    expect(response.status).toEqual(200);
  }, 500);

  it("Get / in 1000ms", async () => {
    const response = await axios.get(prepare("/"));
    expect(response.status).toEqual(200);
  }, 1000);
});

describe("GET / endpoint", () => {
  let successCount = 0;
  for (let i = 0; i < 100; i++) {
    it(`GET / ${i+1}`, async () => {
      try {
        const response = await axios.get(prepare("/"));
        expect(response.status).toEqual(200);
        successCount++;
      } catch (error) {
        // handle error here
      }
    }, 100);
  }

  it(`GET / success rate`, async () => {
    expect(successCount).toBeGreaterThan(90);
  }, 100);
});


 