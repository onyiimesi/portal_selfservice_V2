<!-- eslint-disable vue/multi-word-component-names -->
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      allinvoice: [],

      customerData: [],
      loaderDiv: "",
      mainDiv: "d-none",

      firstname: "",
      lastname: "",
      middlename: "",
      emailAddress: "",
      mobileNumber1: "",
      mobileNumber2: "",
      refresh: "",
      customerCode: "",
    };
  },

  created() {
    const response = localStorage.getItem("accesstoken");

    if (!response) {
      this.$router.push("/");
    }

    this.customerCode = response;
  },

  async mounted() {
    this.interval = setInterval(() => {
      this.tokenRefresh();
    }, 20 * 60 * 1000);
    this.customerCode = localStorage.getItem("accesstoken");
    this.refreshs = localStorage.getItem("refreshtoken");
    this.firstname = localStorage.getItem("fname");
    this.lastname = localStorage.getItem("lname");
    this.middlename = localStorage.getItem("mname");
    this.emailAddress = localStorage.getItem("email");
    this.mobileNumber1 = localStorage.getItem("phone");
    this.mobileNumber2 = localStorage.getItem("phone2");
    this.customers = localStorage.getItem("customercode");

    const resultss = await axios.get(
      "https://assessmentapi.revassuredev.com/api/customer/details/" +
        this.customers,
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );

    this.customerData = resultss.data.result;
    this.loaderDiv = "d-none";
    this.mainDiv = "";
  },

  beforeUnmount() {
    clearInterval(this.interval);
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
            <h1 class="display-1 mb-3 text-white">Profile</h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item">
                  <RouterLink to="/dashboard">Home</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Profile
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
      <div class="row pt-10 pb-10">
        <div class="col-md-8 mb-5">
          <div class="card">
            <div class="card-header">
              <h3>My Profile</h3>
            </div>
            <div class="card-body">
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
                <div class="row">
                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>First Name</h6>
                      <span>{{ this.firstname }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Middle Name</h6>
                      <span>{{ this.middlename }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Last Name</h6>
                      <span>{{ this.lastname }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Email Address</h6>
                      <span>{{ this.emailAddress }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Mobile Number</h6>
                      <span>{{ this.mobileNumber1 }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Mobile Number 2</h6>
                      <span>{{ this.mobileNumber2 }}</span>
                    </div>
                  </div>

                  <div class="col-6 col-md-4 mb-4">
                    <div>
                      <h6>Address</h6>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-5">
          <div class="card">
            <div class="card-header">
              <h3>My Bills</h3>
            </div>
            <div class="card-body">
              <router-link to="/bills"
                ><button class="btn btn-danger w-100 btn-sm">
                  View
                </button></router-link
              >
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
