json.extract! photo, :id, :url, :date, :elevation_from, :elevation_to, :created_at, :updated_at
json.url photo_url(photo, format: :json)
