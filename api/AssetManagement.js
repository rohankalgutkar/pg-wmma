var getAssets = function () {
  console.log('getting your assets..');

  var arrBankDetails =[];
  if(arrBankDetails.length == 0)
    bankSetup = false;
    
  var arrInvestments =[];
  if(arrInvestments.length == 0)
    investmentSetup = false;

  return {
    bankSetup, investmentSetup
  };
}

module.exports = {
  getAssets
};
