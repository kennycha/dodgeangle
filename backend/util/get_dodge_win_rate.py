import joblib
from sklearn.linear_model import LinearRegression
import pandas as pd
def get_win_rate(champ_list_str):
   
    champ_list = list(map(int,filter(lambda x: x, champ_list_str.split(','))))
    if champ_list:
        champ_KM = pd.read_pickle('util/champ_KM')
        champ_KM_dict = { val[0]:val[1] for _, val in champ_KM.iterrows()}
        
        d = [0,0,0]
        for champ in champ_list:
            d[champ_KM_dict[champ]]+=1
        nd = list(map(lambda x:x/5,d))
        mlr = joblib.load('util/mlr.sav')
        return float(mlr.predict([nd])[0][0])
    return 0.5
