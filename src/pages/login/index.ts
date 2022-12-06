import { input } from "shared/ui/input";
import { compileHbs } from "shared/utils/utils";

import source from "./login.hbs";

import "./login.scss";

const context = { title: "Login Page", input };

const render = compileHbs(source, context);

export { render as loginPage };
