var slides = [{title:"1",text:"aaa"}]
var currentSlide = 0;

var addTitle = (title) => {
  $('.sidebar').append(`<h1 id=title>${title}</h1>`)
}

var addText = (text) => {
  $('.sidebar').append(`<p id=text >${text}</p>`)
}

var setColor = (color) => {
  $('#map').css('background-color',color)
}

var cleanup = () => {
  $('#title').remove()
}

var buildSlide = (slideObject) => {
  addTitle(slideObject.title)
  addText(slideObject.text)
  setColor(slideObject.color)
}

buildSlide(slides[currentSlide])
$('#next').click(()=>{
  currentSlide = currentSlide + 1;
  buildSlide([currentSlide])
})
