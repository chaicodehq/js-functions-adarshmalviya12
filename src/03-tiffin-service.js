/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here
  if(!name || name === '') return null

  let dailyRate;
  if(mealType == 'veg'){
    dailyRate = 80
  }else if(mealType == 'nonveg'){
    dailyRate = 120;
  }else if(mealType == 'jain'){
    dailyRate = 90;
  }else{
    return null;
  }

  const totalCost = dailyRate * days;

  return {
    name,
    mealType,
    days,
    dailyRate,
    totalCost
  }
}

export function combinePlans(...plans) {
  // Your code here

  let plansArr = plans;
  console.log(plansArr)
  
  if(plansArr.length <= 0) return null;
  const totalRevenue = plansArr.reduce((acc, curr) => {
    return acc += curr.totalCost;
  },0)
  console.log(totalRevenue)

  let vegCount = 0;
  let nonVegCount = 0;
  let jainCount = 0;

  plansArr.forEach((item)=>{
    if(item.mealType == 'veg'){
      vegCount = vegCount + 1;
    }else if(item.mealType === 'nonveg'){
      nonVegCount = nonVegCount + 1;
    }else{
      jainCount = jainCount + 1;
    }
  })

  const mealBreakdown = {
    veg : vegCount,
    nonveg : nonVegCount,
    jain : jainCount
  }


  return{
    totalCustomers : plansArr.length,
    totalRevenue,
    mealBreakdown
  }

}

export function applyAddons(plan, ...addons) {
  // Your code here

  if(plan === null) return null;

  let newPlan = structuredClone(plan);
  // newPlan.addonNames = [];

  // const addOnsArr = addons;
  // console.log(addOnsArr)
  // addOnsArr.forEach((item)=>{
  //   newPlan.dailyRate = newPlan.dailyRate + item.price;
  //   newPlan.addonNames.push(item.name)
  // })

  // newPlan.totalCost = newPlan.days * newPlan.dailyRate;

  const addOnNames = addons.map(item => item.name);
  const addOnTotal = addons.reduce((acc,curr)=>{
    return acc += curr.price
  },0)

  const newDailyRates = newPlan.dailyRate + addOnTotal
  return {
    ...newPlan,
    dailyRate: newDailyRates,
    addonNames : addOnNames,
    totalCost : newPlan.days * newDailyRates
  };
}
