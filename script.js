$(document).ready(function(){

  window.min_ele = parseInt($('#ele-range').attr('min'));
  window.max_ele = parseInt($('#ele-range').attr('max'));
  window.min_date = Date.parse($('#date-range').attr('min'));
  window.max_date = Date.parse($('#date-range').attr('max'));

  $('#ele-range').slider({
    range: true,
    min: min_ele,
    max: max_ele,
    values: [ min_ele, max_ele ],
    slide: function(event, ui) {
      $('#elerangetext').val(ele_range_text(ui.values[0], ui.values[1]));
      window.min_ele = ui.values[0];
      window.max_ele = ui.values[1];
      ele_changed(ui.values[0], ui.values[1]);
    }
  });

  $('#elerangetext').val(ele_range_text(min_ele, max_ele));

  $('#date-range').slider({
    range: true,
    min: min_date,
    max: max_date,
    values: [ min_date, max_date],
    slide: function(event, ui) {
      $('#daterangetext').val(date_range_text(ui.values[0], ui.values[1]));
      window.min_date = ui.values[0];
      window.max_date = ui.values[1];
      date_changed(ui.values[0], ui.values[1]);
    }
  });

  ele_changed(min_ele, max_ele);
  windowChanged();
  date_changed(min_date, max_date);
});

function ele_range_text(min, max) {
  return min + 'm - ' + max + 'm';
}

function date_range_text(min, max) {
  return new Date(min).toLocaleDateString("sk") + ' - ' + new Date(max).toLocaleDateString("sk");
}

function windowChanged() {
  var controls_height = $('#controls').height();
  var width = window.innerWidth;
  var height = window.innerHeight;
  $('.image-wrapper').height(height - controls_height);
}

function ele_changed() {
  console.log(window.min_ele, window.max_ele);
  var ele_range = window.max_ele - window.min_ele;
  if (ele_range == 0) ele_range = 1;
  var image_height = $('img').height();
  var controls_height = $('#controls').height();
  var h = window.innerHeight - controls_height - image_height;
  $('img').each(function(i,img) {
    var ele = parseInt(img.getAttribute('ele'));
    show_or_hide(img);
    console.log(ele_range, h);
    var top = h * (max_ele - ele) / ele_range;
    $(img).css('top', top);
  });
}

function date_changed() {
  console.log(window.min_date, window.max_date);
  var date_range = window.max_date - window.min_date;
  if (date_range == 0) date_range = 1;
  var max_image_width = 400; // TODO calculate based on displayed
  var w = window.innerWidth - max_image_width;
  $('img').each(function(i,img) {
    var date = Date.parse(img.getAttribute('date'));
    show_or_hide(img);
    console.log(date_range, w);
    var left = w * (date - min_date) / date_range;
    $(img).css('left', left);
  });
}

function show_or_hide(img) {
  var date = Date.parse(img.getAttribute('date'));
  var ele = parseInt(img.getAttribute('ele'));
  if (ele < window.min_ele || ele > window.max_ele || date < window.min_date || date > window.max_date) {
    $(img).css('display', 'none');
  } else {
    $(img).css('display', 'inline-block');
  }
}

function daysdifference(date1, date2) {
    var ONEDAY = 1000 * 60 * 60 * 24;
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = Math.abs(date1_ms - date2_ms);
    return Math.round(difference_ms/ONEDAY);
}