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

function mainMenu() {
  console.log("=== Menu Utama ===");
  console.log("1. Kalkulasi");
  console.log("2. Lihat Riwayat");
  console.log("3. Keluar");

  const choice = readline.question("Pilih menu (1/2/3) : ");
  switch (choice) {
    case '1':
      kalkulatorMenu();
      break;
    case '2':
      lihatRiwayat();
      break;
    case '3':
      konfirmasiKeluar();
      break;
    default:
      console.log("Pilihan tidak valid");
      mainMenu();
  }
}

function kalkulatorMenu() {
  console.log("=== Sub-Menu Kalkulasi ===");
  console.log("1. Pertambahan");
  console.log("2. Pengurangan");
  console.log("3. Perkalian");
  console.log("4. Pembagian");
  console.log("5. Modulus");
  console.log("6. Akar");
  console.log("7. Sinus");
  console.log("8. Cosinus");
  console.log("9. Tangen");
  console.log("10. Kembali ke menu utama");

  const subChoice = readline.question("Pilih operasi (1-10) : ");

  if (subChoice === '10') {
    mainMenu();
    return;
  }

  kalkulator(subChoice);
}

function kalkulator(subChoice) {
  let angkaPertama = previousResult || parseFloat(readline.question("Masukan angka pertama : "));
  let angkaKedua;

  if (subChoice <= '5') {
    angkaKedua = parseFloat(readline.question("Masukan angka kedua : "));
  }

  if (!isValidInput(angkaPertama, angkaKedua, subChoice)) {
    console.log("Inputan tidak valid");
    return kalkulator(subChoice);
  }

  try {
    const hasil = processHasil(angkaPertama, angkaKedua, subChoice);
    console.log(`Hasilnya adalah ${hasil}`);
    history.push(`${angkaPertama} ${getOperator(subChoice)} ${angkaKedua || ""} = ${hasil}`);
    previousResult = hasil;
  } catch (e) {
    console.log(e.message);
    if (e.message === "Angka kedua tidak boleh bernilai 0") {
      console.log("Silakan masukkan angka kedua yang tidak nol.");
      return kalkulator(subChoice);
    }
  }

  const choice = readline.question("Lanjutkan perhitungan? (y/n) : ");
  if (choice.toLowerCase() === 'y') {
    kalkulatorMenu();
  } else {
    mainMenu();
  }
}

function isValidInput(angkaPertama, angkaKedua, subChoice) {
  const subChoiceInt = parseInt(subChoice);
  if (subChoiceInt >= 1 && subChoiceInt <= 5) {
    return !isNaN(angkaPertama) && !isNaN(angkaKedua);
  } else if (subChoiceInt >= 6 && subChoiceInt <= 9) {
    return !isNaN(angkaPertama);
  }
  return false;
}

function processHasil(inputanPertama, inputanKedua, subChoice) {
  switch (subChoice) {
    case '1':
      return inputanPertama + inputanKedua;
    case '2':
      return inputanPertama - inputanKedua;
    case '3':
      return inputanPertama * inputanKedua;
    case '4':
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama / inputanKedua;
    case '5':
      if (inputanKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputanPertama % inputanKedua;
    case '6':
      return Math.sqrt(inputanPertama);
    case '7':
      return Math.sin(degToRad(inputanPertama));
    case '8':
      return Math.cos(degToRad(inputanPertama));
    case '9':
      return Math.tan(degToRad(inputanPertama));
  }
}

function getOperator(subChoice) {
  switch (subChoice) {
    case '1':
      return '+';
    case '2':
      return '-';
    case '3':
      return '*';
    case '4':
      return '/';
    case '5':
      return '%';
    case '6':
      return '√';
    case '7':
      return 'sin';
    case '8':
      return 'cos';
    case '9':
      return 'tan';
  }
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function lihatRiwayat() {
  console.log("=== Riwayat Kalkulasi ===");
  if (history.length === 0) {
    console.log("Belum ada riwayat.");
  } else {
    history.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
  mainMenu();
}

function konfirmasiKeluar() {
  const confirmExit = readline.question("Anda yakin ingin keluar? (y/n) : ");
  if (confirmExit.toLowerCase() === 'y') {
    console.log("Terima kasih telah menggunakan kalkulator.");
    process.exit();
  } else {
    mainMenu();
  }
}

mainMenu();
