from .models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead viewsets，在功能上來看，擁有full crud api, create, retrieve, update, delete
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class =  LeadSerializer