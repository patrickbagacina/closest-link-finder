const USERS = require("../config/data.json");
const INPUT = require("../config/input.json");
const Input = require("./input");
const Link = require("./link");
const Output = require("./output");

const link = new Link(USERS);
const inputs = new Input(INPUT, link);

const processed = inputs.process();
Output.log(processed);
