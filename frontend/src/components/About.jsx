import React from "react";

function About() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Welcome to our Stock Price Prediction Web App!
            </h2>
            <p className="mb-4">
              At ABCD.com, we're passionate about providing innovative solutions
              to help investors make informed decisions in the dynamic world of
              stock trading. Our web app combines advanced machine learning
              algorithms with sentiment analysis of social media data to offer
              predictive insights into stock price movements.
            </p>
            <h2 className="text-xl font-bold text-gray-900 pb-2">
              What We Offer
            </h2>

            <p>
              <strong className="font-bold text-lg text-gray-800 pb-2">
                Stock Price Prediction:
              </strong>{" "}
              Our machine learning models analyze historical stock data and
              identify patterns to predict future price movements. By leveraging
              advanced algorithms, we aim to provide accurate forecasts to help
              users anticipate market trends and make informed trading
              decisions.
            </p>
            <br></br>
            <p>
              <strong className="font-bold text-lg text-gray-800 pb-2">
                Sentiment Analysis of Tweets:
              </strong>{" "}
              In today's digital age, social media plays a significant role in
              shaping market sentiments. Our web app utilizes natural language
              processing techniques to analyze tweets related to specific stocks
              and gauge investor sentiment. By monitoring social media
              sentiment, users can gain valuable insights into market sentiment
              and potential price fluctuations.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src="https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg"
              alt="office content 1"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://bsmedia.business-standard.com/_media/bs/img/misc/2023-03/21/full/market-stocks-stock-market-trading-stock-market-1679390510-62072620.jpg"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
