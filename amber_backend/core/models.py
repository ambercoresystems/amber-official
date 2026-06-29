# core/models.py
from django.db import models

class Event(models.Model):
    EVENT_TYPES = [
        ('Workshop', 'Workshop Conducted'),
        ('Attended Event', 'Attended Event'),
        ('Inauguration', 'Inauguration Ceremony'),
        ('Conference', 'Conference Presentation'),  # 🌟 Added
        ('Fest', 'Fest'),        # 🌟 Added
        ('Special Day', 'Special Day Celebration'),  # 🌟 Added
    ]
    title = models.CharField(max_length=255)
    event_type = models.CharField(max_length=50, choices=EVENT_TYPES, default='Workshop')
    date = models.DateField()
    description = models.TextField()
    
    cover_image = models.ImageField(upload_to='event_covers/', blank=True, null=True)
    gallery_images = models.JSONField(default=list, blank=True) 

    def __str__(self):
        return self.title