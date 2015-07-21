# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# For Yelp thing to work:
ENV['CONSUMER_KEY'] = "aRPok9CB261l-miGNmdClQ"
ENV['CONSUMER_SECRET'] = "mJNtSwt1e1iLTJLI9GCFmmzyEi8"
ENV['TOKEN'] = "s8-MTgBMQ0L64LX_55mbHdXWKHnnxGNk"
ENV['TOKEN_SECRET'] = "85QzDdWKUV09Up5C3a2-kHzV1Gs"

# &oauth_consumer_key=aRPok9CB261l-miGNmdClQ&oauth_token=s8-MTgBMQ0L64LX_55mbHdXWKHnnxGNk&oauth_signature_method=hmac-sha1&token_secret=85QzDdWKUV09Up5C3a2-kHzV1Gs