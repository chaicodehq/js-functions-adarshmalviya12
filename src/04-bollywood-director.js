/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
  // Your code here
  if (!["action", "romance", "comedy", "drama"].includes(genre)) {
    return null;
  }
  let dialogue;
 
  return function (hero, villain) {
    if (!hero || !villain) return "...";
     switch (genre) {
    case "action":
      dialogue = `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
      break;
    case "romance":
      dialogue = `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
      break;
    case "comedy":
      dialogue = `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
      break;
    case "drama":
      dialogue = `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
      break;
    default:
      return null;
  }
    return dialogue;
  };
}

export function createTicketPricer(basePrice) {
  // Your code here
  if(basePrice <= 0){
    return null;
  }

  return function(seatType , isWeekend = false){
    let price ;
    if(seatType === 'silver'){
      price = basePrice * 1;
    }else if(seatType === 'gold'){
      price = basePrice * 1.5;
    }else if(seatType === 'platinum'){
      price = basePrice * 2;
    }else{
      return null;
    }

    if(isWeekend){
      price = price * 1.3;
    }

    return Math.round(price);
  }
  
}

export function createRatingCalculator(weights) {
  // Your code here
  if(typeof weights !== 'object'){
    return null;
  }

  return function(scores){
    const weightedAvgObj = {
      story : (weights.story * scores.story).toFixed(1),
      action : (weights.action * scores.action).toFixed(1),
      direction : (weights.direction * scores.direction).toFixed(1),
      music : (weights.music * scores.music).toFixed(1),
    }

    let values = Object.values(weightedAvgObj).reduce((acc,curr) => {
      return acc + curr;
    })

   return weightedAvgObj;
  }
}
