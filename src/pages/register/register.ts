import { renderFormRegister } from "widgets/form-register";

import { renderLayoutCentered } from "shared/ui/layouts/centered/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./register.hbs";

const pageContent = renderCreator(source, { body: renderFormRegister() })();
const html = renderLayoutCentered({ body: pageContent });

export { html as registerPage };
