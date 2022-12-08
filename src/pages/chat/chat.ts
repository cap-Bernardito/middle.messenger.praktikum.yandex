import { renderLayoutCentered } from "shared/ui/layouts/centered";
import { renderCreator } from "shared/utils/utils";

import source from "./chat.hbs";

const pageContent = renderCreator(source, { body: "Chat" })();
const html = renderLayoutCentered({ body: pageContent });

export { html as chatPage };
