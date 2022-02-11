//        ((بسم الله))
let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("pro-count"),
  category = document.getElementById("category"),
  create = document.getElementById("create");
let mood = "create";
let updateIndex;

function getTotal() {
  if (price.value != "") {
    let sum = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `${sum}`;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(121, 2, 2)";
  }
}

price.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

let proAdded;

if (localStorage.prodctsAdded != null) {
  proAdded = JSON.parse(localStorage.prodctsAdded);
} else {
  proAdded = [];
}

create.onclick = function () {
  let productsData = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.textContent,
    count: count.value,
    category: category.value,
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (mood == "create") {
      if (productsData.count > 1) {
        for (let x = 0; x < productsData.count; x++) {
          proAdded.push(productsData);
        }
      } else {
        proAdded.push(productsData);
      }
    } else {
      proAdded[updateIndex] = productsData;
    }
    window.location.reload();
    clear();
  } else if (title.value == "") {
    title.style.backgroundColor = "#ff7c7c30";
  } else if (price.value == "") {
    title.style.backgroundColor = "#333";
    price.style.backgroundColor = "#ff7c7c30";
  } else if (category.value == "") {
     price.style.backgroundColor = "#333";
    category.style.backgroundColor = "#ff7c7c30";
  }

  localStorage.setItem("prodctsAdded", JSON.stringify(proAdded));
  
};

title.onfocus = function () {
  this.style.backgroundColor = "#333"
}
price.onfocus = function () {
  this.style.backgroundColor = "#333"
}
category.onfocus = function () {
  this.style.backgroundColor = "#333"
}

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "";
  count.value = "";
  category.value = "";
}

function readDAta() {
  let show = "";
  let tbody = document.getElementById("tbody");
  for (let i = 0; i < proAdded.length; i++) {
    show += `
    <tr>
        <td>${i + 1}</td>
        <td>${proAdded[i].title}</td>
        <td>${proAdded[i].price}</td>
        <td>${proAdded[i].taxes}</td>
        <td>${proAdded[i].ads}</td>
        <td>${proAdded[i].discount}</td>
        <td>${proAdded[i].category}</td>
        <td><button onclick = updateProduct(${i}) id = "update">update</button></td>
        <td> <button onclick = "deleteItem(${i})" id = "delete">delete</button></td>
      </tr>
    `;
  }

  tbody.innerHTML = show;

  let deleteAll = document.getElementById("deleteAll");
  if (proAdded.length > 0) {
    deleteAll.innerHTML = `<button onclick ='daleteAll()'>delete all (${proAdded.length}) </button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
readDAta();
// delet item
function deleteItem(i) {
  proAdded.splice(i, 1);
  localStorage.setItem("prodctsAdded", JSON.stringify(proAdded));
  readDAta();
  document.getElementById("check").style.left = "15px";
  setTimeout(function () {
    document.getElementById("check").style.left = "-550px";
  }, 2000);
  document.getElementById("checkerID").innerHTML = i + 1;
}
// delete all

document.getElementById("parent-confirm").onclick = function () {
  document.getElementById("parent-confirm").style.display = "none";
};

function daleteAll() {
  document.getElementById("parent-confirm").style.display = "block";
}

let yesDeleteAll = document.getElementById("yes");

yesDeleteAll.addEventListener("click", function () {
  localStorage.clear();
  proAdded.splice(0);
  readDAta();
});

// updateProduct

function updateProduct(i) {
  title.value = proAdded[i].title;
  price.value = proAdded[i].price;
  taxes.value = proAdded[i].taxes;
  ads.value = proAdded[i].ads;
  discount.value = proAdded[i].discount;
  category.value = proAdded[i].category;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  updateIndex = i;
}
