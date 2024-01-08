import ProductListPage from "./components/ProductListPage.js";
import CartPage from "./components/CartPage.js";
import ProductDetailPage from "./components/ProductDetailPage.js";
import ErrorPage from "./components/ErrorPage.js";

export default function App({ $app }) {
  const { pathname } = location;
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
}
