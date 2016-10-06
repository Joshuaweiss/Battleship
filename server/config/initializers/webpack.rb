rev_manifest_path = 'public/assets/webpack/webpack-assets.json'

if File.exist?(rev_manifest_path)
  ::WEBPACK_MANIFEST = JSON.parse(File.read(rev_manifest_path))
  puts "LOADED WEBPACK MANIFEST"
  #puts "'#{WEBPACK_MANIFEST}'"
else
  puts "WEBPACK_MANIFEST NOT FOUND"
end
