#!/bin/bash
# Simple script to create icons using ImageMagick (if available)
# Alternative: Use the Python script instead

mkdir -p icons

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Please use create-icons.py instead:"
    echo "  python3 create-icons.py"
    exit 1
fi

# Create 16x16 icon
convert -size 16x16 xc:'#3b82f6' \
    -fill white -draw 'polygon 8,2 3,8 3,12 8,14 13,12 13,8' \
    -stroke white -strokewidth 1 \
    -draw 'line 6,8 8,10 10,6' \
    icons/icon16.png

# Create 48x48 icon
convert -size 48x48 xc:'#3b82f6' \
    -fill white -draw 'polygon 24,6 9,24 9,36 24,42 39,36 39,24' \
    -stroke white -strokewidth 2 \
    -draw 'line 18,24 24,30 30,18' \
    icons/icon48.png

# Create 128x128 icon
convert -size 128x128 xc:'#3b82f6' \
    -fill white -draw 'polygon 64,16 24,64 24,96 64,112 104,96 104,64' \
    -stroke white -strokewidth 3 \
    -draw 'line 48,64 64,80 80,48' \
    icons/icon128.png

echo "✅ Icons created successfully!"
