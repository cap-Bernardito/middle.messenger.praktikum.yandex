import * as entities from "entities";

import { registerComponent } from "shared/core";
import * as ui from "shared/ui";

for (const component of Object.values(ui) as BlockConstructable[]) {
  if (component?.cName) {
    registerComponent(component);
  }
}

for (const component of Object.values(entities) as BlockConstructable[]) {
  if (component?.cName) {
    registerComponent(component);
  }
}
