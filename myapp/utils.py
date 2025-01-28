from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


# Function to create a refresh and access token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


def getNoteList(request):
    # Get only the notes of the logged-in user
    note = Note.objects.filter(user=request.user).order_by("-updated")
    serializer = NoteSerializer(note, many=True)
    return Response(serializer.data)


def createNote(request):
    data = request.data
    note = Note.objects.create(
        user=request.user,  # Associate the note with the logged-in user
        body=data.get("body"),  # Use `.get()` to avoid KeyError if "body" is missing
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def getNoteDetails(request, pk):
    note = Note.objects.get(
        id=pk, user=request.user
    )  # Ensure the note belongs to the logged-in user
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(
        id=pk, user=request.user
    )  # Ensure the note belongs to the logged-in user
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


def deleteNote(request, pk):
    note = Note.objects.get(
        id=pk, user=request.user
    )  # Ensure the note belongs to the logged-in user
    note.delete()
    return Response("Note was deleted")
