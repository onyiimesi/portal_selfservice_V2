<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import useValidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

export default {
  data() {
    return {
      v$: useValidate(),
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
      phoneNumber: "",
      contactAddress: "",
      customerType: 0,
      customerTin: "",
      firstName: "",
      lastName: "",
      middleName: "",
      password: "",
      confirmPassword: "",
      stateCode: "",
      lgaCode: "",
      emailAddress: "",
      phoneNumber2: "",
      nin: "",
      bvn: "",
      customFieldValues: [
        {
          fieldValue: "",
          fieldID: 0,
        },
      ],
      loaderDiv: "",
      mainDiv: "d-none",
      loaderDivs: "",
      mainDivs: "d-none",
      isHidden: false,
      isHiddens: false,
      orgDetails: {
        organisationName: "",
      },
      subDetails: {
        subOrganisationName: "",
      },
      businessDetails: {
        companyAddress: "",
        companyPhoneNumber: "",
        companyEmailAddress: "",
        companyRCNumber: "",
        companyName: "",
      },
      adminDetails: {
        firstName: "",
        lastName: "",
        middleName: "",
        phoneNumber: "",
        phoneNumber2: "",
        emailAddress: "",
        bvn: "",
        nin: "",
        contactAddress: "",
        lgaCode: "",
        stateCode: "",
        customerTin: "",
        password: "",
        organizationCode: "",
        subOrganizationCode: "",
        currencyCode: "",
        itemOrgCode: "",
        myProperty: 0,

        customFieldValues: [
          {
            fieldValue: "",
            fieldID: 0,
          },
        ],
      },
      searchQuery: "",
      selectedItem: "",
      isVisible: false,
      confirmpassword: "",
      loading: false,
      allstate: [
        {
          stateCode: "01",
          state: "Abia State",
        },
        {
          stateCode: "02",
          state: "Abuja Federal Capital Territory",
        },
        {
          stateCode: "03",
          state: "Adamawa State",
        },
        {
          stateCode: "04",
          state: "Akwa Ibom State",
        },
        {
          stateCode: "05",
          state: "Anambra State",
        },
        {
          stateCode: "06",
          state: "Bauchi State",
        },
        {
          stateCode: "07",
          state: "Bayelsa State",
        },
        {
          stateCode: "08",
          state: "Benue State",
        },
        {
          stateCode: "09",
          state: "Borno State",
        },
        {
          stateCode: "10",
          state: "Cross River State",
        },
        {
          stateCode: "11",
          state: "Delta State",
        },
        {
          stateCode: "12",
          state: "Ebonyi State",
        },
        {
          stateCode: "13",
          state: "Edo State",
        },
        {
          stateCode: "14",
          state: "Ekiti State",
        },
        {
          stateCode: "15",
          state: "Enugu State",
        },
        {
          stateCode: "16",
          state: "Gombe State",
        },
        {
          stateCode: "17",
          state: "Imo State",
        },
        {
          stateCode: "18",
          state: "Jigawa State",
        },
        {
          stateCode: "19",
          state: "Kaduna State",
        },
        {
          stateCode: "20",
          state: "Kano State",
        },
        {
          stateCode: "21",
          state: "Katsina State",
        },
        {
          stateCode: "22",
          state: "Kebbi State",
        },
        {
          stateCode: "23",
          state: "Kogi State",
        },
        {
          stateCode: "24",
          state: "Kwara State",
        },
        {
          stateCode: "25",
          state: "Lagos State",
        },
        {
          stateCode: "26",
          state: "Nasarawa State",
        },
        {
          stateCode: "27",
          state: "Niger State",
        },
        {
          stateCode: "28",
          state: "Ogun State",
        },
        {
          stateCode: "29",
          state: "Ondo State",
        },
        {
          stateCode: "30",
          state: "Osun State",
        },
        {
          stateCode: "31",
          state: "Oyo State",
        },
        {
          stateCode: "32",
          state: "Plateau State",
        },
        {
          stateCode: "33",
          state: "Rivers State",
        },
        {
          stateCode: "34",
          state: "Sokoto State",
        },
        {
          stateCode: "35",
          state: "Taraba State",
        },
        {
          stateCode: "36",
          state: "Yobe State",
        },
        {
          stateCode: "37",
          state: "Zamfara State",
        },
      ],

      alllga: [
        {
          stateCode: "01",
          lgaCode: "001",
          lga: "Aba North",
        },
        {
          stateCode: "01",
          lgaCode: "002",
          lga: "Aba South",
        },
        {
          stateCode: "09",
          lgaCode: "003",
          lga: "Abadam",
        },
        {
          stateCode: "02",
          lgaCode: "004",
          lga: "Abaji",
        },
        {
          stateCode: "04",
          lgaCode: "005",
          lga: "Abak",
        },
        {
          stateCode: "12",
          lgaCode: "006",
          lga: "Abakaliki",
        },
        {
          stateCode: "28",
          lgaCode: "007",
          lga: "Abeokuta North",
        },
        {
          stateCode: "28",
          lgaCode: "008",
          lga: "Abeokuta South",
        },
        {
          stateCode: "10",
          lgaCode: "009",
          lga: "Abi",
        },
        {
          stateCode: "17",
          lgaCode: "101",
          lga: "Aboh Mbaise",
        },
        {
          stateCode: "33",
          lgaCode: "011",
          lga: "Abua/Odual",
        },
        {
          stateCode: "23",
          lgaCode: "012",
          lga: "Adavi",
        },
        {
          stateCode: "08",
          lgaCode: "013",
          lga: "Ado",
        },
        {
          stateCode: "14",
          lgaCode: "014",
          lga: "Ado Ekiti",
        },
        {
          stateCode: "28",
          lgaCode: "015",
          lga: "Ado-Odo/Ota",
        },
        {
          stateCode: "31",
          lgaCode: "016",
          lga: "Afijio",
        },
        {
          stateCode: "12",
          lgaCode: "017",
          lga: "Afikpo North",
        },
        {
          stateCode: "12",
          lgaCode: "018",
          lga: "Afikpo South",
        },
        {
          stateCode: "27",
          lgaCode: "019",
          lga: "Agaie",
        },
        {
          stateCode: "08",
          lgaCode: "020",
          lga: "Agatu",
        },
        {
          stateCode: "25",
          lgaCode: "021",
          lga: "Agege",
        },
        {
          stateCode: "05",
          lgaCode: "022",
          lga: "Aguata",
        },
        {
          stateCode: "27",
          lgaCode: "023",
          lga: "Agwara",
        },
        {
          stateCode: "17",
          lgaCode: "024",
          lga: "Ahiazu Mbaise",
        },
        {
          stateCode: "33",
          lgaCode: "025",
          lga: "Ahoada East",
        },
        {
          stateCode: "33",
          lgaCode: "026",
          lga: "Ahoada West",
        },
        {
          stateCode: "30",
          lgaCode: "027",
          lga: "Aiyedaade",
        },
        {
          stateCode: "30",
          lgaCode: "028",
          lga: "Aiyedire",
        },
        {
          stateCode: "23",
          lgaCode: "029",
          lga: "Ajaokuta",
        },
        {
          stateCode: "25",
          lgaCode: "030",
          lga: "Ajeromi-Ifelodun",
        },
        {
          stateCode: "20",
          lgaCode: "031",
          lga: "Ajingi",
        },
        {
          stateCode: "10",
          lgaCode: "032",
          lga: "Akamkpa",
        },
        {
          stateCode: "31",
          lgaCode: "033",
          lga: "Akinyele",
        },
        {
          stateCode: "16",
          lgaCode: "034",
          lga: "Akko",
        },
        {
          stateCode: "29",
          lgaCode: "035",
          lga: "Akoko North-East",
        },
        {
          stateCode: "29",
          lgaCode: "036",
          lga: "Akoko North-West",
        },
        {
          stateCode: "29",
          lgaCode: "037",
          lga: "Akoko South-East",
        },
        {
          stateCode: "29",
          lgaCode: "038",
          lga: "Akoko South-West",
        },
        {
          stateCode: "13",
          lgaCode: "039",
          lga: "Akoko-Edo",
        },
        {
          stateCode: "10",
          lgaCode: "040",
          lga: "Akpabuyo",
        },
        {
          stateCode: "33",
          lgaCode: "041",
          lga: "Akuku-Toru",
        },
        {
          stateCode: "29",
          lgaCode: "042",
          lga: "Akure North",
        },
        {
          stateCode: "29",
          lgaCode: "043",
          lga: "Akure South",
        },
        {
          stateCode: "26",
          lgaCode: "044",
          lga: "Akwanga",
        },
        {
          stateCode: "20",
          lgaCode: "045",
          lga: "Albasu",
        },
        {
          stateCode: "22",
          lgaCode: "046",
          lga: "Aleiro",
        },
        {
          stateCode: "25",
          lgaCode: "047",
          lga: "Alimosho",
        },
        {
          stateCode: "06",
          lgaCode: "048",
          lga: "Alkaleri",
        },
        {
          stateCode: "25",
          lgaCode: "049",
          lga: "Amuwo-Odofin",
        },
        {
          stateCode: "05",
          lgaCode: "050",
          lga: "Anambra East",
        },
        {
          stateCode: "05",
          lgaCode: "051",
          lga: "Anambra West",
        },
        {
          stateCode: "05",
          lgaCode: "052",
          lga: "Anaocha",
        },
        {
          stateCode: "33",
          lgaCode: "053",
          lga: "Andoni",
        },
        {
          stateCode: "15",
          lgaCode: "054",
          lga: "Aninri",
        },
        {
          stateCode: "11",
          lgaCode: "055",
          lga: "Aniocha North",
        },
        {
          stateCode: "11",
          lgaCode: "056",
          lga: "Aniocha South",
        },
        {
          stateCode: "37",
          lgaCode: "057",
          lga: "Anka",
        },
        {
          stateCode: "23",
          lgaCode: "058",
          lga: "Ankpa",
        },
        {
          stateCode: "08",
          lgaCode: "059",
          lga: "Apa",
        },
        {
          stateCode: "25",
          lgaCode: "060",
          lga: "Apapa",
        },
        {
          stateCode: "35",
          lgaCode: "061",
          lga: "Ardo Kola",
        },
        {
          stateCode: "22",
          lgaCode: "062",
          lga: "Arewa Dandi",
        },
        {
          stateCode: "22",
          lgaCode: "063",
          lga: "Argungu",
        },
        {
          stateCode: "01",
          lgaCode: "064",
          lga: "Arochukwu",
        },
        {
          stateCode: "24",
          lgaCode: "065",
          lga: "Asa",
        },
        {
          stateCode: "33",
          lgaCode: "066",
          lga: "Asari-Toru",
        },
        {
          stateCode: "09",
          lgaCode: "067",
          lga: "Askira/Uba",
        },
        {
          stateCode: "30",
          lgaCode: "068",
          lga: "Atakunmosa East",
        },
        {
          stateCode: "30",
          lgaCode: "069",
          lga: "Atakunmosa West",
        },
        {
          stateCode: "31",
          lgaCode: "070",
          lga: "Atiba",
        },
        {
          stateCode: "31",
          lgaCode: "071",
          lga: "Atisbo",
        },
        {
          stateCode: "22",
          lgaCode: "072",
          lga: "Augie",
        },
        {
          stateCode: "18",
          lgaCode: "073",
          lga: "Auyo",
        },
        {
          stateCode: "26",
          lgaCode: "074",
          lga: "Awe",
        },
        {
          stateCode: "05",
          lgaCode: "076",
          lga: "Awka North",
        },
        {
          stateCode: "05",
          lgaCode: "077",
          lga: "Awka South",
        },
        {
          stateCode: "05",
          lgaCode: "078",
          lga: "Ayamelum",
        },
        {
          stateCode: "18",
          lgaCode: "079",
          lga: "Babura",
        },
        {
          stateCode: "25",
          lgaCode: "080",
          lga: "Badagry",
        },
        {
          stateCode: "36",
          lgaCode: "081",
          lga: "Bade",
        },
        {
          stateCode: "22",
          lgaCode: "082",
          lga: "Bagudo",
        },
        {
          stateCode: "20",
          lgaCode: "083",
          lga: "Bagwai",
        },
        {
          stateCode: "10",
          lgaCode: "084",
          lga: "Bakassi",
        },
        {
          stateCode: "21",
          lgaCode: "085",
          lga: "Bakori",
        },
        {
          stateCode: "37",
          lgaCode: "086",
          lga: "Bakura",
        },
        {
          stateCode: "16",
          lgaCode: "087",
          lga: "Balanga",
        },
        {
          stateCode: "35",
          lgaCode: "088",
          lga: "Bali",
        },
        {
          stateCode: "09",
          lgaCode: "089",
          lga: "Bama",
        },
        {
          stateCode: "32",
          lgaCode: "090",
          lga: "Barkin Ladi",
        },
        {
          stateCode: "24",
          lgaCode: "091",
          lga: "Baruten",
        },
        {
          stateCode: "23",
          lgaCode: "092",
          lga: "Bassa",
        },
        {
          stateCode: "32",
          lgaCode: "093",
          lga: "Bassa",
        },
        {
          stateCode: "21",
          lgaCode: "094",
          lga: "Batagarawa",
        },
        {
          stateCode: "21",
          lgaCode: "095",
          lga: "Batsari",
        },
        {
          stateCode: "06",
          lgaCode: "096",
          lga: "Bauchi",
        },
        {
          stateCode: "21",
          lgaCode: "097",
          lga: "Baure",
        },
        {
          stateCode: "09",
          lgaCode: "098",
          lga: "Bayo",
        },
        {
          stateCode: "20",
          lgaCode: "099",
          lga: "Bebeji",
        },
        {
          stateCode: "10",
          lgaCode: "100",
          lga: "Bekwarra",
        },
        {
          stateCode: "01",
          lgaCode: "101",
          lga: "Bende",
        },
        {
          stateCode: "10",
          lgaCode: "102",
          lga: "Biase",
        },
        {
          stateCode: "20",
          lgaCode: "103",
          lga: "Bichi",
        },
        {
          stateCode: "27",
          lgaCode: "104",
          lga: "Bida",
        },
        {
          stateCode: "16",
          lgaCode: "105",
          lga: "Billiri",
        },
        {
          stateCode: "21",
          lgaCode: "106",
          lga: "Bindawa",
        },
        {
          stateCode: "34",
          lgaCode: "107",
          lga: "Binji",
        },
        {
          stateCode: "18",
          lgaCode: "108",
          lga: "Biriniwa",
        },
        {
          stateCode: "19",
          lgaCode: "109",
          lga: "Birnin Gwari",
        },
        {
          stateCode: "22",
          lgaCode: "110",
          lga: "Birnin Kebbi",
        },
        {
          stateCode: "18",
          lgaCode: "111",
          lga: "Birnin Kudu",
        },
        {
          stateCode: "37",
          lgaCode: "112",
          lga: "Birnin Magaji/Kiyaw",
        },
        {
          stateCode: "09",
          lgaCode: "113",
          lga: "Biu",
        },
        {
          stateCode: "34",
          lgaCode: "114",
          lga: "Bodinga",
        },
        {
          stateCode: "06",
          lgaCode: "115",
          lga: "Bogoro",
        },
        {
          stateCode: "10",
          lgaCode: "116",
          lga: "Boki",
        },
        {
          stateCode: "32",
          lgaCode: "117",
          lga: "Bokkos",
        },
        {
          stateCode: "30",
          lgaCode: "118",
          lga: "Boluwaduro",
        },
        {
          stateCode: "11",
          lgaCode: "119",
          lga: "Bomadi",
        },
        {
          stateCode: "33",
          lgaCode: "120",
          lga: "Bonny",
        },
        {
          stateCode: "27",
          lgaCode: "121",
          lga: "Borgu",
        },
        {
          stateCode: "30",
          lgaCode: "122",
          lga: "Boripe",
        },
        {
          stateCode: "27",
          lgaCode: "123",
          lga: "Bosso",
        },
        {
          stateCode: "07",
          lgaCode: "124",
          lga: "Brass",
        },
        {
          stateCode: "18",
          lgaCode: "125",
          lga: "Buji",
        },
        {
          stateCode: "37",
          lgaCode: "126",
          lga: "Bukkuyum",
        },
        {
          stateCode: "37",
          lgaCode: "127",
          lga: "Bungudu",
        },
        {
          stateCode: "20",
          lgaCode: "128",
          lga: "Bunkure",
        },
        {
          stateCode: "22",
          lgaCode: "129",
          lga: "Bunza",
        },
        {
          stateCode: "36",
          lgaCode: "130",
          lga: "Bursari",
        },
        {
          stateCode: "08",
          lgaCode: "131",
          lga: "Buruku",
        },
        {
          stateCode: "11",
          lgaCode: "132",
          lga: "Burutu",
        },
        {
          stateCode: "02",
          lgaCode: "133",
          lga: "Bwari",
        },
        {
          stateCode: "10",
          lgaCode: "134",
          lga: "Calabar Municipal",
        },
        {
          stateCode: "10",
          lgaCode: "135",
          lga: "Calabar South",
        },
        {
          stateCode: "37",
          lgaCode: "136",
          lga: "Chafe",
        },
      ],

      selectedState: [],
    };
  },

  validations() {
    return {
      password: {
        required,
      },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) },
    };
  },

  created() {
    this.org = localStorage.getItem("organisation");
    this.sub = localStorage.getItem("subOrganization");
    this.itemOrgCode = localStorage.getItem("itemOrgCode");

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

    // const result = await axios.get('https://assessmentapi.revassuredev.com/api/Item/details/'+this.itemOrg, {
    //     headers: {
    //         clientid : 'abc123',
    //         Authorization: '0*EI&LBEey28Y#p1e3qmVD'
    //     }
    // },);
    // this.items = result.data.result.itemDetails;

    this.org = localStorage.getItem("organisation");
    this.sub = localStorage.getItem("subOrganization");
    this.itemOrgCode = localStorage.getItem("itemOrgCode");

    // this.itemOrg = localStorage.getItem('itemOrg');
    // this.currencyCode = localStorage.getItem('currency');
    // this.customField = JSON.parse(localStorage.getItem('customField'));

    const resp = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Item/" +
        this.$route.params.organizationCode +
        "/" +
        this.$route.params.subOrganizationCode +
        "/items",
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );
    this.allitem = resp.data.result;
    this.loaderDivs = "d-none";
    this.mainDivs = "";

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

    const subbb = await axios.get(
      "https://assessmentapi.revassuredev.com/api/Organization/SubOrganization/details/" +
        this.sub,
      {
        headers: {
          clientid: "abc123",
          Authorization: "0*EI&LBEey28Y#p1e3qmVD",
        },
      },
    );
    this.subDetails = subbb.data.result;
  },

  computed: {
    filteredState() {
      let tempState = this.alllga;
      return tempState.filter((item) => {
        return item.stateCode;
      });
    },

    filteredItem() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.allitem;
      }

      return this.allitem.filter((item) => {
        return Object.values(item).some((word) =>
          String(word).toLowerCase().includes(query),
        );
      });
    },
  },

  methods: {
    async onKeyUp() {
      const res = await axios.get(
        "https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/" +
          this.$route.params.organizationCode,
        {
          headers: {
            clientid: "abc123",
            Authorization: "0*EI&LBEey28Y#p1e3qmVD",
          },
        },
        +this.searchQuery,
      );
      this.allitem = res.data.result;
    },

    onState(event) {
      this.selectedState = event.target.value;

      let matchingDataSet = this.alllga.filter(
        (ele) => ele.stateCode == this.selectedState,
      );

      if (matchingDataSet !== undefined) {
        this.selectedState = matchingDataSet;

        console.log(this.selectedState);
      }
    },

    handleLoader() {
      this.loading = false;

      if (
        this.firstName &&
        this.lastName &&
        this.phoneNumber &&
        this.emailAddress &&
        this.bvn &&
        this.nin &&
        this.contactAddress &&
        this.lgaCode &&
        this.stateCode &&
        this.password
      ) {
        setTimeout(() => {
          this.loading = true;
        }, 100);
      } else if (
        !this.firstName &&
        !this.lastName &&
        !this.phoneNumber &&
        !this.emailAddress &&
        !this.bvn &&
        !this.nin &&
        !this.contactAddress &&
        !this.lgaCode &&
        !this.stateCode &&
        !this.password
      ) {
        this.loading = false;
      }
    },

    removeItem() {
      localStorage.removeItem("organisation");
      localStorage.removeItem("subOrganization");
      localStorage.removeItem("itemOrgCode");
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
      // console.log(this.item)
    },

    async handleCustomer() {
      this.errors = [];
      this.message = [];
      const toast = useToast();

      if (this.isHidden) {
        this.v$.$validate();
        // this.itemList.push(this.customFieldValues);

        if (!this.firstName) {
          toast.error("First Name required.");
        }

        if (!this.lastName) {
          toast.error("Last Name required.");
        }

        if (!this.phoneNumber) {
          toast.error("Phone Number required.");
        }

        if (!this.emailAddress) {
          toast.error("Email Address required.");
        }

        if (!this.contactAddress) {
          toast.error("Address required.");
        }

        if (!this.itemOrgCode) {
          toast.error("Please select an item");
        } else if (!this.v$.$error) {
          await axios
            .post(
              "https://assessmentapi.revassuredev.com/api/user/createindividualcustomer",
              {
                organizationCode: this.org,
                subOrganizationCode: this.sub,

                firstName: this.firstName,
                lastName: this.lastName,
                middleName: this.middleName,
                phoneNumber: this.phoneNumber,
                phoneNumber2: this.phoneNumber2,
                emailAddress: this.emailAddress,
                bvn: this.bvn,
                nin: this.nin,
                contactAddress: this.contactAddress,
                lgaCode: this.lgaCode,
                stateCode: this.stateCode,
                customerTin: this.customerTin,
                password: this.password,

                currencyCode: "NGN",
                itemOrgCode: this.itemOrgCode,

                customFieldValues: this.customFieldValues,
              },
              {
                headers: {
                  clientid: "abc123",
                  Authorization: "0*EI&LBEey28Y#p1e3qmVD",
                },
              },
            )
            .then((response) => {
              this.$router.push("/view-bill/" + response.data.result);

              this.itemOrgCode = "";
              this.currencyCode = "";

              this.phoneNumber = "";
              this.contactAddress = "";
              this.customerTin = "";
              this.firstName = "";
              this.lastName = "";
              this.middleName = "";
              this.password = "";
              this.confirmPassword = "";
              this.stateCode = "";
              this.lgaCode = "";
              this.emailAddress = "";
              this.phoneNumber2 = "";
              this.nin = "";
              this.bvn = "";

              this.org = localStorage.removeItem("organisation");
              this.sub = localStorage.removeItem("subOrganization");
            })
            .catch((error) => {
              this.err = error.response.status;
              this.erro = error.response.data.errors;
              this.loading = false;

              if (this.erro.Bvn) {
                if (this.erro.Bvn[0]) {
                  toast.error(this.erro.Bvn[0]);
                }
                if (this.erro.Bvn[1]) {
                  toast.error(this.erro.Bvn[1]);
                }
                if (this.erro.Bvn[2]) {
                  toast.error(this.erro.Bvn[2]);
                }
              }

              if (this.erro.Nin) {
                if (this.erro.Nin[0]) {
                  toast.error(this.erro.Nin[0]);
                }

                if (this.erro.Nin[1]) {
                  toast.error(this.erro.Nin[1]);
                }

                if (this.erro.Nin[2]) {
                  toast.error(this.erro.Nin[2]);
                }
              }

              if (this.erro.ContactAddress) {
                toast.error(this.erro.ContactAddress[0]);
              }

              if (this.erro.EmailAddress) {
                if (this.erro.EmailAddress[0]) {
                  toast.error(this.erro.EmailAddress[0]);
                }
                if (this.erro.EmailAddress[1]) {
                  toast.error(this.erro.EmailAddress[1]);
                }
              }

              if (this.erro.FirstName) {
                if (this.erro.FirstName[0]) {
                  toast.error(this.erro.FirstName[0]);
                }
                if (this.erro.FirstName[1]) {
                  toast.error(this.erro.FirstName[1]);
                }
              }

              if (this.erro.LastName) {
                if (this.erro.LastName[0]) {
                  toast.error(this.erro.LastName[0]);
                }
                if (this.erro.LastName[1]) {
                  toast.error(this.erro.LastName[1]);
                }
              }

              if (this.erro.LgaCode) {
                if (this.erro.LgaCode[0]) {
                  toast.error(this.erro.LgaCode[0]);
                }
                if (this.erro.LgaCode[1]) {
                  toast.error(this.erro.LgaCode[1]);
                }
              }

              if (this.erro.PhoneNumber) {
                if (this.erro.PhoneNumber[0]) {
                  toast.error(this.erro.PhoneNumber[0]);
                }
                if (this.erro.PhoneNumber[1]) {
                  toast.error(this.erro.PhoneNumber[1]);
                }
              }

              if (this.erro.StateCode) {
                if (this.erro.StateCode[0]) {
                  toast.error(this.erro.StateCode[0]);
                }
                if (this.erro.StateCode[1]) {
                  toast.error(this.erro.StateCode[1]);
                }
              }

              if (this.err == 401) {
                toast.error("Email address already exist.");
                this.loading = false;
                this.$router.push("/signin");
              }
            });
        } else {
          toast.error("Password & Confirm Password Don't Match.");
        }
      } else if (this.isHiddens) {
        if (!this.businessDetails.companyName) {
          toast.error("Company name required.");
        }

        if (!this.businessDetails.companyEmailAddress) {
          toast.error("Company email address required.");
        }

        if (!this.businessDetails.companyPhoneNumber) {
          toast.error("Company phone number required.");
        }

        if (!this.businessDetails.companyRCNumber) {
          toast.error("Company RCnumber required.");
        }

        if (this.adminDetails.password != this.confirmpassword) {
          toast.error("Password & Confirm Password don't match.");
        }

        if (!this.businessDetails.companyAddress) {
          toast.error("Company address required.");
        } else {
          await axios
            .post(
              "https://assessmentapi.revassuredev.com/api/user/createindividualcustomer",
              {
                businessDetails: this.businessDetails,

                organizationCode: this.org,
                subOrganizationCode: this.sub,

                firstName: this.adminDetails.firstName,
                lastName: this.adminDetails.lastName,
                middleName: this.adminDetails.middleName,
                phoneNumber: this.adminDetails.phoneNumber,
                phoneNumber2: this.adminDetails.phoneNumber2,
                emailAddress: this.adminDetails.emailAddress,
                bvn: this.adminDetails.bvn,
                nin: this.adminDetails.nin,
                contactAddress: this.adminDetails.contactAddress,
                lgaCode: this.adminDetails.lgaCode,
                stateCode: this.adminDetails.stateCode,
                customerTin: this.adminDetails.customerTin,
                password: this.adminDetails.password,

                currencyCode: "NGN",
                itemOrgCode: this.itemOrgCode,

                customFieldValues: this.customFieldValues,
              },
              {
                headers: {
                  clientid: "abc123",
                  Authorization: "0*EI&LBEey28Y#p1e3qmVD",
                },
              },
            )
            .then((response) => {
              this.$router.push("/view-bill/" + response.data.result);

              this.adminDetails.itemOrgCode = "";
              this.currencyCode = "";

              this.adminDetails.phoneNumber = "";
              this.adminDetails.contactAddress = "";
              this.adminDetails.customerTin = "";
              this.adminDetails.firstName = "";
              this.adminDetails.lastName = "";
              this.adminDetails.middleName = "";
              this.adminDetails.password = "";
              this.adminDetails.confirmPassword = "";
              this.adminDetails.stateCode = "";
              this.adminDetails.lgaCode = "";
              this.adminDetails.emailAddress = "";
              this.adminDetails.phoneNumber2 = "";
              this.adminDetails.nin = "";
              this.adminDetails.bvn = "";

              this.org = localStorage.removeItem("organisation");
              this.sub = localStorage.removeItem("subOrganization");
            })
            .catch((error) => {
              this.err = error.response.status;
              this.erro = error.response.data.errors;

              if (this.erro.Bvn) {
                if (this.erro.Bvn[0]) {
                  toast.error(this.erro.Bvn[0]);
                }
                if (this.erro.Bvn[1]) {
                  toast.error(this.erro.Bvn[1]);
                }
                if (this.erro.Bvn[2]) {
                  toast.error(this.erro.Bvn[2]);
                }
              }

              if (this.erro.Nin) {
                if (this.erro.Nin[0]) {
                  toast.error(this.erro.Nin[0]);
                }

                if (this.erro.Nin[1]) {
                  toast.error(this.erro.Nin[1]);
                }

                if (this.erro.Nin[2]) {
                  toast.error(this.erro.Nin[2]);
                }
              }

              if (this.erro.ContactAddress) {
                toast.error(this.erro.ContactAddress[0]);
              }

              if (this.erro.EmailAddress) {
                if (this.erro.EmailAddress[0]) {
                  toast.error(this.erro.EmailAddress[0]);
                }
                if (this.erro.EmailAddress[1]) {
                  toast.error(this.erro.EmailAddress[1]);
                }
              }

              if (this.erro.FirstName) {
                if (this.erro.FirstName[0]) {
                  toast.error(this.erro.FirstName[0]);
                }
                if (this.erro.FirstName[1]) {
                  toast.error(this.erro.FirstName[1]);
                }
              }

              if (this.erro.LastName) {
                if (this.erro.LastName[0]) {
                  toast.error(this.erro.LastName[0]);
                }
                if (this.erro.LastName[1]) {
                  toast.error(this.erro.LastName[1]);
                }
              }

              if (this.erro.LgaCode) {
                if (this.erro.LgaCode[0]) {
                  toast.error(this.erro.LgaCode[0]);
                }
                if (this.erro.LgaCode[1]) {
                  toast.error(this.erro.LgaCode[1]);
                }
              }

              if (this.erro.PhoneNumber) {
                if (this.erro.PhoneNumber[0]) {
                  toast.error(this.erro.PhoneNumber[0]);
                }
                if (this.erro.PhoneNumber[1]) {
                  toast.error(this.erro.PhoneNumber[1]);
                }
              }

              if (this.erro.StateCode) {
                if (this.erro.StateCode[0]) {
                  toast.error(this.erro.StateCode[0]);
                }
                if (this.erro.StateCode[1]) {
                  toast.error(this.erro.StateCode[1]);
                }
              }

              if (this.err == 401) {
                toast.error("Email address already exist.");
                this.$router.push("/signin");
              }
            });
        }
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
                  <RouterLink :to="'/selfassessment/' + this.org">{{
                    this.orgDetails.organisationName
                  }}</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ this.subDetails.subOrganisationName }}
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
            <strong style="color: #605dba !important"
              ><RouterLink :to="'/selfassessment/' + this.org">{{
                this.orgDetails.organisationName
              }}</RouterLink></strong
            >
          </h2>
        </div>
      </div>

      <form @submit.prevent="handleCustomer">
        <div class="row pt-5">
          <!-- <div class="col-md-3 mb-4 ps-2 pe-2">
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
                <div :class="this.mainDiv">
                    <div class="pt-2" v-for="item in allsuborg">
                        <div class="pb-3">
                            <input @change="onSubChange($event)" class="form-check-input" type="radio" :id="item.subOrganisationCode" v-model="subOrganizationCode" name="subOrganizationCode" :value="item.subOrganisationCode" :checked="item.subOrganisationCode == this.sub">&nbsp; <label style="font-size: 14px;font-weight: 500;padding: 0;margin: 0;color: #333;" :for="item.subOrganisationCode">{{ item.subOrganisationName }}</label>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div> -->
          <div class="col-md-6 mb-4 ps-2 pe-2">
            <div class="card border border-primary">
              <div class="card-body pe-5 ps-5">
                <h4>Services</h4>

                <div class="mb-4 asas" style="width: 100%">
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
                <div :class="this.loaderDivs">
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
                <div :class="this.mainDivs">
                  <div class="d-flex">
                    <div class="me-auto">
                      <div class="checks pt-2 a">
                        <h5 class="text-center" v-if="filteredItem.length == 0">
                          No Data Available...
                        </h5>
                        <div
                          v-for="item in filteredItem"
                          :key="item.itemOrgCode"
                        >
                          <input
                            class="form-check-input"
                            type="radio"
                            name="itemOrgCode"
                            :id="item.itemOrgCode"
                            v-model="itemOrgCode"
                            @change="onChange($event)"
                            :value="item.itemOrgCode"
                          />&nbsp;
                          <label
                            class="mb-4"
                            style="font-size: 18px; font-weight: 500"
                            :for="item.itemOrgCode"
                            >{{ item.itemName }}</label
                          >
                        </div>
                      </div>
                    </div>

                    <div class="ml-auto">
                      <div class="checks pt-2">
                        <div v-for="item in filteredItem" :key="item.price">
                          <p
                            class="mb-4"
                            style="font-size: 18px; font-weight: 400"
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
              </div>
            </div>
          </div>

          <div class="col-md-6 mb-4 ps-2 pe-2">
            <div class="row" v-if="!isHidden && !isHiddens">
              <div class="col-md-6 mb-4">
                <div
                  class="card border border-green text-center cus"
                  v-if="itemOrgCode"
                >
                  <div class="card-body">
                    <img
                      src="/icon.png"
                      class="img-fluid"
                      width="50"
                      height="50"
                      alt=""
                    />
                    <h4 class="">Individual</h4>
                    <p class="">
                      For Individuals who make regular payments and receive
                      money for their business
                    </p>

                    <button
                      type="button"
                      @click="isHidden = true"
                      class="btn btn-outline-success btn-sm"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <div
                  class="card border border-green text-center cus"
                  v-if="itemOrgCode"
                >
                  <div class="card-body">
                    <img
                      src="/company.png"
                      class="img-fluid"
                      width="50"
                      height="50"
                      alt=""
                    />
                    <h4 class="">Corporate</h4>
                    <p class="">
                      For Registered Companies with Multiple Directors
                    </p>
                    <button
                      type="button"
                      @click="isHiddens = true"
                      class="btn btn-outline-success btn-sm"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card border border-green" v-if="isHidden">
              <div class="card-body">
                <h4>Enter required information</h4>
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
                  <div class="messages"></div>
                  <div class="col-md-12">
                    <ul>
                      <li class="text-muted">
                        <strong class="text-danger">*</strong> These fields are
                        required.
                      </li>
                      <li class="text-muted">
                        BVN should be 11 character long.
                      </li>
                      <li class="text-muted">
                        NIN should be 11 character long.
                      </li>
                    </ul>
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
                  <div class="row gx-4 pt-2">
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >First Name <span class="text-danger">*</span></label
                        >
                        <input
                          id="form_name"
                          type="text"
                          v-model="firstName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label">Middle Name</label>
                        <input
                          id="form_name"
                          type="text"
                          v-model="middleName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Last Name <span class="text-danger">*</span></label
                        >
                        <input
                          id="form_name"
                          type="text"
                          v-model="lastName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Email <span class="text-danger">*</span></label
                        >
                        <input
                          id="form_email"
                          type="email"
                          v-model="emailAddress"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Mobile Number
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="phoneNumber"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label">Mobile Number 2</label>
                        <input
                          type="text"
                          v-model="phoneNumber2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >NIN <span class="text-danger">*</span></label
                        >
                        <input type="text" v-model="nin" class="form-control" />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >BVN <span class="text-danger">*</span></label
                        >
                        <input type="text" v-model="bvn" class="form-control" />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >TIN <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="customerTin"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-select-wrapper mb-4">
                        <label class="control-label"
                          >State <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-select"
                          id="form-select"
                          v-model="stateCode"
                          @change="onState($event)"
                        >
                          <option
                            v-for="org in allstate"
                            :value="org.stateCode"
                            :key="org.stateCode"
                          >
                            {{ org.state }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-select-wrapper mb-4">
                        <label class="control-label"
                          >LGA <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-select"
                          id="form-select"
                          v-model="lgaCode"
                        >
                          <option
                            v-for="sta in selectedState"
                            :value="sta.lgaCode"
                            :key="sta.lgaCode"
                          >
                            {{ sta.lga }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-12">
                      <div class="mb-4">
                        <label class="control-label"
                          >Address <span class="text-danger">*</span></label
                        >
                        <textarea
                          id="form_message"
                          v-model="contactAddress"
                          class="form-control"
                          style="height: 150px"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="control-label"
                          >Password <span class="text-danger">*</span></label
                        >
                        <input
                          type="password"
                          v-model="password"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="control-label"
                          >Confirm Password
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="password"
                          v-model="confirmPassword"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-12">
                      <button
                        type="submit"
                        @click="handleLoader()"
                        class="btn btn-primary rounded-pill btn-login mb-2"
                      >
                        <span
                          v-if="loading"
                          class="spinner-border spinner-border-sm"
                        ></span>
                        <span v-else>Submit</span>
                      </button>
                      <p class="text-muted">
                        <strong class="text-danger">*</strong> These fields are
                        required.
                      </p>
                    </div>
                    <!-- /column -->
                  </div>
                  <!-- /.row -->
                </div>
              </div>
            </div>

            <div class="card border border-green" v-if="isHiddens">
              <div class="card-body">
                <h4>Enter required information</h4>
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
                  <div class="messages"></div>
                  <div class="col-md-12">
                    <ul>
                      <li class="text-muted">
                        <strong class="text-danger">*</strong> These fields are
                        required.
                      </li>
                      <li class="text-muted">
                        BVN should be 11 character long.
                      </li>
                      <li class="text-muted">
                        NIN should be 11 character long.
                      </li>
                    </ul>
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
                  <div class="row pt-2">
                    <div class="col-md-12">
                      <div class="form-group mb-4">
                        <label class="control-label"
                          >Company Name
                          <span class="text-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="businessDetails.companyName"
                        />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group mb-4">
                        <label class="control-label"
                          >Company Email
                          <span class="text-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="businessDetails.companyEmailAddress"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label class="control-label"
                          >Company Phone Number
                          <span class="text-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="businessDetails.companyPhoneNumber"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group mb-4">
                        <label class="control-label"
                          >Company RC Number
                          <span class="text-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="text"
                          v-model="businessDetails.companyRCNumber"
                        />
                      </div>
                    </div>
                    <!-- 
                            <div class="col-md-6">
                                <div class="form-group mb-4">
                                    <label class="control-label">Company TIN <span class="text-danger">*</span></label>
                                    <input class="form-control" type="text" >
                                </div>
                            </div> -->

                    <div class="col-md-12">
                      <div class="form-group mb-4">
                        <label class="control-label"
                          >Company Address
                          <span class="text-danger">*</span></label
                        >
                        <textarea
                          class="form-control"
                          v-model="businessDetails.companyAddress"
                          id=""
                          cols="30"
                          rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="row gx-4 pt-2">
                    <div class="col-md-12 border-bottom mb-4">
                      <h3 style="font-size: 16px">Your personal details</h3>
                    </div>
                    <div class="col-md-12">
                      <!-- <div class="form-select-wrapper mb-4">
                                    <label class="control-label">Customer Type <span class="text-danger">*</span></label>
                                    <select class="form-select" id="form-select" v-model="customerData.customerType">
                                        <option value="10">Individual</option>
                                        <option value="11">Cooperate</option>
                                    </select>
                                </div> -->
                      <!-- <div v-if="customerData.customerType == 11">
                                    <div class="form-group mb-4">
                                        <label class="control-label">Company Name <span class="text-danger">*</span></label>
                                        <input class="form-control" v-model="customerData.companyName" type="text">
                                    </div>
                                </div> -->
                    </div>
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >First Name <span class="text-danger">*</span></label
                        >
                        <input
                          id="form_name"
                          type="text"
                          v-model="adminDetails.firstName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label">Middle Name</label>
                        <input
                          id="form_name"
                          type="text"
                          v-model="adminDetails.middleName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Last Name <span class="text-danger">*</span></label
                        >
                        <input
                          id="form_name"
                          type="text"
                          v-model="adminDetails.lastName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Email Address<span class="text-danger"
                            >*</span
                          ></label
                        >
                        <input
                          id="form_email"
                          type="email"
                          v-model="adminDetails.emailAddress"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >Mobile Number
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="adminDetails.phoneNumber"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label">Mobile Number 2</label>
                        <input
                          type="text"
                          v-model="adminDetails.phoneNumber2"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >NIN <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="adminDetails.nin"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >BVN <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="adminDetails.bvn"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <div class="mb-4">
                        <label class="control-label"
                          >TIN <span class="text-danger">*</span></label
                        >
                        <input
                          type="text"
                          v-model="adminDetails.customerTin"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-select-wrapper mb-4">
                        <label class="control-label"
                          >State <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-select"
                          id="form-select"
                          v-model="adminDetails.stateCode"
                        >
                          <option value="LAG">Lagos</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-select-wrapper mb-4">
                        <label class="control-label"
                          >LGA <span class="text-danger">*</span></label
                        >
                        <select
                          class="form-select"
                          id="form-select"
                          v-model="adminDetails.lgaCode"
                        >
                          <option value="FES">Festac</option>
                        </select>
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-12">
                      <div class="mb-4">
                        <label class="control-label"
                          >Address <span class="text-danger">*</span></label
                        >
                        <textarea
                          id="form_message"
                          v-model="adminDetails.contactAddress"
                          class="form-control"
                          style="height: 150px"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="control-label"
                          >Password <span class="text-danger">*</span></label
                        >
                        <input
                          type="password"
                          v-model="adminDetails.password"
                          class="form-control"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="mb-4">
                        <label class="control-label"
                          >Confirm Password
                          <span class="text-danger">*</span></label
                        >
                        <input
                          type="password"
                          v-model="confirmpassword"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <!-- /column -->
                    <div class="col-12">
                      <input
                        type="submit"
                        class="btn btn-primary rounded-pill btn-send mb-3"
                        value="Submit"
                      />
                    </div>
                    <!-- /column -->
                  </div>
                  <!-- /.row -->
                </div>
              </div>
            </div>
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
