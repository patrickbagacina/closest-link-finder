const expect = require("chai").expect;
const Link = require("../src/link");

describe("Link", () => {
  let users, link;

  beforeEach(() => {
    users = [
      {
        follows: [1, 2],
      },
      {
        follows: [3, 4],
      },
      {
        follows: [0],
      },
      {
        follows: [0],
      },
      {
        follows: [5, 6],
      },
      {
        follows: [0],
      },
      {
        follows: [0],
      },
    ];

    link = new Link(users);
  });

  describe("findLinks", () => {
    it("should return correct links of given to user IDs", () => {
      // arrange
      const from = 0,
        to = 5;

      // act
      const links = link.findLinks(to, from);

      // assert
      expect(links.length).to.equal(1);
      expect(links[0].toString()).to.equal([0, 1, 4, 5].toString());
    });
  });

  describe("getShortestLink", () => {
    it("should return the shortest link in a given list of links", () => {
      // arrange
      let links = [
        [0, 1, 2],
        [0, 1, 3, 2],
        [0, 1, 4, 2],
      ];

      // act
      const shortest = link.getShortestLink(links);

      // assert
      expect(shortest.toString()).to.equal([0, 1, 2].toString());
    });

    it("should return the lowest value link in a given list of links with same lengths", () => {
      // arrange
      let links = [
        [0, 1, 5, 2],
        [0, 1, 3, 2],
        [0, 1, 4, 2],
      ];

      // act
      const shortest = link.getShortestLink(links);

      // assert
      expect(shortest.toString()).to.equal([0, 1, 3, 2].toString());
    });
  });
});
