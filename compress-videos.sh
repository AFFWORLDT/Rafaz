#!/bin/bash

# Video Compression Script for Rafaz Properties
# This script helps compress large video files for better web performance

echo "🎬 Video Compression Script"
echo "============================"
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt-get install ffmpeg"
    echo "   Windows: Download from https://ffmpeg.org/download.html"
    exit 1
fi

echo "✅ FFmpeg is installed"
echo ""

# Create backup directory
mkdir -p public/backup

# Compress herooo.mp4
if [ -f "public/herooo.mp4" ]; then
    echo "📹 Compressing herooo.mp4..."
    # Backup original
    cp public/herooo.mp4 public/backup/herooo-original.mp4
    
    # Compress with high quality but smaller size
    ffmpeg -i public/herooo.mp4 \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -vf "scale=1920:-1" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        public/herooo-compressed.mp4
    
    # Get original and compressed file sizes
    ORIGINAL_SIZE=$(du -h public/herooo.mp4 | cut -f1)
    COMPRESSED_SIZE=$(du -h public/herooo-compressed.mp4 | cut -f1)
    
    echo "   Original size: $ORIGINAL_SIZE"
    echo "   Compressed size: $COMPRESSED_SIZE"
    echo "   ✅ Compressed file saved as: public/herooo-compressed.mp4"
    echo ""
else
    echo "⚠️  public/herooo.mp4 not found"
fi

# Compress hero3.mp4
if [ -f "public/hero3.mp4" ]; then
    echo "📹 Compressing hero3.mp4..."
    # Backup original
    cp public/hero3.mp4 public/backup/hero3-original.mp4
    
    # Compress with high quality but smaller size
    ffmpeg -i public/hero3.mp4 \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -vf "scale=1920:-1" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        public/hero3-compressed.mp4
    
    # Get original and compressed file sizes
    ORIGINAL_SIZE=$(du -h public/hero3.mp4 | cut -f1)
    COMPRESSED_SIZE=$(du -h public/hero3-compressed.mp4 | cut -f1)
    
    echo "   Original size: $ORIGINAL_SIZE"
    echo "   Compressed size: $COMPRESSED_SIZE"
    echo "   ✅ Compressed file saved as: public/hero3-compressed.mp4"
    echo ""
else
    echo "⚠️  public/hero3.mp4 not found"
fi

echo "✅ Compression complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Review the compressed videos"
echo "   2. If quality is acceptable, replace originals:"
echo "      mv public/herooo-compressed.mp4 public/herooo.mp4"
echo "      mv public/hero3-compressed.mp4 public/hero3.mp4"
echo "   3. Original files are backed up in public/backup/"

