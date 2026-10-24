"""Create web-sized WebP assets; retain original files for future edits."""
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
renames = {
    'assets/products/car-head-unit.png': 'android-car-stereo-manufacturer-head-unit',
    'assets/banners/automotive-electronics-banner.png': 'car-radio-manufacturer-product-range',
    'assets/banners/automotive-electronics-mobile.png': 'car-radio-manufacturer-product-range-mobile',
    'assets/about/navlumo-factory-testing-team.png': 'car-radio-manufacturer-testing-team',
    'assets/about/team-research-development.jpg': 'car-stereo-manufacturer-rd-team',
}
records = []
paths = subprocess.check_output(['git', 'ls-files', '-z', 'assets'], cwd=ROOT).decode().split('\0')
for rel in paths:
    source = ROOT / rel
    if source.suffix.lower() not in ('.png', '.jpg', '.jpeg'):
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        max_width = 1400
        quality = 88
        if '/banners/' in rel:
            max_width = 2244 if 'mobile' not in rel else 1190
        elif '/brand/' in rel:
            max_width, quality = 128, 95
        elif '/vehicle-makes/' in rel:
            max_width, quality = 160, 92
        elif '/testimonials/' in rel:
            max_width, quality = 1400, 93
        elif '/testing/' in rel:
            max_width = 700
        elif '/about/team-' in rel:
            max_width = 900
        elif '-feature-' in rel:
            max_width, quality = 960, 92
        image.thumbnail((max_width, max_width * 4), Image.Resampling.LANCZOS)
        output = source.with_name(renames.get(rel, source.stem) + '.webp')
        image.save(output, 'WEBP', quality=quality, method=6)
        variants = []
        if image.width > 800:
            for width in (320, 640, 960):
                if width >= image.width:
                    continue
                resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
                variant = output.with_name(output.stem + f'-{width}w.webp')
                resized.save(variant, 'WEBP', quality=quality, method=6)
                variants.append({'url': '/' + variant.relative_to(ROOT).as_posix(), 'width': width, 'bytes': variant.stat().st_size})
        records.append({'source': '/' + rel, 'url': '/' + output.relative_to(ROOT).as_posix(),
                        'originalBytes': source.stat().st_size, 'bytes': output.stat().st_size,
                        'width': image.width, 'height': image.height, 'variants': variants})
manifest = ROOT / 'scripts/image-optimization-manifest.json'
manifest.write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
before, after = sum(r['originalBytes'] for r in records), sum(r['bytes'] for r in records)
print(json.dumps({'images': len(records), 'originalBytes': before, 'webpBytes': after, 'reductionPercent': round((1-after/before)*100, 1)}))
