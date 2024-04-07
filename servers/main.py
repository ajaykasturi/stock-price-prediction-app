from fastapi import FastAPI
from textblob import TextBlob
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, date, timedelta

scaler = MinMaxScaler(feature_range=(0,1))

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    return {"message":"server is running"}
@app.post("/sentiment")
def read_root(sentences: list[str]):
    pos = 0
    neg = 0
    nu = 0
    sentiments = []
    for sent in sentences:
        blob = TextBlob(sent)
        sentiment_polarity = blob.sentiment.polarity
        sentiments.append(sentiment_polarity)
        if(sentiment_polarity>0):
            pos+=1
        elif (sentiment_polarity<0):
            neg+=1
        else:
            nu+=1
    return {"positive":pos,"negative":neg,"neutral":nu,"sentiments":sentiments,"length":len(sentences)}

@app.post("/predict")
def predict_price(symbol: list[str]):
    # return {"predicted": symbol[0]}
    symbol = symbol[0]
    model = load_model(f'./models/{symbol}.keras')
    start = '2021-01-01'
    stock = symbol
    data = yf.download(stock, start,datetime.now())
    # return {"p":data.values.aslist()}
    data.reset_index(inplace=True)
    data.dropna(inplace=True)
    data_test = pd.DataFrame(data.Close[0:])
    data_test_scale  =  scaler.fit_transform(data_test.tail(100))
    x_future = []
    x_future.append(data_test_scale)
    x_future = np.array(x_future)
    n_days = 5
    future_prices = []
    x_100 = x_future
    for i in range(n_days):
        future_predict = model.predict(x_100)
        price = future_predict[0,0]
        future_prices.append([price])
        last_price = np.array([[[price]]])
        x_100 = x_100[:, 1:, :]
        x_100 = np.concatenate((x_100, last_price), axis=1)
    future_stocks = scaler.inverse_transform(np.array(future_prices))
    start_date = datetime.now().date()
    num_days = n_days
    # Create an array of dates
    date_array = np.array([start_date + timedelta(days=i) for i in range(num_days)])
    df = pd.DataFrame({'Date': date_array, 'Predicted_Price': future_stocks.flatten()})
    return {"predicted":df.values.tolist()}

