<template>
  <div class="uk-margin-top uk-margin-bottom">
    <div class="uk-card uk-card-default">
      <div class="uk-card-header uk-text-center">
        <h3 class="uk-card-title">FAQ</h3>
      </div>
      <div class="uk-card-body">
        <div v-if="error" class="uk-alert-danger" uk-alert>
          {{ errorMessage }}
        </div>
        <div uk-grid>
          <div class="uk-width-1-1">
            <h4 class="uk-card-title">Gimana Cara Menggunakan Kirimin </h4>
            <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah saya harus menjadi member untuk menggunakan jasa Kirimin ?</a>
                    <div class="uk-accordion-content">
                      <p>Ya dan tidak ada biaya, hanya saja jika anda ingin fitur penggabungan beberapa paket (konsolidasi). Anda harus mendaftar sebagai member premium</p>
                    </div>
                </li>
                <li class="uk-open">
                    <a class="uk-accordion-title" href="#">Kapan saya bisa menggunakan jasa Kirimin ?</a>
                    <div class="uk-accordion-content">
                        <p>Langsung, setelah ada daftar sebagai member
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Kapan saya bisa mendapatkan alamat gudang di beberapa negara ?</a>
                    <div class="uk-accordion-content">
                        <p>Setelah melakukan daftar sebagai member maka anda akan mendapatkan alamat gudang
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Gimana cara kerja fitur Titip Beli dari Kirimin ?</a>
                    <div class="uk-accordion-content">
                        <p>
                        <ul><li>Titip Beli = untuk pembelanjaan online di luar negeri , anda tinggal memasukan alamat gudang Kirimin sesuai negara tempat transaksi</li>
<li>Paket tiba di gudang Kirimin = kami akan memberikan notifikasi ketika paket sudah tiba di gudang kami</li>
<li>Isi formulir pengiriman barang = pastikan ada mengisi data bea cukai dengan menyebutkan deskripsi barang, quantity dan nilai barang di dalam paket</li>
<li>Kirim paket = anda bisa memilih untuk menggabungkan beberapa pembelian paket untuk menjadi 1 paket pengiriman atau hanya 1 paket saja</li></ul>
</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Paket</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Berapa tarif biaya pengiriman paket ?</a>
                    <div class="uk-accordion-content">
                        <p>Biaya pengiriman paket akan ditimbang ulang di gudang Kirimin, dan akan tergantung dari, berat dari paket, ukuran dari paket, dan nilai paket tersebut. Anda bisa menggunakan Calculator untuk menghitung estimasi biaya pengiriman berdasarkan kriteria tersebut.</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Berapa lama saya bisa menyimpan paket di gudang ?</a>
                    <div class="uk-accordion-content">
                        <p>Anda mendapatkan fasilitas free 7 hari untuk member non premium
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Bagaimana cara menghitung dimensi paket ?</a>
                    <div class="uk-accordion-content">
                        <p>cara menghitung dimensi paket adalah ( Panjang X Lebar X Tinggi ) / 5000 = kg
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah saya akan menerima notifikasi setelah paket tiba di gudang Kirimin</a>
                    <div class="uk-accordion-content">
                        <p>Iya, anda akan menerima notifikasi setelah kami menerima paket dan mengecek paket
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah ada surat-surat yang harus diisi ?</a>
                    <div class="uk-accordion-content">
                        <p>Tidak ada, kami akan mewakili anda untuk mengisi surat deklarasi bea cukai. Kecuali makanan dan kosmetik , karena diperlukan beberapa surat yang bisa didownload di website kami
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Setelah berapa lama paket akan dikirim setelah tiba di gudang Kirimin ?</a>
                    <div class="uk-accordion-content">
                        <p>Paket akan langsung diproses setelah tiba di gudang Kirimin, kecuali anda membutuhkan konsolidasi paket maka paket akan dikirimkan setelah semua paket tiba di gudang Kirimin
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah ada biaya untuk konsolidasi ?</a>
                    <div class="uk-accordion-content">
                        <p>Ya ada biaya untuk paket yang akan dikonsolidasi. Anda harus mendaftar menjadi member premium untuk bisa menggunakan service ini</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Saya tidak dapat melihat tarif biaya kirim ketika paket dikirimkan sebagai paket konsolidasi?</a>
                    <div class="uk-accordion-content">
                        <p>Tarif biaya kirim untuk paket konsolidasi akan diinfokan setelah kita mengkonsolidasikan paket anda menjadi 1 box dan kemudian menghitung berat dan dimensi paket tersebut
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah ada barang-barang yang tidak bisa dikirim melalui Kirimin ?</a>
                    <div class="uk-accordion-content">
                        <p>Tarif biaya kirim untuk paket konsolidasi akan diinfokan setelah kita mengkonsolidasikan paket anda menjadi 1 box dan kemudian menghitung berat dan dimensi paket tersebutIya, Semua barang yang termasuk kategori barang dangerous good . Yang bisa di lihat pada link …
</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Customs</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Bagaimana jika saya akan mengirimkan paket yang berupa hadiah ?</a>
                    <div class="uk-accordion-content">
                        <p>Jika anda akan mengirimkan paket yang didapat sebagai hadiah , maka anda harus menuliskan nilai minimun barang sebesar $1 dan anda juga harus menuliskan harga retail barang tersebut
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah harga barang dalam USD ?</a>
                    <div class="uk-accordion-content">
                        <p>Harga barang tergantung dari asal negara pembelian yang akan dikonversi menjadi rupiah
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah saya harus membayar bea masuk dan pajak ?</a>
                    <div class="uk-accordion-content">
                        <p>Iya, anda harus membayar segala biaya yang akan timbul sesuai peraturan Undang-Undang di Indonesia
</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Pembayaran</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Metode pembayaran apa saja yang di?</a>
                    <div class="uk-accordion-content">
                        <p>Pembayaran bisa dilakukan melalui bank transfer, credit card dan paypal untuk bank transfer silahkan lihat link ini …
</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Claims dan Asuransi
</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Jika ada barang/paket yang hilang , apakah ada penggantian ?</a>
                    <div class="uk-accordion-content">
                        <p>Jika paket yang dikirim tidak diasuransikan maka Kirimin akan memberikan jaminan penggantian sebesar Rp. 1.000.000,-. Dianjurkan untuk mengasuransikan semua pengiriman
</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Bagaimana jika saya menerima paket yang salah ?</a>
                    <div class="uk-accordion-content">
                        <p>Segera beritahu customer service kita di nomer 021.00000 dan customer service kita akan dengan senang hati membantu anda</p>
                    </div>
                </li>
                <li>
                    <a class="uk-accordion-title" href="#">Apa saja yang dicover oleh asuransi ?</a>
                    <div class="uk-accordion-content">
                        <p>Asuransi akan mencover kehilangan barang dan kerusakan barang
</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Tracking
</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">Apakah saya bisa mentracking status pengiriman barang ?</a>
                    <div class="uk-accordion-content">
                        <p>Iya, anda bisa melihat status tracking di halaman link …….

</p>
                    </div>
                </li>
                </ul>
              </div>
                <div class="uk-width-1-1">
                  <h4 class="uk-card-title">Barang Terlarang
</h4>
                  <ul uk-accordion>
                <li>
                    <a class="uk-accordion-title" href="#">lihat</a>
                    <div class="uk-accordion-content">
                        <p>Iya, anda bisa melihat status tracking di halaman link …….

</p>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
