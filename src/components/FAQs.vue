<script>
    import { Autoplay, Navigation, Pagination } from 'swiper'
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css'
    import 'swiper/css/pagination'
    import 'swiper/css/navigation'

    export default{

        components: {
            Swiper,
            SwiperSlide
        },

        data(){

            return{
                errors: [],
                errorss: [],
                modules: [Pagination, Navigation, Autoplay],
            }

        },

        methods: { 
            removeItem(){
                localStorage.removeItem('organisation');
                localStorage.removeItem('subOrganization');
                localStorage.removeItem('itemOrgCode');
            },          
        },
        

    }
</script>

<template>
  <div class="content-wrapper">
      <section class="wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white" data-image-src="./assets/img/photos/bg3.jpg">
      <div class="container pt-17 pb-10 pt-md-17 pb-md-10 text-center">
        <div class="row">
          <div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto">
            <h1 class="display-1 mb-3 text-white">FAQs</h1>
            <nav class="d-inline-block" aria-label="breadcrumb">
              <ol class="breadcrumb text-white">
                <li class="breadcrumb-item"><RouterLink @click="removeItem" to="/">Home</RouterLink></li>
                <li class="breadcrumb-item active" aria-current="page">FAQs</li>
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
        <div class="container py-14 py-md-16">
            <div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
                <div class="col-lg-12">
                    <div class="accordion accordion-wrapper" id="accordionExample">
                        <div class="card accordion-item">
                            <div class="card-header" id="headingOne">
                            <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">What is the FGN RevAssure Soln? </button>
                            </div>
                            <!--/.card-header -->
                            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="card-body">
                                <p>The FGN RevAssure Soln allows Residents and non-residents of Nigeria carry out transactions online. It also helps the government track and monitor its transaction online real-time.</p>
                            </div>
                            <!--/.card-body -->
                            </div>
                            <!--/.accordion-collapse -->
                        </div>
                        <!--/.accordion-item -->
                        <div class="card accordion-item">
                            <div class="card-header" id="headingTwo">
                            <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> How do I make payment on the platform? </button>
                            </div>
                            <!--/.card-header -->
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="card-body">
                                <p>You can make payment on the platform by:</p>
                                <ul>
                                    <li>Self-assessment and making payment on the bill/demand notice created</li>
                                    <li>Providing your login credentials by providing your login credentials and searching for your bill/demand notice generated</li>
                                </ul>
                            </div>
                            <!--/.card-body -->
                            </div>
                            <!--/.accordion-collapse -->
                        </div>
                        <!--/.accordion-item -->
                        <div class="card accordion-item">
                            <div class="card-header" id="headingThree">
                            <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> How do I generate my treasury Receipt? </button>
                            </div>
                            <!--/.card-header -->
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div class="card-body">
                                <p>You can generate your receipt by taking these actions: </p>
                                <ul>
                                    <li>Provide your login credentials (Username and password)</li>
                                    <li>Search for the transaction</li>
                                </ul>
                            </div>
                            <!--/.card-body -->
                            </div>
                            <!--/.accordion-collapse -->
                        </div>

                        <div class="card accordion-item">
                            <div class="card-header" id="headingFour">
                            <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"> How do I get service? </button>
                            </div>
                            <!--/.card-header -->
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                            <div class="card-body">
                                <p>Once you have made payment, generate your treasury receipt, and approach the MDA Support staff for service.  </p>
                            </div>
                            <!--/.card-body -->
                            </div>
                            <!--/.accordion-collapse -->
                        </div>

                        <div class="card accordion-item">
                            <div class="card-header" id="headingFive">
                            <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"> I made payment and I did not see the record </button>
                            </div>
                            <!--/.card-header -->
                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                            <div class="card-body">
                                <p>Approach the MDA support staff or unit for assistance.  </p>
                            </div>
                            <!--/.card-body -->
                            </div>
                            <!--/.accordion-collapse -->
                        </div>
                        <!--/.accordion-item -->
                        </div>
                        <!--/.accordion -->
                </div>
            </div>
        </div>
    </section>
    <!-- /section -->
    


    </div>
    <!-- /.content-wrapper -->
    
</template>

<style>

</style>
