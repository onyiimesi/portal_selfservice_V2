<script>
import axios from "axios";
// import { useToast } from "vue-toastification";

export default {
  name: "self-assesments",

  data() {
    return {
      errors: [],
      message: [],

      items: [],

      org: "",
      sub: "",
      currencyCode: "",
      itemOrg: "",
      itemOrgCode: "",
      customField: "",
      allitem: [],
      allsuborg: [],
      subOrganizationCode: "",

      customerData: {
        mobileNumber: "",
        contactAddress: "",
        customerType: 0,
        customerTin: "",
        firstName: "",
        lastName: "",
        middleName: "",
        companyName: "",
        state: "",
        lga: "",
        emailAddress: "",
        mobileNumber2: "",
        nin: "",
        bvn: "",
      },

      customFieldValues: [
        {
          fieldValue: "",
          id: 0,
        },
      ],

      loaderDiv: "",
      mainDiv: "d-none",

      orgDetails: {
        organisationName: "",
      },

      searchQuery: "",
      selectedItem: "",
      isVisible: false,
    };
  },

  computed: {
    filteredUnit() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.allsuborg;
      }

      return this.allsuborg.filter((unit) => {
        return Object.values(unit).some((word) =>
          String(word).toLowerCase().includes(query),
        );
      });
    },
  },

  created() {
    this.org = localStorage.getItem("organisation");

    // this.sub = localStorage.getItem('subOrganization');
    // this.itemOrg = localStorage.getItem('itemOrg');
    // this.currencyCode = localStorage.getItem('currency');
    // this.customField = JSON.parse(localStorage.getItem('customField'));

    // if(!this.itemOrg){
    //     this.$router.push("/self-assesments/"+this.org);
    // }
  },

  async mounted() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, 100);

    const results = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Organization/suborganization/" +
        this.$route.params.organizationCode,
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );
    this.allsuborg = results.data.result;
    this.loaderDiv = "d-none";
    this.mainDiv = "";

    this.org = localStorage.getItem("organisation");
    this.sub = localStorage.getItem("subOrganization");

    const resultss = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Organization/details/" +
        this.org,
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );
    this.orgDetails = resultss.data.result;
  },

  methods: {
    removeItem() {
      localStorage.removeItem("organisation");
      localStorage.removeItem("subOrganization");
      localStorage.removeItem("itemOrgCode");
    },

    async onKeyUp() {
      const res = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Organization/details/" +
          this.org,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
        +this.searchQuery,
      );
      this.allsuborgs = res.data.result;
    },

    onSubChange(event, item) {
      localStorage.removeItem("subOrganization");

      this.selectedItem = item;
      this.isVisible = false;

      localStorage.setItem("subOrganization", event.target.value);

      this.$router.push(
        "/selfassessment/" + this.org + "/" + this.subOrganizationCode,
      );
    },
  },
};
</script>

<template>
  <div class="content-wrapper">
    <section
      class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white"
      data-image-src="./assets/img/photos/bg3.jpg"
    >
      <div class="container pt-17 pb-15 pt-md-16 pb-md-8 text-center">
        <div class="row">
          <div class="col-md-12 col-lg-12 col-xl-12 col-xxl-6 mx-auto">
            <h1 class="display-0 mb-3 text-white">
              {{ this.orgDetails.organisationName }}
            </h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item">
                  <RouterLink @click="removeItem" to="/">Home</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ this.orgDetails.organisationName }}
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
          <h2 class="add" style="font-size: 22px">
            Select service from,
            <strong
              ><span style="color: #605dba !important">{{
                this.orgDetails.organisationName
              }}</span></strong
            >
          </h2>
        </div>
      </div>

      <div class="row pt-5">
        <div class="col-md-12 mb-4">
          <div class="card border border-primary">
            <div class="card-body ssw">
              <h4>Units</h4>

              <div class="mb-4 asas" style="width: 40%">
                <form>
                  <div class="mb-3">
                    <input
                      type="text"
                      @keyup="onKeyUp"
                      v-model="searchQuery"
                      class="form-control pe-3 ps-3 pt-2 pb-2 me-2"
                      placeholder="Filter by name..."
                    />
                  </div>
                </form>
              </div>
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
                  </div>
                </div>
              </div>
              <div :class="this.mainDiv">
                <h5 v-if="filteredUnit.length == 0">No Data Available...</h5>
                <div
                  class="pt-2"
                  v-for="item in filteredUnit"
                  :key="item.subOrganisationCode"
                >
                  <div class="pb-3 a d-flex">
                    <input
                      @change="onSubChange($event, item)"
                      class="form-check-input p-1 border-primary"
                      type="radio"
                      :id="item.subOrganisationCode"
                      v-model="subOrganizationCode"
                      name="subOrganizationCode"
                      :value="item.subOrganisationCode"
                      :checked="item.subOrganisationCode == this.sub"
                    />&nbsp;
                    <label
                      style="
                        font-size: 20px;
                        font-weight: 500;
                        padding: 0;
                        margin: 0;
                        color: #333;
                      "
                      :for="item.subOrganisationCode"
                      class="ms-1"
                      >{{ item.subOrganisationName }}</label
                    >
                  </div>
                </div>
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

<style>
.a input:hover {
  cursor: pointer !important;
}
.a label:hover {
  cursor: pointer !important;
}
.form-check-input {
  border: 1px solid #000 !important;
}

@media only screen and (max-width: 600px) {
  .asas {
    width: 100% !important;
  }

  input[type="radio"] {
    width: 12px;
    height: 12px;
  }

  .a label {
    font-size: 16px !important;
  }

  .ssw {
    padding: 40px 20px 40px 20px !important;
  }

  .add {
    font-size: 16px !important;
  }
}
</style>
