import { renderFormLogin } from "widgets/form-login";

import { renderLayoutCentered } from "shared/ui/layouts/centered/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./login.hbs";

const pageContent = renderCreator(source, { body: renderFormLogin() })();
const html = renderLayoutCentered({ body: pageContent });

export { html as loginPage };
