import{_ as x,a as _,u as V,o as d,c,b as s,t as m,d as f,w,e as a,l as O,n as u,F as v,r as b,k as i,v as D,m as r,f as p,p as g,h as z,g as y,H as U,i as I}from"./index.140dd68c.js";const S={name:"selfassesmentss",data(){return{errors:[],message:[],items:[],org:"",sub:"",item:"",currencyCode:"",itemOrg:"",itemOrgCode:"",customField:"",allitem:[],allsuborg:[],customerData:{mobileNumber:"",contactAddress:"",customerType:0,customerTin:"",firstName:"",lastName:"",middleName:"",companyName:"",state:"",lga:"",emailAddress:"",mobileNumber2:"",nin:"",bvn:""},customFieldValues:[{fieldValue:"",id:0}],loaderDiv:"",mainDiv:"d-none"}},async mounted(){const l=await _.get("https://assessmentapi.revassuredev.com/api/Organization/suborganization/"+this.$route.params.organizationCode,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});this.allsuborg=l.data.result,this.loaderDiv="d-none",this.mainDiv="",this.org=localStorage.getItem("organisation"),this.sub=localStorage.getItem("subOrganization"),this.item=localStorage.getItem("item");const t=await _.get("https://assessmentapi.revassuredev.com/api/Item/OrganizationItems/"+this.$route.params.organizationCode,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});this.allitem=t.data.result,this.loaderDiv="d-none",this.mainDiv=""},methods:{onSubChange(l){localStorage.removeItem("subOrganization"),localStorage.setItem("subOrganization",l.target.value),window.location.href="/selfassessment/"+this.org+"/"+this.subOrganizationCode+"/"+this.item},async onChange(l){const t=await _.get("https://assessmentapi.revassuredev.com/api/Item/details/"+l.target.value,{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}});this.customFieldValues=t.data.result.customFields,localStorage.removeItem("item"),localStorage.setItem("item",l.target.value),window.location.href="/selfassessment/"+this.org+"/"+this.sub+"/"+this.itemOrgCode},async handleCustomer(){this.errors=[],this.message=[];const l=V();this.customerData.customerType||l.error("Select a customer type"),this.customerData.firstName||l.error("First Name required."),this.customerData.lastName||l.error("Last Name required."),this.customerData.mobileNumber||l.error("Mobile Number required."),this.customerData.contactAddress||l.error("Address required."),this.itemOrgCode?await _.post("https://assessmentapi.revassuredev.com/api/Invoice/addinvoice",{organizationCode:this.org,subOrganizationCode:this.sub,customerData:this.customerData,currencyCode:"NGN",itemOrgCode:this.itemOrgCode,customFieldValues:this.customFieldValues},{headers:{clientid:"abc123",Authorization:"0*EI&LBEey28Y#p1e3qmVD"}}).then(t=>{this.$router.push("/view-bill/"+t.data.result),this.organizationCode="",this.subOrganizationCode="",this.itemOrgCode="",this.currencyCode="",this.customerData.mobileNumber="",this.customerData.contactAddress="",this.customerData.customerType="",this.customerData.customerTin="",this.customerData.firstName="",this.customerData.lastName="",this.customerData.middleName="",this.customerData.companyName="",this.state="",this.lga="",this.emailAddress="",this.mobileNumber2="",this.nin="",this.bvn="",this.org=localStorage.removeItem("organisation"),this.sub=localStorage.removeItem("subOrganization")}).catch(t=>{t.response.data.title}):l.error("Please select an item")}}},T={class:"content-wrapper"},k={class:"wrapper image-wrapper bg-image bg-overlay bg-overlay-400 text-white","data-image-src":"./assets/img/photos/bg3.jpg"},A={class:"container pt-17 pb-15 pt-md-19 pb-md-15 text-center"},F={class:"row"},E={class:"col-md-10 col-lg-8 col-xl-7 col-xxl-6 mx-auto"},q={class:"display-1 mb-3 text-white"},L={class:"d-inline-block","aria-label":"breadcrumb"},M={class:"breadcrumb text-white"},B={class:"breadcrumb-item"},Y={class:"breadcrumb-item active","aria-current":"page"},H={class:"breadcrumb-item active","aria-current":"page"},R={class:"breadcrumb-item active","aria-current":"page"},G={class:"container"},K=s("div",{class:"row pt-5"},[s("div",{class:"col-md-12"},[s("h2",null,[a("Select service from "),s("strong",null,"Name of Ministry")])])],-1),j={class:"row pt-5"},P={class:"col-md-3 mb-4 ps-2 pe-2"},J={class:"card border border-primary"},Q={class:"card-body pe-5 ps-5"},W=s("h4",null,"Units",-1),X=y('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),Z=[X],$={class:"pt-2"},ss={class:"pb-3"},es=["id","value","checked"],ts=["for"],os={class:"col-md-3 mb-4 ps-2 pe-2"},is={class:"card border border-primary"},as={class:"card-body pe-5 ps-5"},ls=s("h4",null,"Services",-1),ds=y('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),cs=[ds],rs={class:"d-flex"},ns={class:"me-auto"},ms={class:"checks pt-2"},us=["id","value","checked"],ps=["for"],hs={class:"ml-auto"},_s={class:"checks pt-2"},vs=["for"],bs={class:"col-md-6 mb-4 ps-2 pe-2"},gs={class:"card border border-green"},fs={class:"card-body"},ys=s("h4",null,"Enter required information",-1),Ds=y('<div class="ph-item"><div class="ph-col-12"><div class="ph-row"><div class="ph-col-4"></div><div class="ph-col-8 empty"></div><div class="ph-col-6"></div><div class="ph-col-6 empty"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div><div class="ph-col-12"></div></div></div></div>',1),Ns=[Ds],Cs=s("div",{class:"messages"},null,-1),xs={key:0,class:"row pt-2"},Vs={class:"col-md-12"},ws=["onUpdate:modelValue"],Os={key:0,class:"mb-4"},zs={class:"control-label"},Us=["onUpdate:modelValue"],Is={key:1,class:"mb-4"},Ss={class:"control-label"},Ts=["onUpdate:modelValue"],ks={class:"row gx-4 pt-2"},As={class:"col-md-12"},Fs={class:"form-select-wrapper mb-4"},Es=s("label",{class:"control-label"},[a("Customer Type "),s("span",{class:"text-danger"},"*")],-1),qs=s("option",{value:"10"},"Individual",-1),Ls=s("option",{value:"11"},"Cooperate",-1),Ms=[qs,Ls],Bs={key:0},Ys={class:"form-group mb-4"},Hs=s("label",{class:"control-label"},[a("Company Name "),s("span",{class:"text-danger"},"*")],-1),Rs={class:"col-md-4"},Gs={class:"mb-4"},Ks=s("label",{class:"control-label"},[a("First Name "),s("span",{class:"text-danger"},"*")],-1),js={class:"col-md-4"},Ps={class:"mb-4"},Js=s("label",{class:"control-label"},"Middle Name",-1),Qs={class:"col-md-4"},Ws={class:"mb-4"},Xs=s("label",{class:"control-label"},[a("Last Name "),s("span",{class:"text-danger"},"*")],-1),Zs={class:"col-md-4"},$s={class:"mb-4"},se=s("label",{class:"control-label"},[a("Email "),s("span",{class:"text-danger"},"*")],-1),ee={class:"col-md-4"},te={class:"mb-4"},oe=s("label",{class:"control-label"},[a("Mobile Number "),s("span",{class:"text-danger"},"*")],-1),ie={class:"col-md-4"},ae={class:"mb-4"},le=s("label",{class:"control-label"},"Mobile Number 2",-1),de={class:"col-md-4"},ce={class:"mb-4"},re=s("label",{class:"control-label"},[a("NIN "),s("span",{class:"text-danger"},"*")],-1),ne={class:"col-md-4"},me={class:"mb-4"},ue=s("label",{class:"control-label"},[a("BVN "),s("span",{class:"text-danger"},"*")],-1),pe={class:"col-md-4"},he={class:"mb-4"},_e=s("label",{class:"control-label"},[a("TIN "),s("span",{class:"text-danger"},"*")],-1),ve={class:"col-md-6"},be={class:"form-select-wrapper mb-4"},ge=s("label",{class:"control-label"},[a("State "),s("span",{class:"text-danger"},"*")],-1),fe=s("option",{value:"10"},"Individual",-1),ye=s("option",{value:"11"},"Cooperate",-1),De=[fe,ye],Ne={key:0},Ce={class:"form-group mb-4"},xe=s("label",{class:"control-label"},[a("Company Name "),s("span",{class:"text-danger"},"*")],-1),Ve={class:"col-md-6"},we={class:"form-select-wrapper mb-4"},Oe=s("label",{class:"control-label"},[a("LGA "),s("span",{class:"text-danger"},"*")],-1),ze=s("option",{value:"10"},"Individual",-1),Ue=s("option",{value:"11"},"Cooperate",-1),Ie=[ze,Ue],Se={key:0},Te={class:"form-group mb-4"},ke=s("label",{class:"control-label"},[a("Company Name "),s("span",{class:"text-danger"},"*")],-1),Ae={class:"col-12"},Fe={class:"mb-4"},Ee=s("label",{class:"control-label"},[a("Address "),s("span",{class:"text-danger"},"*")],-1),qe=s("div",{class:"col-12"},[s("input",{type:"submit",class:"btn btn-primary rounded-pill btn-send mb-3",value:"Submit"}),s("p",{class:"text-muted"},[s("strong",{class:"text-danger"},"*"),a(" These fields are required.")])],-1),Le=s("div",{class:"row pt-5"},null,-1);function Me(l,t,N,Ye,o,h){const C=z("RouterLink");return d(),c("div",T,[s("section",k,[s("div",A,[s("div",F,[s("div",E,[s("h1",q,m(this.org),1),s("nav",L,[s("ol",M,[s("li",B,[f(C,{to:"/"},{default:w(()=>[a("Home")]),_:1})]),s("li",Y,m(this.org),1),s("li",H,m(this.sub),1),s("li",R,m(this.item),1)])])])])])]),s("div",G,[K,s("form",{onSubmit:t[20]||(t[20]=O((...e)=>h.handleCustomer&&h.handleCustomer(...e),["prevent"]))},[s("div",j,[s("div",P,[s("div",J,[s("div",Q,[W,s("div",{class:u(this.loaderDiv)},Z,2),s("div",{class:u(this.mainDiv)},[(d(!0),c(v,null,b(o.allsuborg,e=>(d(),c("div",$,[s("div",ss,[i(s("input",{onChange:t[0]||(t[0]=n=>h.onSubChange(n)),class:"form-check-input",type:"radio",id:e.subOrganisationCode,"onUpdate:modelValue":t[1]||(t[1]=n=>l.subOrganizationCode=n),name:"subOrganizationCode",value:e.subOrganisationCode,checked:e.subOrganisationCode==this.sub},null,40,es),[[D,l.subOrganizationCode]]),a("\xA0 "),s("label",{style:{"font-size":"14px","font-weight":"500",padding:"0",margin:"0",color:"#333"},for:e.subOrganisationCode},m(e.subOrganisationName),9,ts)])]))),256))],2)])])]),s("div",os,[s("div",is,[s("div",as,[ls,s("div",{class:u(this.loaderDiv)},cs,2),s("div",{class:u(this.mainDiv)},[s("div",rs,[s("div",ns,[s("div",ms,[(d(!0),c(v,null,b(o.allitem,e=>(d(),c("div",null,[i(s("input",{class:"form-check-input",type:"radio",name:"itemOrgCode",id:e.itemOrgCode,"onUpdate:modelValue":t[2]||(t[2]=n=>o.itemOrgCode=n),onChange:t[3]||(t[3]=n=>h.onChange(n)),value:e.itemOrgCode,checked:e.itemOrgCode==this.item},null,40,us),[[D,o.itemOrgCode]]),a("\xA0 "),s("label",{class:"mb-4",style:{"font-size":"16px","font-weight":"400"},for:e.itemOrgCode},m(e.itemName),9,ps)]))),256))])]),s("div",hs,[s("div",_s,[(d(!0),c(v,null,b(o.allitem,e=>(d(),c("div",null,[s("p",{class:"mb-4",style:{"font-size":"16px","font-weight":"400"},for:e.price},"\u20A6"+m(e.price),9,vs)]))),256))])])])],2)])])]),s("div",bs,[s("div",gs,[s("div",fs,[ys,s("div",{class:u(this.loaderDiv)},Ns,2),s("div",{class:u(this.mainDiv)},[Cs,this.itemOrgCode!=""?(d(),c("div",xs,[s("div",Vs,[(d(!0),c(v,null,b(o.customFieldValues,e=>(d(),c("div",null,[s("div",null,[i(s("input",{class:"form-control",type:"hidden","onUpdate:modelValue":n=>e.id=n},null,8,ws),[[r,e.id]])]),e.fieldType=="text"?(d(),c("div",Os,[s("label",zs,m(e.fieldKey),1),i(s("input",{class:"form-control",type:"text","onUpdate:modelValue":n=>e.fieldValue=n},null,8,Us),[[r,e.fieldValue]])])):p("",!0),e.fieldType=="dropdown"?(d(),c("div",Is,[s("label",Ss,m(e.fieldKey),1),i(s("select",{class:"form-select",id:"form-select","onUpdate:modelValue":n=>e.fieldValue=n},[s("option",null,m(e.fieldOptions),1)],8,Ts),[[g,e.fieldValue]])])):p("",!0)]))),256))])])):p("",!0),s("div",ks,[s("div",As,[s("div",Fs,[Es,i(s("select",{class:"form-select",id:"form-select","onUpdate:modelValue":t[4]||(t[4]=e=>o.customerData.customerType=e)},Ms,512),[[g,o.customerData.customerType]])]),o.customerData.customerType==11?(d(),c("div",Bs,[s("div",Ys,[Hs,i(s("input",{class:"form-control","onUpdate:modelValue":t[5]||(t[5]=e=>o.customerData.companyName=e),type:"text"},null,512),[[r,o.customerData.companyName]])])])):p("",!0)]),s("div",Rs,[s("div",Gs,[Ks,i(s("input",{id:"form_name",type:"text","onUpdate:modelValue":t[6]||(t[6]=e=>o.customerData.firstName=e),class:"form-control"},null,512),[[r,o.customerData.firstName]])])]),s("div",js,[s("div",Ps,[Js,i(s("input",{id:"form_name",type:"text","onUpdate:modelValue":t[7]||(t[7]=e=>o.customerData.middleName=e),class:"form-control"},null,512),[[r,o.customerData.middleName]])])]),s("div",Qs,[s("div",Ws,[Xs,i(s("input",{id:"form_name",type:"text","onUpdate:modelValue":t[8]||(t[8]=e=>o.customerData.lastName=e),class:"form-control"},null,512),[[r,o.customerData.lastName]])])]),s("div",Zs,[s("div",$s,[se,i(s("input",{id:"form_email",type:"email","onUpdate:modelValue":t[9]||(t[9]=e=>o.customerData.emailAddress=e),class:"form-control"},null,512),[[r,o.customerData.emailAddress]])])]),s("div",ee,[s("div",te,[oe,i(s("input",{type:"text","onUpdate:modelValue":t[10]||(t[10]=e=>o.customerData.mobileNumber=e),class:"form-control"},null,512),[[r,o.customerData.mobileNumber]])])]),s("div",ie,[s("div",ae,[le,i(s("input",{type:"text","onUpdate:modelValue":t[11]||(t[11]=e=>o.customerData.mobileNumber2=e),class:"form-control"},null,512),[[r,o.customerData.mobileNumber2]])])]),s("div",de,[s("div",ce,[re,i(s("input",{type:"text","onUpdate:modelValue":t[12]||(t[12]=e=>o.customerData.nin=e),class:"form-control"},null,512),[[r,o.customerData.nin]])])]),s("div",ne,[s("div",me,[ue,i(s("input",{type:"text","onUpdate:modelValue":t[13]||(t[13]=e=>o.customerData.bvn=e),class:"form-control"},null,512),[[r,o.customerData.bvn]])])]),s("div",pe,[s("div",he,[_e,i(s("input",{type:"text","onUpdate:modelValue":t[14]||(t[14]=e=>o.customerData.tin=e),class:"form-control"},null,512),[[r,o.customerData.tin]])])]),s("div",ve,[s("div",be,[ge,i(s("select",{class:"form-select",id:"form-select","onUpdate:modelValue":t[15]||(t[15]=e=>o.customerData.customerType=e)},De,512),[[g,o.customerData.customerType]])]),o.customerData.customerType==11?(d(),c("div",Ne,[s("div",Ce,[xe,i(s("input",{class:"form-control","onUpdate:modelValue":t[16]||(t[16]=e=>o.customerData.companyName=e),type:"text"},null,512),[[r,o.customerData.companyName]])])])):p("",!0)]),s("div",Ve,[s("div",we,[Oe,i(s("select",{class:"form-select",id:"form-select","onUpdate:modelValue":t[17]||(t[17]=e=>o.customerData.customerType=e)},Ie,512),[[g,o.customerData.customerType]])]),o.customerData.customerType==11?(d(),c("div",Se,[s("div",Te,[ke,i(s("input",{class:"form-control","onUpdate:modelValue":t[18]||(t[18]=e=>o.customerData.companyName=e),type:"text"},null,512),[[r,o.customerData.companyName]])])])):p("",!0)]),s("div",Ae,[s("div",Fe,[Ee,i(s("textarea",{id:"form_message","onUpdate:modelValue":t[19]||(t[19]=e=>o.customerData.contactAddress=e),class:"form-control",style:{height:"150px"}},null,512),[[r,o.customerData.contactAddress]])])]),qe])],2)])])])])],32),Le])])}const Be=x(S,[["render",Me]]),Re={__name:"SelfAssessmentssView",setup(l){return(t,N)=>(d(),c("main",null,[f(U),f(Be),f(I)]))}};export{Re as default};
