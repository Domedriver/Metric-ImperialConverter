/*
*
*
*       Complete the handler logic below
*       
*       
*/

var split = /[GgLlMmKk]/
var conversionObj = {
  gal: {returnUnit: 'L', text: 'gallons', textConvert: 'liters'},
  l: {returnUnit: 'gal', text: 'liters', textConvert: 'gallons'},
  lbs: {returnUnit: 'kg', text: 'pounds', textConvert: 'kilograms'},  
  kg: {returnUnit: 'lbs', text: 'kilograms', textConvert: 'pounds'},
  mi: {returnUnit: 'km', text: 'miles', textConvert: 'kilometers'},
  km: {returnUnit: 'mi', text: 'kilometers', textConvert: 'miles'}  
}

var validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']

function ConvertHandler() {
  
  
  this.getNum = function(input) {    
    var splitPos = input.indexOf(input.match(split))
    var result = input.slice(0, splitPos);
    if (result.length == 0) { result = 1 }
    try {
      result = eval(result)
    } catch(err) {
      result = 'invalid number'
    }    
    return result
  };
  
  this.getUnit = function(input) {        
    var splitPos = input.indexOf(input.match(split))
    var result = input.slice(splitPos);
    if (validUnits.includes(result)) {
      return result
    } else {
      return 'invalid unit';
    }
  };
  
  this.getReturnUnit = function(initUnit) {    
    var result = conversionObj[initUnit].returnUnit;    
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = conversionObj[unit].text;    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    initUnit = initUnit.toLowerCase()
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':        
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        break;
                    }
    return Math.round(result*100000)/100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {    
    var result = initNum + ' ' + conversionObj[initUnit].text + ' converts to ' + returnNum + ' ' + conversionObj[initUnit].textConvert;    
    return result;
  };
  
}

module.exports = ConvertHandler;
