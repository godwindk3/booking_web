from fastapi import APIRouter, status
from typing import List
import ultraimport
validation_models = ultraimport("__dir__/../models/validation_models.py")

router = APIRouter(prefix="/accommodation", tags=["ACCOMMODATION"])
