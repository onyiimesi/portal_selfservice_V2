<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<script>
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      errors: [],
      message: [],

      customerCode: "",
      customer: "",

      allinvoice: [],
      loaderDiv: "",
      mainDiv: "d-none",
      refresh: "",
      interval: null,
    };
  },

  created() {
    const response = localStorage.getItem("accesstoken");

    this.customerCode = response;

    if (!this.customerCode) {
      this.$router.push("/signin");
    }
  },

  async mounted() {
    this.interval = setInterval(() => {
      this.tokenRefresh();
    }, 20 * 60 * 1000);
    this.customerCode = localStorage.getItem("accesstoken");
    this.refreshs = localStorage.getItem("refreshtoken");
    this.customer = localStorage.getItem("customercode");

    const result = await axios.get(
      "api/Invoice/customerinvoices/" + this.customer,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    );
    this.allinvoice = result.data.result;
    this.loaderDiv = "d-none";
    this.mainDiv = "";

    setTimeout(() => {
      $("#datatable").DataTable({
        lengthMenu: [
          [5, 10, 25, 50, -1],
          [5, 10, 25, 50, "All"],
        ],
        pageLength: 25,
        bFilter: false,
        retrieve: true,
      });
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
    exportToPDF() {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "revassuredev-invoice.pdf",
        html2canvas: {
          windowWidth: 100,
          windowHeight: 100,
        },
        pagebreak: { mode: "avoid-all", before: ".page2el" },
      });
    },

    async makePayment() {
      this.message = [];

      const response = await axios.post(
        "https://assessmentapi.revassuredev.com/api/Payment/initialize/",
        {
          invoiceCode: this.invoice.invoiceCode,
          callBackUrl:
            "https://revassuredev.com/payment-verify/" +
            this.invoice.invoiceCode,
        },
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
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
      class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white"
      data-image-src="/assets/img/photos/bg3.jpg"
    >
      <div class="container pt-15 pb-10 pt-md-17 pb-md-10 text-center">
        <div class="row">
          <div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
            <h1 class="display-1 mb-3 text-white">Bills</h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item">
                  <RouterLink to="/dashboard">Home</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Bills
                </li>
              </ol>
            </nav>
            <!-- /nav -->
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /section -->
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-12">
          <h2>List of Paid & Unpaid Bills</h2>
        </div>
      </div>
      <div class="row pt-5 pb-10">
        <div class="col-md-12">
          <div class="card border border-info">
            <div class="card-body table-responsive">
              <h3 class="pb-4">Bills</h3>
              <div :class="this.loaderDiv">
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                    </div>
                    <div class="ph-row">
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="this.mainDiv">
                <table
                  id="datatable"
                  class="table table-bordered table-striped table-hover"
                >
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">Organization</th>
                      <th scope="col">#Invoice</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Outstanding</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in allinvoice" :key="item.id">
                      <td>{{ item.organisationCode }}</td>
                      <td>{{ item.invoiceCode }}</td>
                      <td>{{ item.currencyCode }}</td>
                      <td>{{ Number(item.invoiceAmount).toLocaleString() }}</td>
                      <td></td>
                      <td>{{ item.paymentStatus }}</td>

                      <td>
                        <RouterLink :to="'/view-bill/' + item.invoiceCode"
                          ><button class="btn btn-success btn-sm">
                            View
                          </button></RouterLink
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row pt-5"></div>
    </div>
    <!-- /.container -->
  </div>
  <!-- /.content-wrapper -->
</template>

<style></style>
