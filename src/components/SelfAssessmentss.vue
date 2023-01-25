<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      errors: [],
      message: [],
      items: [],
      org: "",
      sub: "",
      item: "",
      currencyCode: "",
      itemOrg: "",
      itemOrgCode: "",
      customField: "",
      allitem: [],
      allorg: [],
      allsuborg: [],
      organizationCode: "",
      subOrganizationCode: "",
      orgDetails: {
        organisationName: "",
      },
      subDetails: {
        subOrganisationName: "",
      },
      customFieldValues: [
        {
          fieldValue: "",
          id: 0,
        },
      ],
      customers: "",
      customerCode: "",
      refreshs: "",
      loaderDiv: "",
      mainDiv: "d-none",
    };
  },

  async mounted() {
    this.interval = setInterval(() => {
      this.tokenRefresh();
    }, 20 * 60 * 1000);
    this.customerCode = localStorage.getItem("accesstoken");
    this.refreshs = localStorage.getItem("refreshtoken");
    this.customers = localStorage.getItem("customercode");
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

    // const results = await axios.get(
    //   "https://assessmentapi.revassuredev.com/api/Organization/suborganization/" +
    //     this.$route.params.organizationCode,
    //   {
    //     headers: {
    //       clientid: "abc123",
    //       Authorization: "0*EI&LBEey28Y#p1e3qmVD",
    //     },
    //   },
    // );
    // this.allsuborg = results.data.result;
    this.loaderDiv = "d-none";
    this.mainDiv = "";

    // this.itemOrg = localStorage.getItem('itemOrg');
    // this.currencyCode = localStorage.getItem('currency');
    // this.customField = JSON.parse(localStorage.getItem('customField'));

    // const resp = await axios.get('https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/'+this.$route.params.organizationCode,{
    //     headers: {
    //         clientid : 'abc123',
    //         Authorization: '0*EI&LBEey28Y#p1e3qmVD'
    //     }
    // },);
    // this.allitem = resp.data.result;
    // this.loaderDiv = "d-none";
    // this.mainDiv = "";
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
    async onOrgChange(event) {
      const results = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Organization/suborganization/" +
          event.target.value,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
      );
      this.allsuborg = results.data.result;

      const resultss = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Organization/details/" +
          event.target.value,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
      );
      this.orgDetails = resultss.data.result;
    },

    async onSubChange(event) {
      const resp = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Item/" +
          this.organizationCode +
          "/" +
          event.target.value +
          "/items",
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
      );
      this.allitem = resp.data.result;
      console.log(this.allitem);

      const subbb = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Organization/SubOrganization/details/" +
          event.target.value,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
      );
      this.subDetails = subbb.data.result;
    },

    async onChange(event) {
      const resp = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Item/details/" +
          event.target.value,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
      );
      this.customFieldValues = resp.data.result.customFields;

      // localStorage.removeItem('itemOrgCode');

      // localStorage.setItem('item', event.target.value);

      // window.location.href = "/selfassessment/"+this.org+'/'+this.sub+'/'+this.itemOrgCode;
    },

    async handleCustomer() {
      this.errors = [];
      this.message = [];
      const toast = useToast();

      // this.itemList.push(this.customFieldValues);
      if (!this.organizationCode) {
        toast.error("Select a customer type");
      }

      if (!this.subOrganizationCode) {
        toast.error("First Name required.");
      }

      if (!this.itemOrgCode) {
        toast.error("Please select an item");
      } else {
        await axios
          .post(
            "https://assessmentapi.revassuredev.com/api/Invoice/addinvoice",
            {
              organizationCode: this.organizationCode,
              subOrganizationCode: this.subOrganizationCode,
              customerCode: this.customers,
              currencyCode: "NGN",
              itemOrgCode: this.itemOrgCode,

              customFieldValues: this.customFieldValues,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accesstoken"),
              },
            },
          )
          .then((response) => {
            this.$router.push("/view-bill/" + response.data.result);

            this.organizationCode = "";
            this.subOrganizationCode = "";
            this.itemOrgCode = "";
            this.currencyCode = "";
          })
          .catch((error) => {
            if (error.response.data.title) {
              // toast.error("An error occured");
            }
          });
      }
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
      <div class="container pt-17 pb-15 pt-md-19 pb-md-15 text-center">
        <div class="row">
          <div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
            <h1 class="display-6 mb-3 text-white">
              {{ this.orgDetails.organisationName }}
            </h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item">
                  <RouterLink to="/">Home</RouterLink>
                </li>
                <li
                  v-if="this.orgDetails.organisationName"
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  {{ this.orgDetails.organisationName }}
                </li>
                <li
                  v-if="this.subDetails.subOrganisationName"
                  class="breadcrumb-item active"
                  aria-current="page"
                >
                  {{ this.subDetails.subOrganisationName }}
                </li>
                <!-- <li v-if="this.allitem.itemName" class="breadcrumb-item active" aria-current="page">{{this.allitem.itemName}}</li> -->
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
          <h2>Pay for other services,</h2>
          <h4>Select an agency, a unit and a service and make payment.</h4>
        </div>
      </div>

      <form @submit.prevent="handleCustomer">
        <div class="row pt-5">
          <div class="col-md-4 mb-4 ps-2 pe-2">
            <div class="card border border-primary">
              <div class="card-body pe-5 ps-5">
                <h4>Agencies</h4>
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
                <div class="pt-2" :class="this.mainDiv">
                  <div v-for="item in allorg" :key="item.organisationCode">
                    <div class="pb-3 d-flex a">
                      <input
                        @change="onOrgChange($event)"
                        class="form-check-input me-1"
                        type="radio"
                        :id="item.organisationCode"
                        v-model="organizationCode"
                        name="organizationCode"
                        :value="item.organisationCode"
                        :checked="
                          item.organisationCode == this.organizationCode
                        "
                      />&nbsp;
                      <label
                        style="
                          font-size: 14px;
                          font-weight: 500;
                          padding: 3px 0 0 0;
                          margin: 0;
                          color: #333;
                        "
                        :for="item.organisationCode"
                        >{{ item.organisationName }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-4 mb-4 ps-2 pe-2"
            v-if="this.organizationCode != ''"
          >
            <div class="card border border-primary">
              <div class="card-body pe-5 ps-5">
                <h4>Units</h4>
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
                <div class="pt-2" :class="this.mainDiv">
                  <div
                    v-for="item in allsuborg"
                    :key="item.subOrganisationCode"
                  >
                    <div class="pb-3 d-flex a">
                      <input
                        @change="onSubChange($event)"
                        class="form-check-input me-1"
                        type="radio"
                        :id="item.subOrganisationCode"
                        v-model="subOrganizationCode"
                        name="subOrganizationCode"
                        :value="item.subOrganisationCode"
                        :checked="
                          item.subOrganisationCode == this.subOrganizationCode
                        "
                      />&nbsp;
                      <label
                        style="
                          font-size: 14px;
                          font-weight: 500;
                          padding: 3px 0 0 0;
                          margin: 0;
                          color: #333;
                        "
                        :for="item.subOrganisationCode"
                        >{{ item.subOrganisationName }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-md-4 mb-4 ps-2 pe-2"
            v-if="this.subOrganizationCode != ''"
          >
            <div class="card border border-primary">
              <div class="card-body pe-5 ps-5">
                <h4>Services</h4>
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
                  <div class="d-flex">
                    <div class="me-auto">
                      <div class="checks pt-2 a">
                        <div v-for="item in allitem" :key="item.itemCode">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="itemCode"
                            :id="item.itemCode"
                            v-model="itemOrgCode"
                            @change="onChange($event)"
                            :value="item.itemOrgCode"
                            :checked="item.itemOrgCode == this.itemOrgCode"
                          />&nbsp;
                          <label
                            class="mb-4"
                            style="
                              font-size: 14px;
                              font-weight: 500;
                              padding: 3px 0 0 0;
                              margin: 0;
                              color: #333;
                            "
                            :for="item.itemCode"
                            >{{ item.itemName }}</label
                          >
                        </div>
                      </div>
                    </div>

                    <div class="ml-auto">
                      <div class="checks pt-2">
                        <div v-for="item in allitem" :key="item.price">
                          <p
                            class="mb-4"
                            style="font-size: 16px; font-weight: 400"
                            :for="item.price"
                          >
                            &#8358;{{ item.price }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- <h4 style="font-size: 20px;font-weight: 400;">
                                <span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'NGN'">&#8358;</span><span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'USD'">&#36;</span><span style="font-size: 20px;font-weight: 400;" v-if="this.currencyCode == 'GBP'">&#163;</span>{{this.items.price}}
                            </h4> -->
                  </div>
                </div>
                <div class="row pt-2" v-if="this.itemOrgCode != ''">
                  <div class="col-md-12">
                    <div v-for="custom in customFieldValues" :key="custom.id">
                      <div>
                        <!-- <label class="control-label">Item OrgCode</label> -->
                        <input
                          class="form-control"
                          type="hidden"
                          v-model="custom.id"
                        />
                      </div>

                      <div class="mb-4" v-if="custom.fieldType == 'text'">
                        <label class="control-label">{{
                          custom.fieldKey
                        }}</label>
                        <input
                          class="form-control"
                          type="text"
                          v-model="custom.fieldValue"
                        />
                      </div>

                      <div class="mb-4" v-if="custom.fieldType == 'dropdown'">
                        <label class="control-label">{{
                          custom.fieldKey
                        }}</label>
                        <select
                          class="form-select"
                          id="form-select"
                          v-model="custom.fieldValue"
                        >
                          <option>
                            {{ custom.fieldOptions }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button v-if="this.itemOrgCode != ''" class="btn btn-primary mt-3">
              Continue
            </button>
          </div>
        </div>
      </form>
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
.cus {
  width: 100%;
  height: 100%;
}
.cus h4 {
  padding: 10px 0 0 0;
}
.cus p {
  min-height: 100px;
}

@media only screen and (max-width: 600px) {
  .asas {
    width: 100% !important;
  }

  input[type="radio"] {
    width: 15px;
    height: 15px;
  }

  .a label {
    font-size: 15px !important;
  }

  .checks p {
    font-size: 15px !important;
  }

  .ssw {
    padding: 40px 20px 40px 20px !important;
  }

  .add {
    font-size: 16px !important;
  }
}
</style>
