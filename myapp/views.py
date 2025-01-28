from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from . import utils
from rest_framework.response import Response
from django.contrib.auth import authenticate

# Create your views here.

########## Login and Signup ######


@api_view(["POST"])
def Signup(request):
    # Expecting username, email, and password in request data
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    print(username, email, password)

    # Ensure all fields are provided
    if not username or not email or not password:
        return Response(
            {"error": "Please provide username, email, and password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Check if the user already exists
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Create a new user
    user = User.objects.create_user(username=username, email=email, password=password)

    # Return tokens after creating the user
    tokens = utils.get_tokens_for_user(user)
    return Response(
        {"message": "User created successfully", "tokens": tokens},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
def Login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    print(username, password)

    # Ensure username and password are provided
    if not username or not password:
        return Response(
            {"error": "Please provide username and password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
        # If authentication is successful, return tokens
        tokens = utils.get_tokens_for_user(user)
        print("TOKENS:", tokens)
        return Response({"tokens": tokens}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "Invalid credentials."}, status=status.HTTP_400_BAD_REQUEST
        )


############ API DATA #########


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes",
        },
        {
            "Endpoint": "/notes/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object",
        },
        {
            "Endpoint": "/notes/id",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting note",
        },
    ]
    return Response(routes)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])  # Protects this view to only authenticated users
def getNotes(request):
    if request.method == "GET":
        return utils.getNoteList(request)

    if request.method == "POST":
        return utils.createNote(request)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])  # Protects this view to only authenticated users
def getNote(request, pk):
    if request.method == "GET":
        return utils.getNoteDetails(request, pk)
    if request.method == "PUT":
        return utils.updateNote(request, pk)
    if request.method == "DELETE":
        return utils.deleteNote(request, pk)
