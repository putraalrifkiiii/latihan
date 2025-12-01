Anggota Kelompok : 
1. Aryo Saputro (202310715049)
2. Fawaz Irwan Ramadhan (202310715161)
3. Putra Al Rifki (202310715112)
<br>
<br>

**Judul: Analisis Prediktif Rating Film 2025 Menggunakan Pendekatan Ensemble Learning**

BAB 1: PENDAHULUAN

1.1 Latar Belakang Masalah

Industri perfilman modern menghasilkan volume data yang masif setiap tahunnya. Keberhasilan sebuah film sering kali diukur tidak hanya dari pendapatan, tetapi juga dari penerimaan penonton yang tercermin dalam skor rating (vote average). Bagi pemangku kepentingan seperti rumah produksi dan investor, kemampuan untuk mengestimasi rating film—baik sebelum rilis maupun pada tahap awal penayangan—sangat krusial untuk menentukan strategi pemasaran dan proyeksi kesuksesan jangka panjang.
Namun, perilaku penonton sangat kompleks dan tidak selalu linear. Film dengan biaya promosi tinggi (popularitas tinggi) tidak menjamin rating yang baik. Oleh karena itu, diperlukan pendekatan berbasis data (data-driven) menggunakan Machine Learning untuk memodelkan pola penilaian penonton yang rumit ini.

1.2 Rumusan Masalah

Berdasarkan latar belakang tersebut, rumusan masalah dalam penelitian ini adalah:

1.	Bagaimana karakteristik fitur-fitur yang mempengaruhi penilaian penonton terhadap sebuah film?
2.	Algoritma Machine Learning manakah yang paling akurat dalam memprediksi skor rating film (vote_average)?
3.	Seberapa signifikan pengaruh interaksi penonton (vote count) dibandingkan popularitas (popularity) terhadap rating akhir?

1.3 Tujuan Penelitian

1.	Membangun model prediksi rating film menggunakan dataset "Latest 2025 Movies" yang didapat dari situs kaggle.
2.	Mengevaluasi dan membandingkan kinerja lima algoritma regresi: Multiple Linear Regression, Polynomial Regression, K-Nearest Neighbors (KNN), Decision Tree, dan Random Forest.
3.	Menganalisis fitur terpenting (feature importance) yang menjadi penentu utama tinggi rendahnya rating film.

BAB 2: METODOLOGI PENELITIAN

2.1 Sumber Data

Data yang digunakan dalam penelitian ini adalah dataset sekunder "Latest 2025 Movies Datasets". Dataset ini mencakup informasi komprehensif mengenai film-film yang dirilis atau dijadwalkan rilis sekitar tahun 2025, meliputi atribut: Judul, Tanggal Rilis, Bahasa Asli, Popularitas, Jumlah Vote, Rata-rata Vote, dan Sinopsis.

2.2 Pra-pemrosesan Data (Data Preprocessing)

Untuk menjamin kualitas model, dilakukan tahapan pembersihan dan penyiapan data sebagai berikut:

1.	Penanganan Nilai Hilang (Missing Values): Baris data yang memiliki nilai kosong pada kolom krusial (release_date, vote_average, popularity, vote_count) dihapus (dropped) untuk mencegah bias pada pelatihan model.
2.	Rekayasa Fitur (Feature Engineering):
   
    •	Ekstraksi Waktu: Kolom release_date dipecah menjadi fitur numerik release_year (Tahun) dan release_month (Bulan) untuk menangkap potensi pola musiman (misalnya: film liburan akhir tahun mungkin memiliki tren rating berbeda).

  	 •	Encoding Variabel Kategorikal: Kolom original_language yang berisi teks (seperti 'en', 'fr') dikonversi menjadi angka menggunakan teknik Label Encoding. Hal ini mutlak diperlukan karena algoritma regresi matematis hanya dapat memproses input numerik.
4.	Pemisahan Data (Data Splitting): Dataset dibagi dengan rasio 80:20 (80% Data Latih, 20% Data Uji). Pembagian ini bertujuan untuk menguji keandalan model pada data yang belum pernah dilihat sebelumnya (unseen data).

BAB 3: PENGEMBANGAN MODEL

Penelitian ini mengadopsi pendekatan eksperimental dengan membandingkan model parametrik dan non-parametrik:

1.	Random Forest Regressor: Pengembangan dari Decision Tree yang menerapkan konsep Ensemble Learning. Dengan menggabungkan hasil prediksi dari 100 pohon keputusan yang berbeda, model ini bertujuan mengurangi variansi dan risiko overfitting dari pohon tunggal.
2.	Polynomial Regression: Percobaan untuk menangkap hubungan non-linear (melengkung) dengan memangkatkan fitur.
3.	K-Nearest Neighbors (KNN): Pendekatan berbasis instansi yang memprediksi rating berdasarkan kemiripan karakteristik dengan film lain ("tetangga terdekat"). Sebelum pemodelan, dilakukan Standard Scaling agar fitur dengan satuan besar (seperti Popularitas) tidak mendominasi perhitungan jarak.
4.	Decision Tree Regressor: Algoritma berbasis pohon keputusan yang memecah data berdasarkan aturan logika (If-Then). Metode ini sangat cocok untuk menangkap pola non-linear yang terputus-putus.


BAB 4: HASIL DAN PEMBAHASAN

4.1 Evaluasi Kinerja Model

Berikut adalah perbandingan performa model berdasarkan pengujian pada Test Set (20% data):
| No | Nama Algoritma          | R2 Score (Akurasi)      | RMSE (Tingkat Error) | Analisis Performa                                                                 |
|----|------------------------ |------------------------ |--------------------|----------------------------------------------------------------------------------|
| 1  | Polynomial Regression   | Negatif (< 0)           | Tinggi             | Gagal. Model mengalami Overfitting ekstrem, berusaha terlalu keras menghafal pola latih hingga gagal total pada data uji. |
| 2  | Linear Regression       | ~0.10 (10%)             | ~2.27              | Buruk. Indikasi Underfitting. Hubungan antara fitur dan rating ternyata tidak bersifat linear sederhana. |
| 3  | KNN (15 Neighbors)      | ~0.20 (20%)             | ~2.13              | Kurang Optimal. Model terlalu sensitif terhadap outlier dan kesulitan menemukan pola general pada dimensi tinggi. |
| 4  | Decision Tree           | ~0.80 (80%)             | ~1.05              | Baik. Mampu memetakan logika rating dengan akurat. |
| 5  | Random Forest           | ~0.85 (85%)             | Rendah             | Sangat Baik. Metode ensemble terbukti paling stabil dan akurat. |

4.2 Validasi Model Terbaik (Random Forest)

Untuk memastikan model Random Forest benar-benar robust, dilakukan uji 5-Fold Cross Validation.

•	Hasil: Skor R2 rata-rata pada 5 kali pengujian tetap stabil di angka tinggi dengan standar deviasi yang rendah.

•	Interpretasi Error (MAE): Nilai Mean Absolute Error menunjukkan rata-rata kesalahan prediksi yang minim. Artinya, jika model memprediksi rating 7.0, rating aslinya kemungkinan besar berada di rentang yang sangat dekat (misal 6.8 - 7.2), yang masih sangat dapat diterima untuk kebutuhan bisnis.

BAB 5: ANALISIS FAKTOR PENENTU (INSIGHTS)

Berdasarkan analisis Feature Importance dari model Random Forest, ditemukan hierarki pengaruh sebagai berikut:

1.	Dominasi Mutlak vote_count (83%): Jumlah partisipasi penonton adalah indikator terkuat kualitas film. Temuan ini mengindikasikan fenomena psikologis massa: film yang berkualitas (rating tinggi) cenderung memotivasi lebih banyak orang untuk memberikan suara (engagement). Sebaliknya, film dengan sedikit vote cenderung memiliki rating yang bias atau rendah.

2.	Peran popularity yang Lemah (6%): Popularitas (yang sering kali didorong oleh pemasaran/iklan) ternyata tidak berkorelasi kuat dengan kualitas rating. Film populer bisa saja mendapatkan rating buruk ("viral tapi jelek"), dan film indie yang kurang populer bisa mendapatkan rating sempurna.

3.	Faktor Waktu dan Bahasa (<5%): Tahun rilis, bulan rilis, dan bahasa asal film memiliki dampak yang sangat kecil. Ini menunjukkan bahwa penonton global lebih mementingkan konten film itu sendiri daripada kapan atau dari mana film itu berasal.

BAB 6: KESIMPULAN DAN REKOMENDASI

Kesimpulan

Penelitian ini berhasil membuktikan bahwa pendekatan Machine Learning non-linear, khususnya Random Forest Regressor, sangat efektif untuk memprediksi rating film dengan akurasi mencapai 85%. Karakteristik data penilaian film yang kompleks dan berbasis aturan logika manusia tidak dapat ditangani dengan baik oleh metode statistik linear biasa. Faktor interaksi penonton (vote count) teridentifikasi sebagai kunci utama dalam prediksi ini.
