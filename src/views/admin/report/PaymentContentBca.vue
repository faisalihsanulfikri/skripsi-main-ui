<template>
  <section class="payment-content-lainnya">

    <div v-if="configs.length === 0"> Maaf untuk saat ini layanan tidak tersedia</div>
    <div v-else><app-alert :message="message"/></div>

    <div v-for="config in configs">
      <div class="bank-info">
        <h3>Bank {{config.bank}}</h3>
        <p>
          Kirim ke
          <span class="red">{{ config.name }}</span>
        </p>
        <p>
          <strong>No. ReK: {{ config.account_number }}</strong>
        </p>
      </div>
      <ul uk-accordion>
        <li class="uk-open">
          <a class="uk-accordion-title" href="#">ONLINE</a>
          <div class="uk-accordion-content f-size">
            <b>Transfer Uang via Internet Banking</b>
            <ol>
              <li>Login ke klikbca website http://www.klikbca.com/. Masuk ke halaman Transfer Dana, lalu pilih 'Daftar Rekening Tujuan'.</li>
              <li>
                Pilih 'Rekening BCA'. Masukan nomor rekening
                <b>2273660801</b>. Masukkan Challenge Code 2 yang dikirimkan ke Token Internet Banking Anda, kemudian klik 'Lanjutkan'.
              </li>
              <li>Kembali ke Menu Utama dan masuk ke halaman Transfer Dana, lalu pilih 'Transfer ke Rek. BCA'.</li>
              <li>
                Dari Daftar Transfer pilih rekening
                <b>2273660801 - PT. Kirana Exim Internasional</b>, masukan sejumlah total invoice. Masukan challenge code yang dikirimkan ke Token Internet Banking Anda dan kemudian klik 'Lanjutkan'.
              </li>
              <li>Masuk ke halaman konfirmasi 2. Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik 'Kirim'.</li>
              <li>Setelah transaksi pembayaran Anda selesai, silahkan kirim bukti transfer Anda ke website kami di 'konfirmasi pembayaran' atau email ke biling@kirimin.co.id.</li>
            </ol>
          </div>
        </li>
        <!-- <li>
          <a class="uk-accordion-title" href="#">MBANKING</a>
          <div class="uk-accordion-content">
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
          </div>
        </li>-->
        <li>
          <a class="uk-accordion-title" href="#">ATM</a>
          <div class="uk-accordion-content f-size">
            <b>Transfer Uang dari Sesama Bank BCA</b>
            <ol>
              <li>Masukkan Kartu ATM BCA Anda. Masukan PIN ATM Anda.</li>
              <li>Pilih Menu Transaksi Lainnya. Pilih menu Transfer dan Ke Rek BCA.</li>
              <li>
                Masukkan no rekening BCA
                <b>2273660801 - PT. Kirana Exim Internasional</b>. Masukkan jumlah uang yang akan di transfer.
              </li>
              <li>Layar ATM akan menampilkan data transaksi anda. Jika data sudah benar pilih 'YA' (OK).</li>
              <li>Selesai (struk akan keluar dari mesin ATM). Kirim bukti transfer ke email biling@kirimin.co.id.</li>
            </ol>
            <br>

            <b>Transfer Uang dari Bank Lain</b>
            <ol>
              <li>Masukkan Kartu ATM Anda. Masukan PIN ATM Anda.</li>
              <li>Pilih Menu Transfer dan Pilih Menu 'Ke Rek Bank Lain'.</li>
              <li>
                Masukkan Kode Bank 014 dan no rekening BCA
                <b>2273660801 - PT. Kirana Exim Internasional</b>. Masukkan jumlah yang akan ditransfer.
              </li>
              <li>Masukkan No Referensi (bebas, boleh dikosongkan). Layar ATM akan menampilkan data transaksi anda. Jika data sudah benar pilih 'YA' (OK).</li>
              <li>Selesai (struk akan keluar dari mesin ATM). Kirim bukti transfer ke email biling@kirimin.co.id.</li>
            </ol>
          </div>
        </li>
      </ul>
      <button class="confirm-button" @click="$emit('click')">Konfirmasi Pembayaran</button>
    </div>


  </section>
</template>

<script>
import AppAlert from "@/components/AppAlert";
export default {
  name: "PaymentContentLainnya",
  components: {
    AppAlert
  },
  props: {
    bankAccount: {
      type: Object,
      required: true
    },
    configs: {}
  },
  data: () => ({
    message:
      "Setelah Anda melakukan pembayaran, silahkan klik tombol konfirmasi pembayaran untuk membantu kami.",
    check: {}
  })
  // watch: {
  //   configs: function(newOption, oldOption) {
  //     this.check = newOption
  //
  //   }
  // }

};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Proxima Nova Bold";
  src: url("/fonts/Proxima-Nova-Bold.otf");
}
@font-face {
  font-family: "Proxima Nova Regular";
  src: url("/fonts/Proxima-Nova-Regular.ttf");
}

$proxima-nova-regular: "Proxima Nova Regular", sans-serif;
$proxima-nova-bold: "Proxima Nova Bold", sans-serif;
$red: #ff0000;
$blue: #175cce;
$green-dark: #529a30;
$green: #c5e5af;
$green-light: #e5fad7;
$border-radius: 6px;

.bank-info {
  margin-top: 2rem;
}
.red {
  color: $red;
}
h3,
p {
  margin: 0;
}
h3 {
  font-size: 20px;
}
p {
  font-size: 15px;
}
.uk-accordion {
  margin-bottom: 0;
  .uk-accordion-title {
    font-size: 15px;
    font-family: $proxima-nova-bold;
    font-weight: bold;
    color: $green-dark;
    background: $green;
    padding: 15px 23px;
    border-radius: $border-radius;
    &::before {
      background-image: url("/img/plus-icon.png");
    }
  }
  .uk-accordion-content {
    padding: 15px 23px;
    background: $green-light;
    margin-top: 0;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }
  .uk-open {
    .uk-accordion-title {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      &::before {
        background-image: url("/img/minus-icon.png");
      }
    }
  }
}
.confirm-button {
  background: rgb(22, 92, 206);
  background: linear-gradient(
    130deg,
    rgba(22, 92, 206, 1) 25%,
    rgba(65, 73, 165, 1) 60%,
    rgba(166, 28, 69, 1) 100%
  );
  border-radius: $border-radius;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: $proxima-nova-bold;
  color: white;
  border: 0;
  margin-top: 26px;
  cursor: pointer;
  transition: background 200ms ease-in-out;
  &:hover {
    background: rgb(22, 92, 206);
    background: linear-gradient(
      311deg,
      rgba(22, 92, 206, 1) 25%,
      rgba(65, 73, 165, 1) 60%,
      rgba(166, 28, 69, 1) 100%
    );
  }
  &:focus {
    outline: none;
  }
}

.f-size {
  font-size: small;
}
</style>
