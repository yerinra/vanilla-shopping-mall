import { routeChange } from "../router.js";

export default function ErrorPage({ $app }) {
  this.$page = document.createElement("div");
  this.$page.innerHTML =
    "<h1>ERROR 404</h1><div>Oops! Wrong Path!</div><button>상품 보러 가기</button>";

  $app.append(this.$page);

  this.$page.addEventListener("click", (e) => {
    const $button = e.target.closest("button");
    if (!$button) return;
    routeChange("/");
  });
}
