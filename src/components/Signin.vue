<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "sign-in",

  data() {
    return {
      errors: [],
      errorss: [],

      customerCode: "",
      email: "",
      password: "",

      loading: false,
    };
  },

  methods: {
    handleLoader() {
      this.loading = false;

      if (this.email && this.password) {
        setTimeout(() => {
          this.loading = true;
        }, 100);
      } else if (!this.email && !this.password) {
        this.loading = false;
      }
    },

    removeItem() {
      localStorage.removeItem("organisation");
      localStorage.removeItem("subOrganization");
    },

    async customerLogin() {
      this.errors = [];
      const toast = useToast();

      if (!this.email) {
        toast.error("Email address required.");
      }

      if (!this.password) {
        toast.error("Password required.");
      } else {
        await axios
          .post("https://assessmentapi.revassuredev.com/api/user/token", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response) {
              localStorage.setItem("customercode", response.data.customerCode);
              localStorage.setItem("email", response.data.emailAddress);
              localStorage.setItem("fname", response.data.firstname);
              localStorage.setItem("lname", response.data.lastname);
              localStorage.setItem("mname", response.data.middlename);
              localStorage.setItem("phone", response.data.mobileNumber1);
              localStorage.setItem("phone2", response.data.mobileNumber2);

              localStorage.setItem(
                "accesstoken",
                response.data.token.access_Token,
              );
              localStorage.setItem(
                "refreshtoken",
                response.data.token.refresh_Token,
              );

              this.$router.push("/dashboard");
            } else {
              toast.error("Invalid User");
              this.loading = false;
            }
          })
          .catch((error) => {
            if (error.response.data) {
              toast.error("Incorrect username or password!");
              this.loading = false;
            }
          });
      }
    },

    // async customerInvoice() {
    //   this.errors = [];
    //   const toast = useToast();

    //   if (!this.customerCode) {
    //       toast.error("Please login using your customer number.");
    //   }else{

    //       const result = await axios.get('api/Invoice/customerinvoices/'+this.customerCode);

    //       if(result.data.result.length != 0){

    //           localStorage.setItem('customercode', this.customerCode);

    //           this.$router.push("/dashboard/"+this.customerCode);
    //       }else{
    //           toast.error("Please login using your customer number");
    //       }

    //   }
    // },
  },
};
</script>

<template>
  <div class="content-wrapper">
    <section
      class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white"
      data-image-src="/assets/img/photos/bg3.jpg"
    >
      <div class="container pt-17 pb-20 pt-md-19 pb-md-21 text-center">
        <div class="row">
          <div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
            <h1 class="display-1 mb-3 text-white">Sign In</h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item">
                  <RouterLink @click="removeItem" to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Sign In
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
    <section class="wrapper bg-light">
      <div class="container pb-14 pb-md-16">
        <div class="row">
          <div class="col-lg-7 col-xl-6 col-xxl-5 mx-auto mt-n20">
            <div class="card">
              <div class="card-body p-11 text-center">
                <h2 class="mb-3 text-start">Welcome Back</h2>
                <p class="lead mb-6 text-start">
                  Fill your email or phone number and password to sign in.
                </p>
                <form class="text-start mb-3" @submit.prevent="customerLogin">
                  <div class="form-floating mb-4">
                    <input
                      type="text"
                      autocomplete="off"
                      v-model="email"
                      class="form-control"
                      placeholder="Email or Phone number"
                      id="loginEmail"
                    />
                    <label for="loginEmail">Email or Phone number</label>
                  </div>
                  <div class="form-floating password-field mb-4">
                    <input
                      type="password"
                      class="form-control"
                      v-model="password"
                      placeholder="Password"
                      id="loginPassword"
                    />
                    <span class="password-toggle"
                      ><i class="uil uil-eye"></i
                    ></span>
                    <label for="loginPassword">Password</label>
                  </div>
                  <button
                    type="submit"
                    @click="handleLoader()"
                    class="btn btn-primary rounded-pill btn-login w-100 mb-2"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    <span v-else>Sign In</span>
                  </button>
                </form>
                <!-- /form -->
                <p class="mb-1">
                  <a href="#" class="hover">Forgot Password?</a>
                </p>
                <!-- <div class="divider-icon my-4">or</div>
                <nav class="nav social justify-content-center text-center">
                  <a href="#" class="btn btn-circle btn-sm btn-google"><i class="uil uil-google"></i></a>
                  <a href="#" class="btn btn-circle btn-sm btn-facebook-f"><i class="uil uil-facebook-f"></i></a>
                  <a href="#" class="btn btn-circle btn-sm btn-twitter"><i class="uil uil-twitter"></i></a>
                </nav> -->
                <!--/.social -->
              </div>
              <!--/.card-body -->
            </div>
            <!--/.card -->
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>
    <!-- /section -->

    <!-- /.container -->
  </div>
  <!-- /.content-wrapper -->
</template>

<style></style>
