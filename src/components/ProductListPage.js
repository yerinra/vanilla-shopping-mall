import { fetchProducts } from "../api.js";
import { routeChange } from "../router.js";

export default function ProductListPage({ $app }) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductListPage";

  this.state = { products: [] };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) return;
    this.$page.innerHTML = `<h1>상품목록</h1>
    <ul>
      ${this.state.products
        .map(
          ({ id, image, title, price }) => `<li id=${id} class="Product">
      <img src=${image}>
      <div class="Product__info">
        <div>${title}</div>
        <div>${price}원~</div>
      </div>
    </li>`
        )
        .join("")}`;
  };

  this.init = async () => {
    const products = await fetchProducts();

    this.setState({ products });
    $app.appendChild(this.$page);
  };

  this.$page.addEventListener("click", (e) => {
    const $li = e.target.closest(".Product");
    if (!$li) return;
    routeChange(`/products/${$li.id}`);
  });

  this.init();
}
