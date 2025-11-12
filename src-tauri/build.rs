use std::{
    error::Error,
    fs,
    io::Write,
    path::Path,
};

use crc32fast::Hasher;
use flate2::{write::ZlibEncoder, Compression};

fn main() {
    ensure_windows_icon().expect("failed to ensure Windows icon asset");
    tauri_build::build();
}

fn ensure_windows_icon() -> Result<(), Box<dyn Error>> {
    let icon_path = Path::new("icons").join("icon.ico");

    if icon_path.exists() {
        return Ok(());
    }

    if let Some(parent) = icon_path.parent() {
        fs::create_dir_all(parent)?;
    }

    let png_data = generate_png_icon()?;
    let ico = wrap_png_as_ico(&png_data);

    fs::write(icon_path, ico)?;

    Ok(())
}

fn generate_png_icon() -> Result<Vec<u8>, Box<dyn Error>> {
    const WIDTH: usize = 256;
    const HEIGHT: usize = 256;
    const BIT_DEPTH: u8 = 8;
    const COLOR_TYPE_RGBA: u8 = 6;

    let mut raw = Vec::with_capacity((WIDTH * HEIGHT * 4) + HEIGHT);
    let center = ((WIDTH / 2) as i32, (HEIGHT / 2) as i32);

    for y in 0..HEIGHT as i32 {
        raw.push(0); // filter type byte
        for x in 0..WIDTH as i32 {
            let dx = x - center.0;
            let dy = y - center.1;
            let dist2 = dx * dx + dy * dy;

            let (r, g, b, a) = if dist2 <= 45 * 45 {
                (255, 255, 255, 255)
            } else if dist2 <= 85 * 85 {
                (87, 120, 255, 255)
            } else {
                (26, 35, 126, 255)
            };

            raw.extend_from_slice(&[r, g, b, a]);
        }
    }

    let mut encoder = ZlibEncoder::new(Vec::new(), Compression::default());
    encoder.write_all(&raw)?;
    let compressed = encoder.finish()?;

    let mut png = Vec::new();
    png.extend_from_slice(&[0x89, b'P', b'N', b'G', b'\r', b'\n', 0x1A, b'\n']);

    let mut ihdr = Vec::with_capacity(13);
    ihdr.extend_from_slice(&(WIDTH as u32).to_be_bytes());
    ihdr.extend_from_slice(&(HEIGHT as u32).to_be_bytes());
    ihdr.push(BIT_DEPTH);
    ihdr.push(COLOR_TYPE_RGBA);
    ihdr.push(0); // compression
    ihdr.push(0); // filter
    ihdr.push(0); // interlace
    push_chunk(&mut png, b"IHDR", &ihdr);

    push_chunk(&mut png, b"IDAT", &compressed);
    push_chunk(&mut png, b"IEND", &[]);

    Ok(png)
}

fn push_chunk(buffer: &mut Vec<u8>, chunk_type: &[u8; 4], data: &[u8]) {
    buffer.extend_from_slice(&(data.len() as u32).to_be_bytes());
    buffer.extend_from_slice(chunk_type);
    buffer.extend_from_slice(data);

    let mut hasher = Hasher::new();
    hasher.update(chunk_type);
    hasher.update(data);
    buffer.extend_from_slice(&hasher.finalize().to_be_bytes());
}

fn wrap_png_as_ico(png_data: &[u8]) -> Vec<u8> {
    const ICONDIR_SIZE: usize = 6;
    const ICONDIRENTRY_SIZE: usize = 16;

    let mut ico = Vec::with_capacity(ICONDIR_SIZE + ICONDIRENTRY_SIZE + png_data.len());

    ico.extend_from_slice(&0u16.to_le_bytes()); // reserved
    ico.extend_from_slice(&1u16.to_le_bytes()); // icon type
    ico.extend_from_slice(&1u16.to_le_bytes()); // number of images

    ico.push(0); // width: 0 == 256
    ico.push(0); // height: 0 == 256
    ico.push(0); // color palette size
    ico.push(0); // reserved
    ico.extend_from_slice(&1u16.to_le_bytes()); // color planes
    ico.extend_from_slice(&32u16.to_le_bytes()); // bits per pixel
    ico.extend_from_slice(&(png_data.len() as u32).to_le_bytes());
    ico.extend_from_slice(&((ICONDIR_SIZE + ICONDIRENTRY_SIZE) as u32).to_le_bytes());

    ico.extend_from_slice(png_data);

    ico
}
