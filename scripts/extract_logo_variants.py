#!/usr/bin/env python3
"""
Extract three brand logo variants from the supplied 3-up plate, write
transparent navbar-ready cutouts and solid-background swatches, and
regenerate favicons (white background + light monogram) from the top tile.

Default source: public/assets/brand/logo-source-plate.png (copy of the 3-up plate).

Usage: python3 scripts/extract_logo_variants.py [path-to-source-plate.png]
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
BRAND_DIR = ROOT / "public" / "assets" / "brand"
REPO_PLATE = BRAND_DIR / "logo-source-plate.png"
CURSOR_FALLBACK = (
    Path.home()
    / ".cursor"
    / "projects"
    / "Users-anthonywen04-Documents-GitHub-real-estate-pat"
    / "assets"
    / "afe9c4d3441581cf8147bd3c604e77da-4d3ffe9a-3add-4af7-8bd5-d89a84a0c8d2.png"
)


def resolve_source_path() -> Path:
    if len(sys.argv) > 1:
        p = Path(sys.argv[1]).expanduser()
        if not p.is_file():
            raise SystemExit(f"Source plate not found: {p}")
        return p
    if REPO_PLATE.is_file():
        return REPO_PLATE
    if CURSOR_FALLBACK.is_file():
        return CURSOR_FALLBACK
    raise SystemExit(
        f"Add the 3-up logo plate at {REPO_PLATE} "
        f"or pass a path argument. (Tried {CURSOR_FALLBACK})"
    )


def autocrop_padding(img: Image.Image, pad: int = 24) -> Image.Image:
    """Trim transparent margin, leaving a small breathing room border."""
    bbox = img.getbbox()
    if bbox is None:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def knockout_color(
    rgb: Image.Image,
    target: tuple[int, int, int],
    tolerance: int = 28,
    edge_softness: int = 18,
) -> Image.Image:
    """
    Convert pixels close to `target` color to transparency, with a feathered
    edge for anti-aliased rims.
    """
    rgba = rgb.convert("RGBA")
    src = rgba.load()
    out = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    dst = out.load()
    tr, tg, tb = target
    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, _ = src[x, y]
            d = max(abs(r - tr), abs(g - tg), abs(b - tb))
            if d <= tolerance:
                dst[x, y] = (r, g, b, 0)
            elif d <= tolerance + edge_softness:
                a = int(255 * (d - tolerance) / edge_softness)
                dst[x, y] = (r, g, b, a)
            else:
                dst[x, y] = (r, g, b, 255)
    return out


def fit_in_square(
    img: Image.Image,
    size: int,
    pad: float = 0.97,
    bg: tuple[int, int, int, int] | None = None,
) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    cropped = img.crop(bbox)
    cw, ch = cropped.size
    scale = min(size / cw, size / ch) * pad
    nw = max(1, int(cw * scale))
    nh = max(1, int(ch * scale))
    resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), bg or (0, 0, 0, 0))
    ox = (size - nw) // 2
    oy = (size - nh) // 2
    canvas.paste(resized, (ox, oy), resized)
    return canvas


def favicon_white_bg(monogram_rgba: Image.Image, size: int) -> Image.Image:
    """
    Solid white tile + light-theme monogram (black + gold on transparent).
    Matches the top / print version of the brand plate.
    """
    white = (255, 255, 255, 255)
    out = Image.new("RGBA", (size, size), white)
    margin = max(10, size // 12)
    inner = size - 2 * margin
    glyph = fit_in_square(monogram_rgba, inner, pad=0.93)
    ox = (size - glyph.width) // 2
    oy = (size - glyph.height) // 2
    out.alpha_composite(glyph, (ox, oy))

    rim = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    rdraw = ImageDraw.Draw(rim)
    rdraw.rounded_rectangle(
        (1, 1, size - 2, size - 2),
        radius=size // 9,
        outline=(13, 13, 13, 28),
        width=max(1, size // 96),
    )
    out.alpha_composite(rim)
    return out


def isolate_monogram(rgba: Image.Image) -> Image.Image:
    """
    Find the top cluster of opaque pixels (the script `Pw` + Space Needle mark)
    and return just that crop. Looks for the first vertical gap of empty rows
    after a stretch of content.
    """
    W, H = rgba.size
    px = rgba.load()

    def row_has_ink(y: int, threshold: int = 5) -> bool:
        n = 0
        for x in range(W):
            if px[x, y][3] > 32:
                n += 1
                if n >= threshold:
                    return True
        return False

    # Walk down: find first inked row, then first gap after content begins.
    top = None
    for y in range(H):
        if row_has_ink(y):
            top = y
            break
    if top is None:
        return rgba

    in_content = True
    bottom = H
    for y in range(top, H):
        if row_has_ink(y):
            in_content = True
        else:
            if in_content:
                # Confirm a real gap (>= 6 consecutive empty rows)
                gap = 0
                for k in range(y, min(H, y + 12)):
                    if not row_has_ink(k):
                        gap += 1
                if gap >= 6:
                    bottom = y
                    break
                in_content = False

    cropped = rgba.crop((0, top, W, bottom))
    cropped = cropped.crop(cropped.getbbox() or (0, 0, cropped.width, cropped.height))
    return cropped


def main() -> None:
    src_path = resolve_source_path()

    BRAND_DIR.mkdir(parents=True, exist_ok=True)

    plate = Image.open(src_path).convert("RGB")
    W, H = plate.size

    # Composite split (eyeballed from the 3-up plate that ships in /assets):
    # top half = light (white bg), bottom half = black (left) + gold (right).
    light_box = (0, 0, W, int(H * 0.555))
    dark_box = (0, int(H * 0.555), W // 2, H)
    gold_box = (W // 2, int(H * 0.555), W, H)

    light_plate = plate.crop(light_box)
    dark_plate = plate.crop(dark_box)
    gold_plate = plate.crop(gold_box)

    # Sample background near the corners to drive the knockout color.
    def corner_bg(im: Image.Image) -> tuple[int, int, int]:
        return im.getpixel((4, 4))

    light_bg = corner_bg(light_plate)
    dark_bg = corner_bg(dark_plate)
    gold_bg = corner_bg(gold_plate)

    # Solid swatches (preserve the original brand tile).
    light_plate.save(BRAND_DIR / "patricia-wen-logo-light-plate.png", optimize=True)
    dark_plate.save(BRAND_DIR / "patricia-wen-logo-dark-plate.png", optimize=True)
    gold_plate.save(BRAND_DIR / "patricia-wen-logo-gold-plate.png", optimize=True)

    # Transparent cutouts for use on matching backgrounds.
    light_cut = autocrop_padding(knockout_color(light_plate, light_bg, 28, 18))
    dark_cut = autocrop_padding(knockout_color(dark_plate, dark_bg, 32, 18))
    gold_cut = autocrop_padding(knockout_color(gold_plate, gold_bg, 32, 18))

    light_cut.save(BRAND_DIR / "patricia-wen-logo-light.png", optimize=True)
    dark_cut.save(BRAND_DIR / "patricia-wen-logo-dark.png", optimize=True)
    gold_cut.save(BRAND_DIR / "patricia-wen-logo-gold.png", optimize=True)

    # Default `patricia-wen-logo.png` mirrors the light cutout (most reusable).
    light_cut.save(BRAND_DIR / "patricia-wen-logo.png", optimize=True)

    # Favicons: white background + light monogram (top tile / print colors).
    monogram = isolate_monogram(light_cut)
    monogram.save(BRAND_DIR / "patricia-wen-monogram.png", optimize=True)

    favicon = ROOT / "public" / "favicon.png"
    apple = ROOT / "public" / "apple-touch-icon.png"
    favicon_white_bg(monogram, 256).save(favicon, optimize=True)
    favicon_white_bg(monogram, 180).save(apple, optimize=True)

    print("wrote:")
    for p in [
        "patricia-wen-logo-light-plate.png",
        "patricia-wen-logo-dark-plate.png",
        "patricia-wen-logo-gold-plate.png",
        "patricia-wen-logo-light.png",
        "patricia-wen-logo-dark.png",
        "patricia-wen-logo-gold.png",
        "patricia-wen-logo.png",
        "patricia-wen-monogram.png",
    ]:
        print("  ", BRAND_DIR / p)
    print("  ", favicon)
    print("  ", apple)


if __name__ == "__main__":
    main()
