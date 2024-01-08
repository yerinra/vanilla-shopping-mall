// export default function ProductListCard({ $target, state }) {
//   this.$card = document.createElement("ul");
//   $target.appendChild(this.$card);

//   this.state = state;
//   this.setState = (newState) => {
//     this.state = newState;
//     this.render();
//   };

//   this.render = () => {
//     console.log(this.state.products);
//     if (!this.state.products) return;
//     this.$card.innerHTML = `<h1>상품목록</h1>
//     <ul>
//       ${this.state.products
//         .map(
//           ({ image, title, price }) => `<li class="Product">
//       <img src=${image}>
//       <div class="Product__info">
//         <div>${title}</div>
//         <div>${price}원~</div>
//       </div>
//     </li>`
//         )
//         .join("")}`;
//   };

//   this.render();
// }
