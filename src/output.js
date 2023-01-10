class Output {
  static log(processed) {
    console.log("Scenario                   Shortest Link");
    processed.forEach((p) => {
      console.log(
        `Case ${p.from} to ${p.to}                   ${p.shortestLink.join(
          "->"
        )}`
      );
    });
  }
}

module.exports = Output;
