//1-lay id pro tu url
const getInforProduct = async () => {
  const param = new URLSearchParams(location.search);
  const productid = param.get("id");
  //sd fetch method GET de lay du lieu product tu id product
  // fetch trả về promise nên chúng ta sẽ sử dụng async/await để xử lý/
  const response = await fetch(`http://localhost:3000/product/${productid}`);
  const product = await response.json();
  console.log(product);
  //do data product vao o input
  document.getElementById("id").value = product.id;
  document.getElementById("name").value = product.name;
  document.getElementById("image").value = product.image;
  document.getElementById("cat").value = product.cat;
  document.getElementById("price").value = product.price;
};
getInforProduct();

//2 - viet ham update
const updateProduct = () => {
  event.preventDefault();
  //lay data tu form
  const productid = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const cat = document.getElementById("cat").value;
  const price = document.getElementById("price").value;
  // Lấy dữ liệu xong thì gọi api update thông qua phương thức PUT của jsonserver
  fetch(`http://localhost:3000/product/${productid}`, {
    method: "PUT",
    body: JSON.stringify({
      name: name,
      image: image,
      cat: cat,
      price: price,
    }),
  });
  alert("update sucselly!");
};
