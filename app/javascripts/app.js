
//TODO : CONVERT FUNCTIOS.
//TODO : cleanup code
//TODO : english translation for polish team
//TODO : clean appendix


// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import each from 'async/each';


// Import our contract artifacts and turn them into usable abstractions.
import token_artifacts from '../../build/contracts/SimpleToken.json'


const async = require('async');

const request = require('request-promise') ;
//var rp = request;
// MetaCoin is our usable abstraction, which we'll use through the code below.
var Token = contract(token_artifacts);





// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
var event


var balance;
// var tokend;


 var senderWei;
 var recipientWei;

 var deci;

 var am_root;
 var mroot;

//var arr;


window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    Token.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];


        //Need(!!) to remove it when deploying live
        $("#transfer_to").val(accounts[1]);
        console.log("accounts1");
        console.log(accounts[1]);



  //    self.refreshBalance();



    });




//        There must be a functions that will be work onload
          self.refreshAddress();

          self.sendJSON();
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  setStatusPos: function (pos, msg){
  $(pos).html(msg);

  },

refreshAddress: function () {
  var self=this;
  var instance;
  var tok;
  Token.deployed().then(function(instance) {
    tok=instance;
    $("#tokdAddress").html(tok.address);
    console.log(tok.address);
    self.ShowSupply();
    self.hubBalance();
  });
},

  ShowSupply: function () {
    var self = this;
    var pos="#totalSup";
    var instance;
    var msg;
    var tok;
    Token.deployed().then(function(instance){
      tok=instance;
      msg="Wait..";
      self.setStatusPos(pos,msg);
       return tok.totalSupply.call()
        }).then(function (ts) {
    //     $("#totalSup").html(ts)
          console.log("ts:");
          console.log(ts);
        // Should I use msg=ts.valueOf(); ?
          msg=ts.valueOf();
          msg=web3.fromWei(msg);
          self.setStatusPos(pos,msg);
    });
  },


hubBalance: function () {
  var self=this;
  var pos="#balance";
  var instance;
  var msg;
  var tok;
  Token.deployed().then(function(instance){
    tok=instance;
    msg="Wait..";
    self.setStatusPos(pos,msg);
     return tok.balanceOf(account)
   }).then(function (tx) {
  //     $("#totalSup").html(ts)
        console.log("tx:");
        console.log(tx);
      // Should I use msg=ts.valueOf(); ?
        msg=tx.valueOf();
        msg=web3.fromWei(msg);
        self.setStatusPos(pos,msg);
  });

},

sendToken: function () {
  var self=this;
  var pos="#transfer_result";
  var instance;
  var msg;
  var tok;
  var val = $("#transfer_am").val();
  var to = $("#transfer_to").val();

  val=web3.toWei(val);
//  to=web3.toWei(val);


  Token.deployed().then(function(instance){
    tok=instance;
    msg="Wait..";
    /**

    **/
     return tok.transfer(to, val, {from: account})
   }).then(function (tx) {
        console.log("tx:");
        console.log(tx);
        msg="Transaction complete";
        self.setStatusPos(pos,msg);
        self.refreshAddress();
  }).catch(function(e) {
      console.log(e);

     msg="Ошибка при отправке, смотри консоль";
     setStatusPos(pos,msg);
    });
},


// Send to,val. Be aware of number type in "to".
sendTokVal: function (to,val) {
  var self=this;
//  var pos="#transfer_result";
  var instance;
  var msg;
  var tok;
//  var amnt;
//  val=web3.toWei(val);
//  to=web3.toWei(val);


  Token.deployed().then(function(instance){
    tok=instance;
//    msg="Wait..";

     return tok.transfer(to, val, {from: account})
   }).then(function (tx) {
        console.log("tx:");
        console.log(tx);
    //    msg="Transaction complete";
    //    self.setStatusPos(pos,msg);
    //    self.refreshAddress();
  }).catch(function(e) {
      console.log(e);

  //   msg="Ошибка при отправке, смотри консоль";
  //   setStatusPos(pos,msg);
    });
},

mintToken: function(){

//мфк ыуда = ершы
var self=this;

var instance;
var msg;
var tok;

var val = $("#mint_am").val();
var to = $("#mint_to").val();


var pos="#mint_result";
msg="Инициализация, ждите";
//setStatus(msg);
setStatusPos(pos, msg);
var cb;  // cb - баланс до чеканки

Token.deployed().then(function(instance){
  tok=instance;
//    msg="Wait..";
  //запрашиваем баланс до чеканки
  return tok.balanceOf(to);
}).then(
  function (prev) {
    cb=prev; //запоминаем старый баланс
    tok.mintToken(to, val, {from:account}); //
    console.log('val=');
     console.log(val);
  }).then(function () {
    function(){
 msg="Чеканка";
   setStatus(msg);
   setStatusPos(pos, msg);
   self.ShowSupply();
   self.hubBalance();
 }).then(
   function (){
    return return tok.balanceOf(to); //запрашиваем баланс ПОСЛЕ чеканки
msg="Проверка";
    setStatus(msg);
    setStatusPos(pos,msg);
    totalSup();
  //  console.log(check);
  }).then(
    function(cheked){

  //если новый баланс - старый баланс = значению эмиссии, то эмиссия прошла успешно
      if(cheked-cb==val||val==0) {
      msg="Эмиссия прошла успешно";
    //  setStatus(msg);
      setStatusPos(pos,msg);
      console.log('oldbalance');
      console.log(cb);
    //  console.log(check);
    console.log('newbalance');
      console.log(cheked);
    } else {
      msg="Что-то пошло не так";
    //  setStatus(msg);
      setStatusPos(pos,msg);
      console.log('oldbalance');
      console.log(cb);
    //  console.log(check);
    console.log('newbalance');
      console.log(cheked);
    }
  });

},


// Function for auto transaction from database (proto)
/**
getAll: function () {

  var self=this;
  var pos="#AllResult";
  var instance;
  var msg="getting data..";
  var tok;

  self.setStatusPos(pos,msg);

//
  const options = {
    method: 'GET',
    uri: 'https://boinc.drugdiscoveryathome.com/credits.php?appid=7&key=jjkcsd780987dschuds87'
  };
  console.log(options);



  request(options)
    .then(function (data) {
      // Request was successful, use the response object at will
      console.log(data);
    var res;
    res=JSON.parse(data);
    console.log(res);
    console.log(res.Jobs);
    var obj_name = res.Jobs;
    var arr
    arr=obj_name.object_name;
      msg="parsing...";
     self.setStatusPos(pos,msg);

     var count=0;

     async.forEach(arr, function (item, callback){
  //  console.log(item); // print the key
//  console.log("credits");
//  console.log(item.granted_credit);
  var gc=item.granted_credit;
  var address=item.address;
  var amnt=gc/1000;
//  console.log("amount in ether");
//  console.log(amnt);
  amnt=web3.toWei(amnt);
//  console.log("amount in wei:");

//  console.log(amnt);

//  console.log("amount in int wei");
  amnt=parseInt(amnt,10);
//  console.log(amnt);
//  console.log(address);
msg="transaction sending..";
self.setStatusPos(pos,msg);
  self.sendTokVal(address,amnt);

var id=item.id;
//console.log("id:");
//console.log(id);
var wid=item.workunitid;
//console.log("wid");
var hostid=item.hostid;
//console.log("hostid");
//console.log(hostid);
var ampaid=amnt;
ampaid=web3.fromWei(ampaid);
//console.log("ampaid");
//console.log(ampaid);

$.post(
      "https://boinc.drugdiscoveryathome.com/credits_get.php",
      {
        id:id,
        workunitid:wid,
        hostid:hostid,
        amount_paid:ampaid
      },
      insSuccess
      );

function insSuccess(data) {
  console.log("inserted");
  console.log(data);
};
/**
const options2 = {
  method: 'POST',
  uri: 'https://boinc.drugdiscoveryathome.com/credits_get.php',
  body: {
  id:id,
  workunitid:wid,
  hostid:hostid,
  amount_paid:ampaid,
  hello:'privet'

},
json: true
  };
//};
console.log(options2);

request(options2);




    count++;

    // tell async that that particular element of the iterator is done
    if(arr.length == count) callback();




}, function(err) {
    console.log('iterating done');

})
}).then(function () {

  msg='processing, see console..';
  self.setStatusPos(pos,msg)

   }).catch(function (err) {
      // Something bad happened, handle the error
      console.log(err);
    })





},
**/


// Test function to test connection with server
sendJSON: function () {




/**
  const options = {
    method: 'POST',
    uri: 'https://boinc.drugdiscoveryathome.com/credits_get.php',
    body: {
  foo: 'bar',
  hello:'privet'
},
json: true
  };
  console.log(options);

  request(options).then(function (data) {

});
**/

/**
$.post(
      "https://boinc.drugdiscoveryathome.com/credits_get.php",
      {
        foo:'hello'
      },
      insSuccess
      );

function insSuccess(data) {
  console.log("inserted");
};
**/



/**
$.post(
      "/proxy.php",
      {
        csurl:'https://boinc.drugdiscoveryathome.com/credits_get.php',
        id:'1',
        workunitid:'1',
        hostid:'1',
        amount_paid:'0'
      },
      insSuccess
      );

function insSuccess(data) {
  console.log("inserted");
  console.log(data);
};
**/

}









// End of window.App
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 Coin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});

// old dummy:


/**

window.onload = function() {





    //Get address
      var token = MyAdvancedToken.at(MyAdvancedToken.deployed_address);


    //Set adress of deployed contract
    $("#tokdAddress").html(MyAdvancedToken.deployed_address);
    //Creating instance
     myTokenInstance=token;

console.log(myTokenInstance);


//Set deci
deci=18;

//Set rules of transform numbers
DeciPow(deci);

    //Check Values
  //  checkValues();

    //Check Total Supply
    totalSup();

   //refresh Balance
    refreshBalance();




//deci = myTokenInstance.decimals.call();
//deci=myTokenInstance.getDecimals.call();
//console.log('decimals:');
//console.log(deci);

   });
//




    //Warmig up UI
    $("#transfer").click(function() {
    		var val = $("#transfer_am").val();
        val=transformIn(val);
    //    console.log("transfer_val:");
    //    console.log(val);
    		var to = $("#transfer_to").val();
    		sendCoin(to, val);
    	});

//




//  var tokenDecl=
// function(token) {
//    console.log(token);
//      myTokenInstance = token;
  //    checkValues();
//  };
//  myTokenInstance = tokenDecl(token);
//  console.log(myTokenInstance);
//  tokenDecl(token);

  };

function setStatus(message) {
//  var status = document.getElementById("status");
//  status.innerHTML = message;
  $("#status").html(message);
};

function setStatusPos(pos, msg){
$(pos).html(msg);

};

function checkValues() {
  myTokenInstance.owner.call().then(

    function(organizer) {
      $("input#tokdOrganizer").val(organizer);
      return myTokenInstance.getBalance.call(account, {from: account});
  //    return myTokenInstance.numRegistrants.call();
  })
     .then(
       function(bal) {
         var be=bal.valueOf();
         $("#balance").html(be);
         return myTokenInstance.owner.call();

       });
}

function refreshBalance(){

 myTokenInstance.getBalance.call(account, {from: account}).then(function(value) {
   // be = balance_element
var be=value.valueOf();
//console.log("be:");
//console.log(be);
var be_val;
be_val=transformOut(be);
//console.log("be_val");
//.log(be_val);

// senderWei=web3.toWei(be);
//console.log('balance:');
//console.log(be);
$("#balance").html(be_val);
//console.log(value);
//console.log(be);
}).catch(function(e){
console.log(e);
setStatus("Error getting balance; see log.");

});
}

function difBalance(nacc, numa){
  myTokenInstance.getBalance.call(nacc, {from: account}).then(function(value) {
    // be = balance_element
 var be=value.valueOf();


 $(numa).html(be);
 //console.log(value);
 //console.log(be);
 }).catch(function(e){
 console.log(e);
 setStatus("Error getting balance; see log.");

 });
}



function totalSup(){
var msg="Инициализация";
var pos="#totalSup";
setStatusPos(msg, pos);
return myTokenInstance.totalSupply.call().then(
function (sup){
  val=sup.valueOf();
  msg=transformOut(val);
//msg=sup;
//console.log(sup);
//console.log(msg);
setStatusPos(pos, msg);

});

}

//Power to Decimals!
function DeciPow(deci) {
   mroot=Math.pow(10,deci);
   return mroot;

}



// to Wei
function transformIn(val) {
val=val*mroot;
//console.log("In:");
//console.log(val);
return val;


}

//from Wei
function transformOut(val) {

  // var am_prime=val;
   val=val/mroot;
//console.log("Out:");
//.log(val);
   return val;


}


 function sendCoin(to, val) {
//  var meta = MetaCoin.deployed();


//console.log(to);
//console.log(val);

var msg;
var pos = "#transfer_result";
var msg_transfer;
setStatus("Initiating transaction... (please wait)");
// msg_transfer="Инициализация (пожалуйста,подождите)";
// $("#transfer_result").html(msg_transfer);
msg="Инициализация (пожалуйста,подождите)";
setStatusPos(pos,msg);
// getBalSenderWei();
//getBalRecipientWei(to);
myTokenInstance.transfer(to, val, { from: account}).then(
  function (){
   setStatus("Transaction complete!");

  // msg_transfer="Транзакция выполнена";
  // $("#transfer_result").html(msg_transfer);
  msg="Транзакция выполнена";
  setStatusPos(pos,msg);
   refreshBalance();
 }).catch(function(e) {
     console.log(e);
     setStatus("Error sending coin; see log.");
    // msg_transfer="Ошибка при отправке, смотри консоль";
    // $("#transfer_result").html(msg_transfer);
    msg="Ошибка при отправке, смотри консоль";
    setStatusPos(pos,msg);
   });
  }

**/
