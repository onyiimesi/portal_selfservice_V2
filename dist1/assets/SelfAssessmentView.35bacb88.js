import{_ as v,a as u,o as i,c as r,b as e,t as l,d as c,w as b,e as h,k as g,v as y,n as p,f,F as C,r as w,l as x,h as O,g as z,H as D,i as N}from"./index.bf299c13.js";const S={name:"selfassesments",data(){return{errors:[],message:[],items:[],org:"",sub:"",currencyCode:"",itemOrg:"",itemOrgCode:"",customField:"",allitem:[],allsuborg:[],subOrganizationCode:"",customerData:{mobileNumber:"",contactAddress:"",customerType:0,customerTin:"",firstName:"",lastName:"",middleName:"",companyName:"",state:"",lga:"",emailAddress:"",mobileNumber2:"",nin:"",bvn:""},org:"",customFieldValues:[{fieldValue:"",id:0}],loaderDiv:"",mainDiv:"d-none",orgDetails:{organisationName:""},searchQuery:"",selectedItem:"",isVisible:!1}},computed:{filteredUnit(){const a=this.searchQuery.toLowerCase();return this.searchQuery==""?this.allsuborg:this.allsuborg.filter(s=>Object.values(s).some(d=>String(d).toLowerCase().includes(a)))}},created(){this.org=localStorage.getItem("organisation")},async mounted(){setTimeout(()=>{document.body.scrollTop=document.documentElement.scrollTop=0},100);const a=await u.get("https://assessmentapi.revassuredev.com/api/Organization/suborganization/"+this.$route.params.organizationCode,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});this.allsuborg=a.data.result,this.loaderDiv="d-none",this.mainDiv="",this.org=localStorage.getItem("organisation"),this.sub=localStorage.getItem("subOrganization");const s=await u.get("https://assessmentapi.revassuredev.com/api/Organization/details/"+this.org,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});this.orgDetails=s.data.result},methods:{removeItem(){localStorage.removeItem("organisation"),localStorage.removeItem("subOrganization"),localStorage.removeItem("itemOrgCode")},async onKeyUp(){const a=await u.get("https://assessmentapi.revassuredev.com/api/Organization/details/"+this.org,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}},+this.searchQuery);this.allsuborgs=a.data.result},onSubChange(a,s){localStorage.removeItem("subOrganization"),this.selectedItem=s,this.isVisible=!1,localStorage.setItem("subOrganization",a.target.value),this.$router.push("/selfassessment/"+this.org+"/"+this.subOrganizationCode)}}},I={class:"content-wrapper"},V={class:"wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white","data-image-src":"./assets/img/photos/bg3.jpg"},k={class:"container pt-17 pb-15 pt-md-16 pb-md-8 text-center"},A={class:"row"},U={class:"col-md-12 col-lg-12 col-xl-12 col-xxl-6 mx-auto"},E={class:"display-0 mb-3 text-white"},L={class:"d-inline-block","aria-label":"breadcrumb"},T={class:"breadcrumb text-white"},B={class:"breadcrumb-item"},F={class:"breadcrumb-item active","aria-current":"page"},Q={class:"container"},q={class:"row pt-5"},K={class:"col-md-12"},H={class:"add",style:{"font-size":"22px"}},R={style:{color:"#605dba !important"}},Y={class:"row pt-5"},j={class:"col-md-12 mb-4"},M={class:"card border border-primary"},G={class:"card-body ssw"},J=e("h4",null,"Units",-1),P={class:"mb-4 asas",style:{width:"40%"}},W={class:"mb-3"},X=z('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),Z=[X],$={key:0},ee={class:"pt-2"},se={class:"pb-3 a d-flex"},te=["onChange","id","value","checked"],ae=["for"],oe=e("div",{class:"row pt-5"},null,-1);function ie(a,s,d,ne,n,o){const _=O("RouterLink");return i(),r("div",I,[e("section",V,[e("div",k,[e("div",A,[e("div",U,[e("h1",E,l(this.orgDetails.organisationName),1),e("nav",L,[e("ol",T,[e("li",B,[c(_,{onClick:o.removeItem,to:"/"},{default:b(()=>[h("Home")]),_:1},8,["onClick"])]),e("li",F,l(this.orgDetails.organisationName),1)])])])])])]),e("div",Q,[e("div",q,[e("div",K,[e("h2",H,[h("Select service from, "),e("strong",null,[e("span",R,l(this.orgDetails.organisationName),1)])])])]),e("div",Y,[e("div",j,[e("div",M,[e("div",G,[J,e("div",P,[e("form",null,[e("div",W,[g(e("input",{type:"text",onKeyup:s[0]||(s[0]=(...t)=>o.onKeyUp&&o.onKeyUp(...t)),"onUpdate:modelValue":s[1]||(s[1]=t=>n.searchQuery=t),class:"form-control pe-3 ps-3 pt-2 pb-2 me-2",placeholder:"Filter by name..."},null,544),[[y,n.searchQuery]])])])]),e("div",{class:p(this.loaderDiv)},Z,2),e("div",{class:p(this.mainDiv)},[o.filteredUnit.length==0?(i(),r("h5",$,"No Data Available...")):f("",!0),(i(!0),r(C,null,w(o.filteredUnit,t=>(i(),r("div",ee,[e("div",se,[g(e("input",{onChange:m=>o.onSubChange(m,t),class:"form-check-input p-1 border-primary",type:"radio",id:t.subOrganisationCode,"onUpdate:modelValue":s[2]||(s[2]=m=>n.subOrganizationCode=m),name:"subOrganizationCode",value:t.subOrganisationCode,checked:t.subOrganisationCode==this.sub},null,40,te),[[x,n.subOrganizationCode]]),h("\xA0 "),e("label",{style:{"font-size":"20px","font-weight":"500",padding:"0",margin:"0",color:"#333"},for:t.subOrganisationCode,class:"ms-1"},l(t.subOrganisationName),9,ae)])]))),256))],2)])])])]),oe])])}const re=v(S,[["render",ie]]),ce={__name:"SelfAssessmentView",setup(a){return(s,d)=>(i(),r("main",null,[c(D),c(re),c(N)]))}};export{ce as default};