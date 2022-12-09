import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./404.hbs";

const pageContent = renderCreator(source)();
const html = renderLayoutCentered({ body: pageContent });

export { html as page_404 };
