const expect = require("chai").expect;
const Link = require("../src/link");
const Input = require("../src/input");

describe("Input", () => {
  describe("process", () => {
    it("should process all inputs and return with shortest links for each", () => {
      // arrange
      const inputs = [{ from: 0, to: 3 }];
      const users = [
        {
          follows: [1],
        },
        {
          follows: [2, 3],
        },
        {
          follows: [3],
        },
        {
          follows: [1, 0],
        },
      ];
      const link = new Link(users);
      const input = new Input(inputs, link);

      // act
      const processed = input.process();

      // assert
      const p = processed[0];
      expect(p.to).to.equal(inputs[0].to);
      expect(p.from).to.equal(inputs[0].from);
      expect(p.shortestLink.toString()).to.equal([0, 1, 3].toString());
    });

    it("should process all inputs and return without shortest link if no links found", () => {
      // arrange
      const inputs = [{ from: 0, to: 10 }];
      const users = [
        {
          follows: [1],
        },
        {
          follows: [2, 3],
        },
        {
          follows: [3],
        },
        {
          follows: [1, 0],
        },
      ];
      const link = new Link(users);
      const input = new Input(inputs, link);

      // act
      const processed = input.process();

      // assert
      const p = processed[0];
      expect(p.to).to.equal(inputs[0].to);
      expect(p.from).to.equal(inputs[0].from);
      expect(p.shortestLink).to.equal(undefined);
    });
  });
});
