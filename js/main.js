
var product = [
  { "id": "1", "title": "جرجير", "image": "1.jpg", "price": 10 },
  { "id": "2", "title": "قرنبيط", "image": "2.jpg", "price": 11 },
  { "id": "3", "title": "كرونب", "image": "3.jpg", "price": 12 },
  { "id": "4", "title": "خس", "image": "4.jpg", "price": 14 },
  { "id": "5", "title": "رمان", "image": "5.jpg", "price": 9 },
  { "id": "6", "title": "خوخ", "image": "6.jpg", "price": 8 },
]


var Quantity = 1;


getProduct = function () {
  var cartona = "";
  for (i = 0; i < product.length; i++) {
      cartona += `
      <div class="col-lg-2 col-md-4 col-6 mb-4 ">
      
      <div class="card ">
        <div class="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
          data-mdb-ripple-color="light">
          <img  class="itemImage w-100" src="images/${product[i].image}"  />
          
        </div>
        <div class="card-body">
          <a href="" class="text-reset">
            <h5 class="card-title text-decoration-none mb-3">${product[i].title}</h5>
          </a>
          <div class="d-flex justify-content-center align-items-center">
            <p>₺</p>
            <h6  class="itemPrice mb-3 mx-1"> ${product[i].price}</h6>
          </div>
          <button  type="button" onclick="getProductById(${product[i].id})" class="btn btn-outline-success text-capitalize buy">add to cart</button>
        </div>
      </div>
    
  </div>
      `
  }
  document.getElementById("cols").innerHTML = cartona;
  
  
}


// =========================================
// catch product id
getProductById = function (productId) {
  for (i = 0; i < product.length; i++) {
      if (product[i].id == productId) {
          $("#chosenProImg").attr('src', `images/${product[i].image}`);
          $("#chosenProPrice").text(product[i].price);
          $("#chosenProTitle").text(product[i].title)
          $("#addbtn").attr('data-productid', `${product[i].id}`);
          total()
          Quantity;
      }
  }
}

// ============================================
var cardOfProduct;
if(localStorage.getItem("vegaProdacts")  != null){

  cardOfProduct = JSON.parse(localStorage.getItem("vegaProdacts"));
  

}else{
  cardOfProduct=[];
}

// =========================================
// make products array and push on cart
$("#addbtn").on('click', function () {
  var oneProduct = +$("#addbtn").attr('data-productid');
  // console.log(oneProduct)
  for (i = 0; i < product.length; i++) {
      if (product[i].id == oneProduct) {
          var setProduct = {
              "title": product[i].title,
              "price": product[i].price,
              "total": Quantity  * product[i].price,
              "QUANTITY": Quantity ,
              "id":product[i].id,
          }
      }
      
  }
  cardOfProduct.push(setProduct);
  //save data in localstorage 
  localStorage.setItem("vegaProdacts" , JSON.stringify(cardOfProduct));
  //save data in localstoreg 
  displayTable()
  
})

// ========================================
// show rows in table 
displayTable=function(){
  var cartona = "";
  var totlePrice=0;
  for (i = 0; i < cardOfProduct.length; i++) {
      totlePrice+=cardOfProduct[i].total;
      cartona += `
      <tr class="table-gray" data-bs-toggle="note" data-bs-trigger="hover focus" data-bs-content="2022-06-18 12:00 - 20:00 <br><b>Te presteren:</b> 07:30" data-bs-original-title="">
      <td class="text-center text-gray">${i+1}</td>
      <td><strong>${cardOfProduct[i].title}</strong></td>
      <td class="text-center">
      <button onclick="deleteProduct(${i})" class="btn btn-close "></button>                        
      </td>
      <td class="text-center d-flex justify-content-center"><p>₺</p> <span class="mx-1">${cardOfProduct[i].price}</span></td>
      <td class="text-center">${cardOfProduct[i].QUANTITY}</td>
      <td class="text-center">${cardOfProduct[i].total}</td>                      
      </tr>
      `
  }
  
  document.getElementById("tbody").innerHTML = cartona;
  // $("#priceTotle").text(totlePrice);
  document.getElementById("priceTotle").innerHTML=totlePrice
  
}

// ==============================================
// delete form table 
deleteProduct=function(index){
  cardOfProduct.splice(index,1)
  displayTable()
  setToLocalStorege()
  
}

// =============================================
// set To LocalStorege
setToLocalStorege=function(){
  localStorage.setItem("vegaProdacts" , JSON.stringify(cardOfProduct));
}


// ================================
// increment button 
function increment() {
  Quantity ++;
  $("#quantityCurentProduct").val(Quantity )
  total()
}

//================================
// decrement button
function decrement() {
  if (Quantity  > 1) {
      Quantity--;
      $("#quantityCurentProduct").val(Quantity )
  } else {
      $("#quantityCurentProduct").val(1)
  }
  total()

}

// ==============================================
// get total 
function total() {
  var totlePrice = +$("#chosenProPrice").text() * Quantity ;
  $("#totalItems").text(totlePrice)
}

// ===============================================
// total to pay 
