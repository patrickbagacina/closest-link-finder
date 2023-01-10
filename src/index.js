const USERS = require("../config/data.json");
const INPUT = require("../config/input.json");

const processInputs = (inputs) => {
  return inputs.map((input) => {
    const links = findLinks(input.to, input.from);
    const shortest = getShortestLink(links);
    input.shortestLink = shortest;

    return input;
  });
};

const getShortestLink = (links) => {
  links.sort((a, b) => {
    return a.length - b.length;
  });

  const initial = links[0];

  const shorts = links.filter((link) => {
    return link.length === initial.length;
  });

  if (shorts.length === 1) return initial;

  shorts.sort((f, s) => {
    return f.reduce((a, b) => a + b, 0) - s.reduce((a, b) => a + b, 0);
  });

  return shorts[0];
};

const findLinks = (to, from = null, negatives = [], positives = []) => {
  if (negatives.length === 0 && from !== null) {
    negatives.push([from]);
    return findLinks(to, null, negatives);
  } else if (negatives.length > 0) {
    const neg = [];
    const pos = [];

    negatives.forEach((link) => {
      const lastNode = link[link.length - 1];
      if (lastNode != null) {
        const follows = USERS[lastNode].follows;

        follows.forEach((follow) => {
          if (!link.includes(follow)) {
            const newLink = [...link, follow];
            if (follow === to) {
              pos.push(newLink);
            } else {
              neg.push(newLink);
            }
          }
        });
      }
    });

    negatives = neg;
    positives = [...positives, ...pos];

    return findLinks(to, null, negatives, positives);
  }

  return positives;
};

const Input = require("./input");
const Link = require("./link");

const link = new Link(USERS);
const inputs = new Input(INPUT, link);

const processed = inputs.process();

console.log("Scenario                   Shortest Link");
processed.forEach((p) => {
  console.log(
    `Case ${p.from} to ${p.to}                   ${p.shortestLink.join("->")}`
  );
});

// const findShortests = (to, from = null) => {
// 	if (negativeLinks.length === 0 && from !== null) {
// 		negativeLinks.push([from]);
// 		return findShortest(to);
// 	} else if (negativeLinks.length > 0) {
// 		const negatives = [];
// 		const positives = [];

// 		negativeLinks.forEach((link) => {
// 			const lastNode = link[link.length - 1];
// 			if (lastNode != null) {
// 				const follows = USERS[lastNode].follows;

// 				follows.forEach((follow) => {
// 					if (!link.includes(follow)) {
// 						if (follow === to) {
// 							positives.push([...link, follow]);
// 						} else {
// 							negatives.push([...link, follow]);
// 						}
// 					}
// 				});
// 			}
// 		});

// 		negativeLinks = negatives;
// 		positiveLinks = [...positiveLinks, ...positives];
// 		return findShortest(to);
// 	}

// 	return positiveLinks;
// };
