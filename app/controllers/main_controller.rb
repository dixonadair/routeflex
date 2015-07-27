require 'yelp'
require 'httparty'
require 'json'

class MainController < ApplicationController
  def index
  end

  def info
  	Yelp.client.configure do |config|
  		config.consumer_key = ENV['CONSUMER_KEY']
  		config.consumer_secret = ENV['CONSUMER_SECRET']
  		config.token = ENV['TOKEN']
  		config.token_secret = ENV['TOKEN_SECRET']
  	end

  	parameters1 = { term: params[:stopLoc1], limit: 5 }
  	parameters2 = { term: params[:stopLoc2], limit: 5 }
  	parameters3 = { term: params[:stopLoc3], limit: 5 }
  	
  	p Yelp.client.search('San Francisco', parameters)

  	direct_route_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{origin}&destination=#{destination}&waypoints=#{pool_coords[1]},#{pool_coords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"

  	originCoords = params[:origin]
  	destinationCoords = params[:destination]

  	# url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{originCoords[1]},#{originCoords[0]}&destination=#{destinationCoords[1]},#{destinationCoords[0]}&key=AIzaSyDirDB7V1F3KwSFublV4KmZPhOGnJ71BLE"
  	# hp_response = HTTParty.get(hp_url).to_json
  	# hp_response = JSON.parse(hp_response)

  	# ... to be continued
  end
end
