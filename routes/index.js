var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ip', function(req, res, next) {
  res.render('ip',
  {
    item1:'',
    item2:'',
    item3:'',
    item4:'',
    item5:'',
    item6:'',
    item7:'',
    item8:''
  });
});

router.post('/ip', function(req, res, next) {
  
  console.log(req.body);

  if(req.body.ip_Address === ''){
    res.render('success',{msg:'IP NOT VALID',url:'/ip'});
  }else{
    //把取得的表單內容分割並轉成陣列
  let str = req.body.ip_CIDR; 
  let index = str.indexOf("/");//區分CIDR
  let str1  =str.substr(0,index);
  let subnetmask = str1.split('.');//子網遮罩
  //console.log("subnetmask",subnetmask);

  let CIDR = str.substr(index+1);
 
 
  let str2 = req.body.ip_Address;
  let ip = str2.split('.');//IP位置
  //console.log("ip",ip);

  let Xornumber = [];
  let boardcastmask = ['255','255','255','255'];

  for(let i=0;i<4;i++){
    Xornumber.push(subnetmask[i] ^ boardcastmask[i]);
  }

  //console.log("Xornumber",Xornumber);

  let network_address = []
  for(let i=0;i<4;i++){
    network_address.push(ip[i] & subnetmask[i]);
  }

  //console.log("network_address",network_address);

  let ip_start = network_address[3]+1;

  let boardcast_address = [];
  for(let i=0;i<4;i++){
    boardcast_address.push(ip[i] | Xornumber[i]);
  }

  //console.log("boardcast_address",boardcast_address);

  let ip_end = boardcast_address[3]-1;

  //console.log(ip_start);
  //console.log(ip_end); 
  
  let useable_ip = Xornumber[1]*65536+Xornumber[2]*256+Xornumber[3]*1-1;

  //------------------------------------------------------------------//
  let item1 = ip.join('.');
  let item2 = network_address.join('.');
  let item3 = boardcast_address.join('.');

  if(CIDR == 32){
    useable_ip = 0;
  }else{
    network_address[3] = network_address[3]+1;//起始位置
    boardcast_address[3] = boardcast_address[3]-1;//結束位置
  }
  

  let item4 = network_address.join('.');
  let item5 = boardcast_address.join('.');
  let item6 = useable_ip+2;
  let item7 = useable_ip;
  let item8 = subnetmask.join('.');
  
 
  


  res.render('ip',
  {
    item1:item1,
    item2:item2,
    item3:item3,
    item4:item4,
    item5:item5,
    item6:item6,
    item7:item7,
    item8:item8
  });
  }

  
  
  // res.render('success',{msg:'添加成功',url:'/ip'});
});


module.exports = router;
