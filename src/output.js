class Output {
  static log(processed) {
    console.log("Scenario                   Shortest Link");
    processed.forEach((p) => {
      console.log(
        `Case ${p.from} to ${p.to}                   ${
          p.shortestLink ? p.shortestLink.join("->") : "Link Not Found"
        }`
      );
    });
  }
}

module.exports = Output;
