class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :url
      t.date :date
      t.integer :elevation_from
      t.integer :elevation_to

      t.timestamps
    end
  end
end
