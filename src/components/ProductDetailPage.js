import { fetchProduct } from "../api.js";
import { routeChange } from "../router.js";

export default function ProductDetailPage({ $app }) {
  this.$page = document.createElement("div");
  this.$page.className = "ProductDetailPage";

  this.state = { product: [], selectedOptions: [] };

  this.$page.addEventListener("change", (e) => {
    const $selectedOption = e.target.closest("select");
    if (!$selectedOption) return;
    if (
      this.state.selectedOptions
        .map((v) => v.optionName)
        .includes(e.target.value)
    )
      return;

    this.setState({
      ...this.state,
      selectedOptions: [
        ...this.state.selectedOptions,
        { optionName: e.target.value, quantity: 1 },
      ],
    });
  });
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.$page.addEventListener("input", (e) => {
    const $input = e.target.closest("input");
    if (!$input) return;
    this.setState({
      ...this.state,
      selectedOptions: [
        { ...this.state.selectedOptions[0], quantity: +e.target.value },
      ],
    });
  });

  this.$page.addEventListener("click", (e) => {
    const $button = e.target.closest("button");
    if (!$button) return;
    if (this.state.selectedOptions.length == 0) {
      alert("장바구니에 넣을 상품을 선택해주세요.");
      return;
    }
    const submittedOptions = this.state.selectedOptions.map((option) => ({
      productId: this.state.product.id,
      optionName: option.optionName,
      quantity: option.quantity,
    }));
    let productsInCart =
      JSON.parse(localStorage.getItem("products_cart")) || [];
    if (productsInCart.some((p) => p.productId == this.state.product.id)) {
      productsInCart = productsInCart.filter(
        (v) => v.productId !== this.state.product.id
      );
      alert("장바구니에 상품이 이미 있습니다. 수량이 변경되었습니다.");
    }
    localStorage.setItem(
      "products_cart",
      JSON.stringify([...productsInCart, ...submittedOptions])
    );
    routeChange("/cart");
  });

  this.render = () => {
    const { id, image, price, title } = this.state.product;
    this.$page.innerHTML = `<h1>${title} 상품 정보</h1>
    <div class="ProductDetail">
      <img src="${image}">
      <div class="ProductDetail__info">
        <h2>${title}</h2>
        <div class="ProductDetail__price">$${price}~</div>
        <select>
          <option>선택하세요.</option>
          <option>${title}</option>
        </select>
        <div class="ProductDetail__selectedOptions">
          <h3>선택된 상품</h3>
          <ul>
          ${
            this.state.selectedOptions &&
            this.state.selectedOptions
              .map(
                ({ optionName, quantity }) => `<li>
            ${optionName} <div><input type="number" value=${quantity}>개</div>
          </li>
          `
              )
              .join("")
          }
          </ul>
          <div class="ProductDetail__totalPrice">$${
            this.state.selectedOptions[0]
              ? +this.state.selectedOptions[0]?.quantity * price
              : 0
          }</div>
          <button class="OrderButton">장바구니에 넣기</button>
        </div>
      </div>
    </div>`;
  };

  this.init = async () => {
    const productId = +location.pathname.split("/")[2];
    const product = await fetchProduct(productId);
    // this.$page.innerHTML = "<div>Loading...</div>";

    this.setState({ ...this.state, product });

    if (this.state.product) {
      $app.appendChild(this.$page);
    }
  };
  this.init();
}
