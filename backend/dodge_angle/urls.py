from django.contrib import admin
from django.urls import path, include

from summoner import views

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

#설정
schema_view = get_schema_view(
   openapi.Info(
      title="Dodge Angle API",
      default_version='v1',
      description="닷지각 API 서버입니다.",
   ),
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include('champion.urls')),
    path('api/v1/summoner/', include('summoner.urls')),

    path('api/v1/summonerA/<str:username>/', views.test_data),
    
    path('swagger/', schema_view.with_ui('swagger')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)