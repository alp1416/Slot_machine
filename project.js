const prompt =require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A:2,
    B:4,
    C:6,
    D:8,
};

const SYMBOLS_VALUES = {
   A:5,
   B:4,
   C:3,
   D:2,
};








//This method take the deposit amount from user, check for invalid inputs
const deposit =() =>{

    while(true){
 const depositAmount = prompt("Enter the deposit amount: ");
 //Converting the user given number to number.
 const numberDeositAmount = parseFloat(depositAmount);

 //Checking if the user has inputed any invalid amount or not.
 if(isNaN(numberDeositAmount)|| numberDeositAmount <=0){
    console.log("Invalid deposit amount, try again.");
 }else //if not invalid amount is found then we are retuning the amount
 {return numberDeositAmount;}
 }//End of the while loop
};//Deposit funtion end here.

//This method take the number of line in which user what to bet on from user, check for invalid inputs
const getNumberOfLines = () =>{
 while(true){
    const lines = prompt("Enter the number of line you want to bet on(1-3): ");
    const numberOfLines = parseFloat(lines);
    if(isNaN(numberOfLines)|| numberOfLines < 0||numberOfLines > 3){
       console.log("Invalid number of line, try again.");
    }else
    {return numberOfLines;}
}//while loop end here.
};//GetNumberOfLine funtion end here.


//This funtion will take the bet amount and check for any invalid input or bet amount more then the balance.
const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numberOfBet = parseFloat(bet);
//Check for any invalid input and check if the bet amount is less the 'balance\lines' or not as the bet will be place on each lines.
        if(isNaN(numberOfBet)|| numberOfBet <=0||numberOfBet > (balance / lines)){
           console.log("Invalid number bet, try again.");
        }else
        {return numberOfBet;}
    }//while loop end here.
    };//getBet funtion end here.


    const spin = ()  =>{
      const symbols = [];
      for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
         for (let i =0; i<count; i++)
         {symbols.push(symbol);
         }
      }
      const reels = [];
      for(let i = 0; i< COlS; i++){
         reels.push([]);
         const reelSymbols = [...symbols];
            for(let j = 0;j<ROWS;j++)
            {  const randomIndex = Math.floor(Math.random()*reelSymbols.length);
               const selectedSymbol = reelSymbols[randomIndex];
               reels[i].push(selectedSymbol);
               reelSymbols.splice(randomIndex,1);
            }
       }
      return reels;

    };

    const tranpose = (reels) => {
      const rows = [];
      for (let i = 0; i<ROWS; i++){
      rows.push([]);
      for (let j = 0; j<COlS;j++){
         rows[i].push(reels[j][i]);
      }
      }
         return rows;
    };

    const printRows = (rows) => {
      for (const row of rows){
         let rowString = "";

         for (const [i,symbol] of row.entries()){
            rowString += symbol;
            if(i!= rows.length -1){
               rowString += " | "
            }
         }
         console.log(rowString)
      }
    };

    const getWinnings = (rows,bet,lines) =>{
      let winnings = 0;
      for(let row = 0; row<lines;row++){
         const symbols = rows[row];
         let allSame= true;

         for (const symbol of symbols){
            if (symbol != symbols[0]){
               allSame = false;
               break;
            }
         }
         if(allSame){
            winnings += bet*SYMBOLS_VALUES[symbols[0]];
         }
      }
      return winnings;
    };


const game = () => {
//Calling the deposit funtion and storing the value in 'balanace'
let balance = deposit();

while(true){
   console.log("You have a balance of Rs."+balance);
//Calling the getNumberOfLines funtion and storing it in the numberOfLine
const numberOfLines = getNumberOfLines();

//Calling the getBet funtion and storing the value.
const bet = getBet(balance,numberOfLines);
balance -= bet*numberOfLines;
const reels = spin();

const rows = tranpose(reels);

printRows(rows);
const winnings = getWinnings(rows,bet,numberOfLines);
balance = balance + winnings;
console.log("You won, Rs. "+winnings.toString());
if(balance <= 0){
   console.log("You ran out of money!");
   break;
}
const playAgain = prompt("Do you want to play again?(y/n)");
if(playAgain != "y") break;
}
};

