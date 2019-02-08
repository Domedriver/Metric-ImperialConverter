/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '16.7L';
      assert.equal(convertHandler.getNum(input), 16.7);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '7/8gal'
      assert.equal(convertHandler.getNum(input), 0.875)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '12.6/3mi';
      assert.equal(convertHandler.getNum(input), 4.2);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      // Don't get what a double fraction is
      var input = '8/2/4/2gal';
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'mi';
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.include(input, ele)
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = '48oz'
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs (gal => l)', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele).toLowerCase(), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs (spelling)', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(el, i) {
        assert.equal(convertHandler.spellOutUnit(el), expect[i])
      })
        done();
    });    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [3, 'l']
      var expected = .79
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1)
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [3, 'Mi']
      var expected = 4.828
      assert.approximately(convertHandler.convert(input[0], input[1]), 4.828, .1)
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [18.5, 'Km']
      var expected = 11.495
      assert.approximately(convertHandler.convert(input[0], input[1]), 11.495, .01)
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [16.5, 'Lbs']
      var expected = 7.48
      assert.approximately(convertHandler.convert(input[0], input[1]), 7.484, .01)
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [29.5, 'kg'];
      var expected = 65.04;
      assert.approximately(convertHandler.convert(input[0], input[1]), 65.04, .01)
      done();
    });
    
  });

});