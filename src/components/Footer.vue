<script>
  export default{
    
    data(){
      return{
        customerCode: '',

      }
        
    },

    created(){
      const response = localStorage.getItem('customercode');

      this.customerCode = response;

    },

    async mounted(){

      this.customerCode = localStorage.getItem('customercode');

    },
      
  }
</script>

<template>
    <footer class="bg-navy text-inverse example-screen">
      <div class="container py-13 py-md-15">
        <div class="d-lg-flex flex-row align-items-lg-center">
          <h3 class="display-4 mb-6 mb-lg-0 pe-lg-20 pe-xl-22 pe-xxl-25 text-white">All government services in one place.</h3>
          <!-- <RouterLink to="/signin" class="btn btn-primary rounded-pill mb-0 text-nowrap">Login</RouterLink> -->
        </div>
        <!--/div -->
        <hr class="mt-11 mb-12" />
        <div class="row gy-6 gy-lg-0">
          <div class="col-md-4">
            <div class="widget">
              <div v-if="this.customerCode">
                <RouterLink :to="'/dashboard/'+this.customerCode"><img class="mb-4" src="/assets/logo.png" width="150" alt="" /></RouterLink>
              </div>
              <div v-if="!this.customerCode">
                <RouterLink to="/"><img class="mb-4" src="/assets/logo.png" width="150" alt="" /></RouterLink>
              </div>
              <p class="mb-4">© 2022 Federal Govrnment of Nigeria. <br class="d-none d-lg-block" />All rights reserved. </p>
              <nav class="nav social social-white">
                <a href="#">
                  <i class="uil uil-twitter"></i>
                </a>
                <a href="#">
                  <i class="uil uil-facebook-f"></i>
                </a>
              </nav>
              <!-- /.social -->
            </div>
            <!-- /.widget -->
          </div>
          <!-- /column -->
          <div class="col-md-4">
            <div class="widget">
              <h4 class="widget-title text-white mb-3">Learn More</h4>
              <ul class="list-unstyled  mb-0">
                <li>
                  <RouterLink to="/about-us">About Us</RouterLink>
                </li>
                <li>
                  <RouterLink to="/">Our Story</RouterLink>
                </li>
                <li>
                  <RouterLink to="/terms">Terms of Use</RouterLink>
                </li>
                <li>
                  <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
                </li>
              </ul>
            </div>
            <!-- /.widget -->
          </div>
          <!-- /column -->
          <div class="col-md-4">
            <div class="widget">
              <h4 class="widget-title text-white mb-3">Get in Touch</h4>
              <address class="pe-xl-15 pe-xxl-17">Federal Ministry of Finance, Abuja, Nigeria</address>
              <a href="mailto:#">info@email.com</a>
              <br /> 00 (123) 456 78 90
            </div>
            <!-- /.widget -->
          </div>
          <!-- /column -->
        </div>
        <!--/.row -->
      </div>
      <!-- /.container -->
    </footer>
</template>