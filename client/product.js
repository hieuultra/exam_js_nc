//1- viet ham add
const addProduct = () => {
  event.preventDefault(); //ngan browser chuyen huong
  //lay data tu form
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const cat = document.getElementById("cat").value;
  //   const cat = document.querySelector('select[name="cat"]').value;
  const price = document.getElementById("price").value;

  //sd fetch method POST de luu data
  //voi fecth xu ly method POST thi c can cac thong so:
  // - link API
  // - method
  // - body data
  if (name.trim() == "" || isNaN(price)) {
    const mess = document.getElementById("mess");
    mess.innerHTML = "ten san pham ko dc de trong va gia tien phai la so!";
  } else {
    fetch("http://localhost:3000/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        image: image,
        cat: cat,
        price: price,
      }),
    });
    alert("add sucssely!");
  }
};

//2-viet ham hien thi
const renderProduct = async () => {
  //xac dinh vi tri
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; //loai bo cac the html ben trong tbody
  //sd fecth method get de lay du lieu tu trong data
  // fetch trả về promise nên chúng ta sẽ sử dụng async/await để xử lý/
  const response = await fetch("http://localhost:3000/product");
  const product = await response.json();
  // console.log(product);
  //duyet mang de do data theo cau truc table vao tbody
  //dung for, map , foreach de duyet mang
  product.map((value, index) => {
    //khoi tao the tr
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${value.name}</td>
    <td><img src ="${value.image}" width="60" /></td>
    <td>${value.cat}</td>
    <td>${value.price}</td>
    <td><a href="edit-product.html?id=${value.id}" class="btn btn-warning"  >edit</a>
    <td><button onclick="delPro('${value.id}')" class="btn btn-danger" >Delete</button></td>
    </td>
    `;
    //do tr vao tbody
    tbody.appendChild(tr);
  });
};
renderProduct();

//3: xoa pro
const delPro = (pid) => {
  const conf = confirm("ban co chac chan muon xoa ko?");
  if (conf) {
    //sd fetch method delete de xoa pro va API cua json-serevr phai co id pro
    fetch(`http://localhost:3000/product/${pid}`, { method: "DELETE" });
    alert("delete sucselly");
  }
};
