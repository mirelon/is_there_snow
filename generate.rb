require 'date'
file = File.open('index.html', 'w')
file.write '<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />'
file.write '<link rel="stylesheet" href="style.css" />'
file.write '<script src="http://code.jquery.com/jquery-3.3.1.js"></script>'
file.write '<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>'
file.write '<script src="script.js" type="text/javascript"></script>'
min_date = Date.new(2100)
max_date = Date.new(1900)
min_ele = 10000
max_ele = 0
file.write '<div class="image-wrapper">'
Dir['*.jpg'].each do |photo|
  parts = /^(\d\d\d\d)-(\d\d)-(\d\d)-(\d+)\.jpg$/.match(photo)
  date = Date.new(parts[1].to_i, parts[2].to_i, parts[3].to_i)
  ele = parts[4].to_i
  max_date = date if date > max_date
  min_date = date if date < min_date
  max_ele = ele if ele > max_ele
  min_ele = ele if ele < min_ele
  file.write "<img title=\"#{ele}m, #{date}\" src=\"#{photo}\" date=\"#{date}\" ele=\"#{ele}\"/>"
end
file.write '</div>'
file.write '<div id="controls">'

file.write "<div id=\"ele-range\" min=\"#{min_ele}\" max=\"#{max_ele}\">"
file.write '<p>
  <label for="elerangetext">Elevation range:</label>
  <input type="text" id="elerangetext" readonly style="border:0; color:#f6931f; font-weight:bold;">
</p>'
file.write "</div>"

file.write "<div id=\"date-range\" min=\"#{min_date}\" max=\"#{max_date}\">"
file.write '<p>
  <label for="daterangetext">Date range:</label>
  <input type="text" id="daterangetext" readonly style="border:0; color:#f6931f; font-weight:bold;">
</p>'
file.write "</div>"
file.write '</div>'
file.close