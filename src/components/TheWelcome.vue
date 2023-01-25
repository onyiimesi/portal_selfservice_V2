<!-- eslint-disable no-undef -->
<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      errors: [],
      errorss: [],
      modules: [Pagination, Navigation, Autoplay],

      name: "",
      customerCode: "",
      invoiceCode: "",

      allorg: [],
      allsuborg: [],
      allitem: [],
      organizationCode: "",
      subOrganizationCode: "",
      itemOrgCode: "",

      itemList: [],

      customFieldValues: [
        {
          fieldValue: "",
          id: 0,
        },
      ],

      allcu: [],
      allcuss: [],
      allcusss: [],
      allcussss: [],
      searchQuery: "",
      selectedItem: "",
      isVisible: false,

      loaderDiv: "",
      mainDiv: "d-none",
    };
  },

  computed: {
    filteredService() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.allcuss;
      }

      return this.allcuss
        .concat(this.allcusss)
        .concat(this.allcussss)
        .filter((service) => {
          return Object.values(service).some((word) =>
            String(word).toLowerCase().includes(query),
          );
        });
    },
  },

  async mounted() {
    let selfs = this;
    $("#single-select-fieldd")
      .select2({
        theme: "bootstrap-5",
        width: $(this).data("width")
          ? $(this).data("width")
          : $(this).hasClass("w-100")
          ? "100%"
          : "style",
        containerCssClass: "myFont",
        placeholder: $(this).data("placeholder"),
      })
      .on("change", function () {
        selfs.payforService(this.value);
      });

    // const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+this.$route.params.organizationCode,{
    //   headers: {
    //     clientid : 'abc123',
    //     Authorization: '0*EI&LBEey28Y#p1e3qmVD'
    //   }
    // },);
    // this.allitem = resp.data.result;

    const result = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Organization/organizations",
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );
    this.allorg = result.data.result;

    const res = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Organization/organizations",
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
      +this.searchQuery,
    );
    this.allcus = res.data.result;

    // const resultss = await axios.get('https://assessmentapi.revassuredev.com/api/Organization/details/'+this.organizationCode, {
    //   headers: {
    //     clientid : 'abc123',
    //     Authorization: '0*EI&LBEey28Y#p1e3qmVD'
    //   }
    // },);
    // this.orgDetails = resultss.data.result;
  },

  methods: {
    async onKeyUp() {
      if (this.searchQuery != "") {
        const res = await axios.get(
          "https://assessmentapi.revassuredev.com/api/Search/ByOrgUnitItem?search=" +
            this.searchQuery,
          {
            headers: {
              clientid: "abc123",
              Authorization: "0*EI&LBEey28Y#p1e3qmVD",
            },
          },
          +this.searchQuery,
        );

        this.allcuss = res.data.items;
        this.allcusss = res.data.mdAs;
        this.allcussss = res.data.units;
        this.loaderDiv = "d-none";
        this.mainDiv = "";

        console.log(this.filteredService);
      }
    },

    selectOrg(cust) {
      this.selectedItem = cust;
      this.isVisible = false;

      if (this.selectedItem.organisationCode) {
        localStorage.setItem(
          "organisation",
          this.selectedItem.organisationCode,
        );

        this.$router.push(
          "/selfassessment/" + this.selectedItem.organisationCode,
        );
      }

      if (this.selectedItem.subOrganisationCode) {
        localStorage.setItem(
          "subOrganization",
          this.selectedItem.subOrganisationCode,
        );

        localStorage.setItem(
          "organisation",
          this.selectedItem.organisationCode,
        );

        this.$router.push(
          "/selfassessment/" +
            this.selectedItem.organisationCode +
            "/" +
            this.selectedItem.subOrganisationCode,
        );
      }

      if (this.selectedItem.itemCode) {
        localStorage.setItem(
          "organisation",
          this.selectedItem.organisationCode,
        );

        localStorage.setItem(
          "subOrganization",
          this.selectedItem.subOrganisationCode,
        );

        localStorage.setItem("itemOrgCode", this.selectedItem.itemOrgCode);

        this.$router.push(
          "/selfassessment/" +
            this.selectedItem.organisationCode +
            "/" +
            this.selectedItem.subOrganisationCode,
        );
      }
    },

    payforService(val) {
      const toast = useToast();

      this.organizationCode = val;

      if (!this.organizationCode) {
        toast.error("Please select an agency");
      } else {
        localStorage.setItem("organisation", this.organizationCode);

        this.$router.push("/selfassessment/" + this.organizationCode);
      }
    },

    async billNumber() {
      this.errorss = [];
      const toast = useToast();

      if (!this.invoiceCode) {
        toast.error("Please enter a valid bill number.");
      } else {
        const result = await axios.get(
          "api/Invoice/details/" + this.invoiceCode,
        );

        if (result.data.status == 250) {
          toast.error("Invalid Bill Number.");
        } else if (result.data.result.length != 0) {
          this.$router.push("/view-bill/" + this.invoiceCode);
        }
      }
    },
  },
};
</script>

<template>
  <div class="content-wrapper">
    <section
      class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 bg-content text-white"
    >
      <div class="container pt-18 pb-16" style="z-index: 5; position: relative">
        <div class="row gx-0 gy-12 align-items-center">
          <div
            class="col-md-10 offset-md-1 offset-lg-0 col-lg-6 content text-center text-lg-start"
          >
            <h1 class="display-7 mb-8 text-white">
              This platform provides a single point of service for all
              transactions with the Federal Government of Nigeria.
            </h1>
            <!-- <p class="lead fs-lg lh-sm mb-7 pe-xl-10">This platform provides a single point of service for all transactions with the Federal Government of Nigeria.</p> -->
            <form @submit.prevent="payforService(this.organizationCode)">
              <div class="row gx-4 mb-15">
                <div class="col-md-11">
                  <div class="form-select-wrapper mb-4">
                    <!-- <select class="form-select" id="single-select-field" v-model="organizationCode" data-placeholder="Select an agency">
                        <option v-for="item in allorg" :value="item.organisationCode">
                          {{ item.organisationName }}
                        </option>
                      </select> -->

                    <div class="selected-items" @click="isVisible = !isVisible">
                      <input
                        v-if="selectedItem"
                        type="text"
                        class="form-control"
                        v-model="selectedItem.organisationName"
                        readonly
                      />

                      <input
                        v-if="!selectedItem"
                        type="text"
                        class="form-control"
                        @keyup="onKeyUp"
                        v-model="searchQuery"
                        placeholder="Search here..."
                      />
                    </div>

                    <div
                      v-if="searchQuery && !selectedItem"
                      class="dropdown-popover"
                    >
                      <div class="options" :class="this.mainDiv">
                        <h5
                          class="text-center"
                          v-if="filteredService.length == 0"
                        >
                          No Data Available...
                        </h5>
                        <ul>
                          <li
                            @click="selectOrg(cust)"
                            v-for="cust in filteredService"
                            :value="cust.organisationName"
                            :key="cust.organisationName"
                          >
                            {{ cust.organisationName }} {{ cust.itemName }}
                            {{ cust.subOrganisationName }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="col-md-1">
                    <input type="submit" class="btn btn-primary rounded-pill btn-send mb-3" value="Go">
                  </div> -->
                <div class="col-md-12">
                  By continuing, means you agree to
                  <RouterLink
                    to="/terms"
                    style="color: #605dba !important"
                    class="hover"
                    >terms and policy</RouterLink
                  >.
                </div>
              </div>
            </form>
            <!-- <div class="d-flex justify-content-center justify-content-lg-start" data-cues="slideInDown" data-group="page-title-buttons" data-delay="900"><span><a href="#" class="btn btn-lg btn-white rounded-pill me-2">Explore Now</a></span><span><a href="#" class="btn btn-lg btn-outline-white rounded-pill">Contact Us</a></span></div> -->
          </div>
          <!--/column -->
          <div class="col-lg-5 offset-lg-1 as">
            <div
              class="swiper-container dots-over shadow-lg"
              data-margin="5"
              data-nav="true"
              data-dots="true"
            >
              <div class="swiper">
                <swiper
                  :modules="modules"
                  :allow-touch-move="true"
                  :slides-per-view="1"
                  :autoplay="{ delay: 2500, disableOnInteraction: false }"
                  :navigation="true"
                  :pagination="{ clickable: true }"
                  class="swiper"
                >
                  <swiper-slide class="swiper-slide"
                    ><img
                      src="/assets/img/photos/fgras-slide01.jpg"
                      class="rounded"
                      alt=""
                  /></swiper-slide>
                  <swiper-slide class="swiper-slide"
                    ><img
                      src="/assets/img/photos/fgras-slide02.jpg"
                      class="rounded"
                      alt=""
                  /></swiper-slide>
                  <swiper-slide class="swiper-slide"
                    ><img
                      src="/assets/img/photos/fgras-slide03.jpg"
                      class="rounded"
                      alt=""
                  /></swiper-slide>
                  <swiper-slide class="swiper-slide"
                    ><img
                      src="/assets/img/photos/fgras-slide04.jpg"
                      class="rounded"
                      alt=""
                  /></swiper-slide>
                </swiper>
                <!--/.swiper-wrapper -->
              </div>
              <!--/.swiper -->
            </div>
            <!-- /.swiper-container -->
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <section class="wrapper bg-soft-light">
      <div
        class="container py-14 py-md-16"
        style="z-index: 99; position: relative; overflow: hidden !important"
      >
        <div class="row">
          <div class="col-md-6 mb-5">
            <div class="card bg-primary text-white shadow-md">
              <div class="card-body">
                <div class="mx-auto text-center">
                  <h3 class="display-7 text-white mb-6">
                    Select your preferred service from all Government Agencies.
                  </h3>
                </div>

                <div class="col-lg-9 mx-auto">
                  <form @submit.prevent="payforService(this.organizationCode)">
                    <div class="row">
                      <div class="col-md-12">
                        <div>
                          <select
                            class="form-select"
                            id="single-select-fieldd"
                            v-model="organizationCode"
                            data-placeholder="Select an agency"
                          >
                            <option
                              v-for="item in allorg"
                              :value="item.organisationCode"
                              :key="item.organisationCode"
                            >
                              {{ item.organisationName }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card shadow-md">
              <div class="card-body">
                <div class="mx-auto text-center">
                  <h3 class="display-7 mb-5">
                    Do you have an existing bill provided by a government
                    agency?
                  </h3>
                </div>

                <div class="col-lg-9 mx-auto">
                  <form @submit.prevent="billNumber">
                    <div class="form-floating input-group">
                      <input
                        type="text"
                        autocomplete="off"
                        class="form-control border-primary"
                        v-model="invoiceCode"
                        placeholder="Bill Number"
                        id="analyze"
                      />
                      <label for="analyze">Enter Bill Number</label>
                      <button
                        class="btn btn-primary border-primary"
                        type="submit"
                      >
                        Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- /.row -->
      </div>
      <!-- /.container -->
    </section>

    <section class="wrapper bg-light">
      <div class="container py-14 py-md-17">
        <div class="row text-center">
          <div class="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h3 class="display-4 mb-10 px-xl-10">Benefits of using FG-RAS.</h3>
          </div>
          <!-- /column -->
        </div>
        <!-- /.row -->
        <div class="position-relative mb-14 mb-md-17">
          <div
            class="shape rounded-circle bg-soft-primary rellax w-16 h-16"
            data-rellax-speed="1"
            style="bottom: -0.5rem; right: -2.5rem; z-index: 0"
          ></div>
          <div
            class="shape bg-dot primary rellax w-16 h-17"
            data-rellax-speed="1"
            style="top: -0.5rem; left: -2.5rem; z-index: 0"
          ></div>
          <div class="row gx-md-5 gy-5 text-center">
            <div class="col-md-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div
                    class="icon btn btn-circle btn-lg btn-primary pe-none mb-3"
                  >
                    <i class="uil uil-shield-exclamation"></i>
                  </div>
                  <h4>Secure Payments</h4>
                  <p class="mb-2">
                    Track every payment made to the Federal Government.
                  </p>
                  <a href="#" class="more hover link-primary">Learn More</a>
                </div>
                <!--/.card-body -->
              </div>
              <!--/.card -->
            </div>
            <!--/column -->
            <div class="col-md-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div
                    class="icon btn btn-circle btn-lg btn-primary pe-none mb-3"
                  >
                    <i class="uil uil-laptop-cloud"></i>
                  </div>
                  <h4>Comprehnsive Data</h4>
                  <p class="mb-2">
                    Get your financial standing with the government. No service
                    left behind.
                  </p>
                  <a href="#" class="more hover link-primary">Learn More</a>
                </div>
                <!--/.card-body -->
              </div>
              <!--/.card -->
            </div>
            <!--/column -->
            <div class="col-md-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div
                    class="icon btn btn-circle btn-lg btn-primary pe-none mb-3"
                  >
                    <i class="uil uil-chart-line"></i>
                  </div>
                  <h4>Every Payment Platform</h4>
                  <p class="mb-2">
                    Never run foul of the law. Pay fees, fines and others with
                    any payment option.
                  </p>
                  <a href="#" class="more hover link-primary">Learn More</a>
                </div>
                <!--/.card-body -->
              </div>
              <!--/.card -->
            </div>
            <!--/column -->
            <div class="col-md-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div
                    class="icon btn btn-circle btn-lg btn-primary pe-none mb-3"
                  >
                    <i class="uil uil-phone-volume"></i>
                  </div>
                  <h4>24/7 Support</h4>
                  <p class="mb-2">
                    Having an issue with a payment? Our support center is
                    available 24/7.
                  </p>
                  <a href="#" class="more hover link-primary">Learn More</a>
                </div>
                <!--/.card-body -->
              </div>
              <!--/.card -->
            </div>
            <!--/column -->
          </div>
          <!--/.row -->
        </div>
        <!-- /.position-relative -->
      </div>
      <!-- /.container -->
    </section>
  </div>

  <div class="progress-wrap">
    <svg
      class="progress-circle svg-content"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</template>

<style>
.bg-image {
  background-image: url("../../assets/img/photos/bg4.jpg");
}
</style>
