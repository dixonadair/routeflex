require 'yelp'

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

  	parameters = { term: params[:stopLoc], limit: 5 }
  	p Yelp.client.search('San Francisco', parameters)

  	# ... to be continued
  end
end
