use base64;
use std::str;
use tauri::{LogicalSize, Size};
use tauri::Manager;

pub const OVERLAY_LABEL: &str = "overlay";

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(
        &handle,
        OVERLAY_LABEL,
        tauri::WindowUrl::App("overlay.html".into()),
    )
    .transparent(true)
    .decorations(false)
    .resizable(false)
    // Workaround: when the window appears, even if the bg should be transparent, it s not.
    // a white print is visible but disappears when resizing, so resizing at init remove this white print.
    // Memo: 0 sized window works on windows but no macos , 10.0 seems good enough
    .inner_size(10.0, 10.0)
    .build()
    .unwrap();
}

pub fn resize_window(handle: tauri::AppHandle, width: f64, height: f64) {
    let window = handle.get_window(&OVERLAY_LABEL).unwrap();
    window
        .set_size(Size::Logical(LogicalSize { width, height }))
        .unwrap();
}
