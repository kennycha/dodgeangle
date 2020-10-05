from django.urls import path

from . import views

app_name = 'summoner'

urlpatterns = [
    path('summoner/<str:username>/', views.get_user_data, name='user_data'),
    path('summonerA/<str:username>/', views.test_data, name='test_data'),
]
