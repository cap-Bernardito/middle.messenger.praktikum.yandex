import { compileHbs } from "../../utils/utils";

import source from "./input.hbs";

const context = { type: "text" };

const render = compileHbs(source, context);

export { render as input };
