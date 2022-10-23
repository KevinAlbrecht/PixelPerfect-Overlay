use base64;
use tauri::{LogicalSize, Size};

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    let window = tauri::WindowBuilder::new(
        &handle,
        "overlay",
        tauri::WindowUrl::App("overlay.html".into()),
    )
    .transparent(true)
    .inner_size(0.0, 0.0)
    .build()
    .unwrap();

    // Workaround: when the window appears, even if the bg should be transparent, it s not.
    // a white print is visible but disappears when resizing, so resizing at init remove this white print.
    window.set_size(Size::Logical(LogicalSize {
        width: 500.0,
        height: 500.0,
    })).unwrap();
}
