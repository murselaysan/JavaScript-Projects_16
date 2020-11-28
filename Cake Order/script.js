"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const checkOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let inStock = patisserie[order[0]].stock >= order[1];

      if (inStock) {
        let totalCost = 0;
          totalCost += order[1] * patisserie[order[0]].price;
      
        console.log(
          `All of the items are in stock. The total cost of the order is ${totalCost}. Press "1" if it is ok?`
        );
        resolve(order);
      } else {
        reject(
          `The order could not be completed because some items are sold out.`
        );
      }
    }, 1000);
  });
};






const payment = (order) => {
  return new Promise((resolve, reject) => {
  document.addEventListener("keypress", function (event) {
    let entryKey = event.key;
    if (entryKey === "1") {
        console.log(`Payment processed completed.`);
        resolve(order)
      } else {
        reject(`Cannot process order: Thank you choosing us!`);
      }
  });
})
}



const stockControl = (order) => {
  return new Promise((resolve, reject) => {
      patisserie[order[0]].stock = patisserie[order[0]].stock - order[1];
      console.log(patisserie[order[0]].stock)
      if (patisserie[order[0]].stock > 2) {
        resolve(`${order[0]} stock is enough`);
      } else {
        reject(`${order[0]} stock is critic`);
      }
    });
  }


const cakeType = document.getElementById('cakeSelect');

const orderAmount = document.getElementById('cakeAmount');

const orderBtn = document.getElementById('submit_btn');

orderBtn.onclick = ()=>{
  console.log(orderAmount.value)
  console.log(cakeType.value)

  const order = [cakeType.value, orderAmount.value];
  
  checkOrder(order)
  .then((resolvedValueArray) => {
    return payment(resolvedValueArray);
  })
  .then((resolvedValueArray) => {
    return stockControl(resolvedValueArray);
  })
  .then((successMessage) => {
    console.log(successMessage);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
  
}