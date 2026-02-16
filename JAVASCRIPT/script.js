// let nilai = 72;
// if (nilai >= 85) {
//   console.log("Kamu Pintar");
// } else if (nilai >= 75) {
//   console.log("Kamu lumayan pintar");
// } else if (nilai >= 65) {
//   console.log("Kamu berotak standard");
// } else {
//   console.log("Kamu kurang berotak");
// }

// let x = 3;
// switch (x) {
//   case 0:
//     console.log("Senin");
//     break;
//   case 1:
//     console.log("Selasa");
//     break;
//   case 2:
//     console.log("Rabu");
//     break;
//   case 3:
//     console.log("Kamis");
//     break;
// }

// for (let i = 0; i < 7; i++) {
//   console.log("Angka " + i);
// }

// // for in
// const orang = { nama: "Khusnul", age: 20, kota: "Bekasi" };
// for (const key in orang) {
//   console.log(key + ", " + orang[key]);
// }

// // for of
// const nama = ["Khusnul", "Aulia", "Azmi", "Putra", "Aryo"];
// for (const n of nama) {
//   console.log(n);
// }

// // while
// let i = 1;
// while (i <= 10) {
//   console.log("Hello" + i);
//   i++;
// }

// do while
// let i=1;
// do {
//   console.log("Hello" + i);
//   i++;
// }
// while(i<=5);

// const button = document.getElementById("ini");
// button.addEventListener("click", function () {
//   prompt("Selamat Datang, Siapa Nama Kamu?");
// });

fetch("data.json")
  .then((response) => {
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Berhasil Mendapatkan Data");
    return response.json();
  })
  .then((data) => {
    console.log("Isi data:", data);
  })
  .catch((error) => {
    console.error("Terjadi error:", error);
  });

localStorage.setItem("nama", "Khusnul Aulia");
const nama = localStorage.getItem("nama");

sessionStorage.setItem("alamat", "Bekasi");
const address = sessionStorage.getItem("alamat");

const cookies = (document.cookie =
  "user=Khusnul Aulia; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/");
