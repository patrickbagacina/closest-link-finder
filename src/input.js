class Input {
  constructor(inputs, link) {
    this.inputs = inputs;
    this.link = link;
  }

  process() {
    return this.inputs.map((input) => {
      const links = this.link.findLinks(input.to, input.from);
      const shortest = this.link.getShortestLink(links);
      input.shortestLink = shortest;

      return input;
    });
  }
}

module.exports = Input;
