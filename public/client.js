var form = document.getElementById('subForm')
var jsonCont = document.getElementById('json-container')
var jsonText = document.getElementById('convert-text')

function makeUrl(url, name, value) {
  url += url.indexOf('?') == -1 ? '?' : '&';
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url  
}

form.addEventListener('submit', function(event) {  
  event.preventDefault()    
  var name = form.elements.input.name
  var value = form.elements.input.value
  var url = makeUrl('/api/convert', name, value)    
  var req = new XMLHttpRequest();
  req.open('GET', url, true)   
  req.send()  
  req.onload = function() {
    jsonCont.textContent = '';
    try {
      var json = JSON.parse(req.responseText)
      jsonCont.textContent = JSON.stringify(json, null, " ")
      jsonText.textContent = json.string
      
    } catch (error) {
      json = req.responseText
      jsonText.textContent = json
    }
  }
})

