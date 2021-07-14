# -*- Encoding: UTF-8 -*- #
import cv2 
import os 
try: 
        from PIL import Image 
except ImportError: 
        import Image 
import pytesseract
import sys
import io


sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')

src = cv2.imread('path/result0.png', cv2.IMREAD_GRAYSCALE)
dst = cv2.GaussianBlur(src, (0, 0), 1)

filename = 'path/result1'+'123.png'
cv2.imwrite(filename, dst)

# Simple image to string 
text = pytesseract.image_to_string(Image.open(filename), lang="kor") 
print(text)


#pip install opencv-python
#pip install pytesseract
