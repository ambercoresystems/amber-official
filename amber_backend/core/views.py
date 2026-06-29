# core/views.py
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.core.files.storage import default_storage
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Event
import json

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None and user.is_staff:
        login(request, user)
        return JsonResponse({"message": "Authenticated successfully"}, status=200)
    return JsonResponse({"error": "Invalid administrative credentials"}, status=401)

@csrf_exempt
@api_view(['GET', 'POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def handle_events(request):
    if request.method == 'GET':
        events = []
        for e in Event.objects.all().order_by('-date'):
            events.append({
                "id": e.id,
                "title": e.title,
                "event_type": e.event_type,
                "date": e.date.strftime('%Y-%m-%d'),
                "description": e.description,
                "cover_image": request.build_absolute_uri(e.cover_image.url) if e.cover_image else "",
                "gallery_images": [request.build_absolute_uri(img) for img in e.gallery_images]
            })
        return JsonResponse(events, safe=False)
        
    elif request.method == 'POST':
        title = request.POST.get('title')
        event_type = request.POST.get('type')
        date = request.POST.get('date')
        description = request.POST.get('description')
        cover_image = request.FILES.get('cover_image')
        gallery_files = request.FILES.getlist('gallery_images')
        
        saved_gallery_urls = []
        for file in gallery_files:
            file_path = default_storage.save(f'event_galleries/{file.name}', file)
            file_url = default_storage.url(file_path)
            saved_gallery_urls.append(file_url)

        event = Event.objects.create(
            title=title, event_type=event_type, date=date,
            description=description, cover_image=cover_image, gallery_images=saved_gallery_urls
        )
        return JsonResponse({"message": "Event added!", "id": event.id}, status=201)

@csrf_exempt
@api_view(['PUT', 'DELETE'])
@authentication_classes([])
@permission_classes([AllowAny])
def handle_single_event(request, pk):
    """Handles updating and deleting existing records via specific IDs"""
    event = get_object_or_404(Event, pk=pk)
    
    if request.method == 'PUT':
        event.title = request.POST.get('title', event.title)
        event.event_type = request.POST.get('type', event.event_type)
        event.date = request.POST.get('date', event.date)
        event.description = request.POST.get('description', event.description)
        
        if request.FILES.get('cover_image'):
            event.cover_image = request.FILES.get('cover_image')
            
        if request.FILES.getlist('gallery_images'):
            gallery_files = request.FILES.getlist('gallery_images')
            saved_gallery_urls = []
            for file in gallery_files:
                file_path = default_storage.save(f'event_galleries/{file.name}', file)
                saved_gallery_urls.append(default_storage.url(file_path))
            event.gallery_images = saved_gallery_urls
            
        event.save()
        return JsonResponse({"message": "Updated successfully"})
        
    elif request.method == 'DELETE':
        event.delete()
        return JsonResponse({"message": "Deleted successfully"}, status=200)