from django.urls import path

from . import views

app_name = 'summoner'

urlpatterns = [
    path('<str:username>/', views.get_user_data, name='user_data'),
]
