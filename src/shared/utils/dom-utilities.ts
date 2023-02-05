// @ts-nocheck
import "intersection-observer";

export default class DomUtilities {
  static getMutationObserver() {
    return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  }

  static intersect(element, goIn, goOut, intersectionObserverOptions = {}) {
    let isInitialGoIn = true;
    let isInitialGoOut = true;

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && typeof goIn === "function") {
          goIn(entry, observer, isInitialGoIn);

          isInitialGoIn = false;
        }

        if (!entry.isIntersecting && typeof goOut === "function") {
          goOut(entry, observer, isInitialGoOut);

          isInitialGoOut = false;
        }
      });
    }, intersectionObserverOptions);

    intersectionObserver.observe(element);

    return intersectionObserver;
  }

  static observe({
    mutationType = "childList",
    mutationRecordType = "addedNodes",
    mutationCallback = null,
    mutationOptions = {},
    selector = null,
    targets = window.document.documentElement,
    runOnDOMContentLoaded = true,
  }) {
    if (runOnDOMContentLoaded && selector) {
      [...document.querySelectorAll(selector)].forEach((element) => {
        mutationCallback(element, null, mutationRecordType);
      });
    }

    let defaultOptions = null;

    switch (mutationType) {
      case "attributes":
        defaultOptions = {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ["class"],
        };
        break;
      case "characterData":
        defaultOptions = {
          characterData: true,
          characterDataOldValue: true,
          subtree: true,
        };
        break;
      case "childList":
      default:
        defaultOptions = {
          childList: true,
          subtree: true,
        };
    }

    const config = { ...defaultOptions, ...mutationOptions };

    function getNodesWithEventType(nodeList, type) {
      if (!selector) {
        return false;
      }

      const filteredNodes = [];

      [...nodeList].forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        let queriedNodes = node.querySelector(selector) && node.querySelectorAll(selector);

        if (!queriedNodes) {
          queriedNodes = node.matches(selector) ? [node] : null;
        }

        if (queriedNodes) {
          [...queriedNodes].forEach((queriedNode) => {
            filteredNodes.push({ queriedNode, type });
          });
        }
      });

      return filteredNodes.length > 0 ? filteredNodes : false;
    }

    const MutationObserver = DomUtilities.getMutationObserver();

    if (!MutationObserver) {
      // eslint-disable-next-line no-console
      console.log("DomUtilities::observer -> MutationObserver not Support");

      return;
    }

    const observer = new MutationObserver((mutationRecords) => {
      mutationRecords.forEach((mutationRecord) => {
        if (mutationRecord.type === "childList") {
          let nodes = [];

          if (mutationRecord.addedNodes.length > 0) {
            const targetAddedNodes = getNodesWithEventType(mutationRecord.addedNodes, "addedNodes");

            if (targetAddedNodes) {
              nodes = nodes.concat(targetAddedNodes);
            }
          }

          if (mutationRecord.removedNodes.length > 0) {
            const targetRemovedNodes = getNodesWithEventType(mutationRecord.removedNodes, "removedNodes");

            if (targetRemovedNodes) {
              nodes = nodes.concat(targetRemovedNodes);
            }
          }

          nodes.forEach((node) => {
            const { queriedNode, type } = node;

            mutationCallback(queriedNode, mutationRecord, type);
          });
        }

        if (mutationRecord.type === "attributes") {
          mutationCallback(mutationRecord.target, mutationRecord);
        }

        if (mutationRecord.type === "characterData") {
          mutationCallback(mutationRecord.target, mutationRecord);
        }
      });
    });

    const resultTargets = targets instanceof HTMLElement ? [targets] : [...targets];

    resultTargets.forEach((target) => {
      observer.observe(target, config);
    });
  }
}
