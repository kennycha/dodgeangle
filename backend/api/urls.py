from django.urls import path
from . import views

urlpatterns = [
    path('<str:words>', views.get_word, name='get_word'),
]
