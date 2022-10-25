use tauri::Manager;

#[path = "utils.rs"]
mod utils;

#[tauri::command]
pub async fn read_file(path: String) -> String {
    match std::fs::read(path) {
        Ok(bytes) => utils::get_b64_from_uint8(bytes),
        Err(e) => {
            println!("read_file failed {e}");
            panic!("read_file failed{}", e)
        }
    }
}

#[tauri::command]
pub async fn open_overlay(handle: tauri::AppHandle) {
    utils::create_window(handle)
}

#[tauri::command]
pub async fn resize_overlay(width: f32, height: f32, handle: tauri::AppHandle) {
    let window = handle.get_window(utils::OVERLAY_LABEL).unwrap();
    utils::resize_window(window, width as f64, height as f64)
}
