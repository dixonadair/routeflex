require 'yelp'
require 'awesome_print'

desc 'test yelp'
task test_yelp: :environment do

    Yelp.client.configure do |config|
    	config.consumer_key = ENV['CONSUMER_KEY']
    	config.consumer_secret = ENV['CONSUMER_SECRET']
    	config.token = ENV['TOKEN']
    	config.token_secret = ENV['TOKEN_SECRET']
    end

    params = { term: 'Costco', limit: 5 }

    p Yelp.client.search('San Francisco', params)
end