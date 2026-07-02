# core/models.py
from django.db import models

class Event(models.Model):
    EVENT_TYPES = [
        ('Workshop', 'Workshop Conducted'),
        ('Attended Event', 'Attended Event'),
        ('Inauguration', 'Inauguration Ceremony'),
        ('Conference', 'Conference Presentation'),
        ('Fest', 'Fest'),
        ('Special Day', 'Special Day Celebration'),
    ]
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True) # 🌟 NEW FIELD ADDED
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='Workshop')
    date = models.DateField()
    description = models.TextField()
    
    cover_image = models.ImageField(upload_to='event_covers/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True) 

    def __str__(self):
        return self.title