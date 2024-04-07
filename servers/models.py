import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime, date, timedelta
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1))
start = '2021-01-01'
stock = 'GOOG'
data = yf.download(stock, start,datetime.now())

data.reset_index(inplace=True)

data.dropna(inplace=True)

data_test = pd.DataFrame(data.Close[0:])

print(data_test.tail())
data_test_scale  =  scaler.fit_transform(data_test.tail(100))
from keras.models import load_model

model = load_model('./models/GOOG.keras')
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

print(df)