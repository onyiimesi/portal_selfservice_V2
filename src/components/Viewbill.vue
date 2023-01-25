<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import moment from "moment";

export default {
  data() {
    return {
      errors: [],
      message: [],

      allinvoices: [],

      customerCode: "",

      organisation: {
        organisationCode: "",
        organisationName: "",
        subOrganisationCode: "",
        subOrganisationName: "",
        customerCode: "",
        organisationAddress: "",
        organisationEmail: "",
      },

      subOrganisation: {
        organisationCode: "",
        organisationName: "",
        subOrganisationCode: "",
        subOrganisationName: "",
        customerCode: "",
        organisationAddress: "",
        organisationEmail: "",
      },

      customer: {
        customerCode: "",
      },

      invoice: {
        invoiceCode: "",
        invoiceDate: "",
      },

      items: {
        amount: "",
      },

      invoiceCode: "",
      loaderDiv: "",
      mainDiv: "d-none",

      refresh: "",
    };
  },

  created() {
    const response = localStorage.getItem("accesstoken");

    this.customerCode = response;
  },

  async mounted() {
    this.interval = setInterval(() => {
      this.tokenRefresh();
    }, 20 * 60 * 1000);
    this.customerCode = localStorage.getItem("accesstoken");
    this.refreshs = localStorage.getItem("refreshtoken");

    const result = await axios.get(
      "api/Invoice/customerinvoices/" + this.$route.params.invoiceCode,
    );
    this.allinvoices = result.data.result;

    await axios
      .get("api/Invoice/details/" + this.$route.params.invoiceCode)

      .then((res) => {
        this.organisation = res.data.result.organisation;
        this.subOrganisation = res.data.result.subOrganisation;
        this.customer = res.data.result.customer;
        this.invoice = res.data.result.invoice;
        this.items = res.data.result.items;
        this.loaderDiv = "d-none";
        this.mainDiv = "";
      })
      .catch((err) => {
        console.log(err);
      });
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  computed: {
    total: function () {
      let total = [];

      Object.entries(this.items).forEach(([key, val]) => {
        total.push(val.amount); // the value of the current key.
      });

      return total.reduce(function (total, num) {
        return total + num;
      }, 0);
    },

    tax: function () {
      let total = [];

      Object.entries(this.items).forEach(([key, val]) => {
        total.push(val.tax); // the value of the current key.
      });

      return total.reduce(function (total, num) {
        return total + num;
      }, 0);
    },
  },

  methods: {
    async tokenRefresh() {
      await axios
        .post(
          "https://assessmentapi.revassuredev.com/api/user/refresh",
          {
            access_Token: this.customerCode,
            refresh_Token: this.refreshs,
          },
          {
            headers: {
              Authorization: "Bearer " + this.customerCode,
            },
          },
        )
        .then((response) => {
          // console.log(response);
          localStorage.setItem("accesstoken", response.data.access_Token);

          this.customerCode = localStorage.getItem("accesstoken");

          localStorage.setItem("refreshtoken", response.data.refresh_Token);

          this.refreshs = localStorage.getItem("refreshtoken");
        });
    },
    dateTime(value) {
      return moment(value).format("MMMM Do YYYY");
    },

    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "revassuredev-invoice.pdf",
        html2canvas: {
          windowWidth: 100,
          windowHeight: 100,
        },
        // pagebreak: { mode: 'avoid-all', after: '.page2el' },
      });
    },

    async makePayment() {
      this.message = [];

      const response = await axios.post(
        "https://assessmentapi.revassuredev.com/api/Payment/initialize/",
        {
          invoiceCode: this.invoice.invoiceCode,
          callBackUrl:
            "https://selfservice.revassuredev.com/payment-status/" +
            this.invoice.invoiceCode,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accesstoken"),
          },
        },
      );

      if (response) {
        // console.log(response);

        this.message.push(response.data.message);

        window.location.href = response.data.result.authorization_url;
      }
    },

    handleClick() {
      localStorage.removeItem("customercode");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="content-wrapper">
    <section
      class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white example-screen"
      data-image-src="/assets/img/photos/bg3.jpg"
    >
      <div class="container pt-17 pb-5 pt-md-10 pb-md-10 text-center">
        <div class="row">
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /section -->
    <div class="container">
      <div class="row pt-5 pb-10">
        <div class="col-md-9 example-print" id="element-to-convert">
          <div class="cs-container">
            <div :class="this.loaderDiv">
              <div class="ph-item">
                <div class="ph-col-12">
                  <div class="ph-picture"></div>
                  <div class="ph-row">
                    <div class="ph-col-6 big"></div>
                    <div class="ph-col-4 empty big"></div>
                    <div class="ph-col-2 big"></div>
                    <div class="ph-col-4"></div>
                    <div class="ph-col-8 empty"></div>
                    <div class="ph-col-6"></div>
                    <div class="ph-col-6 empty"></div>
                    <div class="ph-col-12"></div>
                  </div>
                  <div class="ph-row">
                    <div class="ph-col-6 big"></div>
                    <div class="ph-col-4 empty big"></div>
                    <div class="ph-col-2 big"></div>
                    <div class="ph-col-4"></div>
                    <div class="ph-col-8 empty"></div>
                    <div class="ph-col-6"></div>
                    <div class="ph-col-6 empty"></div>
                    <div class="ph-col-12"></div>
                  </div>
                  <div class="ph-row">
                    <div class="ph-col-6 big"></div>
                    <div class="ph-col-4 empty big"></div>
                    <div class="ph-col-2 big"></div>
                    <div class="ph-col-4"></div>
                    <div class="ph-col-8 empty"></div>
                    <div class="ph-col-6"></div>
                    <div class="ph-col-6 empty"></div>
                    <div class="ph-col-12"></div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="this.mainDiv">
              <div class="cs-invoice cs-style1">
                <div class="alert alert-success" v-if="message.length">
                  <strong v-for="msg in message" :key="msg">{{ msg }}</strong>
                </div>
                <div class="cs-invoice_in" id="download_section">
                  <div class="cs-invoice_head cs-type1 cs-mb25">
                    <div class="cs-invoice_left">
                      <p
                        class="cs-invoice_number cs-primary_color cs-mb5 cs-f16"
                      >
                        <b class="cs-primary_color">Bill No:</b> #{{
                          invoice.invoiceCode
                        }}
                      </p>
                      <p class="cs-invoice_date cs-primary_color cs-m0">
                        <b class="cs-primary_color">Date: </b
                        >{{ dateTime(invoice.invoiceDate) }}
                      </p>
                    </div>
                    <div class="cs-invoice_right cs-text_right">
                      <div class="cs-logo cs-mb5"></div>
                    </div>
                  </div>
                  <div class="cs-invoice_head cs-mb10">
                    <div class="cs-invoice_left">
                      <b class="cs-primary_color">Bill To:</b>
                      <p>
                        {{ customer.customerCode }} <br />
                        {{ customer.firstname }} {{ customer.lastname }} <br />
                        {{ customer.emailAddress }}, <br />{{
                          customer.mobileNumber1
                        }}, <br />
                        {{ customer.lgaName }} {{ customer.stateName }}
                      </p>
                    </div>
                    <div class="cs-invoice_right cs-text_right">
                      <b class="cs-primary_color">Pay To:</b>
                      <p>
                        {{ organisation.organisationName }} <br />
                        {{ subOrganisation.subOrganisationName }} <br />
                        {{ organisation.organisationAddress }} <br />
                        {{ organisation.organisationEmail }} <br />
                      </p>
                    </div>
                  </div>
                  <div class="cs-table cs-style1">
                    <div class="cs-round_border">
                      <div class="cs-table_responsive">
                        <table>
                          <thead>
                            <tr>
                              <th
                                class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg"
                              >
                                Item
                              </th>
                              <th
                                class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg"
                              >
                                Qty
                              </th>
                              <th
                                class="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg"
                              >
                                Price
                              </th>
                              <th
                                class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in items" :key="item">
                              <td class="cs-width_3">{{ item.itemName }}</td>
                              <td class="cs-width_2">{{ item.quantity }}</td>
                              <td class="cs-width_1">
                                {{ Number(item.price).toLocaleString() }}
                              </td>
                              <td class="cs-width_2 cs-text_right">
                                {{ Number(item.amount).toLocaleString() }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="cs-invoice_footer cs-border_top">
                        <div class="cs-left_footer cs-mobile_hide">
                          <!-- <p class="cs-mb0"><b class="cs-primary_color">Additional Information:</b></p>
                        <p class="cs-m0">At check in you may need to present the credit <br>card used for payment of this ticket.</p> -->
                        </div>
                        <div class="cs-right_footer">
                          <table>
                            <tbody>
                              <tr class="cs-border_left">
                                <td
                                  class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg"
                                >
                                  Subtotal
                                </td>
                                <td
                                  class="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right"
                                >
                                  {{ Number(total).toLocaleString() }}
                                </td>
                              </tr>
                              <tr class="cs-border_left">
                                <td
                                  class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg"
                                >
                                  Tax
                                </td>
                                <td
                                  class="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right"
                                >
                                  {{ tax }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div class="cs-invoice_footer">
                      <div class="cs-left_footer cs-mobile_hide"></div>
                      <div class="cs-right_footer">
                        <table>
                          <tbody>
                            <tr class="cs-border_none">
                              <td
                                class="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color"
                              >
                                Total Amount
                              </td>
                              <td
                                class="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color cs-text_right"
                              >
                                {{ Number(total).toLocaleString() }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="cs-note">
                    <!-- <div class="cs-note_left">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                  </div>
                  <div class="cs-note_right">
                    <p class="cs-mb0"><b class="cs-primary_color cs-bold">Note:</b></p>
                    <p class="cs-m0">Here we can write a additional notes for the client to get a better understanding of this invoice.</p>
                  </div> -->
                  </div>
                  <!-- .cs-note -->
                </div>
                <div
                  class="cs-invoice_btns cs-hide_print example-screen"
                  data-html2canvas-ignore
                >
                  <a
                    href="javascript:window.print()"
                    class="cs-invoice_btn cs-color1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <rect
                        x="128"
                        y="240"
                        width="256"
                        height="208"
                        rx="24.32"
                        ry="24.32"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <path
                        d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24"
                        fill="none"
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle cx="392" cy="184" r="24" />
                    </svg>
                    <span>Print</span>
                  </a>
                  <button @click="exportToPDF" class="cs-invoice_btn cs-color2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <title>Download</title>
                      <path
                        d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                        d="M176 272l80 80 80-80M256 48v288"
                      />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 pt-6 example-screen">
          <div class="card mb-4">
            <div class="card-body">
              <div class="">
                <p class="mb-3">View Other Bills:</p>
                <router-link to="/bills"
                  ><button class="btn btn-danger w-100 btn-sm">
                    View
                  </button></router-link
                >
              </div>
            </div>
          </div>

          <!-- <div class="card mb-4" v-if="invoice.paymentStatus == 'UNPAID' ">
                <div class="card-body">
                    <div class="mb-3">
                        <button class="btn btn-primary w-100 btn-sm"><i class="mdi mdi-send"></i> Send Bill</button>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-secondary w-100 btn-sm" @click="exportToPDF"><i class="mdi mdi-arrow-collapse-down"></i> Download</button>
                    </div>
                    <div class="mb-3">
                        <button onclick="window.print();return false;" class="btn btn-success w-100 btn-sm"><i class="mdi mdi-printer"></i> Print</button>
                    </div>
                </div>
            </div> -->

          <div class="card" v-if="invoice.paymentStatus == 'UNPAID'">
            <div class="card-body">
              <p class="mb-3">Pay with:</p>

              <div class="mb-3">
                <form @submit.prevent="makePayment">
                  <button class="btn btn-info btn-sm w-100">Paystack</button>
                </form>
              </div>

              <div class="mb-3">
                <a class="btn btn-success btn-sm w-100" href="">Remita</a>
              </div>

              <div class="mb-3">
                <a class="btn btn-primary btn-sm w-100" href="">Baxi</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- /.container -->
  </div>
  <!-- /.content-wrapper -->
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
  padding: 0;
}

.aa .card {
  background-color: #fff !important;
}

.brand-section {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.brand-section h1 {
  font-size: 28px;
  padding: 0 0 10px 0;
  color: #000;
}
.brand-section h3 {
  font-size: 18px;
  padding: 0 0 10px 0;
  color: #000;
}

.body-section h4 {
  padding: 0 0 20px 0;
}

.body-section .row {
  display: flex;
  flex-wrap: wrap;
}
.body-section .col-6 {
  width: 50%;
  flex: 0 0 auto;
}
.body-section .text-white {
  color: #fff;
}
.company-details {
  float: right;
  text-align: right;
}
.company-details .sub-heading {
  color: #000;
}
.body-section {
  padding: 16px;
}

.body-section h4 {
  font-size: 18px;
}

.heading {
  font-size: 16px;
  margin-bottom: 08px;
}
.body-section .sub-heading {
  color: #000;
  margin-bottom: 05px;
}
.body-section table {
  background-color: #fff;
  width: 100%;
  border-collapse: collapse;
  margin: 10px 0;
}
.body-section table thead tr {
  border-bottom: 1px solid #ccc;

  color: #000;
}
.body-section table td {
  vertical-align: middle !important;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.body-section table th,
table td {
  padding-top: 08px;
  padding-bottom: 08px;
}

.body-section .table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}
.body-section .text-right {
  text-align: end;
}
.body-section .w-20 {
  width: 20%;
}
.body-section .float-right {
  float: right;
}
tbody td {
  color: #000;
}

.dropdown-wrapper {
  position: relative;
  margin: 0 auto;
}
.selected-items {
  height: 38px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}
.selected-items input {
  border: 0;
  outline: 0;
}
.dropdown-popover {
  position: absolute;
  border: 1px solid lightgray;
  top: 40px;
  left: 0;
  right: 0;
  background-color: #fff;
  width: 100%;
  z-index: 99;
  padding: 0;
  margin: 0;
  border-radius: 0 0 5px 5px;
}
.dropdown-popover input {
  width: 90%;
  margin: 10px;
}

.options {
  width: 100%;
}
.options ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 10px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.options ul li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
}
.options ul li:hover {
  background-color: #70878a;
  color: #fff;
}

.page2el th {
  color: #000;
}

.menu_arrange i {
  font-size: 40px;
}

@media print {
  .example-screen {
    display: none;
  }
}

::-webkit-scrollbar {
  display: none;
}
@page {
  size: auto;
  margin: 0mm;
}
</style>
