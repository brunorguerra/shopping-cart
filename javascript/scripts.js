let cart = [];
let modalKey = 0;

const Main = {
  showContent(listProducts) {
    let html = document.querySelector("main .products");
    if (listProducts.length > 1) {
      document.querySelector("main .products .message").style.display = "none";

      listProducts.map((value) => {
        html.innerHTML += `
        <div data-key="${value.id}" class="card" onclick="Modal.open('${
          value.description
        }', '${value.image.src}', ${value.price}, ${value.id})">
              <div class="image">
                <img src="${value.image.src}" alt="notebook" />
              </div>
              <div class="content">
                <p class="description" title="${value.description}">${
          value.description
        }</p>
                <div class="price">
                  <p>R$ ${value.price.toFixed(2).replace(".", ",")}</p>
                  <p>12x de ${(value.price / 12)
                    .toFixed(2)
                    .replace(".", ",")} sem juros</p>
                </div>
              </div>
            </div>
        `;
      });
    }
  },
};

const Modal = {
  open(description, image, price, key) {
    let html = document.querySelector("body .containerModal");
    modalKey = key;
    html.innerHTML = `
    <section id="box-product">
        <div class="overlay" onclick="Modal.close()"></div>
        <div id="content">
          <div class="image">
            <img src="${image}" alt="Produto" srcset="" />
          </div>
          <div class="description">
            <p class="product-description" title="${description}">${description}</p>
            <div class="separator"></div>
            <div class="price">
              <p>Preço:</p>
              <div class="value-price">
                <p>R$ ${price.toFixed(2).replace(".", ",")}</p>
                <p>12x R$ ${(price / 12)
                  .toFixed(2)
                  .replace(".", ",")} sem juros</p>
              </div>
            </div>
            <div class="separator"></div>
            <nav class="options">
              <p>Cor:</p>
              <ul>
                <li data-key="0" onclick="Modal.selectColor(this)" class="optionActive">Prata</li>
                <li data-key="1" onclick="Modal.selectColor(this)">Cinza</li>
                <li data-key="2" onclick="Modal.selectColor(this)">Azul</li>
              </ul>
            </nav>
            <div class="separator"></div>
            <div class="amount">
              <p>Qtd:</p>
              <div class="value-amount">
                <button onclick="Modal.decrease(document.querySelector('#box-product #content .value-amount input'))">-</button>
                <input type="number" value="1" name="" id="" />
                <button onclick="Modal.add(document.querySelector('#box-product #content .value-amount input'))">+</button>
                <p>Em estoque</p>
              </div>
            </div>
            <div class="separator"></div>
            <div class="buy">
              <a href="#" onclick="Modal.sendToShoppingCart()">Adicionar ao Carrinho</a>
              <button onclick="Modal.close()">Cancelar</button>
            </div>
          </div>
        </div>
      </section>
    `;
    document.querySelector("body .containerModal #box-product").style.opacity =
      "0";
    setTimeout(() => {
      document.querySelector(
        "body .containerModal #box-product"
      ).style.opacity = "1";
    }, 150);
  },
  close() {
    let html = document.querySelector("body .containerModal");
    html.innerHTML = "";
  },
  add(html) {
    html.value++;
  },
  decrease(html) {
    if (html.value <= 1) {
      Modal.close();
    }
    html.value--;
  },
  selectColor(selector) {
    document
      .querySelectorAll("#box-product #content .description nav.options ul li")
      .forEach((value) => {
        value.removeAttribute("class");
      });
    selector.classList.add("optionActive");
  },
  sendToShoppingCart() {
    let color = +document
      .querySelector("li.optionActive")
      .getAttribute("data-key");
    let amount = +document.querySelector("input[type=number]").value;

    cart.push({
      id: Products[modalKey].id,
      color,
      amount,
    });

    Modal.close();
  },
};

const shoppingCart = {
  show() {
    document.querySelector(".overlay-menuCart").style.display = "block";
    setTimeout(() => {
      document.querySelector("#menu-cart").classList.add("menu-actived");
    }, 100);
  },
  hidden() {
    document.querySelector("#menu-cart").classList.remove("menu-actived");
    setTimeout(() => {
      document.querySelector(".overlay-menuCart").style.display = "none";
    }, 300);
  },
  footerSumPurchases(amount) {
    return document.querySelector("#menu-cart .footer .amount-total .number");
  },
};

Main.showContent(Products);
