from textblob import TextBlob

# Text for sentiment analysis
text = "I love TextBlob. It's an amazing library!"
# text = "Apple sold over 🚨 $51 million in shares this week, more than half coming from CEO Tim Cook. Not a great vote of confidence with shares trading at five month lows."

# Create a TextBlob object
blob = TextBlob(text)

# Perform sentiment analysis
sentiment_polarity = blob.sentiment.polarity
print(sentiment_polarity)
# Interpret the sentiment
if sentiment_polarity > 0:
    print("The text is positive.")
elif sentiment_polarity < 0:
    print("The text is negative.")
else:
    print("The text is neutral.")
