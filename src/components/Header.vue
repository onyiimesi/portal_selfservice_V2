<!-- eslint-disable vue/multi-word-component-names -->
<script>
//import axios from "axios";

export default {
  data() {
    return {
      errors: [],
      message: [],

      customerCode: "",
      menuOpen: false,
    };
  },

  mounted() {
    this.customerCode = localStorage.getItem("accesstoken");
  },

  methods: {
    toggleMenu: function () {
      this.isActive = !this.isActive;
    },

    removeItem() {
      localStorage.removeItem("organisation");
      localStorage.removeItem("subOrganization");
      localStorage.removeItem("itemOrgCode");
    },

    handleClick() {
      localStorage.removeItem("accesstoken");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header class="wrapper bg-soft-primary example-screen">
    <nav
      class="navbar ss navbar-expand-lg classic transparent position-absolute navbar-dark"
    >
      <div class="container flex-lg-row flex-nowrap align-items-center">
        <div class="w-100" v-if="this.customerCode">
          <RouterLink class="logo-light" @click="removeItem" to="/dashboard">
            <!-- <img class="logo-dark" src="/assets/logo.png" width="150px" alt="" /> -->
            <img
              class="img-fluid mt-2"
              src="/assets/logo.png"
              width="150"
              alt=""
            />
          </RouterLink>
        </div>
        <div class="w-100" v-if="!this.customerCode">
          <RouterLink class="logo-light" @click="removeItem" to="/">
            <!-- <img class="logo-dark" src="/assets/logo.png" width="150px" alt="" /> -->
            <img
              class="img-fluid mt-2"
              src="/assets/logo.png"
              width="150"
              alt=""
            />
          </RouterLink>
        </div>
        <div class="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
          <div class="offcanvas-header d-lg-none">
            <h3 class="text-white fs-30 mb-0">FG-RAS</h3>
            <button
              @click="toggleMenu"
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body ms-lg-auto d-flex flex-column h-100">
            <div class="responsive-nav">
              <ul class="navbar-nav" v-if="this.customerCode">
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/bills">Bills</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/payments"
                    >Payments</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/selfassessment"
                    >Pay for Service</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/profile"
                    >Profile</RouterLink
                  >
                </li>
              </ul>
              <ul class="navbar-nav" v-if="!this.customerCode">
                <li class="nav-item">
                  <RouterLink class="nav-link" @click="removeItem" to="/signin"
                    >Bills</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" @click="removeItem" to="/signin"
                    >Payments</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink
                    class="nav-link"
                    @click="removeItem"
                    to="/about-us"
                    >About Us</RouterLink
                  >
                </li>
                <!-- <li class="nav-item"><RouterLink class="nav-link" @click="removeItem" to="/">Developers</RouterLink></li> -->
                <li class="nav-item">
                  <RouterLink class="nav-link" @click="removeItem" to="/faqs"
                    >FAQs</RouterLink
                  >
                </li>
                <li class="nav-item">
                  <RouterLink
                    class="nav-link"
                    @click="removeItem"
                    to="/contact-us"
                    >Contact Us</RouterLink
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- /.offcanvas-body -->
        </div>
        <!-- /.navbar-collapse -->

        <div class="navbar-other ms-lg-4">
          <ul
            class="navbar-nav flex-row align-items-center ms-auto"
            v-if="this.customerCode"
          >
            <li class="nav-item d-none d-md-block">
              <button
                @click="handleClick()"
                class="btn btn-sm btn-white rounded-pill"
              >
                Logout
              </button>
            </li>
          </ul>

          <ul
            class="navbar-nav flex-row align-items-center ms-auto"
            v-if="!this.customerCode"
          >
            <li class="nav-item d-none d-md-block">
              <RouterLink to="/signin" class="btn btn-sm btn-white rounded-pill"
                >Sign In</RouterLink
              >
            </li>
            <li class="nav-item d-lg-none">
              <button
                @click="toggleMenu()"
                class="hamburger offcanvas-nav-btn d-lg-none"
              >
                <span></span>
              </button>
            </li>
          </ul>

          <ul
            class="navbar-nav flex-row align-items-center ms-auto"
            v-if="this.customerCode"
          >
            <li class="nav-item d-lg-none">
              <button
                @click="toggleMenu"
                class="hamburger offcanvas-nav-btn d-lg-none"
              >
                <span></span>
              </button>
            </li>
          </ul>
          <!-- /.navbar-nav -->
        </div>

        <!-- /.navbar-other -->
      </div>
      <!-- /.container -->
    </nav>
    <!-- /.navbar -->
  </header>
</template>

<style scoped>
.nav-ul {
  flex: 1;
  list-style: none;
  display: flex;
}
.nav-li:not(:last-child) {
  margin-right: 1rem;
}
.nav--link {
  display: block;
  padding: 1rem 2rem;

  text-decoration: none;

  text-transform: uppercase;
  font-weight: 700;
  color: var(--white-color);
  justify-content: center;
  align-items: center;

  transition: all 0.5s ease-in-out;
  position: relative;
}
.nav--link:hover {
  letter-spacing: 1px;
}

.nav--link::before,
.nav--link::after {
  visibility: hidden;
  content: "";
  margin: 0 auto;
  display: block;
  border: 1px solid var(--white-color);
  transition: width 0.5s ease-in-out;
  position: absolute;
  width: 0;
}
.nav--link::before {
  right: 0;
  left: 0;
  top: 0;
}
.nav--link::after {
  right: 0;
  left: 0;
  bottom: 0;
}
.nav--link:hover:before,
.nav--link:hover:after {
  visibility: visible;
  width: 80%;
}

.logo {
  letter-spacing: 2px;
  font-weight: 900;
  font-size: 1.5rem;
  font-family: "Helvetica", Roboto;
  color: var(--white-color);
  cursor: pointer;
}
.logo-svg {
  width: 100%;
  height: 100px;
}
.menu-toggle,
.nav .close {
  display: none;
}
@media (max-width: 800px) {
  .menu-toggle {
    color: var(--white-color);
    background: tomato;
    padding: 0.5rem;
    cursor: pointer;
    display: block;
  }
  .nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    transform: translate3d(-100%, 0, 0);
  }
  .nav.active {
    transform: translateZ(0);
  }
  .nav .close {
    color: var(--white-color);
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 40px;
    height: 40px;
    font-weight: 900;

    background: tomato;

    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .nav-ul {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .nav--link:not(:first-child),
  .btn {
    margin-top: 2rem;
  }
}
</style>
