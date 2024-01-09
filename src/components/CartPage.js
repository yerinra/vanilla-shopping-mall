import { fetchProduct } from "../api.js";
import { routeChange } from "../router.js";

export default function CartPage({ $app }) {
  this.$page = document.createElement("div");
  this.$page.className = "CartPage";
  this.$page.innerHTML = "<h1>장바구니</h1>";

  const productsInCart = JSON.parse(localStorage.getItem("products_cart"));

  this.state = { products: [] };
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.fetchProducts = async () => {
    const products = await Promise.all(
      productsInCart.map(async (cartItem) => {
        const product = await fetchProduct(cartItem.productId);
        return {
          image: product.image,
          title: product.title,
          quantity: cartItem.quantity,
          optionName: cartItem.optionName,
          price: product.price,
        };
      })
    );

    this.setState({ products });
  };

  this.render = () => {
    const products = this.state.products;
    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);

    this.$page.innerHTML = `<h1>장바구니</h1>
    <div class="Cart">
      <ul>${
        products.length > 0 &&
        products
          ?.map(
            ({
              image,
              title,
              optionName,
              quantity,
              price,
            }) => `<li class="Cart__item">
      <img src=${image}>
      <div class="Cart__itemDesription">
        <div>${title} ${price} ${quantity}개</div>
        <div>$${price * quantity}</div>
      </div>
    </li>`
          )
          .join("")
      }
      </ul>
      <div class="Cart__totalPrice">
        총 상품가격 $${totalPrice}
      </div>
      <button class="OrderButton">주문하기</button>
    </div>`;
  };

  this.$page.addEventListener("click", (e) => {
    const $button = e.target.closest("button");
    if (!$button) return;
    alert("주문이 완료되었습니다.");
    localStorage.removeItem("products_cart");
    routeChange("/");
  });

  this.init = () => {
    this.fetchProducts();
    this.$page.innerHTML =
      "<h1>장바구니</h1><div>Loading...Please Wait...</div>";
    if (!productsInCart || productsInCart.length == 0) {
      alert("장바구니에 상품이 없습니다.");
      routeChange("/");
    } else {
      $app.appendChild(this.$page);
    }
  };

  this.init();
}
