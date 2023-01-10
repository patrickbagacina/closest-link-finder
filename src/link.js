class Link {
  constructor(users) {
    this.users = users;
  }

  findLinks(to, from = null, negatives = [], positives = []) {
    if (negatives.length === 0 && from !== null) {
      negatives.push([from]);
      return this.findLinks(to, null, negatives);
    } else if (negatives.length > 0) {
      const neg = [];
      const pos = [];

      negatives.forEach((link) => {
        const lastNode = link[link.length - 1];
        if (lastNode != null) {
          const follows = this.users[lastNode].follows;

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

      return this.findLinks(to, null, negatives, positives);
    }

    return positives;
  }

  getShortestLink(links) {
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
  }
}

module.exports = Link;
