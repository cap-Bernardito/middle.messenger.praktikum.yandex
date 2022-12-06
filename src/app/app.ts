import { loginPage } from "../pages";

const pages: { [K: string]: string } = {
  "/login": loginPage,
};

const currentRoute = location.pathname;
let html = "";

if (!pages[currentRoute]) {
  const indexPage = Object.keys(pages)
    .map((url) => `<li><a href="${url}">${url}</a></li>`)
    .join("");

  html = `<ul>${indexPage}</ul>`;
} else {
  html = pages[currentRoute];
}

const root = document.querySelector("#root") as HTMLDivElement;

root.innerHTML = html;
