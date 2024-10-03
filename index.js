// const readline = require("readline-sync");

// const angkaPertama = parseFloat(readline.question("Masukkan angka pertama : "));

// const operator  = readline.question("Pilih operator (+, -, *, /, %) :");
// const angkaKedua = parseFloat(readline.question("Masukkan angka kedua : "));

            // // console.log({
            // //     angkaPertama,
            // //     operator,
            // //     angkaKedua,
            // // });

// const requiredOperator = ["+", "-", "*", "/", "%" ];

// if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
//     console.log("Inputan anda tidak valid");
// } else if (!requiredOperator.includes(operator)) {
//     console.log("plih sesuai operator yang tersedia");
// } else {
//     const hasil = processHasil(angkaPertama, angkaKedua, operator);
//     console.log({ hasil })
// }

// function processHasil(inputanPertama, inputanKedua, operator) {
//     switch (operator) {
//         case "+":
//             return inputanPertama + inputanKedua;

//         case "-":
//             return inputanPertama - inputanKedua;
        
//         case "*":
//             return inputanPertama * inputanKedua;
//         case "/":
//             if (angka2 === 0){
//                 return console.log("Angka kedua tidak boleh bernilai 0");
//             }
//             return inputanPertama / inputanKedua
//         case "&":
//             return inputanPertama & inputanKedua;
//     }
// }

const readline = require("readline-sync");

let history = [];
let previousResult = 0;

function kalkulator() {
  const angkaPertama = previousResult || parseFloat(readline.question("Masukan angka pertama : "));
  const operator = readline.question("Pilih operator (+,-,*,/,%) : ");
  const angkaKedua = parseFloat(readline.question("Masukan angka kedua : "));

  if (!isValidInput(angkaPertama, angkaKedua, operator)) {
    console.log("Inputan tidak valid");
    return kalkulator();
  }

  try {
    const hasil = processHasil(angkaPertama, angkaKedua, operator);
    console.log(`Hasil nya adalah ${hasil}`);
    history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
    previousResult = hasil;
  } catch (e) {
    console.log(e.message);
    if (e.message === "Angka kedua tidak boleh bernilai 0") {
      console.log("Silakan masukkan angka kedua yang tidak nol.");
      return kalkulator();
    }
  }

  const choice = readline.question("Lanjutkan perhitungan? (y/n) : ");
  if (choice.toLowerCase() === 'y') {
    kalkulator();
  } else {
    console.log("Riwayat kalkulasi:");
    history.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
}

function isValidInput(angkaPertama, angkaKedua, operator) {
  const requiredOperator = ["+", "-", "*", "/", "%"];
  return !isNaN(angkaPertama) && !isNaN(angkaKedua) && requiredOperator.includes(operator);
}

function processHasil(inputanPertama, inputanKedua, operator) {
  switch (operator) {
    case "+":
      return inputanPertama + inputanKedua;
    case "-":
      return inputanPertama - inputanKedua;
    case "*":
      return inputanPertama * inputanKedua;
    case "/":
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama / inputanKedua;
    case "%":
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama % inputanKedua;
  }
}

kalkulator();