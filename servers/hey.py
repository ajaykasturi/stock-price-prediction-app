import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime

start = '2010-01-01'
stock = 'INFY'
data = yf.download(stock, start,datetime.now())

data.reset_index(inplace=True)

data.dropna(inplace=True)

data_train = pd.DataFrame(data.Close[0: int(len(data)*0.80)])
data_test = pd.DataFrame(data.Close[int(len(data)*0.80): len(data)])

from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0,1))

data_train_scale = scaler.fit_transform(data_train)

x_train = []
y_train = []
for i in range(100, data_train_scale.shape[0]):
    x_train.append(data_train_scale[i-100:i])
    y_train.append(data_train_scale[i,0])

from keras.layers import Dense, Dropout, LSTM
from keras.models import Sequential

x_train, y_train = np.array(x_train), np.array(y_train)
y_train = y_train.reshape(-1,1)

model = Sequential()
model.add(LSTM(units = 50, activation = 'relu', return_sequences = True,
               input_shape = ((x_train.shape[1],1))))
model.add(Dropout(0.2))

model.add(LSTM(units = 60, activation='relu', return_sequences = True))
model.add(Dropout(0.3))

model.add(LSTM(units = 80, activation = 'relu', return_sequences = True))
model.add(Dropout(0.4))

model.add(LSTM(units = 120, activation = 'relu'))
model.add(Dropout(0.5))

model.add(Dense(units =1))

model.compile(optimizer = 'adam', loss = 'mean_squared_error')

pas_100_days = data_train.tail(100)

data_test_c = pd.concat([pas_100_days, data_test], ignore_index=True)

data_test_scale  =  scaler.fit_transform(data_test_c)

x_test = []
y_test = []

for i in range(100, data_test_scale.shape[0]):
    x_test.append(data_test_scale[i-100:i])
    y_test.append(data_test_scale[i,0])
x_test, y_test = np.array(x_test), np.array(y_test)

y_test = y_test.reshape(-1,1)

model.fit(x_train,y_train, epochs = 50, batch_size =32)

model.save("infosys.keras")


from keras.models import load_model
model = load_model('infosys.keras')

y_predict = model.predict(x_test)

y_predict = scaler.inverse_transform(y_predict)
print(y_predict[:5])

y_test_true = scaler.inverse_transform(y_test)
print(y_test_true[:5])
print("\nfinal\n")
