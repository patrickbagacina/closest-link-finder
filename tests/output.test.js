const Output = require("../src/output");

describe("Output", () => {
  describe("log", () => {
    it("should be able to log the processed inputs without any errors", () => {
      // arrange
      const processed = [
        {
          from: 0,
          to: 2,
          shortestLink: [0, 1, 2],
        },
      ];

      // act / assert
      Output.log(processed);
    });
  });
});
