import ProductListPage from "./components/ProductListPage.js";
import CartPage from "./components/CartPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import ErrorPage from "./components/ErrorPage.js";
import { init } from "./router.js";

export default function App({ $app }) {
  this.route = () => {
    const { pathname } = location;
    $app.innerHTML = "";

    if (pathname == "/" || pathname == "/index.html") {
      new ProductListPage({ $app });
      return;
    }

    if (pathname == "/cart") {
      new CartPage({ $app });
      return;
    }

    if (pathname.indexOf("/products/") === 0) {
      new ProductDetailPage({
        $app,
      });
    }
    new ErrorPage({ $app });
  };

  // ROUTE_CHANGE 이벤트 발생 시 마다 App의 this.route 함수가 호출되게 하는 효과
  init(this.route);

  this.route();

  window.addEventListener("popstate", this.route);
}
