(this.webpackJsonpshop=this.webpackJsonpshop||[]).push([[0],{57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},61:function(e,t,a){},63:function(e,t){},70:function(e,t){},80:function(e,t,a){"use strict";a.r(t);var n=a(11),r=a.n(n),c=a(44),s=a.n(c),i=(a(57),a(3)),o=a(4),l=a(6),u=a(5),d=(a(58),a(59),a.p+"static/media/payngolinky-200x1000.ae921ad2.png"),h=a(8),b=function(e){var t=e.route,a=e.onRouteChange;return Object(h.jsxs)("nav",{className:"dt w-100 border-box pa3 ph5-ns",children:[Object(h.jsx)("a",{className:"dtc v-mid mid-gray link w-50 w-30-l",href:"https://payngolinky.github.io/shop/",title:"Payngolinky Home",children:Object(h.jsx)("img",{src:d,className:"dib h2",alt:"Payngolinky Logo"})}),Object(h.jsx)("div",{className:"dtc v-mid w-50 w-70-l tr",children:"merchant"===t?Object(h.jsx)("p",{onClick:function(){return a("customer")},className:"link pointer white dim f6 f5-ns b tr dib",children:"Customer View"}):Object(h.jsx)("p",{onClick:function(){return a("merchant")},className:"link pointer white dim f6 f5-ns b tr dib",children:"Merchant View"})})]})},m=(a(61),a(2)),p=a.n(m),f=a(28),j=a(20),x=a(51),g=a(45),A=a.n(g),_=a(21),v={AVAX_CCHAIN_MAINNET_PARAMS:{chainId:"0xa86a",chainName:"Avalanche Mainnet C-Chain",nativeCurrency:{name:"Avalanche",symbol:"AVAX",decimals:18},rpcUrls:["https://api.avax.network/ext/bc/C/rpc"],blockExplorerUrls:["https://cchain.explorer.avax.network/"]},AVAX_CCHAIN_TESTNET_PARAMS:{chainId:"0xa869",chainName:"Avalanche Testnet C-Chain",nativeCurrency:{name:"Avalanche",symbol:"AVAX",decimals:18},rpcUrls:["https://api.avax-test.network/ext/bc/C/rpc"],blockExplorerUrls:["https://cchain.explorer.avax-test.network/"]}};function O(e){var t=e.updateAccounts,a=e.updateProvider,r=Object(n.useState)("Install MetaMask"),c=Object(j.a)(r,2),s=c[0],i=c[1],o=Object(n.useState)(!1),l=Object(j.a)(o,2),u=l[0],d=l[1],b=Object(n.useState)([]),m=Object(j.a)(b,2),g=m[0],O=m[1],N=Object(n.useRef)();Object(n.useEffect)((function(){N.current||(N.current=new _.a)}),[]),Object(n.useEffect)((function(){_.a.isMetaMaskInstalled()&&(g.length>0?(i("MetaMask Connected"),d(!0),N.current.stopOnboarding()):(i("Connect MetaMask"),d(!1)))}),[g]),Object(n.useEffect)((function(){var e=function(e){O(e),t(e)};_.a.isMetaMaskInstalled()&&(window.ethereum.request({method:"eth_requestAccounts"}).then(e).catch(console.error),window.ethereum.on("accountsChanged",e))}),[t]);var w=Object(n.useCallback)(Object(f.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A()();case 2:if(!(t=e.sent)){e.next=16;break}if(t!==window.ethereum){e.next=13;break}return a(new x.a.providers.Web3Provider(t)),console.log("handleProvider successfully updated provider"),e.next=9,t.request({method:"eth_chainId"});case 9:e.sent!==v.AVAX_CCHAIN_TESTNET_PARAMS.chainId&&(t.request({method:"wallet_addEthereumChain",params:[v.AVAX_CCHAIN_TESTNET_PARAMS]}).catch(console.error),t.on("chainChanged",(function(e){return window.location.reload()}))),e.next=14;break;case 13:console.error("handleProvider possibly detected multiple wallets installed");case 14:e.next=17;break;case 16:console.error("handleProvider encountered null provider");case 17:case"end":return e.stop()}}),e)}))),[a]);Object(n.useEffect)((function(){_.a.isMetaMaskInstalled()&&w()}),[w]);return Object(h.jsx)("section",{className:"mw-100 pa3 pa4-ns",children:Object(h.jsx)("button",{disabled:u,onClick:function(){_.a.isMetaMaskInstalled()?window.ethereum.request({method:"eth_requestAccounts"}).then((function(e){O(e)})):N.current.startOnboarding()},className:"f5 f4-m f3-l tc no-underline br-pill ba bw1 ph3 pv2 dib black pointer",children:s})})}var N=function(e){if(0===e.length)return"Unavailable";var t=e[0];return t.substring(0,6)+"..."+t.substring(t.length-4)},w=function(e){var t=e.accounts,a=e.provider,r=Object(n.useState)("Unavailable"),c=Object(j.a)(r,2),s=c[0],i=c[1],o=function(){var e=Object(f.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==t){e.next=2;break}return e.abrupt("return","Unavailable");case 2:return e.prev=2,e.next=5,t.provider.request({method:"eth_chainId"});case 5:if((a=e.sent)!==v.AVAX_CCHAIN_TESTNET_PARAMS.chainId){e.next=10;break}return e.abrupt("return",v.AVAX_CCHAIN_TESTNET_PARAMS.chainName+", "+v.AVAX_CCHAIN_TESTNET_PARAMS.chainId);case 10:if(a!==v.AVAX_CCHAIN_MAINNET_PARAMS.chainId){e.next=14;break}return e.abrupt("return",v.AVAX_CCHAIN_MAINNET_PARAMS.chainName+", "+v.AVAX_CCHAIN_MAINNET_PARAMS.chainId);case 14:return e.abrupt("return",a);case 15:e.next=21;break;case 17:return e.prev=17,e.t0=e.catch(2),console.error(e.t0),e.abrupt("return","Unavailable");case 21:case"end":return e.stop()}}),e,null,[[2,17]])})));return function(t){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){o(a).then((function(e){i(e)})).catch(console.error)}),[a]),Object(h.jsx)("section",{className:"mw-100",children:Object(h.jsxs)("ul",{className:"list pl0",children:[Object(h.jsxs)("li",{className:"pa2 pa3-ns bb b--black-10",children:[Object(h.jsx)("b",{className:"db f3 mb1 tc",children:"Chain"}),Object(h.jsx)("span",{className:"f5 db lh-copy tc",children:s})]}),Object(h.jsxs)("li",{className:"pa2 pa3-ns",children:[Object(h.jsx)("b",{className:"db f3 mb1 tc",children:"Address"}),Object(h.jsx)("span",{className:"f5 db lh-copy tc",children:N(t)})]})]})})},k=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).updateAccounts=function(t){e.setState({accounts:t})},e.updateProvider=function(t){e.setState({provider:t})},e.state={accounts:[],provider:null},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.accounts,a=e.provider;return Object(h.jsxs)("section",{className:"mw-100",children:[Object(h.jsx)(O,{updateAccounts:this.updateAccounts,updateProvider:this.updateProvider}),Object(h.jsx)(w,{accounts:t,provider:a})]})}}]),a}(n.Component),C=function(e){var t=e.id,a=e.name,n=e.price,r=e.image_url,c=e.qty,s=e.desc;return Object(h.jsxs)("article",{className:"link dim pointer br2 ba dark-gray b--black-10 shadow-3 mv4 w-100 mw5 center",children:[Object(h.jsx)("img",{src:r,className:"db w-100 br2 br--top",alt:"Product: "+a}),Object(h.jsxs)("div",{className:"pa2 ph3-ns h4 pb3-ns",children:[Object(h.jsxs)("div",{className:"dt w-100 mt1",children:[Object(h.jsx)("div",{className:"dtc",children:Object(h.jsx)("h1",{className:"f5 f4-ns mv0",children:a})}),Object(h.jsx)("div",{className:"dtc tr",children:Object(h.jsxs)("h2",{className:"f5 mv0",children:[Number(n).toFixed(3)," AVAX"]})})]}),Object(h.jsxs)("p",{className:"f6 lh-copy measure mt2 mid-gray",children:["ID ",t,", Qty ",c,": ",s]})]})]})},y=function(e){var t=e.products;return Object(h.jsx)("section",{className:"cf",children:t.map((function(e){return Object(h.jsx)("div",{className:"fl w-100 w-50-m w-25-l pa3 pa4-l",children:Object(h.jsx)(C,{id:e.id,name:e.name,price:e.price,image_url:e.image_url,qty:e.qty,desc:e.desc})},e.id)}))})},q=[{id:1,name:"SOL T-Shirt",price:.697,image_url:"https://ih1.redbubble.net/image.2202518381.7027/ssrco,slim_fit_t_shirt,two_model,101010:01c5ca27c6,front,square_three_quarter,300x300.jpg",desc:"Solana My Retirement Plan t-shirt",qty:123},{id:2,name:"LINK T-Shirt",price:.959,image_url:"https://ih1.redbubble.net/image.1950348338.7594/ssrco,mens_premium_t_shirt,mens,101010:01c5ca27c6,front,square_three_quarter,x300-bg,f8f8f8.1.jpg",desc:"Chainlink See You on the Moon t-shirt",qty:57},{id:3,name:"GRT Journal",price:.765,image_url:"https://ih1.redbubble.net/image.2260882070.0553/hj,300x-pad,300x300,f8f8f8.jpg",desc:"The Graph hardcover journal",qty:43},{id:4,name:"AAVE Curtain",price:2,image_url:"https://ih1.redbubble.net/image.2012870348.5512/ur,shower_curtain_closed_context,square,300x300.1.jpg",desc:"AAVE shower curtain, 71 x 74 inches",qty:98},{id:5,name:"AVAX T-Shirt",price:.933,image_url:"https://ih1.redbubble.net/image.2210792579.3669/ssrco,long_t_shirt,mens,fafafa:ca443f4786,front,square_three_quarter,x300-bg,f8f8f8.1.jpg",desc:"Dabbing Easter bunny HODLing AVAX",qty:30},{id:6,name:"ETH Case",price:.904,image_url:"https://ih1.redbubble.net/image.1373269076.7025/icr,iphone_12_soft,back,a,x300-pad,300x300,f8f8f8.jpg",desc:"Ethereum iPhone 12 shock absorbent case",qty:214},{id:7,name:"Polygon Logo",price:.036,image_url:"https://ih1.redbubble.net/image.2229528085.4308/sss,small,product_square,300x300.jpg",desc:"Polygon To The Moon! sticker",qty:17},{id:8,name:"LINK Mask",price:.348,image_url:"https://ih1.redbubble.net/image.1869798016.8105/ur,flat_mask_three_quarter,square,300x300.jpg",desc:"Two layers of soft 95% polyester",qty:85},{id:9,name:"HODL Chiffon",price:1.066,image_url:"https://ih1.redbubble.net/image.481948677.9432/ssrco,chiffon_top,womens,black,front,square_three_quarter,x300-bg,f8f8f8.1u8.jpg",desc:"HODL red background chiffon top",qty:56},{id:10,name:"Acala T-Shirt",price:.716,image_url:"https://ih1.redbubble.net/image.2043110152.4257/ssrco,classic_tee,two_models,fafafa:ca443f4786,front,square_three_quarter,300x300.jpg",desc:"Acala Network classic t-shirt",qty:38},{id:11,name:"AVAX T-Shirt",price:.007,image_url:"https://ih1.redbubble.net/image.2179442608.6415/ssrco,active_tshirt,mens,101010:01c5ca27c6,front,square_three_quarter,300x300.jpg",desc:"Avalanche to the moon active t-shirt",qty:77},{id:12,name:"DOGE Print",price:1,image_url:"https://ih1.redbubble.net/image.2221784184.0843/flat,300x,075,f-pad,300x300,f8f8f8.jpg",desc:"Elon Musk Dogecoin metal print",qty:27}],M=function(){return Object(h.jsxs)("article",{className:"cf h-100",children:[Object(h.jsx)("div",{className:"fl w-100 w-25-l h-100 pa3",children:Object(h.jsx)(k,{})}),Object(h.jsxs)("div",{className:"fl w-100 w-75-l bt b--light-gray bl-l bg-inventory",children:[Object(h.jsx)("h1",{className:"f3 f2-m f1-l tc",children:"Manage Inventory"}),Object(h.jsx)(y,{products:q})]})]})},T=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(i.a)(this,a),(e=t.call(this)).onRouteChange=function(t){e.setState({route:t})},e.state={route:"merchant"},e}return Object(o.a)(a,[{key:"render",value:function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(b,{route:this.state.route,onRouteChange:this.onRouteChange}),"merchant"===this.state.route?Object(h.jsx)(M,{}):Object(h.jsx)("div",{})]})}}]),a}(n.Component),I=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,84)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};a(79);s.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(T,{})}),document.getElementById("root")),I()}},[[80,1,2]]]);
//# sourceMappingURL=main.b9ec2ec3.chunk.js.map