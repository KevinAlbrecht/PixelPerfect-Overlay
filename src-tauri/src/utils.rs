use base64;

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    tauri::WindowBuilder::new(
        &handle,
        "overlay",
        tauri::WindowUrl::App("overlay.html".into()),
    )
    .transparent(true)
    .build()
    .unwrap();
}
