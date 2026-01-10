#!/usr/bin/env python3
"""
Simple script to create placeholder icons for Chrome extension
Requires: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow not installed. Installing...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont

import os

def create_icon(size):
    """Create a simple shield icon with checkmark"""
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw blue gradient background (simple solid for now)
    bg_color = (59, 130, 246, 255)  # #3b82f6
    draw.rectangle([0, 0, size, size], fill=bg_color)
    
    # Draw white shield shape
    shield_margin = size * 0.15
    shield_width = size - (shield_margin * 2)
    shield_height = size * 0.7
    
    # Shield points
    top_x = size / 2
    top_y = shield_margin
    left_x = shield_margin
    left_y = size / 2
    right_x = size - shield_margin
    right_y = size / 2
    bottom_x = size / 2
    bottom_y = shield_margin + shield_height
    
    # Draw shield (simplified as rounded rectangle with point)
    shield_points = [
        (top_x, top_y),
        (left_x, left_y),
        (left_x, bottom_y - size * 0.1),
        (bottom_x, bottom_y),
        (right_x, bottom_y - size * 0.1),
        (right_x, left_y),
    ]
    
    # Draw shield outline
    line_width = max(1, size // 16)
    draw.polygon(shield_points, fill=(255, 255, 255, 200), outline=(255, 255, 255, 255), width=line_width)
    
    # Draw checkmark
    check_size = size * 0.3
    check_x = size / 2
    check_y = size / 2
    check_line_width = max(2, size // 12)
    
    # Checkmark path
    draw.line(
        [(check_x - check_size/2, check_y), 
         (check_x - check_size/6, check_y + check_size/3),
         (check_x + check_size/2, check_y - check_size/3)],
        fill=(255, 255, 255, 255),
        width=check_line_width
    )
    
    return img

def main():
    # Create icons directory if it doesn't exist
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)
    
    # Generate icons
    sizes = [16, 48, 128]
    for size in sizes:
        icon = create_icon(size)
        filename = f'{icons_dir}/icon{size}.png'
        icon.save(filename, 'PNG')
        print(f'Created: {filename}')
    
    print('\n✅ All icons created successfully!')
    print('You can now load the extension in Chrome.')

if __name__ == '__main__':
    main()
