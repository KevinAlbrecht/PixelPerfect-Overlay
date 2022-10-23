use base64;
use std::str;
use tauri::{LogicalSize, Size, Window};

pub const OVERLAY_LABEL: &str = "overlay";

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    let window = tauri::WindowBuilder::new(
        &handle,
        OVERLAY_LABEL,
        tauri::WindowUrl::App("overlay.html".into()),
    )
    .transparent(true)
    .inner_size(0.0, 0.0)
    // .visible(false)
    .build()
    .unwrap();

    // Workaround: when the window appears, even if the bg should be transparent, it s not.
    // a white print is visible but disappears when resizing, so resizing at init remove this white print.
    resize_window(window, 500.0, 500.0);
}

pub fn resize_window(window: Window, width: f64, height: f64) {
    window
        .set_size(Size::Logical(LogicalSize { width, height }))
        .unwrap();
}
