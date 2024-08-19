const dataString = require("./dataset") 


function parseData(dataString) {
    const rows = dataString[0].split('\n'); 
    return rows
}

let data = parseData(dataString)

let dataset = []

data.forEach(item => {
        const separate = item.split(',');
        const add = []

        separate.forEach((x,i) => {
            if(i==0) add.push({Date:x})
            if(i==1) add.push({Name:x})
            if(i==2) add.push({Unit:x})
            if(i==3) add.push({Quantity:x})
            if(i==4) add.push({Price:x})
        })
        dataset.push(add)
});


// Total sales
let totalSales={quantity:0,price:0}
dataset.forEach(sale=>{
     totalSales.quantity+= Number(sale[3].Quantity)
     totalSales.price+= Number(sale[4].Price)
})
console.log("totalSales",totalSales)


// Monthly sales
let monthlySales={};
dataset.forEach(sale=>{
    let month=sale[0].Date.slice(0,7)
    let qty = Number(sale[3].Quantity)
    let price = Number(sale[4].Price)

    if(monthlySales[month]==undefined) monthlySales[month] = {quantity:qty,price:price} 
    else{
        monthlySales[month].quantity = monthlySales[month].quantity+qty
        monthlySales[month].price = monthlySales[month].price+price
    }
  
   
})
console.log("monthlySales",monthlySales)


// Popular item
let popularAndRevenue = {}

dataset.forEach(sale=>{
    let month=sale[0].Date.slice(0,7)
    let qty = Number(sale[3].Quantity)
    let price = Number(sale[4].Price)

    if(popularAndRevenue[month]==undefined){
        popularAndRevenue[month] = {
            [sale[1].Name] : {qty:qty,price:price}
        } 
    }
    else{
        for(let data in popularAndRevenue[month]){

            let name = data
            let q = popularAndRevenue[month][data].qty
            let p = popularAndRevenue[month][data].price

            if(name==sale[1].Name){
                popularAndRevenue[month][data].qty += qty
                popularAndRevenue[month][data].price += price
            }
            else{
                popularAndRevenue[month][sale[1].Name] ={
                    qty:qty,
                    price:price
                }
            }

        }
    }



})

// console.log('popularAndRevenue',popularAndRevenue)

let PopularDetails = {}
function popular(){
    for(let month in popularAndRevenue){
       if(PopularDetails[month]==undefined) PopularDetails[month] = {name:'',qty:0}

            for(let value in popularAndRevenue[month]){
                if(PopularDetails[month].qty<popularAndRevenue[month][value].qty){
                    PopularDetails[month].qty = popularAndRevenue[month][value].qty
                    PopularDetails[month].name = value
                }
            }
        
    }
}
popular()
console.log('PopularDetails',PopularDetails)

// Revenue
let revenueData = {}
function revenue(){
    for(let month in popularAndRevenue){
       if(revenueData[month]==undefined) revenueData[month] = {name:'',price:0}

            for(let value in popularAndRevenue[month]){
                if(revenueData[month].price<popularAndRevenue[month][value].price){
                    revenueData[month].price = popularAndRevenue[month][value].price
                    revenueData[month].name = value
                }
            }
        
    }
}
revenue()
console.log('revenueData',revenueData)