# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'httparty'
require 'pry'
images = ["beer_icon.jpg","beer-icon2.jpg","beer_icon3.png","beer_icon4.ico"]
page = 1
10.times do
  url = "http://api.brewerydb.com/v2/beers?p=#{page}&withBreweries=Y&key=9ba868847c4bf6b08953652d662267a9"
  response = HTTParty.get(url)
  page += 1

  response["data"].each do |beer|
    name = nil
    description = ""
    brewery = ""
    abv = nil
    ibu = nil
    style = ""
    img = images.sample

    if beer["name"]
      name = beer["name"].tr('"\"','')
    end

    if beer["description"]
      description = beer["description"]
    end

    if beer["style"]
      style = beer["style"]["shortName"]
    end

    if beer["breweries"]
      brewery = beer["breweries"][0]["name"]
    end

    if beer["abv"]
      abv = beer["abv"].to_f
    end

    if beer["ibu"]
      ibu = beer["ibu"].to_i
    end

    Beer.create(name: name, description: description, brewery: brewery, style: style, abv: abv, ibu: ibu, img: img)
  end
end
