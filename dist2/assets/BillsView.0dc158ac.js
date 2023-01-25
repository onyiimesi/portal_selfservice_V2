import{_ as u,a as r,o as l,c as d,b as e,d as c,w as h,e as m,n as v,F as _,r as b,t as a,h as g,g as f,H as w,i as y}from"./index.140dd68c.js";import{h as x}from"./html2pdf.bd37e38e.js";const C={name:"invoices",data(){return{errors:[],message:[],customerCode:"",allinvoice:[],loaderDiv:"",mainDiv:"d-none"}},created(){const s=localStorage.getItem("customercode");this.customerCode=s,this.customerCode||this.$router.push("/signin")},async mounted(){this.customerCode=localStorage.getItem("customercode");const s=await r.get("api/Invoice/customerinvoices/"+this.$route.params.customerCode,{headers:{Authorization:"Bearer "+localStorage.getItem("token")}});this.allinvoice=s.data.result,this.loaderDiv="d-none",this.mainDiv=""},computed:{total:function(){let s=[];return Object.entries(this.items).forEach(([o,t])=>{s.push(t.amount)}),s.reduce(function(o,t){return o+t},0)},tax:function(){let s=[];return Object.entries(this.items).forEach(([o,t])=>{s.push(t.tax)}),s.reduce(function(o,t){return o+t},0)}},methods:{exportToPDF(){x(document.getElementById("element-to-convert"),{margin:1,filename:"revassuredev-invoice.pdf",html2canvas:{windowWidth:100,windowHeight:100},pagebreak:{mode:"avoid-all",before:".page2el"}})},async makePayment(){this.message=[];const s=await r.post("https://assessmentapi.revassuredev.com/api/Payment/initialize/",{invoiceCode:this.invoice.invoiceCode,callBackUrl:"https://revassuredev.com/payment-verify/"+this.invoice.invoiceCode},{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});s&&(this.message.push(s.data.message),window.location.href=s.data.result.authorization_url)},handleClick(){localStorage.removeItem("customercode"),this.$router.push("/")}}},k={class:"content-wrapper"},B={class:"wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white","data-image-src":"/assets/img/photos/bg3.jpg"},D={class:"container pt-15 pb-10 pt-md-17 pb-md-10 text-center"},S={class:"row"},I={class:"col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto"},V=e("h1",{class:"display-1 mb-3 text-white"},"Bills",-1),$={class:"d-inline-block","aria-label":"breadcrumb"},z={class:"breadcrumb text-white"},E={class:"breadcrumb-item"},L=e("li",{class:"breadcrumb-item active","aria-current":"page"},"Bills",-1),A={class:"container"},N=e("div",{class:"row pt-5"},[e("div",{class:"col-md-12"},[e("h2",null,"List of Paid & Unpaid Bills")])],-1),F={class:"row pt-5 pb-10"},H={class:"col-md-12"},O={class:"card border border-info"},P={class:"card-body table-responsive"},j=e("h3",{class:"pb-4"},"Bills",-1),R=f('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),T=[R],U={class:"table table-bordered table-striped table-hover"},q=e("thead",{class:"thead-dark"},[e("tr",null,[e("th",{scope:"col"},"Organization"),e("th",{scope:"col"},"#Invoice"),e("th",{scope:"col"},"Currency"),e("th",{scope:"col"},"Amount"),e("th",{scope:"col"},"Outstanding"),e("th",{scope:"col"},"Status"),e("th",{scope:"col"},"Action")])],-1),W=e("td",null,null,-1),Y=e("button",{class:"btn btn-success btn-sm"},"View",-1),G=e("div",{class:"row pt-5"},null,-1);function J(s,o,t,M,p,Q){const n=g("RouterLink");return l(),d("div",k,[e("section",B,[e("div",D,[e("div",S,[e("div",I,[V,e("nav",$,[e("ol",z,[e("li",E,[c(n,{to:"/dashboard/"+this.customerCode},{default:h(()=>[m("Home")]),_:1},8,["to"])]),L])])])])])]),e("div",A,[N,e("div",F,[e("div",H,[e("div",O,[e("div",P,[j,e("div",{class:v(this.loaderDiv)},T,2),e("div",{class:v(this.mainDiv)},[e("table",U,[q,e("tbody",null,[(l(!0),d(_,null,b(p.allinvoice,i=>(l(),d("tr",{key:i.id},[e("td",null,a(i.organisationCode),1),e("td",null,a(i.invoiceCode),1),e("td",null,a(i.currencyCode),1),e("td",null,a(Number(i.invoiceAmount).toLocaleString()),1),W,e("td",null,a(i.paymentStatus),1),e("td",null,[c(n,{to:"/view-bill/"+i.invoiceCode},{default:h(()=>[Y]),_:2},1032,["to"])])]))),128))])])],2)])])])]),G])])}const K=u(C,[["render",J]]),ee={__name:"BillsView",setup(s){return(o,t)=>(l(),d("main",null,[c(w),c(K),c(y)]))}};export{ee as default};