#!/bin/bash

# EatRite Android App Icon Generator
# This script generates all required icon sizes for Android app installation

echo "🎨 EatRite Android Icon Generator"
echo "================================"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed. Please install it first:"
    echo "   macOS: brew install imagemagick"
    echo "   Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Input SVG file
INPUT_SVG="../eatrite-full-logo.svg"
ICONS_DIR="../icons"

# Create icons directory if it doesn't exist
mkdir -p "$ICONS_DIR"

echo "📂 Creating icon directory: $ICONS_DIR"

# Required Android icon sizes
declare -a SIZES=(
    "72:72x72"
    "96:96x96" 
    "128:128x128"
    "144:144x144"
    "152:152x152"
    "192:192x192"
    "384:384x384"
    "512:512x512"
)

echo "🖼️  Generating icons from: $INPUT_SVG"

# Generate each icon size
for size_info in "${SIZES[@]}"; do
    IFS=':' read -r size filename <<< "$size_info"
    output_file="$ICONS_DIR/icon-${filename}.png"
    
    echo "   ✨ Generating ${filename} icon..."
    
    convert "$INPUT_SVG" \
        -background none \
        -resize "${size}x${size}" \
        -gravity center \
        -extent "${size}x${size}" \
        "$output_file"
    
    if [ $? -eq 0 ]; then
        echo "      ✅ Created: $output_file"
    else
        echo "      ❌ Failed to create: $output_file"
    fi
done

# Generate favicon
echo "🌟 Generating favicon.ico..."
convert "$INPUT_SVG" \
    -background none \
    -resize "32x32" \
    "../favicon.ico"

if [ $? -eq 0 ]; then
    echo "   ✅ Created: ../favicon.ico"
else
    echo "   ❌ Failed to create favicon.ico"
fi

# Generate shortcut icons
echo "🔗 Generating shortcut icons..."

# Menu shortcut icon (fork and knife)
convert -size 96x96 xc:none \
    -fill "#FF8C00" \
    -draw "circle 48,48 48,20" \
    -fill "white" \
    -font "Arial-Bold" -pointsize 40 \
    -gravity center \
    -annotate 0 "🍽️" \
    "$ICONS_DIR/menu-shortcut.png"

# Orders shortcut icon (package)
convert -size 96x96 xc:none \
    -fill "#FF8C00" \
    -draw "circle 48,48 48,20" \
    -fill "white" \
    -font "Arial-Bold" -pointsize 40 \
    -gravity center \
    -annotate 0 "📦" \
    "$ICONS_DIR/orders-shortcut.png"

# Reorder shortcut icon (refresh)
convert -size 96x96 xc:none \
    -fill "#FF8C00" \
    -draw "circle 48,48 48,20" \
    -fill "white" \
    -font "Arial-Bold" -pointsize 40 \
    -gravity center \
    -annotate 0 "🔄" \
    "$ICONS_DIR/reorder-shortcut.png"

echo "📱 Generating Android adaptive icons..."

# Create maskable icons (with padding for adaptive icons)
for size_info in "${SIZES[@]}"; do
    IFS=':' read -r size filename <<< "$size_info"
    output_file="$ICONS_DIR/icon-${filename}-maskable.png"
    
    # Add 20% padding for safe zone
    padded_size=$((size * 80 / 100))
    
    echo "   🎭 Generating ${filename} maskable icon..."
    
    convert -size "${size}x${size}" xc:"#FF8C00" \
        \( "$INPUT_SVG" -resize "${padded_size}x${padded_size}" \) \
        -gravity center -composite \
        "$output_file"
    
    if [ $? -eq 0 ]; then
        echo "      ✅ Created: $output_file"
    fi
done

echo ""
echo "🎉 Icon generation complete!"
echo ""
echo "📋 Summary:"
echo "   • Generated ${#SIZES[@]} standard app icons"
echo "   • Generated ${#SIZES[@]} maskable adaptive icons"  
echo "   • Generated 3 shortcut icons"
echo "   • Generated favicon.ico"
echo ""
echo "📱 Your EatRite app is now ready for Android installation!"
echo "   Install your PWA by visiting your site and tapping 'Add to Home Screen'"