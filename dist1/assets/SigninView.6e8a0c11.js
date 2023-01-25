import{_ as h,I as p,a as u,o as i,c as l,b as e,d as n,w as g,e as b,J as f,k as d,v as c,h as w,H as v,i as x}from"./index.bf299c13.js";const k={name:"signin",data(){return{errors:[],errorss:[],customerCode:"",email:"",password:"",loading:!1}},methods:{handleLoader(){this.loading=!1,this.email&&this.password?setTimeout(()=>{this.loading=!0},100):!this.email&&!this.password&&(this.loading=!1)},removeItem(){localStorage.removeItem("organisation"),localStorage.removeItem("subOrganization")},async customerLogin(){this.errors=[];const t=p();this.email||t.error("Email address required."),this.password?await u.post("https://assessmentapi.revassuredev.com/api/user/token",{email:this.email,password:this.password}).then(s=>{s?(localStorage.setItem("customercode",s.data.customerCode),localStorage.setItem("email",s.data.emailAddress),localStorage.setItem("fname",s.data.firstname),localStorage.setItem("lname",s.data.lastname),localStorage.setItem("mname",s.data.middlename),localStorage.setItem("phone",s.data.mobileNumber1),localStorage.setItem("phone2",s.data.mobileNumber2),localStorage.setItem("accesstoken",s.data.token.access_Token),localStorage.setItem("refreshtoken",s.data.token.refresh_Token),this.$router.push("/dashboard")):(t.error("Invalid User"),this.loading=!1)}).catch(s=>{s.response.data&&(t.error("Incorrect username or password!"),this.loading=!1)}):t.error("Password required.")}}},I={class:"content-wrapper"},S={class:"wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white","data-image-src":"/assets/img/photos/bg3.jpg"},y={class:"container pt-17 pb-20 pt-md-19 pb-md-21 text-center"},P={class:"row"},C={class:"col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto"},L=e("h1",{class:"display-1 mb-3 text-white"},"Sign In",-1),E={class:"d-inline-block","aria-label":"breadcrumb"},T={class:"breadcrumb text-white"},V={class:"breadcrumb-item"},N=e("li",{class:"breadcrumb-item active","aria-current":"page"},"Sign In",-1),B={class:"wrapper bg-light"},F={class:"container pb-14 pb-md-16"},H={class:"row"},U={class:"col-lg-7 col-xl-6 col-xxl-5 mx-auto mt-n20"},q={class:"card"},M={class:"card-body p-11 text-center"},R=e("h2",{class:"mb-3 text-start"},"Welcome Back",-1),j=e("p",{class:"lead mb-6 text-start"},"Fill your email or phone number and password to sign in.",-1),z={class:"form-floating mb-4"},A=e("label",{for:"loginEmail"},"Email or Phone number",-1),D={class:"form-floating password-field mb-4"},J=e("span",{class:"password-toggle"},[e("i",{class:"uil uil-eye"})],-1),O=e("label",{for:"loginPassword"},"Password",-1),W={key:0,class:"spinner-border spinner-border-sm"},G={key:1},K=e("p",{class:"mb-1"},[e("a",{href:"#",class:"hover"},"Forgot Password?")],-1);function Q(t,s,m,Y,a,r){const _=w("RouterLink");return i(),l("div",I,[e("section",S,[e("div",y,[e("div",P,[e("div",C,[L,e("nav",E,[e("ol",T,[e("li",V,[n(_,{onClick:r.removeItem,to:"/"},{default:g(()=>[b("Home")]),_:1},8,["onClick"])]),N])])])])])]),e("section",B,[e("div",F,[e("div",H,[e("div",U,[e("div",q,[e("div",M,[R,j,e("form",{class:"text-start mb-3",onSubmit:s[3]||(s[3]=f((...o)=>r.customerLogin&&r.customerLogin(...o),["prevent"]))},[e("div",z,[d(e("input",{type:"text",autocomplete:"off","onUpdate:modelValue":s[0]||(s[0]=o=>a.email=o),class:"form-control",placeholder:"Email or Phone number",id:"loginEmail"},null,512),[[c,a.email]]),A]),e("div",D,[d(e("input",{type:"password",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=o=>a.password=o),placeholder:"Password",id:"loginPassword"},null,512),[[c,a.password]]),J,O]),e("button",{type:"submit",onClick:s[2]||(s[2]=o=>r.handleLoader()),class:"btn btn-primary rounded-pill btn-login w-100 mb-2"},[a.loading?(i(),l("span",W)):(i(),l("span",G,"Sign In"))])],32),K])])])])])])])}const X=h(k,[["render",Q]]),$={__name:"SigninView",setup(t){return(s,m)=>(i(),l("main",null,[n(v),n(X),n(x)]))}};export{$ as default};